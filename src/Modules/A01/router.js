const A01Routes = 
{
    path: '/a01',
    name: 'A01',
    component: () => import(/* webpackChunkName: "A01" */ "./views/A01.vue"),
    meta: {
        requireAuth: true,
        isAdmin: true,
    },
    children: [
        {
            path: 'a01110/',
            name: 'A01110',
            component: () => import(/* webpackChunkName: "A01110" */ "./views/A01110.vue"),
            // children: [
                
            // ]
        },
        {
            path: 'a01110/create',
            name: 'A01110_create',
            component: () => import(/* webpackChunkName: "A01110" */ "./views/A01110/create.vue"),
        },
        {
            path: 'a01110/edit/:id',
            name: 'A01110_edit',
            component: () => import(/* webpackChunkName: "A01110" */ "./views/A01110/edit.vue"),
        },
        {
            path: 'a01110/view/:id',
            name: 'A01110_view',
            component: () => import(/* webpackChunkName: "A01110" */ "./views/A01110/view.vue"),
        },
        {
            path: 'a01120',
            name: 'A01120',
            component: () => import(/* webpackChunkName: "A01120" */ "./views/A01120.vue"),
        },
        {
            path: 'a01130',
            name: 'A01130',
            component: () => import(/* webpackChunkName: "A01130" */ "./views/A01130.vue"),
            // meta: {
            //     isAdmin: false,
            // }
        },
    ]
};

export default A01Routes;