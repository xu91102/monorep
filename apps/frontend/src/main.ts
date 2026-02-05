import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { formatGreeting } from '@monorep/utils';
import { useAppStore } from './stores/app';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// 全局错误处理
app.config.errorHandler = (err, _instance, info) => {
  console.error('Global error:', err, info);
  const appStore = useAppStore();
  appStore.error(err instanceof Error ? err.message : 'An error occurred');
};

// 未捕获 Promise 错误处理
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
  const appStore = useAppStore();
  appStore.error(event.reason?.message || 'An unexpected error occurred');
});

// 测试共享工具函数
console.log(formatGreeting('Frontend App'));

app.mount('#app');
