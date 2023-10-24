<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <base-material-card
          class="mt-6"
          icon="mdi-account-question"
          color="primary"
          title="Solicitudes"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4" sm="12">
                <v-switch
                  v-model="filters.solved"
                  :loading="finding"
                  :disabled="finding"
                  value="true"
                  label="Solucionados"
                  @change="onSearch"
                />
              </v-col>
            </v-row>
            <v-skeleton-loader
              ref="skeleton"
              :loading="finding"
              transition="scale-transition"
              type="table"
              class="mx-auto"
            >
              <v-data-table
                v-model="selected"
                :items="items"
                :headers="headers"
                :items-per-page.sync="itemsPerPage"
                :options.sync="pagination"
                :server-items-length="total"
                item-key="id"
                :footer-props="{ 'items-per-page-options': itemsPerPageArray }"
              >
                <template #top>
                  <v-toolbar flat color="transparent">
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      clearable
                      label="Buscar por número de documento"
                      persistent-hint
                      hint="Digite el número de documento y después de clic sobre la lupa para buscar"
                      @click:append="onSearch"
                      @click:clear="onClearSearch"
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-tooltip top>
                      <template #activator="{ on }">
                        <v-btn
                          color="primary"
                          class="mr-2 my-2"
                          :loading="finding"
                          :disabled="finding"
                          fab
                          small
                          v-on="on"
                          @click="getData"
                        >
                          <v-icon color="white" dark>mdi-reload</v-icon>
                        </v-btn>
                      </template>
                      <span>Recargar</span>
                    </v-tooltip>
                    <v-btn
                      class="my-2 hidden-sm-and-down"
                      color="primary"
                      @click="onExcel"
                    >
                      <v-icon color="white" left dark>
                        mdi-cloud-download
                      </v-icon>
                      Descargar Excel
                    </v-btn>
                  </v-toolbar>
                </template>
                <template #[`item.view`]="{ item }">
                  <v-tooltip top>
                    <template #activator="{ on, attrs}">
                      <v-btn
                        icon
                        color="primary"
                        v-bind="attrs"
                        :to="localePath({
                          name: 'certifications-supports-id-support',
                          params: { id: item.id },
                        })"
                        v-on="on"
                      >
                        <v-icon>mdi-eye</v-icon>
                      </v-btn>
                    </template>
                    <span>Ver</span>
                  </v-tooltip>
                </template>
                <template #[`item.state`]="{ item }">
                  <v-chip
                    :color="getColor(item.state)"
                    dark
                  >
                    <v-icon
                      left
                      v-text="getIcon(item.state)"
                    ></v-icon>
                    {{ item.state }}
                  </v-chip>
                </template>
              </v-data-table>
            </v-skeleton-loader>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {Support} from "~/models/services/certifications/Support";
import {Menu} from "~/models/services/certifications/Menu";

export default {
  name: "CertificationsSupports",
  nuxtI18n: {
    paths: {
      en: '/certifications/supports',
      es: '/certificaciones/soportes'
    }
  },
  auth: 'auth',
  components: {
    BaseMaterialCard: () => import('@/components/base/MaterialCard')
  },
  data: () => ({
    finding: false,
    headers: [],
    items: [],
    total: 0,
    pagination: {},
    itemsPerPage: 10,
    itemsPerPageArray: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    selected: [],
    search: null,
    form: new Support(),
    filters: {
      solved: null,
    }
  }),
  fetch() {
    //
  },
  head: (vm) => ({
    title: vm.$t('certificates.titles.requests')
  }),
  watch: {
    'pagination.page'() {
      return this.getData()
    },
    itemsPerPage() {
      return this.getData()
    },
  },
  created() {
    this.drawerModel = new Menu()
  },
  methods: {
    onSearch() {
      this.pagination.page = 1
      this.getData()
    },
    onClearSearch() {
      this.search = null
      this.filters.solved = null
      this.getData()
    },
    getData() {
      if (this.$route.query) {
        this.filters = {
          ...this.filters,
          ...this.$route.query
        }
      }
      const params = {
        query: this.search,
        page: this.pagination.page,
        per_page: this.itemsPerPage,
        ...this.filters
      }
      this.start()
      this.form
        .index({ params })
        .then((response) => {
          this.items = response.data
          this.total = response.meta.total
          this.headers = response.details.headers
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.$router.push({ path: this.$route.path })
          this.stop()
        })
    },
    getColor(state) {
      if (state === 'Pendiente') return 'error'
      else return 'success'
    },
    getIcon(state) {
      if (state === 'Pendiente') return 'mdi-close'
      else return 'mdi-check'
    },
    onExcel() {
      this.$router.push(this.localePath({ name: 'certifications-reports'}))
    },
    start() {
      this.finding = true
    },
    stop() {
      this.finding = false
    },
  },
}
</script>

<style scoped>

</style>
