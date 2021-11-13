<template>
  <v-navigation-drawer :mini-variant.sync="mini" permanent class="warning">
      <v-list>
        <v-list-item class="ml-n6">
          <v-list-item-avatar>
            <!-- <v-img :src="user.headshot.length > 0 ? user.headshot[0]['url'] : null"></v-img> -->
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
          <v-btn
            icon
            @click.stop="mini = !mini"
            class="ml-auto"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
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
        :prepend-icon="item.action"
        v-model="item.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          class=""

        >
          <v-list-item-content 
            class=""
          >
            <v-btn :to="child.link" :plain="true" class="">
              <span class="a" :title="child.title" style="width: 150px; overflow:hidden; text-overflow: ellipsis;">{{ child.title }}</span>
            </v-btn>
            <v-divider></v-divider>
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
          items[child] = {title: _data_child.p_no + ' - ' + _data_child.p_name, link: '/' + item[parent]['p_no'].toLowerCase() + '/' + _data_child.p_no.toLowerCase()} 
        }

        data[parent] = {
          action: _data.mdi_icon,
          items: items,
          title: _data.p_name,
          active: _data.p_no == this.$route.path.split('/')[1],
        }

        items = []
      }

      // console.log('itemsss', data)

      this.items = data

    },
    data: () => ({
      menu_list: null,
      mini: false,
      items: [],
    }),
  }
</script>
<style scoped>
.a::before {
  content: "＞";
  color: red;
}
</style>