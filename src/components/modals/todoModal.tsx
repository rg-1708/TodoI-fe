import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addTodoAsync } from "@/redux/todo-slice";
import { useAppDispatch } from "@/redux/store";

export default function TodoModal() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add ToDo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add todo</DialogTitle>
            <DialogDescription>
              Add your new ToDo. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <TodoForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add ToDo</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add ToDo</DrawerTitle>
          <DrawerDescription>
            Add your new ToDo. Click create when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <TodoForm setOpen={setOpen} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface TodoFormProps extends React.ComponentProps<"form"> {
  setOpen(condition: boolean): void;
}

function TodoForm({ setOpen, className }: TodoFormProps) {
  const defaultTitle = "New todo";
  const defaultDescription = "Do a backflip";

  const [name, setName] = React.useState<string>(defaultTitle);
  const [description, setDescription] =
    React.useState<string>(defaultDescription);

  const dispatch = useAppDispatch();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addTodoAsync({
        title: name,
        description: description,
      })
    );
    setOpen(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Todo Title</Label>
        <Input
          type="text"
          id="title"
          defaultValue={defaultTitle}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Todo Description</Label>
        <Input
          type="text"
          id="description"
          defaultValue={defaultDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
}
