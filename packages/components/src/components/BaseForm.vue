<template>
  <form class="base-form" @submit.prevent="handleSubmit">
    <slot :errors="errors" :validate="validate" :reset-fields="resetFields" />
  </form>
</template>

<script setup lang="ts">
  import { ref, provide } from 'vue';
  import type { FormProps, FormErrors } from './types';

  interface Props extends FormProps {}

  const props = defineProps<Props>();

  const emit = defineEmits<{
    submit: [values: Record<string, unknown>];
    validateFail: [errors: FormErrors];
  }>();

  const errors = ref<FormErrors>({});

  const validateField = (field: string, value: unknown): string | null => {
    const fieldRules = props.rules?.[field];
    if (!fieldRules) return null;

    for (const rule of fieldRules) {
      if (rule.required && (value === undefined || value === null || value === '')) {
        return rule.message || `${field} is required`;
      }
      if (rule.min !== undefined && typeof value === 'string' && value.length < rule.min) {
        return rule.message || `${field} must be at least ${rule.min} characters`;
      }
      if (rule.max !== undefined && typeof value === 'string' && value.length > rule.max) {
        return rule.message || `${field} must be at most ${rule.max} characters`;
      }
      if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        return rule.message || `${field} is invalid`;
      }
      if (rule.validator) {
        const result = rule.validator(value);
        if (result !== true && typeof result === 'string') {
          return result;
        }
      }
    }
    return null;
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (props.model && props.rules) {
      for (const field in props.rules) {
        const error = validateField(field, props.model[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    }

    errors.value = newErrors;
    return isValid;
  };

  const resetFields = () => {
    errors.value = {};
  };

  const handleSubmit = () => {
    if (validate()) {
      emit('submit', props.model || {});
    } else {
      emit('validateFail', errors.value);
    }
  };

  provide('form', {
    errors,
    validateField,
  });

  defineExpose({
    validate,
    resetFields,
    errors,
  });
</script>

<style scoped>
  .base-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
