<template>
  <div :class="cardClass">
    <div v-if="$slots.header || title" class="base-card__header">
      <slot name="header">
        <h3 v-if="title" class="base-card__title">{{ title }}</h3>
      </slot>
    </div>
    <div class="base-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { CardProps } from './types';

  interface Props extends CardProps {}

  const props = withDefaults(defineProps<Props>(), {
    title: '',
    bordered: true,
    shadow: true,
  });

  const cardClass = computed(() => [
    'base-card',
    {
      'base-card--bordered': props.bordered,
      'base-card--shadow': props.shadow,
    },
  ]);
</script>

<style scoped>
  .base-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .base-card--bordered {
    border: 1px solid #e5e7eb;
  }

  .base-card--shadow {
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }

  .base-card:hover {
    transform: translateY(-2px);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .base-card__header {
    padding: 16px 20px;
    border-bottom: 1px solid #f3f4f6;
    background-color: #fafafa;
  }

  .base-card__title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  .base-card__body {
    padding: 20px;
  }

  .base-card__footer {
    padding: 16px 20px;
    border-top: 1px solid #f3f4f6;
    background-color: #fafafa;
  }
</style>
