<template>
    <div>
        <Main>
            <template v-slot:content>
                <h1>404.</h1>
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