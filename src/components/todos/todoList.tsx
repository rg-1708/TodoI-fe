import React from "react";
import Todo from "./todo";
import { Todo as TodoType } from "@/types/todo.interface";

const TodoList = ({ list }: { list: TodoType[] }) => {
  return (
    <>
      {list.map((todo, index) => (
        <React.Fragment key={index}>
          <Todo
            _id={todo._id}
            title={todo.title}
            description={todo.description}
            status={todo.status}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default TodoList;
