// Перечисление ролей пользователя - должно соответствовать Prisma схеме
export enum UserRole {
  CITIZEN = 'CITIZEN',
  REPRESENTATIVE = 'REPRESENTATIVE',
  ADMIN = 'ADMIN'
}

// Базовый интерфейс пользователя
export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string | null;
  district: string | null;
  address: string | null;
  role: UserRole;
  avatarUrl: string | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Интерфейс для регистрации пользователя
export interface RegisterUserInput {
  email: string;
  password: string;
  fullName: string;
  phone?: string | null;
  district?: string | null;
  address?: string | null;
  role?: UserRole;
}

// Интерфейс для входа пользователя
export interface LoginUserInput {
  email: string;
  password: string;
}

// Интерфейс для сброса пароля
export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}

// Интерфейс для забытого пароля
export interface ForgotPasswordInput {
  email: string;
}

// Безопасный пользователь (без пароля)
export type SafeUser = Omit<User, 'password'>;

// Ответ с токеном
export interface AuthResponse {
  user: SafeUser;
  token: string;
} 