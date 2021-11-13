<template>
    <v-app>
        <Main>
            <template v-slot:content>
                <h1>Admin Home.</h1>
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