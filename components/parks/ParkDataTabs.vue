<template>
  <v-skeleton-loader
    :loading="loading"
    type="list-item-avatar-three-line@6"
    width="100%"
  >
    <v-expansion-panels v-model="panels" hover flat multiple focusable>
      <slot name="prepend-panel" />
      <v-expansion-panel v-for="(item, i) in items" :key="i">
        <v-expansion-panel-header ripple>
          <h1 class="display-serif-1">
            <v-icon v-if="!!item.icon" left v-text="item.icon" />
            {{ item.title }}
          </h1>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="ma-0 pa-0" dense>
            <template v-for="(key, i) in item.keys">
              <v-col
                v-if="!!park[key]"
                :key="i"
                class="ma-0 pa-0"
                cols="12"
                :md="flex(key)"
                sm="12"
              >
                <v-divider v-if="key === 'divider'" class="my-2" />
                <v-list v-else-if="!custom(key)" class="ma-0 pa-0" two-line>
                  <v-list-item
                    class="ma-0 pa-0"
                    :href="files(key)"
                    :target="!!files(key) ? '_blank' : undefined"
                  >
                    <v-list-item-avatar>
                      <v-icon v-text="`mdi-${icons[key]}`" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        style="white-space: break-spaces"
                        v-text="park[key] || $t('texts.Empty')"
                      />
                      <v-list-item-subtitle
                        class="font-weight-bold"
                        v-text="$t(`parks.park.${key}`)"
                      />
                    </v-list-item-content>
                    <v-list-item-action v-if="!!files(key)">
                      <v-tooltip top>
                        <template #activator="{ on }">
                          <v-icon color="primary" v-on="on">
                            mdi-cloud-download
                          </v-icon>
                        </template>
                        <i18n path="buttons.Download" tag="span" />
                      </v-tooltip>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
                <template v-else>
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon v-text="`mdi-map`" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-text="$t('parks.titles.map')" />
                      </v-list-item-content>
                      <v-list-item-action>
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
                            <v-list-item @click="onReloadMap">
                              <v-list-item-icon>
                                <v-icon>mdi-refresh</v-icon>
                              </v-list-item-icon>
                              <v-list-item-title>
                                {{ $t('buttons.Refresh') }}
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item
                              :aria-label="$t('buttons.OpenInNewWindow')"
                              :href="frame"
                              target="_blank"
                            >
                              <v-list-item-icon>
                                <v-icon>mdi-aspect-ratio</v-icon>
                              </v-list-item-icon>
                              <v-list-item-title>
                                {{ $t('buttons.OpenInNewWindow') }}
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                  <v-lottie
                    v-if="loadingMap"
                    :animation-data="animation"
                    loop
                    auto-play
                  />
                  <v-query-map
                    v-else
                    ref="esri"
                    :layer="layer"
                    style="height: 350px"
                    :iframe="iframe"
                    :query="`${param}'${park.code}'`"
                  />
                </template>
              </v-col>
            </template>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <slot name="append-panel" />
    </v-expansion-panels>
  </v-skeleton-loader>
</template>

<script>
import * as world from '@/static/lottie/map.json'
import VLottie from '~/components/base/Lottie'
import esriBase from '~/utils/esriBase'
import { Park } from '~/models/services/parks/Park'

export default {
  name: 'ParkDataTabs',
  inject: ['theme'],
  components: {
    VQueryMap: () => import('@/components/parks/VQueryMap'),
    VLottie,
  },
  props: {
    park: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
    },
  },
  fetch() {
    this.esriConfig()
  },
  data: (vm) => ({
    panels: [0],
    loadingMap: false,
    animation: world.default,
    iframe: {
      ...esriBase.iframe,
    },
    layer: {
      ...esriBase.layer,
    },
    param: esriBase.param,
    map: new Park(),
    icons: {
      // Información general
      code: 'pound',
      name: 'pine-tree',
      locality: 'map-marker',
      upz: 'crosshairs-gps',
      block: 'home-city',
      urbanization: 'map-marker',
      address: 'routes',
      stratum: 'layers',
      latitude: 'latitude',
      longitude: 'longitude',
      // Área y capacidad del parque
      area_hectare: 'aspect-ratio',
      area: 'aspect-ratio',
      green_area: 'pine-tree',
      grey_area: 'chart-tree',
      capacity: 'human-capacity-increase',
      children_population: 'human-child',
      youth_population: 'human-male-female',
      older_population: 'human-cane',
      // Accesibilidad
      enclosure: 'door-closed',
      households: 'home-group',
      walking_trails: 'highway',
      walking_trails_status: 'list-status',
      access_roads: 'highway',
      access_roads_status: 'list-status',
      zone_type: 'home-city-outline',
      // Detalles del Parque
      scale: 'relative-scale',
      regulation: 'image-filter-hdr',
      regulation_file: 'image-filter-hdr',
      visited_at: 'calendar',
      general_status: 'list-status',
      stage_type: 'home-city-outline',
      status: 'list-status',
      concept: 'file',
      vigilance: 'security',
      received: 'domain',
      vocation: 'book-check',
      // Información de contácto
      admin: 'domain',
      admin_name: 'face-agent',
      phone: 'phone',
      email: 'email',
      pqrs: 'at',
      // Otros
      schedule_service: 'calendar',
      schedule_admin: 'calendar',
      social_management: 'account-multiple',
      recreation_activities: 'human-male-child',
      general_info: 'text',
      sports_equipment: 'soccer',
      recreational_equipment: 'inbox-full',
      additional_services: 'format-list-text',
      general_conditions: 'information-outline',
      loan_application: 'soccer-field',
    },
    items: [
      {
        title: vm.$t('parks.expansion.general'),
        icon: 'mdi-information-outline',
        keys: [
          'code',
          'name',
          'locality',
          'upz',
          'block',
          'urbanization',
          'address',
          'stratum',
          'latitude',
          'longitude',
          'divider',
          'map',
        ],
      },
      {
        title: vm.$t('parks.expansion.details'),
        icon: 'mdi-book-information-variant',
        keys: [
          'scale',
          'visited_at',
          'general_status',
          'stage_type',
          'status',
          'vigilance',
          'received',
          'vocation',
          'regulation',
        ],
      },
      {
        title: vm.$t('parks.expansion.contact'),
        icon: 'mdi-card-account-phone-outline',
        keys: ['admin', 'admin_name', 'phone', 'email', 'pqrs'],
      },
      {
        title: vm.$t('parks.expansion.area'),
        icon: 'mdi-soccer-field',
        keys: [
          'area_hectare',
          'area',
          'green_area',
          'grey_area',
          'divider',
          'capacity',
          'children_population',
          'youth_population',
          'older_population',
        ],
      },
      {
        title: vm.$t('parks.expansion.access'),
        icon: 'mdi-routes',
        keys: [
          'enclosure',
          'households',
          'walking_trails',
          'walking_trails_status',
          'access_roads',
          'access_roads_status',
          'zone_type',
        ],
      },
      {
        title: vm.$t('parks.expansion.files'),
        icon: 'mdi-file-document-multiple-outline',
        keys: ['regulation_file', 'concept'],
      },
    ],
  }),
  methods: {
    esriConfig() {
      this.loadingMap = true
      this.map
        .esri()
        .then((response) => {
          this.layer = response.data.layer
          this.iframe = response.data.iframe
          this.param = response.data.param
        })
        .finally(() => {
          this.loadingMap = false
        })
    },
    onReloadMap() {
      this.esriConfig()
    },
    files(key) {
      if (key === 'concept') {
        return this.park.file ? this.park.file : undefined
      }
      if (key === 'regulation_file') {
        return this.park.regulation_file ? this.park.regulation_file : undefined
      }
      return undefined
    },
    flex(key) {
      return ['divider', 'map', 'area_bars', 'population_bars'].includes(key)
        ? '12'
        : '6'
    },
    custom(key) {
      return ['map'].includes(key)
    },
  },
  computed: {
    themeFrame() {
      const { url, dark, light } = this.iframe
      return this.$vuetify.theme.dark ? `${url}${dark}` : `${url}${light}`
    },
    frame() {
      const query = this.park.code
        ? `${this.iframe.filter}${this.param}'${this.park.code}'`
        : ''
      return `${this.themeFrame}${query}`
    },
  },
}
</script>
