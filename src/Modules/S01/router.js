const S01Routes = 
{
    path: '/s01',
    name: 'S01',
    component: () => import(/* webpackChunkName: "S01" */ "./views/S01.vue"),
    meta: {
        requireAuth: true,
        isAdmin: true,
    },
    children: [
        {
            path: 's01110',
            name: 'S01110',
            component: () => import(/* webpackChunkName: "S01" */ "./views/S01110.vue"),
            meta: {
                requireAuth: true,
                isAdmin: true,
            }
        }
    ]
}
export default S01Routes;