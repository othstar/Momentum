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
  avatar: any;
  department_id: number | string;
};

export type PostComments = {
  id: number;
  text: string;
  task_id: number;
  parent_id: number;
};

export type PostFormData = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status_id: number;
  employee_id: number;
  priority_id: number;
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
