export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export interface CardProps {
  title?: string;
  bordered?: boolean;
  shadow?: boolean;
}

export interface ModalProps {
  visible?: boolean;
  title?: string;
  closable?: boolean;
  maskClosable?: boolean;
}

export interface InputProps {
  modelValue?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  error?: string;
  maxlength?: number;
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  modelValue?: string | string[];
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  label?: string;
  error?: string;
}

export interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}

export interface FormRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  message?: string;
  validator?: (value: unknown) => boolean | string;
}

export interface FormProps {
  model?: Record<string, unknown>;
  rules?: Record<string, FormRule[]>;
}

export type FormErrors = Record<string, string>;
