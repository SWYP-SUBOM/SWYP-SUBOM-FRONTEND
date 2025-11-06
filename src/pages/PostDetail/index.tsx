import freshButton from '../../assets/Feed/fresh_button.png';
import likeButton from '../../assets/Feed/like_button.png';
import relateButton from '../../assets/Feed/relate_button.png';
import { PostDetailBox } from './_components/PostDetailBox';

export const PostDetail = () => {
  const detaildata = {
    success: true,
    code: 'F0001',
    message: '글 상세 조회에 성공했습니다.',
    data: {
      content: '아침형 인간이 더 효율적이라고 생각한다...',
      createdAt: '2025-10-25T14:30:00Z',
      writer: {
        name: '모자 쓴 기린',
        isMe: false,
      },
      reactions: [
        {
          reactionId: 1,
          reactionName: 'LIKE',
          reactionCount: 3,
        },
        {
          reactionId: 2,
          reactionName: 'LIKE',
          reactionCount: 3,
        },
        {
          reactionId: 3,
          reactionName: 'LIKE',
          reactionCount: 3,
        },
      ],
      viewCount: 10,
    },
  };

  const reactionButtons = [
    { reactionName: '좋아요', icon: likeButton },
    { reactionName: '공감돼요', icon: relateButton },
    { reactionName: '새로워요', icon: freshButton },
  ];

  return (
    <div className="px-4 pt-10">
      <PostDetailBox
        content={detaildata.data.content}
        createdAt={detaildata.data.createdAt}
        isMe={detaildata.data.writer.isMe}
        writer={detaildata.data.writer.name}
        reactions={detaildata.data.reactions}
        viewCount={detaildata.data.viewCount}
      ></PostDetailBox>
      <div className="justify-end flex gap-[22px] pt-4">
        {reactionButtons.map((reactionButton) => (
          <button key={reactionButton.reactionName} className="flex flex-col items-center gap-1">
            <img src={reactionButton.icon} className="w-15 h-15" />
            <div className="C01_M text-gray-700">{reactionButton.reactionName}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
