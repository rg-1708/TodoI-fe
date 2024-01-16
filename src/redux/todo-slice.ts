import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types/todo.interface";

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [
    {
      id: 1,
      title: "todo1",
      description: "do a barrel roll",
      status: "Completed",
    },
    {
      id: 2,
      title: "todo2",
      description: "do a backflip",
      status: "Pending",
    },
    {
      id: 3,
      title: "todo3",
      description: "play bohemian rhapsody",
      status: "InProgress",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        status: "Pending",
      } as Todo;

      state.todos.push(newTodo);
    },
    changeStatus: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index].status = action.payload.status;
    },
  },
});

export const { addTodo, changeStatus } = todoSlice.actions;

export default todoSlice.reducer;
