export type namingRequest = {
  name: string;
};

export type namingResponse = {
  success: boolean;
  code: string;
  message: string;
  data: string | null;
};

export type meResponse = {
  success: boolean;
  code: string;
  message: string;
  data: {
    name: string;
    email: string;
    date: string;
    streak: {
      current: number;
    };
  } | null;
};
