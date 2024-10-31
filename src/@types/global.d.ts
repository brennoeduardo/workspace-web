
interface BaseEntity { 
  success: boolean, 
  data: any, 
  message: string 
}

interface User {
  name?: string;
  email?: string;
  password?: string;
  confirmed?: boolean;
  confirmation_code?: string;
}