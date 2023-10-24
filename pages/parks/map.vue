<template>
  <section class="v-map-bg">
    <div class="v-map-bg__google">
      <v-lottie v-if="loadingMap" :animation-data="animation" loop auto-play />
      <v-query-map
        v-else
        ref="mapEsri"
        :iframe="iframe"
        :layer="layer"
        :query="query"
        style="width: 100%; height: 90vh"
      >
        <v-card flat width="100%">
          <v-toolbar rounded>
            <v-autocomplete
              v-model="code"
              :items="items"
              :loading="finding"
              :filter="customFilterPark"
              clearable
              :label="$t('parks.label.search')"
              :search-input.sync="search"
              item-text="name"
              item-value="code"
              class="mt-1"
              prepend-icon="mdi-magnify"
              hide-details
            >
              <template #item="{ item }">
                <v-list-item-avatar>
                  <v-avatar :color="item.color">
                    <v-icon dark>mdi-pine-tree</v-icon>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name" />
                  <v-list-item-subtitle v-text="item.code" />
                </v-list-item-content>
              </template>
            </v-autocomplete>
            <v-spacer />
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  :aria-label="$t('buttons.View')"
                  icon
                  :loading="finding"
                  :disabled="!code || finding"
                  v-bind="attrs"
                  :to="
                    localePath({
                      name: 'parks-id-details',
                      params: { id: code },
                    })
                  "
                  v-on="on"
                >
                  <v-icon>mdi-format-float-left</v-icon>
                </v-btn>
              </template>
              <span>
                {{ `${$t('buttons.View')} ${$t('buttons.Details')}` }}
              </span>
            </v-tooltip>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  :aria-label="$t('buttons.MoreOptions')"
                  icon
                  :loading="finding"
                  :disabled="finding"
                  v-bind="attrs"
                  v-on="on"
                  @click="show = !show"
                >
                  <v-icon>
                    {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ $t('buttons.MoreOptions') }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  :aria-label="$t('buttons.Refresh')"
                  icon
                  :loading="finding"
                  :disabled="finding"
                  v-bind="attrs"
                  v-on="on"
                  @click="esriConfig"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('buttons.Refresh') }}</span>
            </v-tooltip>
          </v-toolbar>
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>
                <v-radio-group v-model="query">
                  <v-radio
                    v-for="(type, i) in park_types"
                    :key="i"
                    :value="type.value"
                  >
                    <template #label>
                      <v-avatar left size="12" :style="type.style" />
                      <span class="ml-2">{{ type.name }}</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-query-map>
    </div>
  </section>
</template>

<router lang="yaml">
meta:
  title: parks.titles.map
</router>

<script>
import _ from 'lodash'
import * as world from '@/static/lottie/map.json'
import VQueryMap from '@/components/parks/VQueryMap'
import VLottie from '~/components/base/Lottie'
import { Park } from '~/models/services/parks/Park'
import { Menu } from '~/models/services/parks/Menu'
import esriBase from '~/utils/esriBase'
export default {
  name: 'Map',
  nuxtI18n: {
    paths: {
      en: '/parks/map',
      es: '/parques/mapa',
    },
  },
  components: {
    VLottie,
    VQueryMap,
  },
  head: (vm) => ({
    title: vm.$t('parks.titles.map'),
  }),
  created() {
    this.drawerModel = new Menu()
  },
  fetch() {
    this.esriConfig()
  },
  data: () => ({
    loadingMap: false,
    animation: world.default,
    finding: false,
    form: new Park(),
    code: null,
    search: null,
    query: null,
    show: false,
    park_types: esriBase.park_types,
    iframe: esriBase.iframe,
    layer: esriBase.layer,
    param: esriBase.param,
    items: [],
  }),
  computed: {
    styles() {
      return this.$vuetify.breakpoint.mdAndUp ? 'left: 1%' : ''
    },
  },
  watch: {
    search(val) {
      return val && val.length > 3 && this.findPark()
    },
    code() {
      return this.byCode()
    },
  },
  methods: {
    esriConfig() {
      this.loadingMap = true
      this.form
        .esri()
        .then((response) => {
          this.layer = response.data.layer
          this.iframe = response.data.iframe
          this.param = response.data.param
          this.park_types = response.data.park_types
        })
        .finally(() => {
          this.loadingMap = false
        })
    },
    byCode() {
      if (this.code) {
        this.query = `${this.param}'${this.code}'`
      } else {
        this.query = null
      }
    },
    findPark: _.debounce(function () {
      this.finding = true
      const params = {
        query: this.search,
        per_page: 30,
      }
      this.form
        .index({ params })
        .then((response) => {
          this.items = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding = false
        })
    }, 300),
    customFilterPark(item, queryText, itemText) {
      const text = _.toLower(queryText)
      return _.filter(item, function (object) {
        return _(object).some(function (string) {
          return _(string).toLower().includes(text)
        })
      })
    },
  },
}
</script>

<style lang="sass">
.v-map-bg
  position: relative
  background-size: cover
  background-position: center
  overflow: hidden
  min-height: 100vh
  .v-map-bg__google
    position: absolute
    margin: 0
    width: 100%
    height: 100%
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
.v-video-bg__content
  position: absolute
  top: 0
</style>
