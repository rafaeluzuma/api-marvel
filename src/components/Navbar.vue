<script lang="ts">
  import { defineComponent } from 'vue'
  import Logo from '../assets/svg/logo.svg'
  import * as bootstrap from 'bootstrap';

  export default defineComponent({
      name: 'Navbar',
      components: {
        Logo: Logo as any,
      },
      data() {
          return {};
      },
      methods: {
        isActive(routeName: string): Boolean {
          return this.$route.name === routeName;
        },
        handleToggler(action = 'show'){
          const myCollapse = document.getElementById('navbarSupportedContent')
          if (window.innerWidth < 992) {
            switch (action) {
              case 'show':
                new bootstrap.Collapse(myCollapse || '', { toggle: true })
                break;
              case 'hide':
                const collapseInstance = new bootstrap.Collapse(myCollapse || '', { toggle: false })
                collapseInstance.hide()
                break;
              default:
                new bootstrap.Collapse(myCollapse || '')
            }
          }
        },
      },
  });
</script>

<template>
  <nav class="navbar navbar-expand-lg custom-navbar fixed-top py-3 px-0" v-cloak>
    <div class="container-xxl d-flex gap-3 px-lg-1">
      
      <router-link to="/" class="text-decoration-none text-white text-uppercase" @click="handleToggler('hide')">
        <Logo />
      </router-link>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        @click="handleToggler('toggler')" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"><span></span></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent" @click="handleToggler('hide')">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3 gap-3">
          <li class="nav-item">
            <router-link 
              to="/" 
              class="text-decoration-none text-white text-uppercase fw-normal fs-5 position-relative" 
              :class="{ active: isActive('home') }"
            >
              Início
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/characters" 
              class="text-decoration-none text-white text-uppercase fw-normal fs-5 position-relative"
              :class="{ active: isActive('characters') || isActive('charactersDetails') }"
            >
              Personagens
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/comics" 
              class="text-decoration-none text-white text-uppercase fw-normal fs-5 position-relative" 
              :class="{ active: isActive('comics') }"
            >
              Quadrinhos
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/events" 
              class="text-decoration-none text-white text-uppercase fw-normal fs-5 position-relative"
              :class="{ active: isActive('events') }"
            >
              Eventos
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/contact" 
              class="text-decoration-none text-white text-uppercase fw-normal fs-5 position-relative" 
              :class="{ active: isActive('contact') }"
            >
              Contato
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  .custom-navbar {
    background-color: #EC1D24;
  }

  @media (min-width: 992px) {
    .active::after {
      content: "";
      display: block;
      height: 8px;
      background-color: white;
      position: absolute;
      bottom: -26px;
      left: 0;
      right: 0;
    }
  }
</style>
