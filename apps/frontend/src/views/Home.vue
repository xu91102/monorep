<template>
  <div class="home">
    <h1>Welcome to Monorepo Frontend</h1>
    <p>This is a Vue 3 application in a pnpm monorepo.</p>
    <div class="features">
      <div class="feature">
        <h3>🚀 Fast Development</h3>
        <p>Hot reload with Vite</p>
      </div>
      <div class="feature">
        <h3>📦 Monorepo</h3>
        <p>Shared packages and dependencies</p>
      </div>
      <div class="feature">
        <h3>🔧 TypeScript</h3>
        <p>Full TypeScript support</p>
      </div>
    </div>
    <button @click="fetchApi" class="api-button"> Test Backend API </button>
    <div v-if="apiResult" class="api-result">
      <h3>API Response:</h3>
      <pre>{{ apiResult }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const apiResult = ref<Record<string, unknown> | null>(null);

  const fetchApi = async () => {
    try {
      const response = await fetch('/api/');
      const data = await response.json();
      apiResult.value = data;
    } catch (_error) {
      apiResult.value = { error: 'Failed to fetch from backend' };
    }
  };
</script>

<style scoped>
  .home {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }

  .feature {
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
  }

  .api-button {
    background: #42b883;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin: 1rem 0;
  }

  .api-button:hover {
    background: #369870;
  }

  .api-result {
    margin-top: 1rem;
    text-align: left;
  }

  .api-result pre {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }
</style>
