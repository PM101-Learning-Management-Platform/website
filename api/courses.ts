import axiosInstance from "../lib/axiosInstance";
import type { Course } from "../types/courses";

export const getCourses = async () => {
  const response = await axiosInstance.get(`/courses`);
  return response.data.data;
};

export const getCourse = async (courseId: string) => {
  const response = await axiosInstance.get(`/courses/${courseId}`);
  return response.data.data;
};

export const createCourse = async (courseData: Course) => {
  const response = await axiosInstance.post(`/courses`, courseData);
  return response.data;
};

export const updateCourse = async (courseId: string, courseData: Course) => {
  const response = await axiosInstance.patch(
    `/courses/${courseId}`,
    courseData,
  );
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await axiosInstance.delete(`/courses/${courseId}`);
  return response.data;
};
