<template>
  <v-menu
    bottom
    content-class="dropdown-menu"
    offset-y
    origin="top left"
    transition="scale-transition"
  >
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon v-if="$i18n.locale === 'es'">$vuetify.icons.es</v-icon>
        <v-icon v-else>$vuetify.icons.en</v-icon>
      </v-btn>
    </template>
    <v-list :tile="false" flat nav>
      <v-list-item-group v-model="$i18n.locale">
        <v-list-item value="es">
          <v-list-item-title>
            <v-icon>$vuetify.icons.es</v-icon> ES
          </v-list-item-title>
        </v-list-item>
        <v-list-item value="en">
          <v-list-item-title>
            <v-icon>$vuetify.icons.en</v-icon> EN
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'Language',
  watch: {
    '$i18n.locale'(val) {
      this.$i18n.setLocaleCookie(val)
      this.$i18n.setLocale(val)
      this.$axios.setHeader('X-Localization', val)
      this.$store.dispatch('app/setLocale', val)
      this.$router.replace(this.switchLocalePath(val))
    },
  },
}
</script>
