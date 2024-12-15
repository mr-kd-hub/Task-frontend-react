export interface IFormFields {
  title?: string;
  description?: string;
  status: string; // enum ["To Do", "In Progress", "Done"]  or use a dropdown for better user experience
  dueDate: any
}

export interface IUserFormFields {
  email: string;
  password: string;
}

