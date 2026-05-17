import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import {
  getLearningPath,
  getLearningPathById,
  createLearningPath
} from "../../api/learningPath";

interface LearningPathForm {
  title: string;
  description: string;
  courses: string[];
}

export const createLearningPathThunk = createAsyncThunk(
  "learningPath/createLearningPath",
  async (learningPath: LearningPathForm) => {
    return await createLearningPath(learningPath);
  }
);

export const getLearningPathThunk = createAsyncThunk(
  "learningPath/getLearningPath",
  async () => {
    return await getLearningPath()
  }
);

export const getLearningPathByIdThunk = createAsyncThunk(
  "learningPath/getLearningPathById",
  async (learningPathId: string) => {
    return await getLearningPathById(learningPathId)
  }
);

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
}

export interface LearningPathState {
  learningPaths: LearningPath[];
  selectedLearningPath: LearningPath | null;
  error: string | null;
}

const initialState: LearningPathState = {
  learningPaths: [],
  selectedLearningPath: null,
  error: null,
};

const learningPathSlice = createSlice({
  name: "learningPath",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLearningPathThunk.fulfilled, (state, action) => {
        state.learningPaths.push(action.payload);
      })
      .addCase(getLearningPathThunk.fulfilled, (state, action) => {
        state.learningPaths = action.payload;
      })
      .addCase(getLearningPathByIdThunk.fulfilled, (state, action) => {
        state.selectedLearningPath = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.error = null;
        },
      )
      .addMatcher(isRejected, (state, action) => {
        state.error = action.error?.message || "Error occurred";
      });
  },
})

export default learningPathSlice.reducer;
