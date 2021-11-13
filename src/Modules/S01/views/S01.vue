<template>
    <div>
        <Main>
            <template v-slot:content>
                <router-view />
            </template>
        </Main>
    </div>
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