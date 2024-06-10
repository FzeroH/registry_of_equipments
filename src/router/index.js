import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/pages/MainPage.vue';
import DivisionPage from '@/components/pages/DivisionPage.vue';
import StatusPage from '@/components/pages/StatusPage.vue';
import ResponsiblesPage from '@/components/pages/ResponsiblesPage.vue';
import LoginPage from '@/components/pages/LoginPage.vue';
import UsersPage from '@/components/pages/UsersPage.vue';


const routes = [
    {
        path:'/',
        name: 'login',
        component: LoginPage,
    },
    {
        path:'/main',
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
        path:'/users',
        name: 'type',
        component: UsersPage,
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
  });

  router.beforeEach((to, from, next) => {
    const userId = localStorage.getItem('user_id');

    if (!userId && to.path !== '/') {
        next('/');
    } 
    else if (userId && to.path === '/') {
        next('/main')
    }
    else {
        next();
    }
  })
  
  export default router