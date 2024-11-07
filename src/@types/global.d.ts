
interface BaseEntity { 
  success: boolean, 
  data: any, 
  message: string 
}

interface IUser {
  id?: number
  name?: string;
  email?: string;
  avatar?: string;
  password?: string;
  confirmPassword?: string;
  confirmed?: boolean;
  confirmation_code?: string;
}

interface Actions {
  text: string
  icon: string
  click: () => void
  color: string
}