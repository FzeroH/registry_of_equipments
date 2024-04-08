import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue';


const routes = [
    {
        path:'/',
        name: 'main',
        component: MainPage,
    },
    {
        path: '/:catchall(.*)',
        redirect: '/',
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  export default router