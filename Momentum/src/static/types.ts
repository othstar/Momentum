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
  name: string;
  surname: string;
  avatar: any;
  department_id: number | string;
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
