export type Priority = {
  id: number;
  name: string;
  icon: string;
};

export type Status = {
  id: number;
  name: string;
};

export type Department = {
  id: number;
  name: string;
};

export type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: Department;
};

export type TaskFormData = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: Department;
  employee: Employee;
  status: Status;
  priority: Priority;
};
