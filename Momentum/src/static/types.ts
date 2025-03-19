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

export type PostFormData = {
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
