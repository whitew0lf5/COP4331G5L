import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Sets from '../views/Sets.vue';
import Cards from '../views/Cards.vue';
import Verify from '../views/Verify.vue';
import Reset from '../views/Reset.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/sets',
        name: 'Sets',
        component: Sets,
    },
    {
        path: '/cards',
        name: 'Cards',
        component: Cards,
    },
    {
        path: '/verify',
        name: 'Verify',
        component: Verify,
    },
    {
        path: '/reset',
        name: 'Reset',
        component: Reset,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
