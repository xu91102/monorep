import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export const useAppStore = defineStore('app', () => {
  const loading = ref(false);
  const toasts = ref<ToastItem[]>([]);
  let toastId = 0;

  const isLoading = computed(() => loading.value);

  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  const showToast = (message: string, type: ToastItem['type'] = 'info', duration = 3000) => {
    const id = ++toastId;
    toasts.value.push({ id, message, type });

    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }

    return id;
  };

  const hideToast = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const success = (message: string, duration?: number) => showToast(message, 'success', duration);
  const error = (message: string, duration?: number) => showToast(message, 'error', duration);
  const warning = (message: string, duration?: number) => showToast(message, 'warning', duration);
  const info = (message: string, duration?: number) => showToast(message, 'info', duration);

  return {
    loading,
    toasts,
    isLoading,
    setLoading,
    showToast,
    hideToast,
    success,
    error,
    warning,
    info,
  };
});
