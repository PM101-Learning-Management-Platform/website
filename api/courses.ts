import axios from "axios";
import type { Course } from "../types/courses";

const API_URL = import.meta.env.VITE_API_URL;


export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourse = async (courseId: string) => {
  try {
    const response = await axios.get(`${API_URL}/courses/${courseId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

export const createCourse = async (courseData: Course) => {
  try {
    const response = await axios.post(`${API_URL}/courses`, courseData);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const updateCourse = async (courseId: string, courseData: Course) => {
  try {
    const response = await axios.patch(`${API_URL}/courses/${courseId}`, courseData);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};
