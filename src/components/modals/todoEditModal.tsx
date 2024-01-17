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
import { Label } from "@/components/ui/label";

import { Input } from "../ui/input";
import { useAppDispatch } from "@/redux/store";
import { changeTitleDescAsync } from "@/redux/todo-slice";

export default function TodoEditModal({
  id,
  children,
  initialData,
}: {
  id: string;
  children: React.ReactNode;
  initialData: { title: string; description: string };
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Status</DialogTitle>
            <DialogDescription>
              Change Status. Click save changes when you're done.
            </DialogDescription>
          </DialogHeader>
          <TodoForm initialData={initialData} itemId={id} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Change Status</DrawerTitle>
          <DrawerDescription>
            Change Status. Click save changes when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <TodoForm
          initialData={initialData}
          setOpen={setOpen}
          itemId={id}
          className="px-4"
        />
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
  itemId: string;
  setOpen(condition: boolean): void;
  initialData: { title: string; description: string };
}

function TodoForm({ setOpen, className, itemId, initialData }: TodoFormProps) {
  const defaultTitle = initialData.title;
  const defaultDescription = initialData.description;

  const [name, setName] = React.useState<string>(defaultTitle);
  const [description, setDescription] =
    React.useState<string>(defaultDescription);

  const dispatch = useAppDispatch();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      changeTitleDescAsync({
        id: itemId,
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
