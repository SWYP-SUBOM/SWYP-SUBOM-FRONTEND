import message from '../../../assets/admin/message.svg';

interface AdminBottomActionsProps {
  onCreateQuestion?: () => void;
  onChatClick?: () => void;
  isGenerating?: boolean;
}

export const AdminBottomActions = ({
  onCreateQuestion,
  onChatClick,
  isGenerating = false,
}: AdminBottomActionsProps) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[400px] w-full px-4 pb-4 pt-3 bg-white border-t border-gray-200">
      <div className="flex items-center gap-3">
        {/* 질문 생성하기 버튼 */}
        <button
          onClick={onCreateQuestion}
          disabled={isGenerating}
          className={`flex-1 h-14 rounded-xl B02_B flex items-center justify-center transition-colors ${
            isGenerating
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-b7 text-white cursor-pointer hover:bg-b8 active:bg-b8'
          }`}
        >
          {isGenerating ? '질문 생성 중...' : '질문 생성하기'}
        </button>

        {/* 채팅 아이콘 버튼 */}
        <button
          onClick={onChatClick}
          className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200 active:bg-gray-200 transition-colors"
        >
          <div className="relative">
            <img src={message} alt="message" />
          </div>
        </button>
      </div>
    </div>
  );
};
