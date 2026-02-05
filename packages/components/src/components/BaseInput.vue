<template>
  <div class="base-input" :class="inputContainerClass">
    <label v-if="label" class="base-input__label">{{ label }}</label>
    <div class="base-input__wrapper">
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        class="base-input__field"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-if="clearable && modelValue" class="base-input__clear" @click="handleClear"> x </span>
    </div>
    <span v-if="error" class="base-input__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { InputProps } from './types';

  interface Props extends InputProps {}

  const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    size: 'medium',
    disabled: false,
    readonly: false,
    clearable: false,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
    clear: [];
  }>();

  const inputContainerClass = computed(() => [
    `base-input--${props.size}`,
    {
      'base-input--disabled': props.disabled,
      'base-input--error': !!props.error,
    },
  ]);

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  };

  const handleFocus = (event: FocusEvent) => {
    emit('focus', event);
  };

  const handleBlur = (event: FocusEvent) => {
    emit('blur', event);
  };

  const handleClear = () => {
    emit('update:modelValue', '');
    emit('clear');
  };
</script>

<style scoped>
  .base-input {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .base-input__label {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }

  .base-input__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .base-input__field {
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .base-input__field:focus {
    border-color: #42b883;
    box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
  }

  .base-input--small .base-input__field {
    padding: 6px 10px;
    font-size: 12px;
  }

  .base-input--medium .base-input__field {
    padding: 8px 12px;
    font-size: 14px;
  }

  .base-input--large .base-input__field {
    padding: 10px 14px;
    font-size: 16px;
  }

  .base-input--disabled .base-input__field {
    background-color: #f3f4f6;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .base-input--error .base-input__field {
    border-color: #ef4444;
  }

  .base-input--error .base-input__field:focus {
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
  }

  .base-input__error {
    font-size: 12px;
    color: #ef4444;
  }

  .base-input__clear {
    position: absolute;
    right: 10px;
    cursor: pointer;
    color: #9ca3af;
    font-size: 14px;
    line-height: 1;
  }

  .base-input__clear:hover {
    color: #6b7280;
  }
</style>
