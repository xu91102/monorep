<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="base-toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="base-toast"
        :class="`base-toast--${toast.type}`"
      >
        <span class="base-toast__icon">{{ iconMap[toast.type] }}</span>
        <span class="base-toast__message">{{ toast.message }}</span>
        <span class="base-toast__close" @click="removeToast(toast.id)">x</span>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
  import { useToast } from '../composables/useToast';
  import type { ToastItem } from './types';

  const { toasts, removeToast } = useToast();

  const iconMap: Record<ToastItem['type'], string> = {
    success: 'O',
    error: 'X',
    warning: '!',
    info: 'i',
  };
</script>

<style scoped>
  .base-toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .base-toast {
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

  .base-toast--success {
    border-left: 4px solid #10b981;
  }

  .base-toast--success .base-toast__icon {
    color: #10b981;
  }

  .base-toast--error {
    border-left: 4px solid #ef4444;
  }

  .base-toast--error .base-toast__icon {
    color: #ef4444;
  }

  .base-toast--warning {
    border-left: 4px solid #f59e0b;
  }

  .base-toast--warning .base-toast__icon {
    color: #f59e0b;
  }

  .base-toast--info {
    border-left: 4px solid #3b82f6;
  }

  .base-toast--info .base-toast__icon {
    color: #3b82f6;
  }

  .base-toast__icon {
    font-weight: bold;
    font-size: 16px;
  }

  .base-toast__message {
    flex: 1;
    font-size: 14px;
    color: #374151;
  }

  .base-toast__close {
    cursor: pointer;
    color: #9ca3af;
    font-size: 14px;
  }

  .base-toast__close:hover {
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
