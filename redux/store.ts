import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/courses";
import enrolledCoursesReducer from "./slices/enrolledCourses";
import learningPathReducer from "./slices/learningPath";

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    enrolledCourses: enrolledCoursesReducer,
    learningPath: learningPathReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
