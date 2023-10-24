<template>
  <v-skeleton-loader
    :loading="loading"
    type="list-item-avatar-three-line@6"
    width="100%"
  >
    <v-row class="ma-0 pa-0" dense>
      <v-col v-if="!!paginate" class="ma-0 pa-0" cols="12" sm="12">
        <v-list class="ma-0 pa-0" two-line>
          <v-list-item
            v-for="(key, i) in paginatedKeys"
            :key="i"
            class="ma-0 pa-0"
            :href="files(key)"
            :target="!!files(key) ? '_blank' : undefined"
          >
            <v-list-item-avatar>
              <v-icon v-text="`mdi-${icons[key]}`" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="park[key]" />
              <v-list-item-subtitle
                class="font-weight-bold"
                v-text="$t(`parks.park.${key}`)"
              />
            </v-list-item-content>
            <v-list-item-action v-if="!!files(key)">
              <v-list-item-action-text v-text="$t('buttons.Download')" />
              <v-icon color="primary">mdi-cloud-download</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-group v-model="more" class="ma-0 pa-0">
            <template #activator>
              <v-list-item-avatar>
                <v-icon
                  v-text="`mdi-${more ? 'minus' : 'plus'}-circle-outline`"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  v-text="$t(`buttons.View${more ? 'Less' : 'More'}`)"
                />
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(key, i) in hiddenKeys"
              :key="i"
              class="ma-0 pa-0"
              :href="files(key)"
              :target="!!files(key) ? '_blank' : undefined"
            >
              <v-list-item-avatar>
                <v-icon v-text="`mdi-${icons[key]}`" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="park[key]" />
                <v-list-item-subtitle
                  class="font-weight-bold"
                  v-text="$t(`parks.park.${key}`)"
                />
              </v-list-item-content>
              <v-list-item-action v-if="!!files(key)">
                <v-list-item-action-text v-text="$t('buttons.Download')" />
                <v-icon color="primary">mdi-cloud-download</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
      <v-col
        v-for="(key, i) in keys"
        v-else
        :key="i"
        class="ma-0 pa-0"
        cols="12"
        :md="columns(key)"
        sm="12"
      >
        <v-list class="ma-0 pa-0" two-line>
          <v-list-item
            class="ma-0 pa-0"
            :href="files(key)"
            :target="!!files(key) ? '_blank' : undefined"
          >
            <v-list-item-avatar>
              <v-icon v-text="`mdi-${icons[key]}`" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="park[key]" />
              <v-list-item-subtitle
                class="font-weight-bold"
                v-text="$t(`parks.park.${key}`)"
              />
            </v-list-item-content>
            <v-list-item-action v-if="!!files(key)">
              <v-list-item-action-text v-text="$t('buttons.Download')" />
              <v-icon color="primary">mdi-cloud-download</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'ParkData',
  inject: ['theme'],
  props: {
    paginate: {
      type: Number,
      default: undefined,
    },
    park: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
    },
  },
  data: () => ({
    more: false,
    icons: {
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
      scale: 'relative-scale',
      area: 'aspect-ratio',
      area_hectare: 'aspect-ratio',
      green_area: 'pine-tree',
      grey_area: 'chart-tree',
      capacity: 'human-capacity-increase',
      general_status: 'list-status',
      enclosure: 'door-closed',
      households: 'home-group',
      zone_type: 'home-city-outline',
      walking_trails: 'highway',
      walking_trails_status: 'list-status',
      access_roads: 'highway',
      access_roads_status: 'list-status',
      children_population: 'human-child',
      youth_population: 'human-male-female',
      older_population: 'teach',
      admin: 'domain',
      admin_name: 'face',
      pqrs: 'at',
      email: 'email',
      phone: 'phone',
      vigilance: 'security',
      received: 'domain',
      stage_type: 'home-city-outline',
      regulation: 'image-filter-hdr',
      status: 'list-status',
      vocation: 'book-check',
      concept: 'file-pdf-outline',
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
      visited_at: 'calendar',
    },
  }),
  computed: {
    keys() {
      return Object.keys(this.icons).filter((key) => !!this.park[key])
    },
    paginatedKeys() {
      return Object.keys(this.icons).filter(
        (key, i) => !!this.park[key] && i < this.paginate
      )
    },
    hiddenKeys() {
      return Object.keys(this.icons).filter(
        (key, i) => !!this.park[key] && i >= this.paginate
      )
    },
  },
  methods: {
    columns(key) {
      const keys = [
        // 'schedule_service',
        // 'schedule_admin',
        'general_info',
        'sports_equipment',
        'recreational_equipment',
        'additional_services',
        'general_conditions',
        'loan_application',
        'social_management',
        'recreation_activities',
      ]
      return keys.includes(key) ? 6 : 12
    },
    files(key) {
      if (key === 'concept') {
        return this.park.file ? this.park.file : undefined
      }
      if (key === 'regulation') {
        return this.park.regulation_file ? this.park.regulation_file : undefined
      }
      return undefined
    },
  },
}
</script>
