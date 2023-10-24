<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <material-card class="mt-12" icon="mdi-soccer-field">
          <template #toolbar>
            <v-toolbar flat color="transparent">
              <v-toolbar-title>Actividades Recreación</v-toolbar-title>
              <v-spacer />
              <v-toolbar-items>
                <v-btn
                  text
                  :to="
                    localePath({
                      name: 'parks-id-details',
                      params: { id: $route.params.id },
                    })
                  "
                >
                  <v-icon left>mdi-arrow-left</v-icon>
                  Regresar
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
          </template>
          <v-card-text>
            <recreation-calendar />
          </v-card-text>
          <v-card-text>
            <v-toolbar-title>Actividades Deportes</v-toolbar-title>
            <v-skeleton-loader
              :loading="loading"
              type="heading, list-item-avatar-three-line@6"
            >
              <v-data-iterator
                :items="items"
                :items-per-page.sync="itemsPerPage"
                :options.sync="pagination"
                item-key="id"
                :server-items-length="total"
                :loading="loading"
                :footer-props="{ 'items-per-page-options': itemsPerPageArray }"
              >
                <template v-slot:default="props">
                  <v-list subheader three-line>
                    <v-subheader
                      inset
                      v-text="$tc('label.result', total, { qty: total })"
                    />
                    <v-list-item
                      v-for="item in props.items"
                      :key="item.id"
                      ripple
                    >
                      <v-list-item-avatar>
                        <v-avatar color="grey">
                          <v-icon dark>mdi-soccer</v-icon>
                        </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-subtitle class="caption">
                          <v-icon small left>mdi-bookmark-multiple</v-icon>
                          {{ item.program_name }}
                        </v-list-item-subtitle>
                        <v-list-item-title
                          class="primary--text display-serif-1 font-weight-bold"
                        >
                          {{ item.activity_name }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="caption">
                          <v-icon small left>mdi-pin</v-icon>
                          {{ item.stage_name }}
                          {{ `- ${item.park_address || ''}` }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle class="caption">
                          <v-chip v-if="!!item.park_code" small>
                            <v-icon x-small left>mdi-open-in-new</v-icon>
                            {{
                              `${item.park_code || ''} - ${
                                item.park_name || ''
                              }`
                            }}
                          </v-chip>
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                          <v-chip-group column>
                            <v-chip
                              :color="item.is_paid ? 'success' : ''"
                              small
                            >
                              <v-icon small left>
                                {{
                                  item.is_paid
                                    ? 'mdi-currency-usd'
                                    : 'mdi-currency-usd-off'
                                }}
                              </v-icon>
                              {{ item.is_paid ? 'Pago' : 'Gratuito' }}
                            </v-chip>
                            <v-chip color="primary" small>
                              <v-icon small left>mdi-pound</v-icon>
                              Cupos: {{ item.quota }}
                            </v-chip>
                            <v-chip
                              v-if="item.quota - item.users_schedules_count > 0"
                              small
                              color="success"
                            >
                              <v-icon left small>mdi-clock</v-icon>
                              Quedan
                              {{ item.quota - item.users_schedules_count }}
                              cupos.
                            </v-chip>
                            <v-chip
                              v-if="
                                item.quota - item.users_schedules_count <= 0
                              "
                              small
                            >
                              <v-icon left small>mdi-playlist-remove</v-icon>
                              Todos los cupos han sido tomados
                            </v-chip>
                            <v-chip small>
                              <v-icon small left>
                                mdi-human-male-female-child
                              </v-icon>
                              Edades: {{ item.min_age }} - {{ item.max_age }}
                            </v-chip>
                            <v-chip small>
                              <v-icon small left>mdi-calendar</v-icon>
                              Horarios: {{ item.weekday_name }} -
                              {{ item.daily_name }}
                            </v-chip>
                          </v-chip-group>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </template>
                <template #no-data>
                  <empty-state
                    class="my-2"
                    :rounded="$vuetify.breakpoint.mdAndUp"
                    icon="mdi-alphabetical-off"
                    :label="$t('label.no_data')"
                    :description="$t('label.no_data_desc')"
                  />
                </template>
                <template #no-results>
                  <empty-state
                    class="my-2"
                    icon="mdi-alphabetical-off"
                    :label="$tc('label.result', 0)"
                  />
                </template>
              </v-data-iterator>
            </v-skeleton-loader>
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from '~/components/base/MaterialCard'
import RecreationCalendar from '~/components/parks/RecreationCalendar'
import { Park } from '~/models/services/parks/Park'
import EmptyState from '~/components/base/EmptyState'
import { Menu } from '~/models/services/parks/Menu'
import { Api } from '~/models/Api'
export default {
  name: 'activities',
  nuxtI18n: {
    paths: {
      en: '/parks/:id/activities',
      es: '/parques/:id/actividades',
    },
  },
  middleware: ['permissions'],
  meta: {
    permissionsUrl: Api.END_POINTS.PARKS_PERMISSIONS(),
    title: 'parks.titles.details',
  },
  created() {
    this.drawerModel = new Menu()
  },
  components: {
    EmptyState,
    RecreationCalendar,
    MaterialCard,
  },
  fetch() {
    this.getRecords()
  },
  data: () => ({
    form: new Park(),
    loading: false,
    total: 0,
    items: [],
    itemsPerPage: 10,
    itemsPerPageArray: [10, 15, 20, 25, 30],
    pagination: {},
  }),
  methods: {
    getRecords() {
      this.loading = true
      const { page } = this.pagination
      const params = {
        park_code: [this.$route.params.id],
        page,
        per_page: this.itemsPerPage,
      }
      this.form.resetOnlyWhenUpdate = false
      this.form
        .events({ params })
        .then((response) => {
          this.items = response.data
          this.total = response.meta.total
        })
        .catch((errors) => {
          this.$snackbar.add({
            color: 'error',
            icon: 'mdi-bell-plus',
            message: errors.message,
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  watch: {
    'pagination.page'() {
      this.getRecords()
    },
    itemsPerPage(newVal, oldVal) {
      this.getRecords()
    },
  },
}
</script>
