import Vue from "vue";
import VueRouter from "vue-router";
import Activity from "@/components/Activity/Activity";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Home from "@/components/Home";
import User from "@/components/User";
import NotFund from "@/components/NotFund";
import router from '../router/router'
import Helper from '../helper'
import AdminHome from '@/components/AdminHome'

import S01Route from 'Modules/S01/router'
import A01Route from 'Modules/A01/router'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        S01Route,
        A01Route,
        {
            path: '/',
            name: 'index',
            component: () => import(/* webpackChunkName: "HelloWorld" */ "@/components/HelloWorld.vue"),
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
            // component: () => import ("@/components/AdminHome.vue"),
            component: AdminHome,
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