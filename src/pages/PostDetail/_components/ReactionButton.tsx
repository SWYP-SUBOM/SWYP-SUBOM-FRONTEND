import { useDeleteReaction, usePutReaction } from '../../../hooks/Post/useToggleReaction';

export type ReactionButtonProps = {
  reactionName: string;
  icon: string;
  officon: string;
  reactionValue: string;
  isReactioned: boolean;
  postId: number;
};

export function ReactionButton({
  reactionName,
  icon,
  officon,
  reactionValue,
  isReactioned,
  postId,
}: ReactionButtonProps) {
  const putReaciontMutation = usePutReaction(postId);
  const deleteReaciontMutation = useDeleteReaction(postId);

  const handleClickReaction = (reactionValue: string) => {
    if (!isReactioned) {
      putReaciontMutation.mutate(
        { reactionTypeName: reactionValue },
        {
          onSuccess: () => {
            console.log('반응 추가');
          },
          onError: (error) => console.error('반응 추가 에러:', error),
        },
      );
    } else {
      deleteReaciontMutation.mutate(
        { postId },
        {
          onSuccess: () => console.log('반응 삭제'),
          onError: (error) => console.error('반응 삭제 에러:', error),
        },
      );
    }
  };
  return (
    <>
      <button className="cursor-pointer" onClick={() => handleClickReaction(reactionValue)}>
        {isReactioned ? (
          <img src={icon} className="w-15 h-15" />
        ) : (
          <img src={officon} className="w-15 h-15" />
        )}
        <div className="C01_M text-gray-700">{reactionName}</div>
      </button>
    </>
  );
}
