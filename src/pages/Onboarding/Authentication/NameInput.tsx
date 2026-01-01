import { useState } from 'react';
import { Button } from '../../../components/common/Button';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import { usePostUserName } from '../../../hooks/User/usePostUserName';
import { NAME_MAX_LENGTH, NAME_PLACEHOLDER, nameSchema } from '../../../schemas/nameSchema';

export const NameInput = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string>('');

  const { handleNext } = useOnboardingNavigation();
  const mutation = usePostUserName();

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
        handleNext();
      },
      onError: (error: Error) => {
        console.error('닉네임 저장 에러:', error);
        alert(error.message || '닉네임 저장에 실패했습니다.');
      },
    });
  };

  return (
    <div className="app-root flex flex-col  pt-[168px]  style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))'}}">
      <div className="flex flex-col justify-center items-center text-center  ">
        <div className="T02_B text-gray-900 ">당신의 이름을 입력해주세요</div>

        <div className="B03_1_M text-neutral-600 mt-[27px]">별명과 실명 모두 괜찮아요</div>
        <div className="B03_1_M text-neutral-600 ">
          (단, <span className="text-blue-600 B03_B">숫자·특수문자</span> 포함이{' '}
          <span className="text-blue-600 B03_B">불가능</span>해요)
        </div>
      </div>

      <div className="flex flex-col items-center px-10 mt-[44px] relative">
        <div className="w-full relative">
          <div className="w-full h-14 relative bg-gray-100 rounded-lg">
            <input
              type="text"
              value={name}
              onChange={handleChange}
              placeholder={NAME_PLACEHOLDER}
              maxLength={NAME_MAX_LENGTH}
              className={`w-full h-14 bg-gray-100  border-b-2 text-gray-900 B01_B focus:outline-none px-2 ${
                error ? 'border-red-500' : 'border-blue-400 focus:border-blue-600'
              }`}
            />
            <div className="absolute right-1 bottom-3 B03_1_M text-neutral-400">
              {name.length}/{NAME_MAX_LENGTH}
            </div>
          </div>
          {error && <div className="mt-2 text-red-500 B03_1_M text-left">{error}</div>}
        </div>
      </div>
      <div className="absolute top-[520px] sm:top-[654px] left-0 right-0 flex flex-col justify-center items-center px-4 z-5">
        <Button label="시작하기" onClick={handleSubmit} disabled={!isValid} />
      </div>
    </div>
  );
};
