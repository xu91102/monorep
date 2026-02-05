<template>
  <div id="app">
    <header>
      <h1>{{ title }}</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <GlobalToast />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { formatGreeting } from '@monorep/utils';
  import GlobalToast from './components/GlobalToast.vue';

  const title = ref(formatGreeting('Monorepo Frontend'));
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  header {
    margin-bottom: 2rem;
  }

  nav {
    padding: 1rem;
  }

  nav a {
    margin: 0 1rem;
    text-decoration: none;
    color: #42b883;
  }

  nav a.router-link-active {
    color: #35495e;
  }
</style>
