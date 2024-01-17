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

const Todo: React.FC<TodoProps> = ({ _id, title, description, status }) => {
  return (
    <Card className="w-[300px] h-[200px] md:w-[350px] md:h-[200px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter>
        <p>{status}</p>
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
