import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { login as loginApi, logout as logoutApi, getUserInfo } from '../services/api';
import type { LoginParams, UserInfo } from '../services/api';
import { useAppStore } from './app';

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const user = ref<UserInfo | null>(null);

  const isLoggedIn = computed(() => !!token.value);

  const setToken = (newToken: string | null) => {
    token.value = newToken;
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  const setUser = (newUser: UserInfo | null) => {
    user.value = newUser;
  };

  const login = async (params: LoginParams) => {
    const appStore = useAppStore();
    appStore.setLoading(true);

    try {
      const response = await loginApi(params);
      const { token: newToken, user: userData } = response.data.data!;
      setToken(newToken);
      setUser(userData);
      appStore.success('Login successful');
      return true;
    } catch {
      return false;
    } finally {
      appStore.setLoading(false);
    }
  };

  const logout = async () => {
    const appStore = useAppStore();

    try {
      await logoutApi();
    } finally {
      setToken(null);
      setUser(null);
      appStore.info('Logged out');
    }
  };

  const fetchUser = async () => {
    if (!token.value) return;

    try {
      const response = await getUserInfo();
      setUser(response.data.data!);
    } catch {
      setToken(null);
      setUser(null);
    }
  };

  return {
    token,
    user,
    isLoggedIn,
    setToken,
    setUser,
    login,
    logout,
    fetchUser,
  };
});
