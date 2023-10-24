<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="drawerDark"
    :expand-on-hover="expandOnHover"
    :mini-variant="miniVariant"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    :clipped="clipped"
    fixed
    app
    mini-variant-width="75"
    width="260"
  >
    <template #img="props">
      <v-img :gradient="`to bottom, ${bgColor}`" v-bind="props" />
    </template>
    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title
            class="text-uppercase font-weight-regular display-2"
          >
            <div
              :class="$vuetify.rtl ? 'ml-3' : 'mr-3'"
              class="logo-mini"
              v-text="miniText"
            />
            <div class="logo-normal" v-text="completeText" />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider class="mb-1" />
    <v-list nav expand dense>
      <base-item-group :item="profile" />
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav dense>
      <div />
      <template v-for="(item, i) in items">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        />
        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { get, dispatch } from 'vuex-pathify'
import Item from '@/components/base/Item'
import ItemGroup from '@/components/base/ItemGroup'
export default {
  name: 'Drawer',
  components: {
    BaseItem: Item,
    BaseItemGroup: ItemGroup,
  },
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    items: get('app/getMenuDrawer'),
    drawerDark() {
      return ![
        'rgba(228, 226, 226, 0.3), rgba(255, 255, 255, 0.8)',
        'rgba(33, 147, 176, .2), rgba(109, 213, 237, .6)',
      ].includes(this.bgColor)
    },
    activeColor: {
      get: get('app/getActiveColor'),
      set(val) {
        dispatch('app/setActiveColor', val)
      },
    },
    bgColor: {
      get: get('app/getBarColor'),
      set(val) {
        dispatch('app/serBarColor', val)
      },
    },
    barImage: {
      get: get('app/gerBarImage'),
      set(val) {
        dispatch('app/setBarImage', val)
      },
    },
    clipped: {
      get: get('app/getClipped'),
      set(val) {
        dispatch('app/toggleClipped', val)
      },
    },
    miniVariant: {
      get: get('app/getMiniVariant'),
      set(val) {
        dispatch('app/toggleMiniVariant', val)
      },
    },
    drawer: {
      get: get('app/getStatusDrawer'),
      set(val) {
        dispatch('app/toggleDrawer', val)
      },
    },
    computedItems() {
      return this.items.map(this.mapItem)
    },
    username: get('auth/user@username'),
    profile() {
      return {
        avatar: (this.username || 'SIM').toUpperCase(),
        group: 'SIM',
        title: (this.username || 'SIM').toUpperCase(),
        children: [
          {
            to: { name: 'user-profile' },
            title: this.$t('titles.Profile'),
            exact: true,
          },
          {
            title: this.$t('titles.Settings'),
            href: undefined,
            callback: this.onSetRightDrawer,
          },
          {
            title: this.$t('titles.Logout'),
            href: undefined,
            callback: this.onLogout,
          },
        ],
      }
    },
    miniText() {
      return process.env.VUE_APP_DRAWER_MINI
    },
    completeText() {
      return process.env.VUE_APP_DRAWER
    },
  },
  watch: {
    '$vuetify.breakpoint.smAndDown'(val) {
      this.$emit('update:expandOnHover', !val)
    },
  },
  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title),
      }
    },
    onSetRightDrawer() {
      this.$store.dispatch('app/toggleRightDrawer', true)
    },
    onLogout() {
      dispatch('parks/reset')
      dispatch('app/unsetPermissions')
      dispatch('app/unsetBouncer')
      dispatch('app/unsetMenuDrawer')
      this.$auth
        .logout()
        .catch((errors) => {
          this.$snackbar({
            message: errors.response ? errors.response.data.message : errors,
          })
        })
        .finally(() => {
          this.$router.push(this.localePath({ name: 'login' }))
        })
    },
  },
}
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important

    .v-list-group--sub-group
      display: block !important

  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
        margin-right: 24px
        margin-left: 12px !important

      +rtl()
        margin-left: 24px
        margin-right: 10px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
        padding-left: 8px

      +rtl()
        padding-right: 8px

    .v-list-group__header
      +ltr()
        padding-right: 0

      +rtl()
        padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
          margin-right: 8px

        +rtl()
          margin-left: 8px
</style>
