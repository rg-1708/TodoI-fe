import * as React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import TodoModal from "../modals/todoModal";
import { getTodosAsync } from "@/redux/todo-slice";
import TodoList from "./todoList";

import { Chart } from "react-google-charts";

const Todos = () => {
  // Double use of Todos, fix later
  const dispatch = useAppDispatch();

  const todos = useSelector((state: RootState) => state.todos.todos);

  const pendingTodos = todos.filter((item) => item.status === "Pending");
  const inProgressTodos = todos.filter((item) => item.status === "InProgress");
  const completedTodos = todos.filter((item) => item.status === "Completed");

  const options = {
    title: "Your statistics",
    pieHole: 0.4,
    is3D: false,
  };

  const data = [
    ["Status", "Number of tasks"],
    ["Pending", pendingTodos.length],
    ["InProgress", inProgressTodos.length],
    ["Completed", completedTodos.length],
  ];

  React.useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <div className="w-full md:h-full flex flex-col items-center justify-center md:items-start md:justify-normal p-6 gap-y-4">
      <h1 className="text-2xl">
        Your <span className="font-bold">Todos</span>
      </h1>

      {todos.length === 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center md:items-start md:justify-normal">
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
          <div className="md:h-full flex flex-wrap items-center justify-center md:items-start md:justify-normal gap-y-4 gap-x-2">
            <TodoList list={pendingTodos} />
            <TodoList list={inProgressTodos} />
            <TodoList list={completedTodos} />
          </div>

          <Chart
            className="w-[300px] md:w-[350px] rounded-xl shadow-lg"
            chartType="PieChart"
            data={data}
            options={options}
            height={"300px"}
          />
        </>
      )}
    </div>
  );
};

export default Todos;
