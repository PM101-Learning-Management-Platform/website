import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/courses";
import enrolledCoursesReducer from "./slices/enrolledCourses";

const store = configureStore({
  reducer: { courses: coursesReducer, enrolledCourses: enrolledCoursesReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
