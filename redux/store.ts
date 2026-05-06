import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/courses";

const store = configureStore({
  reducer: { courses: coursesReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
