// features/tasks/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add Task thunk
export const addTask = createAsyncThunk("tasks/addTask", async (taskData, thunkAPI) => {
  try {
    const response = await axios.post("/api/tasks", taskData); // Adjust URL as needed
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add task");
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetTaskState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetTaskState } = taskSlice.actions;
export default taskSlice.reducer;
