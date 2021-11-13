<template>
    <v-app>
        <Main>
            <template v-slot:content>
                <router-view />
            </template>
        </Main>
    </v-app>
</template>
<script>
import Main from '@/components/_Layouts/Main.vue'
export default {
    data() {
        return {

        }
    },
    components: {
        Main
    }
}
</script>