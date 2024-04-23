import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/pages/MainPage.vue';
import DivisionPage from '@/components/pages/DivisionPage.vue';
import StatusPage from '@/components/pages/StatusPage.vue';
import TypesPage from '@/components/pages/TypesPage.vue';
import ResponsiblesPage from '@/components/pages/ResponsiblesPage.vue';


const routes = [
    {
        path:'/',
        name: 'main',
        component: MainPage,
    },
    {
        path:'/division',
        name: 'division',
        component: DivisionPage,
    },
    {
        path:'/responsibles',
        name: 'responsibles',
        component: ResponsiblesPage,
    },
    {
        path:'/type',
        name: 'type',
        component: TypesPage,
    },
    {
        path:'/status',
        name: 'status',
        component: StatusPage,
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