<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<template>
  <main class="container-fluid px-0 d-flex flex-column vh-100 overlay-scroll">
    <Navbar />
    
    <router-view></router-view>
  </main>
</template>

<style scoped>
  .overlay-scroll {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.9);
  }
</style>
