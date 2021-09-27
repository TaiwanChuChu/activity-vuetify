<template>
  <v-container class="elevation-0">
    <DataTable
      ref="data_table"
      api_path="/api/activity/ActivityApply/filter"
      :searchCondition="searchCondition"
    >
      <template v-slot:search="{ srh }">
          <v-col
            cols="3"
          >
            <v-text-field
              label="主題"
              v-model="searchCondition.q_theme"
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
          >
            <v-autocomplete
              :items="!!srh ? srh.activityType : []"
              label="活動類別"
              v-model="searchCondition.q_activityType"
            ></v-autocomplete>
          </v-col>
      </template>

      <template v-slot:advanceSrh>
        <v-col
          cols="3"
        >
          <DateTimePicker label="活動日期(起)" :date_time_val.sync="searchCondition.q_sdate"></DateTimePicker>
        </v-col>
        <v-col
          cols="3"
        >
          <DateTimePicker label="活動日期(訖)" :date_time_val.sync="searchCondition.q_edate"></DateTimePicker>
        </v-col>
      </template>

      <template v-slot:anotherOp="{ item }">
        <v-btn small icon title="取消報名" @click.stop="cancelApply(item.id)" class="red lighten-1 white--text mr-1">
          <v-icon>mdi-cancel</v-icon>
        </v-btn>
      </template>
    </DataTable>

    <Dialog :dialog.sync="dialog" success="取消報名成功" error="取消報名失敗" :alert_type="alert_type" :persistent="false"></Dialog>
    <Confirm :dialog.sync="cancel_dialog" confirm_title="確定要取消報名?" @_confirm:done="dialog_can" :persistent="false"></Confirm>
    <Overlay :overlay.sync="overlay"></Overlay>
  </v-container>
</template>

<script>
import DateTimePicker from './_CoreComponents/_DateTimePicker'
import Dialog from './_CoreComponents/_Dialog.vue'
import Confirm from './_CoreComponents/_Confirm.vue'
import Overlay from './_CoreComponents/_Overlay.vue'
import DataTable from './_CoreComponents/_DataTable.vue'

export default {
    components: {
      DateTimePicker,
      Dialog,
      Confirm,
      Overlay,
      DataTable,
    },
    watch: {},
    data() {
        return {
            items: [],
            searchCondition: {
              q_theme: null,
              q_activityType: null,
              q_sdate: null,
              q_edate: null,
            },
            dialog: false,
            alert_type: true,
            overlay: false,
            cancel_dialog: false,
            item: 0,
        }
    },
    methods: {
        cancelApply(item) {
          this.item = item
          this.cancel_dialog = true
        },
        async dialog_can (val) {
          console.log('fff', val)
          if(val) {
            this.overlay = true
            await this.axios.delete(process.env.VUE_APP_API_PATH + `/api/activity/ActivityApply/${this.item}`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            })
            .then(response => {
              console.log('huihihihihih', response)
            }).catch((err) => {
              console.log('Vuex setUser ERR', err)
              this.alert_type = false
            }).finally(() => {
              this.dialog = true
              this.overlay = false
              this.cancel_dialog = false
            })
            this.$refs.data_table.filterSearch()
          }
        },
    }
}
</script>
