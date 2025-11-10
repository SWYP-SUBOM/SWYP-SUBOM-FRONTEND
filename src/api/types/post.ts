export type PostResponse = {
  success: boolean;
  code: string;
  message: string;
  data: {
    content: string;
    updatedAt: string;
    writer: {
      name: string;
      isMe: boolean;
    };
    reactions: {
      reactionId: number;
      reactionName: string;
      reactionCount: number;
    }[];
    viewCount: number;
  };
};
