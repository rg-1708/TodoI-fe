import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../types/todo.interface";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await fetch("http://localhost:3001/api/v1/todos");
    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);
export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async ({ title, description }: { title: string; description: string }) => {
    const response = await fetch("http://localhost:3001/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
  }
);

export const changeStatusAsync = createAsyncThunk(
  "todos/changeStatusAsync",
  async ({ id, status }: { id: string; status: string }) => {
    const response = await fetch(`http://localhost:3001/api/v1/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    });

    if (response.ok) {
      const todo = await response.json();
      return { _id: todo._id, status: todo.status };
    }
  }
);
export const changeTitleDescAsync = createAsyncThunk(
  "todos/changeTitleDescAsync",
  async ({
    id,
    title,
    description,
  }: {
    id: string;
    title: string;
    description: string;
  }) => {
    const response = await fetch(`http://localhost:3001/api/v1/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });

    if (response.ok) {
      const todo = await response.json();
      return {
        _id: todo._id,
        title: todo.title,
        description: todo.description,
      };
    }
  }
);

export const deleteAsync = createAsyncThunk(
  "todos/deleteAsync",
  async ({ id }: { id: string }) => {
    const response = await fetch(`http://localhost:3001/api/v1/todos/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const todo = await response.json();

      return {
        _id: todo._id,
      };
    }
  }
);

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        title: action.payload.title,
        description: action.payload.description,
        status: "Pending",
      } as Todo;

      state.todos.push(newTodo);
    },
    changeStatus: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo._id === action.payload.id
      );
      state.todos[index].status = action.payload.status;
    },
    editTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo._id === action.payload.id
      );
      state.todos[index] = {
        ...state.todos[index],
        title: action.payload.title,
        description: action.payload.description,
      };
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo._id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.fulfilled, (state, { payload }) => {
      state.todos = payload?.todos;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, { payload }) => {
      state.todos.push(payload?.todo);
    });
    builder.addCase(changeStatusAsync.fulfilled, (state, { payload }) => {
      const index = state.todos.findIndex((todo) => todo._id === payload?._id);
      state.todos[index].status = payload?.status;
    });
    builder.addCase(changeTitleDescAsync.fulfilled, (state, { payload }) => {
      const index = state.todos.findIndex((todo) => todo._id === payload?._id);
      state.todos[index].title = payload?.title;
      state.todos[index].description = payload?.description;
    });
    builder.addCase(deleteAsync.fulfilled, (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo._id !== payload?._id);
    });
  },
});

export const { addTodo, changeStatus, deleteTodo, editTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
