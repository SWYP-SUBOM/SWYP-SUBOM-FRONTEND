import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TitleHeader } from '../../components/common/TitleHeader';
import { ReactionButtons } from '../../constants/ReactionButtons';
import { useGetPost } from '../../hooks/Post/useGetPost';
import type { ReactionNameType } from '../../hooks/Post/useToggleReaction';
import { FeedLayout } from '../../layout/FeedLayout';
import { SpeechBubble } from '../Write/_components/SpeechBubble';
import { PostDetailBox } from './_components/PostDetailBox';
import { ReactionButton } from './_components/ReactionButton';

export const PostDetail = () => {
  const [isBubbleOpen, setIsBubbleOpen] = useState(true);
  const hasClosedBubble = useRef(false);

  const params = useParams<{ postId: string }>();
  const postId = Number(params.postId);

  const { data: postData } = useGetPost(postId);

  const myReaction = postData?.myReaction?.reactionName;

  const handleCloseBubble = () => {
    setIsBubbleOpen(false);
    hasClosedBubble.current = true;
  };

  return (
    <>
      <FeedLayout header={<TitleHeader onlyNavigateBack={true} />}>
        <div className="px-4 relative">
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
          {isBubbleOpen && (
            <SpeechBubble
              className="absolute bottom-[calc(100px+env(safe-area-inset-bottom))] right-4 flex flex-col items-end z-50"
              bubbleText="작성된 글이 어떠셨나요?"
              onBubbleClose={handleCloseBubble}
            />
          )}
          <div className="justify-end flex gap-[22px] pt-13 pb-[calc(25px+env(safe-area-inset-bottom))]">
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
