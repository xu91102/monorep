<template>
  <button :class="buttonClass" :disabled="disabled || loading" @click="handleClick">
    <span v-if="loading" class="loading-icon">⟳</span>
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { ButtonProps } from './types';

  const props = withDefaults(defineProps<ButtonProps>(), {
    type: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
  });

  const emit = defineEmits<{
    click: [event: MouseEvent];
  }>();

  const buttonClass = computed(() => [
    'base-button',
    `base-button--${props.type}`,
    `base-button--${props.size}`,
    {
      'base-button--disabled': props.disabled,
      'base-button--loading': props.loading,
    },
  ]);

  const handleClick = (event: MouseEvent) => {
    if (!props.disabled && !props.loading) {
      emit('click', event);
    }
  };
</script>

<style scoped>
  .base-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    outline: none;
  }

  .base-button:hover {
    transform: translateY(-1px);
  }

  .base-button--small {
    padding: 6px 12px;
    font-size: 12px;
  }

  .base-button--medium {
    padding: 8px 16px;
    font-size: 14px;
  }

  .base-button--large {
    padding: 12px 24px;
    font-size: 16px;
  }

  .base-button--primary {
    background-color: #42b883;
    color: white;
  }

  .base-button--primary:hover {
    background-color: #369870;
  }

  .base-button--secondary {
    background-color: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
  }

  .base-button--secondary:hover {
    background-color: #e5e7eb;
  }

  .base-button--danger {
    background-color: #ef4444;
    color: white;
  }

  .base-button--danger:hover {
    background-color: #dc2626;
  }

  .base-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .base-button--loading {
    cursor: wait;
  }

  .loading-icon {
    margin-right: 8px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
