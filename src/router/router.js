import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Activity from "@/components/Activity/Activity";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Home from "@/components/Home";
import User from "@/components/User";
import NotFund from "@/components/NotFund";
import router from '../router/router'
import Helper from '../helper'
// import store from 'vuex'
// import store from '../store'

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
            beforeEnter: (to, from, next) => {
                // 如果有登入，直接就把使用者導往Home頁面
                Helper.methods.isLogin().then(status => {
                    if(status) {
                        return router.push({name: 'Home'}).catch(() => {})
                    }
                    next()
                })
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                requireAuth: true
            },
            // beforeEnter: (to, from, next) => {
            //     Helper.methods.isLogin().then(status => {
            //         if(status) {
            //             return next()
            //         }
            //         return router.push({name: 'login'}).catch(() => {})
            //     })
            // }
            // children: [
            //     {
            //         path: 'user/:userId',
            //         name: 'User',
            //         component: User,
            //     }
            // ]
        },
        {
            path: '/user/:userId',
            name: 'User',
            component: User,
            meta: {
                requireAuth: true
            },
            // beforeEnter: (to, from, next) => {
            //     console.log('fff', store.getters.user)
            //     if(to.params.userId == store.getters.user.id) {
            //         return next()
            //     }
            // }
        },
        {
            path: '/activity',
            name: 'activity',
            component: Activity,
            meta: {
                requireAuth: true
            },
        },
        {
            path: '/adminHome',
            name: 'adminHome',
            component: () => import ("@/components/AdminHome.vue"),
            meta: {
                requireAuth: true,
                isAdmin: true,
            }
        },
        {
            path: '*',
            name: '404',
            component: NotFund,
        }
    ]
});