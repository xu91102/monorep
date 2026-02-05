import { ref, readonly } from 'vue';
import type { ToastItem } from '../components/types';

const toasts = ref<ToastItem[]>([]);
let toastId = 0;

export function useToast() {
  const addToast = (
    message: string,
    type: ToastItem['type'] = 'info',
    duration: number = 3000,
  ): number => {
    const id = ++toastId;
    toasts.value.push({ id, message, type, duration });

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const success = (message: string, duration?: number) => addToast(message, 'success', duration);
  const error = (message: string, duration?: number) => addToast(message, 'error', duration);
  const warning = (message: string, duration?: number) => addToast(message, 'warning', duration);
  const info = (message: string, duration?: number) => addToast(message, 'info', duration);

  const clearAll = () => {
    toasts.value = [];
  };

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clearAll,
  };
}
