export const endpoints = {
  getEmployees: "/employees",
  createEmployee: "/employees",
  updateEmployee: (id: number) => `/employees/${id}`,
  deleteEmployee: (id: number) => `/employees/${id}`,
};
