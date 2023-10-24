<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        Realice la búqueda de un usuario, selecciónelo y asígnelos.
        <validation-observer ref="register" v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(findUser)">
            <v-row justify="center">
              <v-col cols="12" md="12" sm="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.required"
                  vid="username"
                  name="nombre de usuario"
                >
                  <v-autocomplete
                    v-model="form.username"
                    name="username"
                    :loading="finding"
                    :search-input.sync="search_user"
                    :filter="filterUser"
                    :error-messages="errors"
                    hint="Realice la búsqueda por nombre de usuario, luego selecciónelo para mostrar los roles disponibles para asignar."
                    persistent-hint
                    :items="people"
                    color="primary"
                    label="Usuarios"
                    clearable
                    item-text="full_name"
                    item-value="id"
                    return-object
                    @change="setSelectedUser"
                  >
                    <template #item="data">
                      <v-list-item-avatar color="primary">
                        <span
                          class="white--text headline"
                          v-text="getInitials(data.item)"
                        />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-text="data.item.full_name" />
                        <v-list-item-subtitle
                          v-text="`C.C. ${data.item.document}`"
                        />
                      </v-list-item-content>
                    </template>
                    <template v-if="$vuetify.breakpoint.mdAndUp" #append-outer>
                      <v-btn
                        small
                        color="primary"
                        :loading="finding"
                        :disabled="finding"
                        type="submit"
                      >
                        <v-icon left>mdi-magnify</v-icon>
                        Buscar Usuario
                      </v-btn>
                    </template>
                  </v-autocomplete>
                </validation-provider>
              </v-col>
              <v-col v-if="$vuetify.breakpoint.smAndDown" cols="12" sm="12">
                <v-btn
                  small
                  color="primary"
                  :loading="finding"
                  :disabled="finding"
                  type="submit"
                >
                  <v-icon left>mdi-magnify</v-icon>
                  Buscar Usuario
                </v-btn>
              </v-col>
              <v-col v-if="selected_user.id" cols=" 12" md="12" sm="12">
                <p>{{ `${selected_user.full_name}` }}</p>
                <p>{{ `C.C. ${selected_user.document}` }}</p>
                <v-select
                  v-model="form.roles"
                  name="stage"
                  item-text="title"
                  clearable
                  item-value="name"
                  multiple
                  autocomplete="off"
                  :items="roles_data"
                  :loading="finding"
                  :readonly="finding"
                  prepend-icon="mdi-account"
                  menu-props="auto"
                  label="Asignar Rol"
                ></v-select>
                <v-btn
                  small
                  color="primary"
                  :loading="finding"
                  :disabled="finding || !form.roles"
                  @click="setRole"
                >
                  <v-icon left>mdi-account</v-icon> Asignar Rol
                </v-btn>
              </v-col>
            </v-row>
          </form>
        </validation-observer>
      </v-col>
      <v-col cols="12">
        <base-material-card class="mt-12" icon="mdi-account">
          <template #toolbar>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="card-title font-weight-light">
                Usuarios del Sistema
              </v-toolbar-title>
              <v-spacer />
              <time-ago
                :loading="finding"
                :prefix="$t('buttons.Updated')"
                classes="caption grey--text font-weight-light hidden-sm-and-down"
                :date-time="requested_at"
              />
              <v-menu offset-y left>
                <template #activator="{ on: menu, attrs }">
                  <v-tooltip left>
                    <template #activator="{ on: tooltip }">
                      <v-btn
                        :aria-label="$t('buttons.MoreOptions')"
                        icon
                        v-bind="attrs"
                        v-on="{ ...menu, ...tooltip }"
                      >
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t('buttons.MoreOptions') }}</span>
                  </v-tooltip>
                </template>
                <v-list dense>
                  <v-list-item @click="getUsers">
                    <v-list-item-icon>
                      <v-icon>mdi-refresh</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Refresh') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </template>
          <v-card-text>
            <v-skeleton-loader
              :loading="finding"
              type="list-item-avatar-two-line@10"
            >
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-expansion-panels>
                    <v-expansion-panel v-for="(user, i) in users" :key="i">
                      <v-expansion-panel-header>
                        {{ user.full_name }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="12" sm="12">
                            C.C. {{ user.document }}
                          </v-col>
                          <v-col cols="12" sm="12">
                            E-mail: {{ user.email }}
                          </v-col>
                          <v-col cols="12">
                            <v-list>
                              <v-list-item
                                v-for="role in user.roles"
                                :key="`${role.id}-${user.id}`"
                              >
                                <v-list-item-content>
                                  <v-list-item-title v-text="role.title" />
                                  <v-list-item-subtitle v-text="'Rol'" />
                                </v-list-item-content>
                                <v-list-item-action>
                                  <v-icon
                                    color="error"
                                    @click="onDelete([role.name], user.id)"
                                  >
                                    mdi-close
                                  </v-icon>
                                </v-list-item-action>
                              </v-list-item>
                            </v-list>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-skeleton-loader>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash';
import { Administrator } from "~/models/services/certifications/Administrator";
import { Menu } from "~/models/services/certifications/Menu";

export default {
  name: "CertificationsUsers",
  nuxtI18n: {
    paths: {
      en: '/certifications/users',
      es: '/certificaciones/usuarios'
    }
  },
  auth: 'auth',
  components: {
    BaseMaterialCard: () => import('~/components/base/MaterialCard.vue'),
    TimeAgo: () => import('~/components/base/TimeAgo.vue')
  },
  middleware: ['permissions'],
  data: () => ({
    finding: false,
    form: new Administrator(),
    users: [],
    roles_data: [],
    requested_at: null,
    search_user: null,
    people: [],
    selected_user: {}
  }),
  fetch() {
    this.getUsers()
    this.form
      .rolesData()
      .then((response) => {
        this.roles_data = response.data
      })
      .catch((errors) => {
        this.$snackbar({ message: errors.message })
      })
  },
  head: (vm) => ({
    title: vm.$t('certificates.titles.users')
  }),
  watch: {
    search_user(val) {
      return val && val.length > 3 && this.findUser(val)
    }
  },
  created() {
    this.drawerModel = new Menu()
  },
  paths: {
    en: '/certifications/users',
    es: '/certificaciones/usuarios',
  },
  meta: {
    title: 'certificates.titles.users',
    can: ['certifications-super-admin']
  },
  methods: {
    getUsers() {
      this.start()
      this.form
        .index()
        .then((response) => {
          this.users = response.data
          this.requested_at = response.requested_at
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    findUser(val) {
      this.start()
      this.form
        .findUser({ params: { username: val } })
        .then((response) => {
          this.people = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    filterUser(item, queryText) {
      const text = _.toLower(queryText)
      return _.filter(item, function (object) {
        return _(object).some(function (string) {
          return _(string).toLower().includes(text)
        })
      })
    },
    getInitials(item) {
      return `${(item.name.charAt(0) || '').toUpperCase()}${(
        item.surname.charAt(0) || ''
      ).toUpperCase()}`
    },
    setSelectedUser(item) {
      this.selected_user = item
    },
    onDelete(roles, user) {
      this.start()
      this.form
        .retractRole(user, { params: { roles } })
        .then((response) => {
          this.$snackbar({ message: response.data, color: 'success' })
        })
        .then(() => this.getUsers())
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    setRole() {
      if (this.selected_user.id) {
        this.start()
        this.form
          .assignRole(this.selected_user.id)
          .then((response) => {
            this.$snackbar({ message: response.data, color: 'success' })
          })
          .then(() => this.getUsers())
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => this.stop())
      } else {
        this.$snackbar({ message: 'Selecciona un rol para continuar.' })
      }
    },
    start() {
      this.finding = true
    },
    stop() {
      this.finding = false
    },
  }
}
</script>

<style scoped>

</style>
