import { get, post } from './http';

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

// 健康检查
export const checkHealth = () => get<HealthResponse>('/health');

// 用户相关
export const login = (params: LoginParams) => post<LoginResponse>('/auth/login', params);
export const logout = () => post('/auth/logout');
export const getUserInfo = () => get<UserInfo>('/user/info');
