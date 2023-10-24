<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <material-card class="mt-12" icon="mdi-soccer-field">
          <template #toolbar>
            <v-toolbar flat color="transparent">
              <v-toolbar-title>Gestión Social</v-toolbar-title>
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
            <v-skeleton-loader
              :loading="loading"
              type="heading, list-item-avatar-three-line@6"
              width="100%"
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
                  <v-row dense>
                    <v-col
                      v-for="item in props.items"
                      :key="item.id"
                      cols="12"
                      md="6"
                      sm="12"
                      class="mx-auto"
                    >
                      <v-card class="mx-auto elevation-3">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-account</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title
                              v-if="item.title"
                              class="headline"
                              v-text="item.title"
                            />
                            <v-list-item-subtitle v-text="item.professional" />
                            <v-list-item-subtitle v-text="item.date" />
                          </v-list-item-content>
                        </v-list-item>
                        <v-carousel
                          v-if="item.images.length > 0"
                          height="300"
                          hide-delimiters
                        >
                          <v-carousel-item
                            cycle
                            progress
                            v-for="(image, i) in item.images"
                            :key="`image_${i}`"
                            :alt="item.reunion_type || item.title"
                            :src="image"
                            :lazy-src="image"
                          >
                          </v-carousel-item>
                        </v-carousel>
                        <v-card-text>
                          {{ item.objective }}
                        </v-card-text>
                        <v-list-item v-if="item.process">
                          <v-list-item-content>
                            <v-list-item-title
                              class="headline"
                              v-text="item.process"
                            />
                            <v-list-item-subtitle
                              v-text="$t('parks.social.process')"
                            />
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="item.who_summons">
                          <v-list-item-content>
                            <v-list-item-title
                              class="headline"
                              v-text="item.who_summons"
                            />
                            <v-list-item-subtitle
                              v-text="$t('parks.social.who_summons')"
                            />
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="item.reunion_type">
                          <v-list-item-content>
                            <v-list-item-title
                              class="headline"
                              v-text="item.reunion_type"
                            />
                            <v-list-item-subtitle
                              v-text="$t('parks.social.reunion_type')"
                            />
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="item.activities">
                          <v-list-item-content>
                            <v-list-item-title
                              class="headline"
                              v-text="item.activities"
                            />
                            <v-list-item-subtitle
                              v-text="$t('parks.social.activities')"
                            />
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="item.place">
                          <v-list-item-content>
                            <v-list-item-title
                              class="headline"
                              v-text="item.place"
                            />
                            <v-list-item-subtitle
                              v-text="$t('parks.social.place')"
                            />
                          </v-list-item-content>
                        </v-list-item>
                        <v-card-text v-if="item.files.length > 0">
                          <v-chip
                            v-for="(file, index) in item.files"
                            :key="`file_${index}`"
                            :href="file.file"
                            target="_blank"
                            small
                            :aria-label="file.type"
                          >
                            <v-icon left>mdi-file</v-icon>
                            {{ file.type }}
                          </v-chip>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
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
import { Park } from '~/models/services/parks/Park'
import { Menu } from '~/models/services/parks/Menu'
import { Api } from '~/models/Api'
export default {
  name: 'furniture',
  nuxtI18n: {
    paths: {
      en: '/parks/:id/social',
      es: '/parques/:id/gestion-social',
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
    itemsPerPageArray: [10, 15, 20, 25, 30],
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
        .social(this.$route.params.id, { params })
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
