export interface Todo {
  id: number;
  title: string;
  description: string;
  status: "Completed" | "InProgress" | "Pending";
}
