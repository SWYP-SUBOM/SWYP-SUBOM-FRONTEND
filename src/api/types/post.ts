export interface PostResponse {
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
}

export interface savePostResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    postId: number;
    nickname: string;
  };
}

export interface saveAndUpdatePostResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    postId: number;
    status: string;
    updatedAt: string;
    content: string;
  };
}

export interface deletePostResponse {
  success: boolean;
  code: string;
  message: string;
  data: string;
}
