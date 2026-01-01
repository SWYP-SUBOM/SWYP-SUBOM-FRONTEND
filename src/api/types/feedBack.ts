import type { Grade } from '../../constants/Grade';

export interface postAIfeedBackResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    aiFeedbackId: number;
    status: string;
  };
}

export interface ImprovementPoint {
  reason: string;
  sentenceIndex: number;
  originalText: string;
}

export interface getAIfeedBackResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    aiFeedbackId: number;
    status: string;
    strength: string;
    grade: Grade;
    summary: string;
    improvementPoints: ImprovementPoint[];
  };
}
