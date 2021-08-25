<template>
    <v-container>
        {{ msg }}
        <v-text-field
            label="msg"
            v-model="msg"
        ></v-text-field>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            msg: '這是個人已報名活動',
        }
    }
}
</script>
