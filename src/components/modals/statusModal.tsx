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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { useAppDispatch } from "@/redux/store";
import { changeStatusAsync } from "@/redux/todo-slice";

export default function StatusModal({
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
            <DialogTitle>Change Status</DialogTitle>
            <DialogDescription>
              Change Status. Click save changes when you're done.
            </DialogDescription>
          </DialogHeader>
          <TodoStatusForm itemId={id} setOpen={setOpen} />
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
        <TodoStatusForm setOpen={setOpen} itemId={id} className="px-4" />
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

function TodoStatusForm({ setOpen, className, itemId }: TodoFormProps) {
  const defaultStatus = "Pending";
  const [status, setStatus] = React.useState<string>(defaultStatus);

  const dispatch = useAppDispatch();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      changeStatusAsync({
        status,
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
        <Label htmlFor="status">Todo Status</Label>
        <Select onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="InProgress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
}
