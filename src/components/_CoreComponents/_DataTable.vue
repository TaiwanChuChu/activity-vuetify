<template>
  <v-container>
    <v-row>
      <slot name="search" :srh="srh_con_item"></slot>
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
      <slot name="advanceSrh" :srh="srh_con_item"></slot>
    </v-row>

    <v-data-table
      ref="data_table"
      :headers="headers"
      :items="detail"
      :loading="tb_loading"
      :options.sync="options"
      :server-items-length="totalR"
      :item-key="item_key"
      hide-default-footer
    >

      <!-- 
        #固定header
        :fixed-header="true"
        height="100vh" 
      -->

      <template v-for="(item, index) in headers" v-slot:[`header.${item.value}`]="{ header }">
        <div :key="index">
            <v-switch
                v-if="header.text == 'openDetail'"
                @change="open"
                inset
                label="展開"
              ></v-switch>
          <span v-if="header.text != 'openDetail'" :key="index" class="" style="font-size: 1rem;">
              <b>{{ header.text }}</b>
          </span>
        </div>
      </template>

      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>

      <template v-for="(item2, index) in headers" v-slot:[`item.${item2.value}`]="{ item }">
          <slot v-if="item2.value === 'id'" name="anotherOp" :index="index" :item="item"></slot>

          <template v-if="item2.value !== 'id'">
            {{ trans(item, item2.value) }}
          </template>
      </template>

      <!-- 展開區域 -->
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

      <template
        v-if="!!this.items"
        v-slot:[`no-data`]
      >
        查無資料
      </template>

    </v-data-table>

    <v-layout>
      <v-pagination :total-visible="7" class="flex justify-center" v-model="options.page" :length="pages"></v-pagination>
      <v-btn class="test">test</v-btn>
    </v-layout>
    
    <Overlay :overlay="overlay"></Overlay>

  </v-container>
</template>
<script>
import Overlay from './_Overlay.vue'
export default {
    components: {
      Overlay
    },
    props: {
        // item_key: {
        //     type: String,
        //     default: 'id',
        // }
        api_path: {
          type: String,
          required: true,
        },
        searchCondition: {
          type: Object,
          default: null,
        },
    },
    data() {
        return {
          headers: [],
          detail: [],
          items: [],
          item_key: 'id',
          totalR: 0,
          options: {},
          tb_loading: false,
          expanded: [],
          overlay: false,
          advance_srh: false,
          open_detail_icon: 'mdi-lock',
          srh_con_item: null,
        }
    },
    watch: {
      options: {
        handler (val) {
          console.log('watch', val)
          this.getData()
        },
        deep: true,
      },
    },
    methods: {
        advanceSrh() {
          this.advance_srh = !this.advance_srh
          if(this.advance_srh === false) {
            this.searchCondition.q_sdate = null
            this.searchCondition.q_edate = null
          }
        },
        filterSearch: function() {
          let searchCondition = this.searchCondition

          console.log('fff', searchCondition)

          for(let item in searchCondition) {
              if(searchCondition[item] == null || searchCondition[item] == undefined || searchCondition[item] == '') {
                  delete searchCondition[item]
              }
          }
          // 查詢後，要重設Page，因為有設定watch options的狀況，故不用再自行呼叫getData的方法
          if(Object.keys(searchCondition).length > 0) {
            this.options = {}
            this.options = { "page": 1, "itemsPerPage": 10, "sortBy": [], "sortDesc": [], "groupBy": [], "groupDesc": [], "mustSort": false, "multiSort": false }
          } else {
            this.getData()
          }
          console.log('condition', searchCondition, Object.keys(searchCondition).length)
        },
        getData: async function() {
            console.log('datatable_getData', this.options)
            this.overlay = true
            this.tb_loading = true
            let response = await this.axios.post(this.api_path, 
              {
                options: this.options,
                searchCondition: this.searchCondition,
              }, 
            )
            this.totalR = response.meta.total
            this.headers = response.meta.self.headers
            this.detail = response.data
            this.srh_con_item = response.meta.searchCondition

            this.tb_loading = false
            this.overlay = false
        },
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
        trans(obj, keys) {
          let key = keys.split('.')
          let tmpObj = obj
          key.forEach(el => {
            tmpObj = tmpObj[el]
          })
          return tmpObj
        }
    },
    computed: {
      pages() {
        console.log('itemsPerPage', this.options.itemsPerPage)
        console.log('totalR', this.totalR)
        return this.options.itemsPerPage == null || this.totalR == null ? 0 : Math.ceil(this.totalR / this.options.itemsPerPage)
      }
    }
}
</script>