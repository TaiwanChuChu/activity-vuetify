<template>
    <div class="d-flex">
        <Menu></Menu>
        <div style="flex: 1 1 auto;">
            <!-- TODO: 麵包屑 -->
            <!-- <v-breadcrumbs :items="items"></v-breadcrumbs> -->
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
import Menu from '../_CoreComponents/_Menu'
export default {
    data() {
        return {
            // items: [
            //     {
            //         text: 'Home',
            //         disabled: false,
            //         href: 'home',
            //     },
            //     {
            //         text: 'Link 1',
            //         disabled: false,
            //         href: 'breadcrumbs_link_1',
            //     },
            //     {
            //         text: 'Link 2',
            //         disabled: true,
            //         href: 'breadcrumbs_link_2',
            //     },
            // ],
        }
    },
    components: {
        Menu
    },
    computed: {
    }
}
</script>