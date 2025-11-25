import { CategoryChip } from '../../../components/common/CategoryChip';
import type { CategoryNameType } from '../../../constants/Category';
import type { ReactionType } from '../../../constants/Reations';
import { DateFormatter } from '../../../utils/DateFormatter';

export interface NotificationBoxProps {
  notificationId: number;
  reactionName: ReactionType;
  reactionCount: number;
  updatedAt: string;
  category: {
    categoryId: number;
    categoryName: CategoryNameType;
  };
  postId: number;
  read: boolean;
}

export const ReactionMap = {
  LIKE: '좋아요',
  EMPATHY: '공감돼요',
  INSIGHTFUL: '새로워요',
};

export function NotificationBox({ notification }: { notification: NotificationBoxProps }) {
  return (
    <>
      <div className="p-5 bg-white rounded-xl hover:shadow-[0_0_40px_0_#D0D2D9]">
        <div className="flex justify-between pb-[14px]">
          <CategoryChip categoryName={notification.category.categoryName}></CategoryChip>
          <div className="text-gray-700 C01_SB">{DateFormatter(notification.updatedAt)}</div>
        </div>
        <div className="B03_M text-gray-900 ">
          {notification.reactionCount}명이 내 글에 {ReactionMap[notification.reactionName]}를
          눌렀어요.
        </div>
      </div>
    </>
  );
}
