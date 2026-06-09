import type { Assessment } from "./assessment";

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  videoUrl: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
};

export type Module = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
  assessment: Assessment;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  adminId: string;
  thumbnailUrl: string | null;
  duration: number;
  level: string;
  price: number;
  modules: Module[];
  studentsCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
