import axiosInstance from "../lib/axiosInstance";

export const courseEnrollment = async (courseId: string) => {
  const response = await axiosInstance.post(`/enrollments/${courseId}`);
  return response.data;
};

export const getUserEnrollments = async () => {
  const response = await axiosInstance.get(`/enrollments/my-courses`);
  return response.data;
};
