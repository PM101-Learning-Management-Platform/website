import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import { getUserEnrollments } from "../../api/enrollment";

export const getUserEnrolledCourses = createAsyncThunk(
  "enrolledCourses/getUserEnrolledCourses",
  async () => {
    return await getUserEnrollments();
  },
);

export interface EnrolledCourse {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string | null;
    adminId: string;
    price: number;
    duration: string;
    level: string;
  };
  id: string;
  userId: string;
  courseId: string;
  level: string;
  progress: number;
  status: "in_progress" | "completed" | "not_started";
  lastLesson: string;
}

export interface EnrolledCoursesState {
  enrolledCourses: EnrolledCourse[];
  loading: boolean;
  error: string | null;
}

const initialState: EnrolledCoursesState = {
  enrolledCourses: [],
  loading: false,
  error: null,
};

const enrolledCoursesSlice = createSlice({
  name: "enrolledCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserEnrolledCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses = action.payload;
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

export default enrolledCoursesSlice.reducer;
