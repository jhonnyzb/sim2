<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <material-card class="mt-12" icon="mdi-soccer-field">
          <template #toolbar>
            <v-toolbar flat color="transparent">
              <v-toolbar-title>Mobiliario</v-toolbar-title>
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
            <v-skeleton-loader :loading="loading" type="table">
              <v-data-table
                :headers="headersTable"
                :items="items"
                :options.sync="pagination"
                :loading="finding"
                :items-per-page.sync="itemsPerPage"
                :server-items-length="total"
                show-expand
                single-expand
                class="my-4"
              >
                <template #top>
                  <v-toolbar flat>
                    <v-spacer />
                    <v-tooltip top>
                      <template #activator="{ attrs, on }">
                        <v-btn
                          v-bind="attrs"
                          :aria-label="$t('buttons.Refresh')"
                          class="mx-1"
                          color="success"
                          icon
                          @click="getRecords"
                          v-on="on"
                        >
                          <v-icon>mdi-refresh</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $t('buttons.Refresh') }}</span>
                    </v-tooltip>
                  </v-toolbar>
                </template>
                <template #expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    <template v-for="(expanded_item, key) in headers_expand">
                      <v-row
                        v-if="item[expanded_item.value]"
                        :key="`expanded-${key}`"
                      >
                        <v-col
                          v-if="expanded_item.value !== 'image'"
                          cols="12"
                          sm="12"
                          md="6"
                        >
                          <div class="font-weight-bold">
                            {{ expanded_item.text }}
                          </div>
                        </v-col>
                        <v-col
                          v-if="expanded_item.value !== 'image'"
                          cols="12"
                          sm="12"
                          md="6"
                        >
                          {{ item[expanded_item.value] }}
                        </v-col>
                        <v-col
                          v-else
                          cols="12"
                          align-self="center"
                          class="text-center justify-center mx-auto"
                          sm="12"
                          md="12"
                        >
                          <v-col cols="12" md="12" class="mx-auto">
                            <v-img
                              v-if="showImage"
                              :max-width="
                                $vuetify.breakpoint.mdAndUp ? '400' : '180'
                              "
                              aspect-ratio="16/9"
                              class="text-center justify-center align-center"
                              :lazy-src="item[expanded_item.value]"
                              :src="item[expanded_item.value]"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            class="mx-auto text-center"
                          >
                            <v-btn
                              :aria-label="`${$t('buttons.ViewImage')}`"
                              :x-small="$vuetify.breakpoint.smAndDown"
                              text
                              @click="reloadImage"
                            >
                              <v-icon left>mdi-refresh</v-icon>
                              {{ $t('buttons.ViewImage') }}
                            </v-btn>
                            <v-btn
                              :aria-label="$t('buttons.OpenInNewWindow')"
                              :x-small="$vuetify.breakpoint.smAndDown"
                              text
                              :href="item[expanded_item.value]"
                              target="_blank"
                            >
                              <v-icon v-if="$vuetify.breakpoint.mdAndUp" left>
                                mdi-image-outline
                              </v-icon>
                              {{ `${$t('buttons.OpenInNewWindow')}` }}
                            </v-btn>
                          </v-col>
                        </v-col>
                      </v-row>
                    </template>
                  </td>
                </template>
              </v-data-table>
            </v-skeleton-loader>
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from '~/components/base/MaterialCard'
import { Park } from '~/models/services/parks/Park'
import { Menu } from '~/models/services/parks/Menu'
import { Api } from '~/models/Api'
export default {
  name: 'furniture',
  nuxtI18n: {
    paths: {
      en: '/parks/:id/furniture',
      es: '/parques/:id/mobiliario',
    },
  },
  components: {
    MaterialCard,
  },
  middleware: ['permissions'],
  meta: {
    permissionsUrl: Api.END_POINTS.PARKS_PERMISSIONS(),
    title: 'parks.titles.details',
  },
  created() {
    this.drawerModel = new Menu()
  },
  data: () => ({
    loading: false,
    form: new Park(),
    items: [],
    total: 0,
    pagination: {},
    itemsPerPage: 10,
    model: new Park(),
    finding: false,
    showImage: true,
  }),
  fetch() {
    this.getRecords()
  },
  methods: {
    getRecords() {
      this.loading = true
      const params = {
        page: this.pagination.page,
        per_page: this.itemsPerPage,
      }
      this.form
        .furnishings(this.$route.params.id, { params })
        .then((response) => {
          this.items = response.data
          this.total = response.meta.total
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.loading = false
        })
    },
    reloadImage() {
      this.showImage = false
      this.$nextTick(function () {
        this.showImage = true
      })
    },
  },
  computed: {
    headersTable() {
      return [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: this.$t('parks.furniture.furniture'),
          align: 'start',
          sortable: false,
          value: 'furniture',
        },
        {
          text: this.$t('parks.furniture.material'),
          align: 'start',
          sortable: false,
          value: 'material',
        },
        {
          text: this.$t('parks.furniture.good'),
          align: 'start',
          sortable: false,
          value: 'good',
        },
        {
          text: this.$t('parks.furniture.regular'),
          align: 'start',
          sortable: false,
          value: 'regular',
        },
        {
          text: this.$t('parks.furniture.bad'),
          align: 'start',
          sortable: false,
          value: 'bad',
        },
        {
          text: this.$t('parks.furniture.total'),
          align: 'start',
          sortable: false,
          value: 'total',
        },
      ]
    },
    headers_expand() {
      return [
        {
          text: this.$t('parks.furniture.description'),
          align: 'start',
          sortable: false,
          value: 'description',
        },
        {
          text: this.$t('parks.furniture.image'),
          align: 'start',
          sortable: true,
          value: 'image',
        },
        {
          text: this.$t('parks.furniture.created_at'),
          align: 'start',
          sortable: true,
          value: 'created_at',
        },
        {
          text: this.$t('parks.endowment.updated_at'),
          align: 'start',
          sortable: true,
          value: 'updated_at',
        },
      ]
    },
  },
  watch: {
    'pagination.page'(newVal, oldVal) {
      this.getRecords()
    },
    itemsPerPage(newVal, oldVal) {
      this.getRecords()
    },
  },
}
</script>
