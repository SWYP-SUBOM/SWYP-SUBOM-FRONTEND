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
    </div>
  );
};
