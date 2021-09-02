<template>
  <div class="d-flex">
    <v-navigation-drawer permanent v-if="user" style="width: 300px !important">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <!-- <v-img :src="user.headshot[0]['url']"></v-img> -->
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{
              user.name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item
          link
          v-for="(item, index) in list"
          :key="index"
          @click="change(item.link)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <keep-alive>
      <component :is="currentTabComponent" class="ml-5"></component>
    </keep-alive>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import info from "./UserInfo";
import applied from "./UserApplied";
import apply from "./UserApply";
export default {
  data() {
    return {
      link: "info",
      list: [
        {
          title: "個人基本資料",
          icon: "mdi-account-multiple",
          link: "info",
        },
        {
          title: "已報名活動",
          icon: "mdi-folder",
          link: "applied",
        },
        {
          title: "尚可報名活動",
          icon: "mdi-star",
          link: "apply",
        },
      ],
    };
  },
  mounted() {
    console.log("DATA", this.user);
  },
  methods: {
    change(link) {
      console.log("change!", link);
      this.link = link;
    },
  },

  computed: {
    ...mapGetters(["user"]),
    currentTabComponent() {
      return "user-" + this.link;
    },
  },

  components: {
    "user-info": info,
    "user-applied": applied,
    "user-apply": apply,
  },
};
</script>