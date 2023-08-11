<template>
  <v-navigation-drawer
    v-if="computedDrawer"
    app
    dark
    color="#323850"
    mini-variant-width="180"
    flat
    :class="computedDrawer && 'absolute'"
  >
    <v-list-item class="px-2 my-1 justify-content-between w-100 profile-image">
      <v-list-item-avatar
        class="d-block text-center mx-auto border_img"
        size="40"
      >
        <img v-bind:src="$props.image" v-bind:alt="$props.firstName" />
      </v-list-item-avatar>
      <v-list-item-title>basil alsheikh</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    <v-list class="mt-5">
      <v-list-item-group v-model="selectItem">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          active-class="border"
          v-slot="{ active }"
          class="list-item h-1"
        >
        <router-link v-bind:to="item.to">
          <v-list-item-icon>
            <v-icon
              v-text="item.icon"
              :color="active ? '#F34F64' : '#778290'"
            ></v-icon>
            <v-list-item-content>
              <v-list-item-title
                class="a-tag"
                :class="active && 'a-tag-active'"
                v-text="item.title"
              />
            </v-list-item-content>
          </v-list-item-icon>
          </router-link>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            Logout
          </v-btn>
        </div>
      </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    id: {
      type: Number,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    image: {
      type: String,
    },
    drawer: {
      type: Boolean,
    },
  },
  data: () => ({
    selectItem: 3,
    items: [
      { title: "Home", icon: "mdi-home", to: "/dashboard" },
      { title: "My Books", icon: "mdi-book-multiple", to: "/dashboard/book" },
      { title: "Settings", icon: "mdi-cog", to: "/dashboard/settings" },
    ],
  }),
  computed: {
    computedDrawer: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit("update:drawer", value);
      },
    },
  },
};
</script>

<style>
.border_img {
  background-color: #f34f64;
  border: 1px solid #778290;
}
.profile-image {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
}
a {
  text-decoration: none;
}
.a-tag {
  color: #778290;
  font-size: 18px;
}
.a-tag.a-tag-active {
  color: #f34f64;
}
.list-item .v-list-item__icon:first-child {
  display: flex !important;
  gap: 2rem !important;
}
.border {
  color: #f34f64 !important;
  text-decoration: none;
}
.absolute {
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(0%) !important;
  z-index: 1000;
}
</style>
