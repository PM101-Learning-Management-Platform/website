import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../api/courses";
import type { Course } from "../../types/courses";

export const getAllCourses = createAsyncThunk(
  "courses/getAllCourses",
  async () => {
    return await getCourses();
  },
);

export const getCourseById = createAsyncThunk(
  "courses/getCourseById",
  async (courseId: string) => {
    return await getCourse(courseId);
  },
);

export const createNewCourse = createAsyncThunk(
  "courses/createNewCourse",
  async (courseData: Course) => {
    return await createCourse(courseData);
  },
);

export const updateCourseById = createAsyncThunk(
  "courses/updateCourseById",
  async (courseData: Course) => {
    return await updateCourse(courseData.id, courseData);
  },
);

export const deleteCourseById = createAsyncThunk(
  "courses/deleteCourseById",
  async (courseId: string) => {
    return await deleteCourse(courseId);
  },
);

interface CoursesState {
  courses: Course[];
  course: Course | null;
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  course: null,
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })

      .addCase(getCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload;
      })

      .addCase(createNewCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload);
      })

      .addCase(updateCourseById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (c) => c.id === action.payload.id,
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })

      .addCase(deleteCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter((c) => c.id !== action.meta.arg);
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )

      .addMatcher(isRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Error occurred";
      });
  },
});

export default coursesSlice.reducer;
