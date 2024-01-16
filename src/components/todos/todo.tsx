import { Todo as TodoProps } from "@/types/todo.interface";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";
import StatusModal from "../modals/statusModal";

const Todo: React.FC<TodoProps> = ({ id, title, description, status }) => {
  return (
    <Card className="w-[350px] h-[200px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter>
        <p>{status}</p>
        <StatusModal id={id}>
          <Button variant="secondary" size="icon" className="h-4 w-4 ml-auto">
            <Edit size={14} />
          </Button>
        </StatusModal>
        <Button
          variant="secondary"
          size="icon"
          className="h-4 w-4 ml-2 text-red-600"
        >
          <Trash size={14} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Todo;
