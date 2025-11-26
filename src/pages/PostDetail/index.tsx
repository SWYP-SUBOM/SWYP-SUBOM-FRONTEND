import { useParams } from 'react-router-dom';
import { TitleHeader } from '../../components/common/TitleHeader';
import { ReactionButtons } from '../../constants/ReactionButtons';
import { useGetPost } from '../../hooks/Post/useGetPost';
import type { ReactionNameType } from '../../hooks/Post/useToggleReaction';
import { FeedLayout } from '../../layout/FeedLayout';
import { CalendarPostView } from '../Calendar/CalendarPostView';
import { PostDetailBox } from './_components/PostDetailBox';
import { ReactionButton } from './_components/ReactionButton';

export const PostDetail = () => {
  const params = useParams<{ postId: string }>();
  const postId = Number(params.postId);

  const { data: postData } = useGetPost(postId);
  const isMyPost = postData?.writer.me ?? false;

  const myReaction = postData?.myReaction?.reactionName;

  if (isMyPost) {
    return <CalendarPostView postId={postId} />;
  }

  return (
    <>
      <FeedLayout header={<TitleHeader onlyNavigateBack={true} />}>
        <div className="px-4">
          {postData ? (
            <PostDetailBox
              content={postData.content}
              updatedAt={postData.updatedAt}
              isMe={postData.writer.me}
              writer={postData.writer.name}
              reactions={postData.reactions}
              viewCount={postData.viewCount}
            />
          ) : (
            <div className="flex flex-col justify-between w-full max-h-[70vh] min-h-[70vh] px-4 py-4 bg-[#FFFFFF] rounded-xl border border-[#D0D2D9]"></div>
          )}
          <div className="justify-end flex gap-[22px] pt-10">
            {ReactionButtons.map((reactionButton) => (
              <div key={reactionButton.reactionName} className="flex flex-col items-center gap-1">
                <ReactionButton
                  reactionName={reactionButton.reactionName}
                  icon={reactionButton.icon}
                  officon={reactionButton.officon}
                  isReactioned={myReaction === reactionButton.reactionValue}
                  reactionValue={reactionButton.reactionValue as ReactionNameType}
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
