import type { App } from 'vue';
import BaseButton from './components/BaseButton.vue';
import BaseCard from './components/BaseCard.vue';
import BaseModal from './components/BaseModal.vue';
import BaseInput from './components/BaseInput.vue';
import BaseSelect from './components/BaseSelect.vue';
import BaseToast from './components/BaseToast.vue';
import BaseForm from './components/BaseForm.vue';

// 导出所有组件
export { BaseButton, BaseCard, BaseModal, BaseInput, BaseSelect, BaseToast, BaseForm };

// 导出 composables
export { useToast } from './composables/useToast';

// 导出组件类型
export type {
  ButtonProps,
  CardProps,
  ModalProps,
  InputProps,
  SelectProps,
  SelectOption,
  ToastItem,
  FormProps,
  FormRule,
  FormErrors,
} from './components/types';

// 全局注册组件
export default {
  install(app: App) {
    app.component('BaseButton', BaseButton);
    app.component('BaseCard', BaseCard);
    app.component('BaseModal', BaseModal);
    app.component('BaseInput', BaseInput);
    app.component('BaseSelect', BaseSelect);
    app.component('BaseToast', BaseToast);
    app.component('BaseForm', BaseForm);
  },
};
