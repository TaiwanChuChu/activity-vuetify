<template>
  <div>
    <DataTable
        ref="data_table"
        api_path="/api/activity/ActivityType/filter"
        :searchCondition="searchCondition"
        @_DataTable:addItem="to"
        @_DataTable:editItem="to"
        @_DataTable:viewItem="to"
        @_DataTable:deleteItem="to"
    >
      <template v-slot:search="">
        <v-col
            cols="3"
        >
          <v-text-field
              label="活動類別名稱"
              v-model="searchCondition.q_type_name"
          ></v-text-field>
        </v-col>
      </template>
    </DataTable>

    <Dialog :dialog.sync="dialog" success="刪除成功" error="刪除失敗" :alert_type="alert_type" :persistent="false"></Dialog>
    <Confirm :dialog.sync="cancel_dialog" confirm_title="確定刪除?" @_confirm:done="dialog_can"
             :persistent="false"></Confirm>
    <Overlay :overlay.sync="overlay"></Overlay>
  </div>
</template>
<script>
import DataTable from '@/components/_CoreComponents/_DataTable.vue'
import Overlay from '@/components/_CoreComponents/_Overlay.vue'
import Confirm from '@/components/_CoreComponents/_Confirm.vue'
import Dialog from '@/components/_CoreComponents/_Dialog.vue'

export default {
  data() {
    return {
      items: [],
      searchCondition: {
        q_type_name: null,
        //   q_activityType: null,
        //   q_apply_sdate: null,
        //   q_apply_edate: null,
        //   q_sdate: null,
        //   q_edate: null,
      },
      dialog: false,
      alert_type: true,
      overlay: false,
      item: 0,
      cancel_dialog: false,
    }
  },
  components: {
    DataTable,
    Overlay,
    Confirm,
    Dialog
  },
  methods: {
    cancelApply(id) {
      console.log('ID: ' + id)
    },
    async to(item, _do) {
      console.log(item, _do)
      switch (_do) {
        case 'add':
          return await this.$router.push({name: 'A01110_create'})
        case 'edit':
          return await this.$router.push({name: 'A01110_edit', params: {id: item.id}})
        case 'view':
          return await this.$router.push({name: 'A01110_view', params: {id: item.id}})
        case 'del':
          this.item = item.id
          this.cancel_dialog = true
          break;
      }
    },
     async dialog_can(val) {
      this.cancel_dialog = false
      if(val) {
        this.overlay = true
        await this.axios.delete(`/api/activity/ActivityType/${this.item}`)
          .catch(() => {
            this.alert_type = false
            this.overlay = false
          })
        this.dialog = true
        this.overlay = false
        this.$refs.data_table.filterSearch()
      }

    },
  }
}
</script>