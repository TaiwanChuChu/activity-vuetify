<template>
    <v-overlay :value="subOverlay">
        <v-progress-circular indeterminate size="70">
            <p class="mt-5 font-weight-black">處理中...</p>
        </v-progress-circular>
    </v-overlay>
</template>
<script>
export default {
    props: {
        overlay: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    data() {
        return {

        }
    },
    computed: {
        subOverlay: {
           get() {
                return this.overlay
            },
            set(val) {
                this.$emit('update:overlay', val)
            }
        }
    }
}
</script>