import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import {
  getCourses,
  getCourse,
  createCourse,
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
