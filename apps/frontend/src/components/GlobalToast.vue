<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="global-toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="global-toast"
        :class="`global-toast--${toast.type}`"
      >
        <span class="global-toast__icon">{{ iconMap[toast.type] }}</span>
        <span class="global-toast__message">{{ toast.message }}</span>
        <span class="global-toast__close" @click="hideToast(toast.id)">x</span>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
  import { useAppStore, type ToastItem } from '../stores/app';
  import { storeToRefs } from 'pinia';

  const appStore = useAppStore();
  const { toasts } = storeToRefs(appStore);
  const { hideToast } = appStore;

  const iconMap: Record<ToastItem['type'], string> = {
    success: 'O',
    error: 'X',
    warning: '!',
    info: 'i',
  };
</script>

<style scoped>
  .global-toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .global-toast {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 6px;
    background-color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 280px;
    max-width: 400px;
  }

  .global-toast--success {
    border-left: 4px solid #10b981;
  }

  .global-toast--success .global-toast__icon {
    color: #10b981;
  }

  .global-toast--error {
    border-left: 4px solid #ef4444;
  }

  .global-toast--error .global-toast__icon {
    color: #ef4444;
  }

  .global-toast--warning {
    border-left: 4px solid #f59e0b;
  }

  .global-toast--warning .global-toast__icon {
    color: #f59e0b;
  }

  .global-toast--info {
    border-left: 4px solid #3b82f6;
  }

  .global-toast--info .global-toast__icon {
    color: #3b82f6;
  }

  .global-toast__icon {
    font-weight: bold;
    font-size: 16px;
  }

  .global-toast__message {
    flex: 1;
    font-size: 14px;
    color: #374151;
  }

  .global-toast__close {
    cursor: pointer;
    color: #9ca3af;
    font-size: 14px;
  }

  .global-toast__close:hover {
    color: #6b7280;
  }

  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }

  .toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }

  .toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
</style>
