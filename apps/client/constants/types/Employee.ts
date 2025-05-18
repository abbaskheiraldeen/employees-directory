export type EmployeeDto = {
  firstName: string;
  lastName: string;
  email: string;
  department: DepartmentType;
  title: TitleType;
  location: string;
  avatarUrl?: string;
};

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: DepartmentType;
  title: TitleType;
  location: string;
  avatarUrl?: string;
  createdAt?: string;
};

export enum DepartmentType {
  Sales = "Sales",
  HR = "HR",
  Development = "Development",
  Marketing = "Marketing",
  IT = "IT",
}

export enum TitleType {
  Manager = "Manager",
  Director = "Director",
  Engineer = "Engineer",
  Designer = "Designer",
  Developer = "Developer",
}
