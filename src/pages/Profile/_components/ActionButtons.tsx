interface ActionButtonsProps {
  onLogout: () => void;
  onWithdraw: () => void;
}

export const ActionButtons = ({ onLogout, onWithdraw }: ActionButtonsProps) => {
  return (
    <div className="px-4 mt-auto space-y-4">
      <button onClick={onLogout} className="B03_1_M text-gray-700 w-full text-left">
        로그아웃
      </button>
      <button onClick={onWithdraw} className="B03_1_M text-gray-700 w-full text-left">
        회원탈퇴
      </button>
    </div>
  );
};
