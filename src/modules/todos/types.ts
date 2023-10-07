export interface Todo {
  id: string;
  createdAt: string;
  completedAt: string | null;
  dueDate: string | null;
  title: string;
}
