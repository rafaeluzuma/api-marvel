import { createRouter, createWebHistory } from 'vue-router';

import Home from '../src/pages/Home.vue'
import Characters from '../src/pages/Characters.vue'
import CharecterDetails from '../src/pages/CharacterDetails.vue'
import Comics from '../src/pages/Comics.vue'
import Events from '../src/pages/Events.vue'
import Contact from '../src/pages/Contact.vue'

const routes = [
  { 
    path: '/', 
    component: Home,
    name: 'home',
    meta: {
      breadcrumb: [{ name: 'Inicio' }]
    }
  },
  { 
    path: '/characters',
    name: 'characters', 
    component: Characters,
  },
  {
    path: '/characters/:charactecId',
    component: CharecterDetails,
    name: 'charactersDetails', 
    props: true
  },
  { 
    path: '/comics',
    name: 'comics', 
    component: Comics,
  },
  { 
    path: '/events',
    name: 'events', 
    component: Events,
  },
  { 
    path: '/contact',
    name: 'contact', 
    component: Contact,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
