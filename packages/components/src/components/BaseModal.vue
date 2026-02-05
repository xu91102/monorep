<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-container" @click.stop>
          <div v-if="title || closable" class="modal-header">
            <h3 v-if="title" class="modal-title">{{ title }}</h3>
            <button v-if="closable" class="modal-close" @click="handleClose"> × </button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
  import type { ModalProps } from './types';

  interface Props extends ModalProps {}

  const props = withDefaults(defineProps<Props>(), {
    visible: false,
    title: '',
    closable: true,
    maskClosable: true,
  });

  const emit = defineEmits<{
    'update:visible': [visible: boolean];
    close: [];
  }>();

  const handleOverlayClick = () => {
    if (props.maskClosable) {
      handleClose();
    }
  };

  const handleClose = () => {
    emit('update:visible', false);
    emit('close');
  };
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-container {
    background: white;
    border-radius: 8px;
    max-width: 90vw;
    max-height: 90vh;
    width: 500px;
    overflow: hidden;
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e5e7eb;
  }

  .modal-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  .modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6b7280;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-close:hover {
    color: #374151;
  }

  .modal-body {
    padding: 20px;
    max-height: 60vh;
    overflow-y: auto;
  }

  .modal-footer {
    padding: 16px 20px;
    border-top: 1px solid #e5e7eb;
    background-color: #f9fafb;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  /* 动画效果 */
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }

  .modal-enter-active .modal-container,
  .modal-leave-active .modal-container {
    transition: transform 0.3s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    transform: scale(0.9);
  }
</style>
