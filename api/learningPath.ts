import axiosInstance from "../lib/axiosInstance";

export interface CreateLearningPath {
  title: string;
  description?: string;
  courses: string[];
}

export const getLearningPath = async () => {
  const response = await axiosInstance.get("/learning-paths");
  return response.data.data;
};

export const getLearningPathById = async(id:string) => {
  const response = await axiosInstance.get(`/learning-paths/${id}`);
  return response.data.data;
}

export const createLearningPath = async(data: CreateLearningPath) => {
  const response = await axiosInstance.post("/learning-paths",data);
  return response.data.data;
}
