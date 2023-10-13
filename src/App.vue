<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<template>
  <main class="container-fluid px-0 d-flex flex-column vh-100 overflow-overlay">
    <Navbar />
    
    <router-view></router-view>
  </main>
</template>

<style scoped>
  main {
    overflow: overlay; 
  }
</style>
