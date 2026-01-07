import { useState, useEffect } from 'react';
import { useAdminLogin } from '../../hooks/Admin/useAdminLogin';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    totpCode: '',
  });
  const loginMutation = useAdminLogin();

  // 로그인 실패 시 에러 표시
  useEffect(() => {
    if (loginMutation.isError) {
      setErrors({
        email: '아이디를 다시 확인해주세요',
        password: '비밀번호를 다시 확인해주세요',
        totpCode: '코드를 다시 확인해주세요',
      });
    }
  }, [loginMutation.isError]);

  // 입력 시 에러 초기화
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleTotpCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotpCode(e.target.value);
    if (errors.totpCode) {
      setErrors((prev) => ({ ...prev, totpCode: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 에러 초기화
    setErrors({ email: '', password: '', totpCode: '' });
    loginMutation.mutate({
      email: email.trim(),
      password: password.trim(),
      totpCode: totpCode.trim(),
    });
  };

  const isFormValid = email.trim() && password.trim() && totpCode.trim();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="T02_B text-gray-900">
        <h1>써봄 워크스페이스</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-10 flex flex-col gap-7">
        <div className="flex flex-col gap-[14px]">
          <label className="B02_B text-gray-900">아이디</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="아이디를 입력해주세요"
            className={`B02_M w-full h-14 rounded-[10px] px-5 text-gray-900 placeholder:text-gray-600 focus:outline-none ${
              errors.email ? 'border border-red-500' : 'border border-gray-500'
            }`}
            disabled={loginMutation.isPending}
          />
          {errors.email && <div className="B03-1_M text-red-500">{errors.email}</div>}
        </div>

        <div className="flex flex-col gap-[14px]">
          <label htmlFor="password" className="B02_B text-gray-900">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해주세요"
            className={`B02_M w-full h-14 rounded-[10px] px-5 text-gray-900 placeholder:text-gray-600 focus:outline-none ${
              errors.email ? 'border border-red-500' : 'border border-gray-500'
            }`}
            disabled={loginMutation.isPending}
          />
          {errors.password && <div className="B03-1_M text-red-500">{errors.password}</div>}
        </div>

        <div className="flex flex-col gap-[14px]">
          <label htmlFor="code" className="B02_B text-gray-900">
            코드
          </label>
          <input
            id="code"
            type="text"
            value={totpCode}
            onChange={handleTotpCodeChange}
            placeholder="코드를 입력해주세요"
            className={`B02_M w-full h-14 rounded-[10px] px-5 text-gray-900 placeholder:text-gray-600 focus:outline-none ${
              errors.email ? 'border border-red-500' : 'border border-gray-500'
            }`}
            disabled={loginMutation.isPending}
            maxLength={6}
          />
          {errors.totpCode && <div className="B03-1_M text-red-500">{errors.totpCode}</div>}
        </div>

        <button
          type="submit"
          disabled={!isFormValid || loginMutation.isPending}
          className={`B02_B w-full h-14 rounded-xl  transition-colors ${
            isFormValid && !loginMutation.isPending
              ? 'bg-b7 text-white hover:bg-b8 active:bg-b8 cursor-pointer'
              : 'bg-gray-600 text-white cursor-not-allowed'
          }`}
        >
          {loginMutation.isPending ? '로그인 중...' : '로그인하기'}
        </button>
      </form>
    </div>
  );
};
