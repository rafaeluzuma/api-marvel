<script setup lang="ts">
    import LogoBase from '../assets/svg/logo-gray.svg'
</script>

<template>
    <div class="container-xxl d-flex flex-column flex-fill justify-content-center align-items-center gap-2">
        <LogoBase />
        
        <p class="text-home">Welcome to Marvel's directory</p>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    .text-home {
        font-family: Roboto, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 34px;
        letter-spacing: 0px;
        text-align: center;
        text-transform: uppercase;
    }

    @media (min-width: 576px) {
        .text-home {
           font-size: 32px; 
        }
    }    
</style>