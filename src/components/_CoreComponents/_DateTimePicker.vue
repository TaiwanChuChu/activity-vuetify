<template>
    <v-menu
        v-model="menu_show"
        :close-on-content-click="false"
        max-width="290"
    >
        <template v-slot:activator="{ on, attrs }" >
            <v-text-field
                :label="label"
                :value="value"
                clearable
                readonly
                v-bind="attrs"
                v-on="on"
                @click:clear="value = null"
            >
            </v-text-field>
        </template>
        <v-tabs v-model="tab"
            background-color="grey darken-4"
            :fixed-tabs="true"
        >
            <v-tab
                v-for="item in tabItems"
                :key="item.tab"
                class="white--text"
                :disabled="item.index === 'time' && !date"
            >
            {{ item.tab }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab"
            class="grey darken-4"
        >
            <v-tab-item
            >
                <v-date-picker
                    v-model="date"
                    @input="doneDate"
                    :dark="true"
                    locale="zh-cn"
                >
                </v-date-picker>
            </v-tab-item>
            <v-tab-item
            >
                <v-time-picker
                    :dark="true"
                    v-model="time"
                    ref="time_picker"
                    format="24hr"
                ></v-time-picker>
            </v-tab-item>
        </v-tabs-items>
        <template>
           <div class="grey darken-3 d-flex justify-end mt-n2 pa-2">
               <v-btn color="green lighten-3" @click="finish">確定</v-btn>
               <v-btn class="ml-1 red lighten-3" @click="reset">清除</v-btn>
           </div>
        </template>
    </v-menu>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: '日期時間選擇器',
        },
        date_time_val: String,
    },
    data() {
        return {
            tab: 0,
            tabItems: [
                {
                    index: 'date',
                    tab: '日期',
                },
                {
                    index: 'time',
                    tab: '時間',
                }
            ],
            menu_show: false,
            date: null,
            time: null,
        }
    },
    methods: {
        doneDate() {
            this.tab = 1
        },
        reset() {
            this.tab = 0
            this.menu_show = false
            this.date = null
            this.time = null
            this.value = null
            this.$refs.time_picker.selecting = 1
        },
        finish() {
            if(this.date && this.time) {
                this.menu_show = false
                this.value = this.date + ' ' + this.time
            }
        },

    },
    computed: {
        value: {
           get() {
                return this.date_time_val
            },
            set(val) {
                this.$emit('update:date_time_val', val)
            }
       }
    }
}
</script>