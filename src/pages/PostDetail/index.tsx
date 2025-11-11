import { useParams } from 'react-router-dom';
import { ReactionButtons } from '../../constants/ReactionButtons';
import { useGetPost } from '../../hooks/Post/useGetPost';
import { PostDetailBox } from './_components/PostDetailBox';
import { ReactionButton } from './_components/ReactionButton';

export const PostDetail = () => {
  const params = useParams<{ postId: string }>();
  const postId = Number(params.postId);

  const { data: postData } = useGetPost(postId);

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
        {ReactionButtons.map((reactionButton) => (
          <button key={reactionButton.reactionName} className="flex flex-col items-center gap-1">
            <ReactionButton
              reactionName={reactionButton.reactionName}
              icon={reactionButton.icon}
              officon={reactionButton.officon}
              isReactioned={false}
              reactionValue={reactionButton.reactionValue}
            ></ReactionButton>
          </button>
        ))}
      </div>
    </div>
  );
};
