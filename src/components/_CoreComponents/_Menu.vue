<template>
 
  <v-navigation-drawer permanent style="width: 300px !important">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <!-- <v-img :src="user.headshot.length > 0 ? user.headshot[0]['url'] : null"></v-img> -->
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
                USER NAME
            </v-list-item-title>
            <v-list-item-subtitle>USER EMAIL</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

    <v-list style="height: 100vh">
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          class="d-flex justify-start red"
        >
          <v-list-item-content
          class="d-flex justify-start red"
          style="width: 100%;"
          >
            <v-btn>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  export default {
    async mounted() {
      console.log('mounted')
      this.menu_list = await this.axios.get('/api/user/menus')
      let item = this.menu_list.data

      let data = []
      let items = []
      for(let parent in item) {
        // console.log('parent', item[parent])
        let _data = item[parent]

        for(let child in item[parent]['children']) {
          // console.log('children~', item[parent]['children'][child])
          let _data_child = item[parent]['children'][child]
          items[child] = {title: _data_child.p_no + ' - ' + _data_child.p_name} 
        }

        data[parent] = {
          action: _data.mdi_icon,
          items: items,
          title: _data.p_name,
        }

        items = []
      }

      console.log('itemsss', data)

      this.items = data

    },
    data: () => ({
      menu_list: null,
      items: [],
    }),
  }
</script>