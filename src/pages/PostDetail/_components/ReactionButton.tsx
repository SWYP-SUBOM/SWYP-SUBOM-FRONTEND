export type ReactionButtonProps = {
  reactionName: string;
  icon: string;
  officon: string;
  reactionValue: string;
  isReactioned: boolean;
};

export function ReactionButton({
  reactionName,
  icon,
  officon,
  reactionValue,
  isReactioned,
}: ReactionButtonProps) {
  const handleClickReaction = (reactionValue: string) => {
    console.log(reactionValue);
  };
  return (
    <>
      <button onClick={() => handleClickReaction(reactionValue)}>
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
