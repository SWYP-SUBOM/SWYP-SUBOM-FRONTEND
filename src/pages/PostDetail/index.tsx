import { useParams } from 'react-router-dom';
import { TitleHeader } from '../../components/common/TitleHeader';
import { ReactionButtons } from '../../constants/ReactionButtons';
import { useGetPost } from '../../hooks/Post/useGetPost';
import { FeedLayout } from '../../layout/FeedLayout';
import { PostDetailBox } from './_components/PostDetailBox';
import { ReactionButton } from './_components/ReactionButton';

export const PostDetail = () => {
  const params = useParams<{ postId: string }>();
  const postId = Number(params.postId);

  const { data: postData } = useGetPost(postId);

  const myReaction = postData?.myReaction.reactionName;

  return (
    <>
      <FeedLayout header={<TitleHeader onlyNavigateBack={true} />}>
        <div className="px-4">
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
              <div key={reactionButton.reactionName} className="flex flex-col items-center gap-1">
                <ReactionButton
                  reactionName={reactionButton.reactionName}
                  icon={reactionButton.icon}
                  officon={reactionButton.officon}
                  isReactioned={myReaction === reactionButton.reactionValue}
                  reactionValue={reactionButton.reactionValue}
                  postId={postId}
                ></ReactionButton>
              </div>
            ))}
          </div>
        </div>
      </FeedLayout>
    </>
  );
};
