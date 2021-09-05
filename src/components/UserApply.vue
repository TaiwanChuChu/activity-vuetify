<template>
  <v-container class="elevation-0">
      <v-row
        align="center"
      >
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
            :items="items"
            label="活動類別"
            v-model="searchCondition.q_activityType"
          ></v-autocomplete>
        </v-col>


        <v-col
          cols=""
        >
          <v-row
            justify="end"
          >
            <v-col
              cols="3"
              align="end"
            >
              <v-btn 
                color="blue lighten-3" 
                @click.stop="filterSearch"
              >
              查詢
              </v-btn>
            </v-col>
            
            <v-col
              cols="3"
              align="end"
            >
              <v-btn
                  @click="advanceSrh"
              >
                <v-icon>mdi-magnify</v-icon>
                進階查詢
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
    </v-row>

    <v-row v-if="advance_srh" transition="slide-x-transition">
        <v-col
          cols="3"
        >
          <sdate label="報名日期(起)" :date_time_val.sync="searchCondition.q_apply_sdate"></sdate>
        </v-col>
        <v-col
          cols="3"
        >
          <sdate label="報名日期(訖)" :date_time_val.sync="searchCondition.q_apply_edate"></sdate>
        </v-col>
        <v-col
          cols="3"
        >
          <sdate label="活動日期(起)" :date_time_val.sync="searchCondition.q_sdate"></sdate>
        </v-col>
        <v-col
          cols="3"
        >
          <sdate label="活動日期(訖)" :date_time_val.sync="searchCondition.q_edate"></sdate>
        </v-col>
    </v-row>

    <v-data-table
      ref="data_table"
      :headers="headers"
      :items="detail"
      :loading="tb_loading"
      :options.sync="options"
      :server-items-length="totalR"
      @update:options="getData"
      :expanded.sync="expanded"
      show-expand
      :item-key="item_key"
    >

    <template v-for="(item, index) in headers" v-slot:[`header.${item.value}`]="{ header }">
      <div :key="index">
           <v-switch
              v-if="header.text == 'openDetail'"
              @change="open"
              inset
              label="展開"
            ></v-switch>
        <span v-if="header.text != 'openDetail'" :key="index" class="title">
            <b>{{ header.text }}</b>
        </span>
      </div>
    </template>

    <template v-for="(item2, index) in headers" v-slot:[`item.${item2.value}`]="{ item }">
        <v-btn :key="index" v-if="item2.value === 'id'" @click.stop="apply(item.id)" class="green lighten-1 white--text" :loading="btn_apply_loading">
          我要報名
        </v-btn>
        <template v-if="item2.value !== 'id'">
          {{ trans(item, item2.value) }}
        </template>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-row>
          <v-col
            cols="4"
          >
          More info about {{ item.id }}
          </v-col>
          <v-col
            cols="4"
          >
          More info about2 {{ item.theme }}
          </v-col>
        </v-row>
      </td>
    </template>

    <template v-slot:[`item.data-table-expand`]="{ isExpanded, expand }">
      <div>
        <v-btn icon @click="openById(isExpanded, expand)">
          <v-icon>
            {{ isExpanded === true ? 'mdi-lock-open-variant' : 'mdi-lock' }}
          </v-icon>
        </v-btn>
      </div>
    </template>

    <template
        v-if="!!this.detail"
        v-slot:no-data
      >
        查無資料
      </template>
    </v-data-table>
    {{ options }}
  </v-container>
</template>

<script>
import DateTimePicker from './_CoreComponents/_DateTimePicker'
export default {
    async mounted() {
        console.log('mounted!!!!')
        await this.getData()
    },
    components: {
      sdate: DateTimePicker,
      // edate: DateTimePicker,
    },
    watch: {
      // options: {
      //   handler () {
      //     this.getData()
      //   },
      //   deep: true,
      // },
    },
    data() {
        return {
            totalR: 0,
            options: {},
            tb_loading: false,
            advance_srh: false,
            headers: [],
            detail: [],
            items: [],
            q_apply_sdate_show: false,
            searchCondition: {
              q_theme: null,
              q_activityType: null,
              q_apply_sdate: null,
              q_apply_edate: null,
              q_sdate: null,
              q_edate: null,
            },
            expanded: [],
            item_key: 'id',
            open_detail_icon: 'mdi-lock',
            btn_apply_loading: false,
        }
    },
    methods: {
        openById(isExpanded, expand) {
          expand(!isExpanded)
        },
        open(switch_val) {
          console.log('VAL', switch_val)
          this.expanded = []

          if(switch_val) {
            this.expanded = this.detail
          }
        },
        advanceSrh() {
          this.advance_srh = !this.advance_srh
          if(this.advance_srh === false) {
            this.searchCondition.q_apply_sdate = null
            this.searchCondition.q_apply_edate = null
            this.searchCondition.q_sdate = null
            this.searchCondition.q_edate = null
          }
        },
        filterSearch: function() {
          let searchCondition = this.searchCondition

          for(let item in searchCondition) {
              if(searchCondition[item] == null || searchCondition[item] == undefined || searchCondition[item] == '') {
                  delete searchCondition[item]
              }
          }
          // 查詢後，要重設Page
          if(Object.keys(searchCondition).length > 0) {
            this.options = {}
            this.options = { "page": 1, "itemsPerPage": 10, "sortBy": [], "sortDesc": [], "groupBy": [], "groupDesc": [], "mustSort": false, "multiSort": false }
          }
          console.log('condition', searchCondition, Object.keys(searchCondition).length)

          this.getData()
        },
        getData: async function() {
          this.tb_loading = true
          await this.axios.post(process.env.VUE_APP_API_PATH + '/api/activity/ActivityBasic/filter', 
            {
              options: this.options,
              searchCondition: this.searchCondition,
            }, 
            {
              headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
              }
            }
          )
          .then(response => {
            console.log(response.data)
            this.totalR = response.data.meta.total
            this.headers = response.data.meta.self.headers
            this.detail = response.data.data
            this.items = response.data.meta.searchCondition.activityType

          })
          .catch(err => console.log(err))
          this.tb_loading = false
        },
        trans(obj, keys) {
          let key = keys.split('.')
          let tmpObj = obj
          key.forEach(el => {
            tmpObj = tmpObj[el]
          })
          return tmpObj
        },
        async apply(item) {
          console.log('ITEM', item)
          this.btn_apply_loading = true
          await this.axios.post(process.env.VUE_APP_API_PATH + '/api/activity/ActivityApply', {
            activity_id: item,
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(response => {
              console.log('huihihihihih', response)
            }).catch((err) => {
              console.log('Vuex setUser ERR', err)
            })
          this.filterSearch()
          this.btn_apply_loading = false
        }
    }
}
</script>
