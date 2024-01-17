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

import { useAppDispatch } from "@/redux/store";
import { deleteAsync } from "@/redux/todo-slice";

export default function DeleteTodoModal({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete ToDo</DialogTitle>
            <DialogDescription>
              Delete Todo. Click delete{" "}
              <span className="font-semibold">only if you are sure.</span>
            </DialogDescription>
          </DialogHeader>
          <DeleteTodoForm itemId={id} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Delete ToDo</DrawerTitle>
          <DrawerDescription>
            Delete Todo. Click delete{" "}
            <span className="font-semibold">only if you are sure.</span>
          </DrawerDescription>
        </DrawerHeader>
        <DeleteTodoForm setOpen={setOpen} itemId={id} className="px-4" />
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
}

function DeleteTodoForm({ setOpen, className, itemId }: TodoFormProps) {
  const dispatch = useAppDispatch();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      deleteAsync({
        id: itemId,
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
        <span className="text-xs text-red-400">Deleting can't be reversed</span>
      </div>
      <Button type="submit">Delete ToDo</Button>
    </form>
  );
}
