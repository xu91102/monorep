<template>
  <div class="base-select" :class="selectContainerClass">
    <label v-if="label" class="base-select__label">{{ label }}</label>
    <div class="base-select__wrapper" @click="toggleDropdown">
      <div class="base-select__display">
        <span v-if="displayText" class="base-select__value">{{ displayText }}</span>
        <span v-else class="base-select__placeholder">{{ placeholder }}</span>
      </div>
      <span class="base-select__arrow" :class="{ 'base-select__arrow--open': isOpen }"> v </span>
    </div>
    <Transition name="fade">
      <div v-if="isOpen" class="base-select__dropdown">
        <div
          v-for="option in options"
          :key="option.value"
          class="base-select__option"
          :class="{ 'base-select__option--selected': isSelected(option.value) }"
          @click.stop="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </Transition>
    <span v-if="error" class="base-select__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import type { SelectProps, SelectOption } from './types';

  interface Props extends SelectProps {}

  const props = withDefaults(defineProps<Props>(), {
    placeholder: '请选择',
    disabled: false,
    multiple: false,
    options: () => [],
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string | string[]];
    change: [value: string | string[]];
  }>();

  const isOpen = ref(false);

  const selectContainerClass = computed(() => [
    {
      'base-select--disabled': props.disabled,
      'base-select--error': !!props.error,
      'base-select--open': isOpen.value,
    },
  ]);

  const displayText = computed(() => {
    if (!props.modelValue) return '';
    if (props.multiple && Array.isArray(props.modelValue)) {
      return props.options
        .filter((opt) => props.modelValue && props.modelValue.includes(opt.value))
        .map((opt) => opt.label)
        .join(', ');
    }
    const selected = props.options.find((opt) => opt.value === props.modelValue);
    return selected?.label || '';
  });

  const toggleDropdown = () => {
    if (props.disabled) return;
    isOpen.value = !isOpen.value;
  };

  const isSelected = (value: string) => {
    if (props.multiple && Array.isArray(props.modelValue)) {
      return props.modelValue.includes(value);
    }
    return props.modelValue === value;
  };

  const selectOption = (option: SelectOption) => {
    if (props.multiple) {
      const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
      const index = currentValue.indexOf(option.value);
      if (index > -1) {
        currentValue.splice(index, 1);
      } else {
        currentValue.push(option.value);
      }
      emit('update:modelValue', currentValue);
      emit('change', currentValue);
    } else {
      emit('update:modelValue', option.value);
      emit('change', option.value);
      isOpen.value = false;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.base-select')) {
      isOpen.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<style scoped>
  .base-select {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .base-select__label {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }

  .base-select__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    cursor: pointer;
    background-color: white;
    transition: all 0.2s ease;
  }

  .base-select__wrapper:hover {
    border-color: #42b883;
  }

  .base-select--open .base-select__wrapper {
    border-color: #42b883;
    box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
  }

  .base-select--disabled .base-select__wrapper {
    background-color: #f3f4f6;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .base-select--error .base-select__wrapper {
    border-color: #ef4444;
  }

  .base-select__display {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .base-select__value {
    color: #374151;
    font-size: 14px;
  }

  .base-select__placeholder {
    color: #9ca3af;
    font-size: 14px;
  }

  .base-select__arrow {
    color: #9ca3af;
    transition: transform 0.2s ease;
  }

  .base-select__arrow--open {
    transform: rotate(180deg);
  }

  .base-select__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 4px;
    background-color: white;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
  }

  .base-select__option {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
    color: #374151;
    transition: background-color 0.15s ease;
  }

  .base-select__option:hover {
    background-color: #f3f4f6;
  }

  .base-select__option--selected {
    background-color: #ecfdf5;
    color: #42b883;
  }

  .base-select__error {
    font-size: 12px;
    color: #ef4444;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
