import { TitleHeader } from '../../components/common/TitleHeader';
import { useGetMe } from '../../hooks/useGetMe';
import { InfoCard } from './_components/InfoCard';
import { ActionButtons } from './_components/ActionButtons';
import { InfoNotice } from './_components/InfoNotice';

const MyInfo = () => {
  const { data: meData, isLoading } = useGetMe();

  const formatJoinDate = (dateString: string | undefined): string => {
    if (!dateString) return '';
    return dateString.replace(/-/g, '.');
  };

  const joinDate = meData?.date ? `${formatJoinDate(meData.date)} 가입` : '';

  const handleNameChange = () => {};

  const handleLogout = () => {};

  const handleWithdraw = () => {};

  return (
    <div className="flex flex-col min-h-screen pt-10">
      <TitleHeader title="내 정보 관리" showDateHeader={true} />

      <div className="px-4 mt-4 space-y-3">
        <InfoCard label="로그인 계정" value="카카오 계정으로 로그인됨" />
        <InfoCard label="이메일" value={meData?.email ?? ''} isLoading={isLoading} />
        <InfoCard
          label="설정된 이름"
          value={meData?.name ?? null}
          isLoading={isLoading}
          showChangeButton={true}
          onChange={handleNameChange}
        />
        <InfoCard label="가입일" value={joinDate} isLoading={isLoading} />
      </div>

      <div className="flex-1" />
      <ActionButtons onLogout={handleLogout} onWithdraw={handleWithdraw} />
      <InfoNotice />
    </div>
  );
};

export default MyInfo;
