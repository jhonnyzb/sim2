<template>
  <v-app>
    <app-bar :is-dark="true" />
    <PasswordView />
    <CoreFooter :is-dark="true" />
    <Snack />
    <update-notification />
  </v-app>
</template>

<script>
import { call } from 'vuex-pathify'
export default {
  name: 'Password',
  components: {
    AppBar: () => import('~/components/auth/AppBar'),
    PasswordView: () => import('~/components/auth/PasswordView'),
    CoreFooter: () => import('~/components/auth/AuthFooter'),
    Snack: () => import('~/components/base/SnackBar'),
    UpdateNotification: () => import('@/components/base/UpdateAvailable'),
  },
  mounted() {
    this.init()
  },
  methods: {
    init: call('app/init'),
  },
}
</script>
