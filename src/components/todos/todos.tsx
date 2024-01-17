import * as React from "react";

import Todo from "./todo";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import TodoModal from "../modals/todoModal";
import { getTodosAsync } from "@/redux/todo-slice";

const Todos = () => {
  // Double use of Todos, fix later
  const dispatch = useAppDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  React.useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <div className="w-full md:h-full flex flex-col items-start justify-start  p-6 gap-y-4">
      <h1 className="text-2xl">
        Your <span className="font-bold">Todos</span>
      </h1>

      {todos.length === 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img
            loading="lazy"
            src="./assets/empty.svg"
            className="w-32 h-32 md:w-64 md:h-64 object-cover opacity-50 sepia"
          />
          <h1 className="text-lg md:text-2xl text-secondary mb-6">
            Your list is empty, add new{" "}
            <span className="font-semibold">
              To<span className="text-indigo-400">Do</span>
            </span>
          </h1>
          <TodoModal />
        </div>
      )}
      {todos.length > 0 && (
        <>
          <TodoModal />
          <div className="md:h-full flex md:flex-wrap flex-col md:flex-row gap-4 items-start justify-center">
            {todos.map((todo, index) => (
              <React.Fragment key={index}>
                <Todo
                  _id={todo._id}
                  title={todo.title}
                  description={todo.description}
                  status={todo.status}
                />
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Todos;
