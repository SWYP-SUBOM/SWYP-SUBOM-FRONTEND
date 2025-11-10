import { useParams } from 'react-router-dom';
import freshButton from '../../assets/Feed/fresh_button.png';
import likeButton from '../../assets/Feed/like_button.png';
import relateButton from '../../assets/Feed/relate_button.png';
import { useGetPost } from '../../hooks/Post/useGetPost';
import { PostDetailBox } from './_components/PostDetailBox';

export const PostDetail = () => {
  const params = useParams<{ postId: string }>();
  const postId = Number(params.postId);

  const { data: postData } = useGetPost(postId);

  const reactionButtons = [
    { reactionName: '좋아요', icon: likeButton },
    { reactionName: '공감돼요', icon: relateButton },
    { reactionName: '새로워요', icon: freshButton },
  ];

  return (
    <div className="px-4 pt-10">
      {postData && (
        <PostDetailBox
          content={postData.content}
          updatedAt={postData.updatedAt}
          isMe={postData.writer.isMe}
          writer={postData.writer.name}
          reactions={postData.reactions}
          viewCount={postData.viewCount}
        ></PostDetailBox>
      )}
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
