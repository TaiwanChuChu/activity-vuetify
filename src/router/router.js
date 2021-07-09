import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Activity from "@/components/Activity/Activity";
import Login from "@/components/Login";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: HelloWorld,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/activity',
            name: 'activity',
            component: Activity,
            meta: {
                requireAuth: true
            },
        }
    ]
});