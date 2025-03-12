export type TaskFormData = {
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  department: string;
  employeeImage: File | null;
};
