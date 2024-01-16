import * as React from "react";

import Todo from "./todo";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Todos = () => {
  // Double use of Todos, fix later
  const todos = useSelector((state: RootState) => state.todos.todos);

  return (
    <div className="w-full h-full flex flex-col items-start justify-start mr-auto p-6">
      <h1 className="text-2xl">
        Your <span className="font-bold">Todos</span>
      </h1>

      <div className="mt-4 flex flex-wrap h-full gap-4 items-center">
        {todos.map((todo, index) => (
          <React.Fragment key={index}>
            <Todo
              id={todo.id}
              title={todo.title}
              description={todo.description}
              // @ts-ignore
              status={todo.status}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Todos;
