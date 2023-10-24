<template>
  <v-app-bar
    id="app-bar-dashboard"
    :clipped-left="clip"
    fixed
    app
    height="45"
    color="transparent"
  >
    <v-btn
      v-if="$route.path !== localePath('/')"
      icon
      @click="
        $vuetify.breakpoint.smAndDown
          ? setDrawer(!drawer)
          : $emit('input', !value)
      "
    >
      <v-icon v-if="value">mdi-view-quilt</v-icon>
      <v-icon v-else>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-btn
      v-if="$route.path !== localePath('/')"
      class="hidden-sm-and-down"
      icon
      @click.stop="setClipped"
    >
      <v-icon>mdi-application</v-icon>
    </v-btn>

    <v-toolbar-title
      :class="{ 'hidden-sm-and-down': $route.path !== localePath('/') }"
      class="font-weight-light"
      v-text="title"
    />

    <v-spacer />

    <div class="mx-3" />

    <v-btn class="ml-2" icon>
      <v-offline-icon />
    </v-btn>

    <v-tooltip v-if="$route.path !== localePath('/')" bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          :aria-label="$t('titles.Modules')"
          v-bind="attrs"
          :to="localePath({ name: 'home' })"
          exact
          class="ml-2"
          icon
          v-on="on"
        >
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
      </template>
      <span>{{ $t('titles.Modules') }}</span>
    </v-tooltip>
    <v-menu
      bottom
      left
      min-width="200"
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template #activator="{ attrs, on }">
        <v-btn
          :class="{ 'hidden-sm-and-down': $route.path !== localePath('/') }"
          class="ml-2"
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list :tile="false" flat nav>
        <app-bar-item :to="localePath(profile)">
          <v-list-item-icon>
            <v-icon>mdi-card-account-details-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="$t('titles.Profile')" />
        </app-bar-item>
        <app-bar-item @click.native="onSetRightDrawer">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="$t('titles.Settings')" />
        </app-bar-item>
        <v-divider class="mb-2 mt-2" />
        <app-bar-item @click.native="onLogout">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="$t('titles.Logout')" />
        </app-bar-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
// Components
import { get, dispatch } from 'vuex-pathify'
import { VHover, VListItem } from 'vuetify/lib'
import VOfflineIcon from '@/components/base/VOfflineIcon'
export default {
  name: 'AppBar',
  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    'white--text primary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                },
                this.$slots.default
              )
            },
          },
        })
      },
    },
    VOfflineIcon,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    clip: false,
    notifications: [],
    profile: {
      name: 'user-profile',
    },
  }),
  computed: {
    title() {
      return this.$t(`${this.$route.meta.title || 'titles.Dashboard'}`)
    },
    drawer: get('app/getStatusDrawer'),
    clipped: {
      get() {
        return get('app/getClipped')
      },
      set(val) {
        dispatch('app/toggleClipped', val)
      },
    },
    miniVariant: {
      get() {
        return get('app/getMiniVariant')
      },
      set(val) {
        dispatch('app/toggleMiniVariant', val)
      },
    },
    rightDrawer: {
      get() {
        return get('app/getStatusRightDrawer')
      },
      set(val) {
        dispatch('app/toggleRightDrawer', val)
      },
    },
  },
  methods: {
    setClipped() {
      this.clip = !this.clip
      this.clipped = this.clip
    },
    setDrawer(val) {
      dispatch('app/toggleDrawer', val)
    },
    onLogout() {
      dispatch('parks/reset')
      dispatch('app/unsetPermissions')
      dispatch('app/unsetBouncer')
      dispatch('app/unsetMenuDrawer')
      this.$auth
        .logout()
        .then(() => {
          this.$snackbar({
            message: 'Se ha cerrado sesión satisfactoriamente',
            color: 'success',
          })
        })
        .catch((errors) => {
          this.$snackbar({
            message: errors.response ? errors.response.data.message : errors,
          })
        })
        .finally(() => {
          this.$router.push(this.localePath({ name: 'login' }))
          dispatch('parks/reset')
          dispatch('app/unsetPermissions')
          dispatch('app/unsetBouncer')
          dispatch('app/unsetMenuDrawer')
        })
    },
    onSetRightDrawer() {
      dispatch('app/toggleRightDrawer', true)
    },
  },
}
</script>
