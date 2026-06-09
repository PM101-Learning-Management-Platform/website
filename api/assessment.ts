import axiosInstance from "../lib/axiosInstance";

export interface submitAssessmentDTO {
  answers: {
    questionId: string;
    answer: "a" | "b" | "c" | "d";
  }[];
};

export const getAssessment = async (assessmentId: string) => {
  const response = await axiosInstance.get(`/assessments/${assessmentId}/take`);
  return response.data.data;
};

export const submitAssessment = async (
  assessmentId: string,
  payload: submitAssessmentDTO,
) => {
  const response = await axiosInstance.post(
    `/assessments/${assessmentId}/submit`,
    payload,
  );
  return response.data;
};
