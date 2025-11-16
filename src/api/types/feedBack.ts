export interface postAIfeedBackResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    aiFeedbackId: number;
    status: string;
  };
}

export interface getAIfeedBackResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    aiFeedbackId: number;
    status: string;
    strength: string;
    summary: string;
    improvementPoints: string[];
  };
}
