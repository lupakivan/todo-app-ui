import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import * as todoAPI from './todoAPI';
import { Task } from './types'

export interface TodoState {
  value: {
    active: Task[],
    done: Task[],
  };
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TodoState = {
  value: {
    active: [],
    done: [],
  },
  status: 'idle',
};

export const fetchAllTasks = createAsyncThunk(
  'todo/fetch',
  async (search: string) => todoAPI.getAllTasks(search)
);

export const updateTaskStatus = createAsyncThunk(
    'todo/done',
    async ({ id, isDone }: { id: string, isDone: boolean }) => todoAPI.updateTask(id, { isDone })
);

export const createTask = createAsyncThunk(
    'todo/add',
    async (title: string) => todoAPI.createTask(title)
);

export const deleteAllTasks = createAsyncThunk(
    'todo/deleteAll',
    async () => todoAPI.deleteAllTasks()
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value.active = action.payload.filter((todo) => !todo.isDone)
        state.value.done = action.payload.filter((todo) => todo.isDone).slice(0, 10)
      })
      .addCase(fetchAllTasks.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateTaskStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.status = 'idle';

        if(action.payload.isDone) {
          state.value.active = state.value.active.filter((todo) => todo.id !== action.payload.id)
          state.value.done = [action.payload, ...state.value.done]
        } else {
          state.value.done = state.value.done.filter((todo) => todo.id !== action.payload.id)
          state.value.active = [action.payload, ...state.value.active]
        }
      })
      .addCase(updateTaskStatus.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value.active.push(action.payload)
      })
      .addCase(createTask.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteAllTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAllTasks.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value.active = [];
        state.value.done = [];
      })
      .addCase(deleteAllTasks.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectTodo = (state: RootState) => state.todo.value;

export default todoSlice.reducer;
