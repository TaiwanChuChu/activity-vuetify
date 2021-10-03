<template>
  <v-container class="elevation-0">
    <DataTable
      ref="data_table"
      api_path="/api/activity/ActivityBasic/filter"
      :searchCondition="searchCondition"
    >
      <template v-slot:search>
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
            <!-- <v-autocomplete
              :items="$refs.data_table.ss.activityType"
              label="活動類別"
              v-model="searchCondition.q_activityType"
            ></v-autocomplete> -->
          </v-col>
      </template>

      <template v-slot:advanceSrh>
        <v-col
          cols="3"
        >
          <DateTimePicker label="報名日期(起)" :date_time_val.sync="searchCondition.q_apply_sdate"></DateTimePicker>
        </v-col>
        <v-col
          cols="3"
        >
          <DateTimePicker label="報名日期(訖)" :date_time_val.sync="searchCondition.q_apply_edate"></DateTimePicker>
        </v-col>
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
        <v-btn icon small title="我要報名" @click.stop="apply(item.id)" class="green lighten-1 white--text">
          <v-icon>mdi-run-fast</v-icon>
        </v-btn>
      </template>
    </DataTable>

    <Dialog :dialog.sync="dialog" success="報名成功" error="報名失敗" :alert_type="alert_type" :persistent="false"></Dialog>
    <Confirm :dialog.sync="cancel_dialog" confirm_title="確定報名?" @_confirm:done="dialog_can" :persistent="false"></Confirm>
    <Overlay :overlay.sync="overlay"></Overlay>

  </v-container>
</template>

<script>
import DateTimePicker from './_CoreComponents/_DateTimePicker'
import DataTable from './_CoreComponents/_DataTable.vue'
import Overlay from './_CoreComponents/_Overlay.vue'
import Confirm from './_CoreComponents/_Confirm.vue'

export default {
    components: {
      DateTimePicker,
      DataTable,
      Confirm,
      Overlay,
    },
    watch: {},
    data() {
        return {
            items: [],
            searchCondition: {
              q_theme: null,
              q_activityType: null,
              q_apply_sdate: null,
              q_apply_edate: null,
              q_sdate: null,
              q_edate: null,
            },
            dialog: false,
            alert_type: true,
            overlay: false,
            item: 0,
            cancel_dialog: false,
        }
    },
    methods: {
        apply(item) {
          this.item = item
          this.cancel_dialog = true
        },
        async dialog_can (val) {
          if(val) {
            this.overlay = true
            await this.axios.post('/api/activity/ActivityApply', {
              activity_id: this.item,
            }).catch(() => {
              this.alert_type = false
            })
            this.dialog = true
            this.overlay = false
            this.cancel_dialog = false
            this.$refs.data_table.filterSearch()
          }
        },
    }
}
</script>
