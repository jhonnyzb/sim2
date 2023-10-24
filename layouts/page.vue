<template>
  <v-app>
    <app-bar />
    <CoreView />
    <CoreFooter />
    <Snack />
    <update-notification />
  </v-app>
</template>

<script>
import { call } from 'vuex-pathify'
import { Api } from '@/models/Api'

export default {
  name: 'AuthPage',
  components: {
    AppBar: () => import('~/components/auth/AppBar'),
    CoreView: () => import('~/components/auth/View'),
    CoreFooter: () => import('~/components/auth/AuthFooter'),
    Snack: () => import('~/components/base/SnackBar'),
    UpdateNotification: () => import('@/components/base/UpdateAvailable'),
  },
  fetch() {
    this.$axios.get(Api.END_POINTS.CSFR_TOKEN())
  },
  mounted() {
    this.init()
  },
  methods: {
    init: call('app/init'),
  },
}
</script>
