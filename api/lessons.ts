import axiosInstance from "../lib/axiosInstance";

export const getLessons = async (courseId: string, lessonId: string) => {
  const res = await axiosInstance.get(`course/${courseId}/lessons/${lessonId}`);
  return res.data;
};

export const markLessonComplete = async (courseId: string, lessonId: string) => {
  const res = await axiosInstance.post(`course/${courseId}/lessons/${lessonId}/completed`);
  return res.data;
};
