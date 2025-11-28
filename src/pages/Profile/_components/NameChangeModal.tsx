import { useState } from 'react';
import { usePostUserName } from '../../../hooks/usePostUserName';
import { useGetMe } from '../../../hooks/useGetMe';
import { nameSchema, NAME_MAX_LENGTH, NAME_PLACEHOLDER } from '../../../schemas/nameSchema';
import { Modal } from '../../../components/Modal/Modal';
import { useModal } from '../../../hooks/useModal';

interface NameChangeModalProps {
  currentName: string;
}

export const NameChangeModal = ({ currentName }: NameChangeModalProps) => {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState<string>('');
  const { closeModal } = useModal();
  const mutation = usePostUserName();
  const { refetch } = useGetMe();

  const isValid = name.trim() && nameSchema.safeParse(name.trim()).success;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    // 실시간 유효성 검사
    if (value.trim()) {
      const result = nameSchema.safeParse(value.trim());
      if (!result.success) {
        setError(result.error.issues[0].message);
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const result = nameSchema.safeParse(trimmedName);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError('');
    mutation.mutate(trimmedName, {
      onSuccess: () => {
        refetch();
        closeModal();
      },
      onError: (error: Error) => {
        console.error('이름 변경 에러:', error);
        alert(error.message || '이름 변경에 실패했습니다.');
      },
    });
  };

  return (
    <Modal>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Xbutton />
          <Modal.Title>이름 변경</Modal.Title>
          <div className="flex flex-col items-center px-4 mt-6">
            <div className="w-full relative">
              <div className="w-full h-14 relative bg-gray-100 rounded-lg">
                <input
                  type="text"
                  value={name}
                  onChange={handleChange}
                  placeholder={NAME_PLACEHOLDER}
                  maxLength={NAME_MAX_LENGTH}
                  className={`w-full h-14 bg-gray-100 border-b-2 text-gray-900 B01_B focus:outline-none px-2 ${
                    error ? 'border-red-500' : 'border-blue-400 focus:border-blue-600'
                  }`}
                />
                <div className="absolute right-1 bottom-3 B03_1_M text-neutral-400">
                  {name.length}/{NAME_MAX_LENGTH}
                </div>
              </div>
              {error && <div className="mt-2 text-red-500 B03_1_M text-left w-full">{error}</div>}
            </div>
            <div className="mt-6 w-full">
              <button
                onClick={handleSubmit}
                disabled={!isValid || mutation.isPending}
                className="w-full h-14 B02_B text-white rounded-xl bg-b7 active:bg-b8 active:scale-95 hover:bg-b8 cursor-pointer"
              >
                변경하기
              </button>
            </div>
          </div>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  );
};
