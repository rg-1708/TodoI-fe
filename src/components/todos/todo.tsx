import { Todo as TodoProps } from "@/types/todo.interface";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { CheckCircle, Edit, Trash } from "lucide-react";
import StatusModal from "../modals/statusModal";
import DeleteTodoModal from "../modals/deleteTodoModal";
import TodoEditModal from "../modals/todoEditModal";
import { cn } from "@/lib/utils";

const Todo: React.FC<TodoProps> = ({ _id, title, description, status }) => {
  return (
    <Card className="w-[300px] md:w-[350px] shadow-md">
      <CardHeader>
        <CardTitle
          className={cn(
            "font-bold",
            status === "InProgress" && "text-indigo-400",
            status === "Completed" && "text-green-400"
          )}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden text-ellipsis break-words">
        {description}
      </CardContent>
      <CardFooter>
        <p
          className={cn(
            "italic",
            status === "InProgress" && "text-indigo-400",
            status === "Completed" && "text-green-400"
          )}
        >
          {status}
        </p>
        <TodoEditModal initialData={{ title, description }} id={_id}>
          <Button variant="secondary" size="icon" className="h-4 w-4 ml-auto">
            <Edit size={14} />
          </Button>
        </TodoEditModal>
        <StatusModal id={_id}>
          <Button
            variant="secondary"
            size="icon"
            className="h-4 w-4 ml-2 text-green-600"
          >
            <CheckCircle size={14} />
          </Button>
        </StatusModal>
        <DeleteTodoModal id={_id}>
          <Button
            variant="secondary"
            size="icon"
            className="h-4 w-4 ml-2 text-red-600"
          >
            <Trash size={14} />
          </Button>
        </DeleteTodoModal>
      </CardFooter>
    </Card>
  );
};

export default Todo;
