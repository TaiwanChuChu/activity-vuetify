<template>
    <v-main>
        <!-- <v-container> -->
        <!-- <h1>Welcome Home</h1> -->
        <h1>可報名的活動</h1>
        <h1>已截止的活動</h1>
        <h1>目前參加的活動</h1>
        <h1>曾經參加的活動</h1>
        <!-- </v-container> -->
    </v-main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    // beforeRouteEnter : function() {
    //     console.log('home beforeRouteEnter !')
    // },
    data: () => ({

    }),
    computed: {
        ...mapGetters([
            'user',
        ])
    }
}
</script>