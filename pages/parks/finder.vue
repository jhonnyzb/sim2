<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col class="mb-4" cols="12">
        <v-card flat>
          <v-card-text>
            <validation-observer ref="basic" v-slot="{ handleSubmit }">
              <v-form @submit.prevent="handleSubmit(onSearch)">
                <v-row dense>
                  <v-col cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      :rules="{ required: !form.park_type && !form.location }"
                      vid="query"
                      :name="$t('parks.label.parks').toLowerCase()"
                    >
                      <v-text-field
                        id="query"
                        v-model="form.query"
                        name="query"
                        :error-messages="errors"
                        :loading="finding"
                        :readonly="finding"
                        prepend-icon="mdi-pine-tree"
                        menu-props="auto"
                        :hint="$t('parks.help.parks')"
                        persistent-hint
                        :label="$t('parks.label.parks')"
                        required
                        clearable
                      >
                        <template
                          v-if="$vuetify.breakpoint.mdAndUp"
                          #append-outer
                        >
                          <v-btn
                            v-if="!show"
                            :aria-label="$t('buttons.Search')"
                            :loading="finding"
                            :disabled="finding"
                            type="submit"
                            small
                            color="primary"
                            class="mx-1"
                          >
                            <v-icon left>mdi-magnify</v-icon>
                            {{ $t('buttons.Search') }}
                          </v-btn>
                          <v-badge
                            color="red"
                            overlap
                            :content="badge"
                            :value="badge > 0"
                          >
                            <v-btn
                              :loading="finding"
                              :aria-label="$t('buttons.AdvanceSearch')"
                              :disabled="finding"
                              small
                              color="primary"
                              @click="onAdvance"
                            >
                              <v-icon left>mdi-filter-variant</v-icon>
                              {{
                                show
                                  ? $t('buttons.LessOptions')
                                  : $t('buttons.MoreOptions')
                              }}
                            </v-btn>
                          </v-badge>
                        </template>
                      </v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    v-if="$vuetify.breakpoint.smAndDown"
                    class="d-inline-flex justify-space-between mt-4"
                  >
                    <v-btn
                      v-if="!show"
                      :aria-label="$t('buttons.Search')"
                      :loading="finding"
                      :disabled="finding"
                      type="submit"
                      small
                      color="primary"
                      class="mx-1"
                    >
                      <v-icon left>mdi-magnify</v-icon>
                      {{ $t('buttons.Search') }}
                    </v-btn>
                    <v-badge
                      color="red"
                      overlap
                      :content="badge"
                      :value="badge > 0"
                    >
                      <v-btn
                        :loading="finding"
                        :aria-label="$t('buttons.More')"
                        :disabled="finding"
                        small
                        color="primary"
                        @click="onAdvance"
                      >
                        <v-icon left>mdi-filter-variant</v-icon>
                        {{ show ? $t('buttons.Less') : $t('buttons.More') }}
                      </v-btn>
                    </v-badge>
                  </v-col>
                </v-row>
              </v-form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card flat>
          <v-card-text>
            <p class="caption">
              <v-avatar left size="20" class="lighten-1 success">
                <v-icon small class="white--text" v-text="'mdi-pine-tree'" />
              </v-avatar>
              {{ $tc('label.has_office', 0) }}
            </p>
            <p class="caption">
              <v-avatar left size="20" class="lighten-1 grey">
                <v-icon small class="white--text" v-text="'mdi-pine-tree'" />
              </v-avatar>
              {{ $tc('label.has_office', 1) }}
            </p>
            <v-skeleton-loader
              :loading="finding"
              type="heading, list-item-avatar-three-line@6"
            >
              <v-data-iterator
                :items="items"
                :items-per-page.sync="itemsPerPage"
                :options.sync="pagination"
                item-key="id"
                :server-items-length="total"
                :loading="finding"
                :hide-default-footer="$vuetify.breakpoint.mdAndUp"
                :footer-props="{
                  'items-per-page-options': itemsPerPageArray,
                  showFirstLastPage: true,
                }"
              >
                <template #default="props">
                  <v-list three-line subheader>
                    <v-subheader inset>
                      {{ $tc('parks.label.result', total, { qty: total }) }}
                    </v-subheader>
                    <v-list-item
                      v-for="item in props.items"
                      :key="item.code || item.id"
                      exact
                      :to="
                        localePath({
                          name: 'parks-id-details',
                          params: { id: item.code || item.id },
                        })
                      "
                    >
                      <v-list-item-avatar>
                        <v-icon
                          :class="item.color"
                          class="lighten-1 white--text"
                          v-text="'mdi-pine-tree'"
                        ></v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          <span class="font-weight-bold">
                            {{ `${$t('parks.park.code_min')}: ` }}
                          </span>
                          {{ `${item.code}` }}
                          <span class="font-weight-bold hidden-sm-and-down">
                            {{ ` - ${$t('parks.park.name_min')}: ` }}
                          </span>
                          <span class="hidden-sm-and-down">
                            {{ `${item.name}` }}
                          </span>
                        </v-list-item-title>
                        <v-list-item-subtitle class="hidden-md-and-up">
                          <span class="font-weight-bold">
                            {{ `${$t('parks.park.name_min')}: ` }}
                          </span>
                          {{ `${item.name}` }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-text="item.address" />
                        <v-list-item-subtitle>
                          <span class="font-weight-bold">
                            {{ `${$t('parks.park.locality')}: ` }}
                          </span>
                          {{ item.locality }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                          <span class="font-weight-bold">
                            {{ `${$t('parks.park.upz')}: ` }}
                          </span>
                          {{ item.upz }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                          <span class="font-weight-bold">
                            {{ `${$t('parks.park.scale')}: ` }}
                          </span>
                          {{ item.scale }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-if="item.endowment_description">
                          <span class="font-weight-bold">
                            {{ `${$t('parks.park.desc')}: ` }}
                          </span>
                          {{ item.endowment_description }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-if="item.status_id">
                          <span class="font-weight-bold">
                            {{ `${$t('parks.park.diagram')}: ` }}
                          </span>
                          {{ item.status_id ? 'SI' : 'NO' }}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action v-if="$vuetify.breakpoint.mdAndUp">
                        <v-btn icon>
                          <v-icon color="grey lighten-1">
                            mdi-information
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </template>
                <template #no-data>
                  <v-empty-state
                    class="my-2"
                    :rounded="$vuetify.breakpoint.mdAndUp"
                    icon="mdi-alphabetical-off"
                    :label="$t('parks.label.no_data')"
                    :description="$t('parks.label.no_data_desc')"
                  />
                </template>
                <template #no-results>
                  <v-empty-state
                    class="my-2"
                    icon="mdi-alphabetical-off"
                    :label="$tc('parks.label.result', 0)"
                  />
                </template>
                <template #footer>
                  <div class="v-data-footer hidden-sm-and-down">
                    <div class="v-data-footer__select">
                      {{ $t('$vuetify.dataFooter.itemsPerPageText') }}
                      <v-select
                        v-model.number="itemsPerPage"
                        :items="itemsPerPageArray"
                        hide-details
                      />
                    </div>
                    <v-pagination
                      v-model="page"
                      :length="pageCount"
                      class="v-data-footer__icons-before"
                      circle
                      :total-visible="7"
                    />
                  </div>
                </template>
              </v-data-iterator>
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-bottom-sheet v-model="sheet" scrollable>
      <v-card flat>
        <v-card-title>
          {{ $t('buttons.MoreOptions') }}
          <v-spacer />
          <v-btn icon @click="sheet = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="text-center" style="height: 450px">
          <validation-observer ref="advance" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(onSearch)">
              <v-row dense>
                <!-- Query -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="form.validations.input_text"
                    vid="query"
                    :name="$t('parks.label.parks').toLowerCase()"
                  >
                    <v-text-field
                      id="query"
                      v-model="form.query"
                      name="query"
                      :error-messages="errors"
                      :loading="finding"
                      :readonly="finding"
                      prepend-icon="mdi-pine-tree"
                      menu-props="auto"
                      :hint="$t('parks.help.parks')"
                      persistent-hint
                      :label="$t('parks.label.parks')"
                      clearable
                    />
                  </validation-provider>
                </v-col>
                <!-- Locality -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="form.validations.input_number"
                    vid="location"
                    :name="$t('parks.park.locality').toLowerCase()"
                  >
                    <v-autocomplete
                      id="location"
                      v-model="form.location"
                      :items="localities"
                      item-value="id"
                      item-text="name"
                      name="location"
                      :loading="finding"
                      :readonly="finding"
                      prepend-icon="mdi-map-marker"
                      autocomplete="off"
                      clearable
                      :error-messages="errors"
                      :label="$t('parks.park.locality')"
                      @click:clear="onClearLocality"
                    />
                  </validation-provider>
                </v-col>
                <!-- Upz -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="{ min: 1 }"
                    vid="upz_code"
                    :name="$t('parks.park.upz').toLowerCase()"
                  >
                    <v-autocomplete
                      id="upz_code"
                      v-model="form.upz"
                      name="upz_code"
                      :items="upz"
                      item-value="upz_code"
                      item-text="composed_name"
                      :loading="finding"
                      :readonly="finding"
                      prepend-icon="mdi-crosshairs-gps"
                      autocomplete="off"
                      clearable
                      :error-messages="errors"
                      :label="$t('parks.park.upz')"
                      @click:clear="onClearUpz"
                    >
                      <template #item="{ item }">
                        <v-list-item-content>
                          <v-list-item-title v-text="item.composed_name" />
                          <v-list-item-subtitle
                            v-text="`Localidad: ${item.locality_name}`"
                          />
                        </v-list-item-content>
                      </template>
                    </v-autocomplete>
                  </validation-provider>
                </v-col>
                <!-- Neighborhood -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="form.validations.input_number"
                    vid="neighborhood_id"
                    :name="$t('parks.park.block').toLowerCase()"
                  >
                    <v-autocomplete
                      id="neighborhood_id"
                      v-model="form.neighborhood"
                      name="neighborhood_id"
                      :items="neighborhoods"
                      item-value="neighborhood_id"
                      item-text="neighborhood_name"
                      :loading="finding"
                      :readonly="finding"
                      prepend-icon="mdi-home-city"
                      autocomplete="off"
                      clearable
                      :error-messages="errors"
                      :label="$t('parks.park.block')"
                    >
                      <template #item="{ item }">
                        <v-list-item-content>
                          <v-list-item-title v-text="item.neighborhood_name" />
                          <v-list-item-subtitle
                            v-text="`Localidad: ${item.locality_name}`"
                          />
                          <v-list-item-subtitle
                            v-text="`Upz: ${item.upz_name}`"
                          />
                        </v-list-item-content>
                      </template>
                    </v-autocomplete>
                  </validation-provider>
                </v-col>
                <!-- Scale -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="form.validations.input_number"
                    vid="park_type"
                    :name="$t('parks.park.scale').toLowerCase()"
                  >
                    <v-select
                      id="park_type"
                      v-model="form.park_type"
                      :items="scales"
                      item-value="id"
                      item-text="name"
                      name="park_type"
                      :loading="finding"
                      :readonly="finding"
                      prepend-icon="mdi-relative-scale"
                      autocomplete="off"
                      clearable
                      multiple
                      :error-messages="errors"
                      :label="$t('parks.park.scale')"
                    />
                  </validation-provider>
                </v-col>
                <!-- Vigilance -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="form.validations.input_text"
                    vid="vigilance"
                    :name="$t('parks.park.vigilance').toLowerCase()"
                  >
                    <v-select
                      id="vigilance"
                      v-model="form.vigilance"
                      :items="vigilance"
                      item-value="id"
                      item-text="name"
                      name="vigilance"
                      :loading="finding"
                      :readonly="finding"
                      prepend-icon="mdi-security"
                      autocomplete="off"
                      clearable
                      :error-messages="errors"
                      :label="$t('parks.park.vigilance')"
                    />
                  </validation-provider>
                </v-col>
                <!-- Enclosure -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="form.validations.input_text"
                    vid="enclosure"
                    :name="$t('parks.park.enclosure').toLowerCase()"
                  >
                    <v-select
                      id="enclosure"
                      v-model="form.enclosure"
                      :items="enclosures"
                      item-value="name"
                      item-text="name"
                      name="enclosure"
                      :loading="finding"
                      :readonly="finding"
                      prepend-icon="mdi-door-closed"
                      autocomplete="off"
                      clearable
                      multiple
                      :error-messages="errors"
                      :label="$t('parks.park.enclosure')"
                    />
                  </validation-provider>
                </v-col>
                <!-- Stratum -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="form.validations.input_number"
                    vid="stratum"
                    :name="$t('parks.park.stratum').toLowerCase()"
                  >
                    <v-select
                      id="stratum"
                      v-model="form.stratum"
                      :items="stratums"
                      multiple
                      item-value="id"
                      item-text="name"
                      name="stratum"
                      :loading="finding"
                      :readonly="finding"
                      prepend-icon="mdi-layers"
                      autocomplete="off"
                      clearable
                      :error-messages="errors"
                      :label="$t('parks.park.stratum')"
                    />
                  </validation-provider>
                </v-col>
                <!-- Equipment -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="form.validations.input_number"
                    vid="equipment"
                    :name="$t('parks.park.equipment').toLowerCase()"
                  >
                    <v-select
                      id="equipment"
                      v-model="form.equipment_id"
                      :items="equipments"
                      item-value="id"
                      item-text="name"
                      name="equipment"
                      :loading="finding"
                      :readonly="finding"
                      prepend-icon="mdi-layers"
                      autocomplete="off"
                      clearable
                      :error-messages="errors"
                      :label="$t('parks.park.equipment')"
                      @change="getEndowments"
                      @click:clear="onClearEquipments"
                    />
                  </validation-provider>
                </v-col>
                <!-- Endowment -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="{ min: 1, required: !!form.equipment_id }"
                    vid="endowment"
                    :name="$t('parks.park.endowment').toLowerCase()"
                  >
                    <v-select
                      id="endowment"
                      v-model="form.endowment_id"
                      name="endowment"
                      :items="endowments"
                      item-value="id"
                      item-text="name"
                      :loading="finding"
                      :readonly="finding"
                      prepend-icon="mdi-city"
                      autocomplete="off"
                      clearable
                      :error-messages="errors"
                      :label="$t('parks.park.endowment')"
                    />
                  </validation-provider>
                </v-col>
                <!-- Buttons -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <v-btn
                    :aria-label="$t('buttons.Excel')"
                    :loading="finding"
                    :disabled="finding"
                    color="primary"
                    class="ma-2"
                    @click="onExcel"
                  >
                    <v-icon left>mdi-microsoft-excel</v-icon>
                    {{ $t('buttons.Excel') }}
                  </v-btn>
                  <v-btn
                    :aria-label="$t('buttons.ResetFilters')"
                    :loading="finding"
                    :disabled="finding"
                    color="primary"
                    class="ma-2"
                    @click="onClear"
                  >
                    <v-icon left>mdi-broom</v-icon>
                    {{ $t('buttons.ResetFilters') }}
                  </v-btn>
                  <v-btn
                    :aria-label="$t('buttons.Search')"
                    :loading="finding"
                    :disabled="finding"
                    type="submit"
                    color="primary"
                    class="ma-2"
                  >
                    <v-icon left>mdi-magnify</v-icon>
                    {{ $t('buttons.Search') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<router lang="yaml">
meta:
  title: parks.titles.finder
</router>

<script>
import { sync, dispatch } from 'vuex-pathify'
import FileSaver from 'file-saver'
import Base64ToBlob from '~/utils/Base64ToBlob'
import { Arrow } from '~/plugins/Arrow'
import { Locality } from '~/models/services/parks/Locality'
import { Scale } from '~/models/services/parks/Scale'
import { Vigilance } from '~/models/services/parks/Vigilance'
import { Enclosure } from '~/models/services/parks/Enclosure'
import { Api } from '~/models/Api'
import { Menu } from '~/models/services/parks/Menu'
import { Park } from '~/models/services/parks/Park'
import { Equipment } from '~/models/services/parks/Equipment'
import { UpzAll } from '~/models/services/parks/UpzAll'
import { NeighborhoodAll } from '~/models/services/parks/NeighborhoodAll'

export default {
  name: 'Finder',
  auth: 'auth',
  nuxtI18n: {
    paths: {
      en: '/parks/search',
      es: '/parques/buscador-de-parques',
    },
  },
  components: {
    VEmptyState: () => import('@/components/base/EmptyState'),
  },
  middleware: ['permissions'],
  head: (vm) => ({
    title: vm.$t('parks.titles.finder'),
  }),
  meta: {
    permissionsUrl: Api.END_POINTS.PARKS_PERMISSIONS(),
    title: 'parks.titles.finder',
  },
  created() {
    this.drawerModel = new Menu()
    // this.updateRoute(this.page)
    this.form = new Park(this.params)
  },
  data: (vm) => ({
    arrow: new Arrow(window, window.document, 'primary'),
    show: false,
    sheet: false,
    finding: false,
    form: new Park({
      query: null,
      vigilance: null,
      stratum: [],
      park_type: [],
      location: null,
      upz: null,
      neighborhood: null,
      equipment_id: null,
      endowment_id: null,
      enclosure: [],
    }),
    itemsPerPageArray: [10, 15, 20, 25, 30],
    // Advance Form
    equipment: new Equipment({
      equipment_id: null,
      endowment_id: null,
    }),
    equipments: [],
    endowments: [],
    locality: new Locality(),
    localities: [],
    up: new UpzAll(),
    upz: [],
    neighborhood: new NeighborhoodAll(),
    neighborhoods: [],
    stratums: [
      { id: 0, name: 'Estrato 0' },
      { id: 1, name: 'Estrato 1' },
      { id: 2, name: 'Estrato 2' },
      { id: 3, name: 'Estrato 3' },
      { id: 4, name: 'Estrato 4' },
      { id: 5, name: 'Estrato 5' },
      { id: 6, name: 'Estrato 6' },
      { id: 7, name: 'Estrato 7' },
    ],
    scale: new Scale(),
    scales: [],
    security: new Vigilance(),
    vigilance: [],
    enclosure: new Enclosure(),
    enclosures: [],
    // No caché
    items: [],
    total: 0,
    pagination: {},
    params: {
      query: null,
      vigilance: null,
      stratum: [],
      park_type: [],
      location: null,
      upz: null,
      neighborhood: null,
      equipment_id: null,
      endowment_id: null,
      enclosure: [],
    },
    itemsPerPage: 10,
    pageCount: 0,
  }),
  fetch() {
    this.getLocalities()
    this.getUpzAll()
    this.getNBAll()
    this.getScales()
    this.getVigilance()
    this.getEnclosures()
    this.getEquipments()
  },
  computed: {
    // total: sync('parks/finder@total'),
    // pagination: sync('parks/finder@pagination'),
    page: sync('parks/finder@pagination.page'),
    // itemsPerPage: sync('parks/finder@itemsPerPage'),
    // items: sync('parks/finder@items'),
    // params: sync('parks/finder@params'),
    // pageCount: sync('parks/finder@pageCount'),
    badge() {
      return (
        this.form.park_type.length +
        (this.form.query ? 1 : 0) +
        (this.form.vigilance ? 1 : 0) +
        (this.form.location ? 1 : 0) +
        (this.form.upz ? 1 : 0) +
        (this.form.neighborhood ? 1 : 0) +
        this.form.enclosure.length
      )
    },
  },
  watch: {
    form: {
      handler(form) {
        this.params = form.data()
      },
      deep: true,
    },
    page(newVal, oldVal) {
      // this.updateRoute(newVal)
      this.fromStorage(newVal)
    },
    'pagination.page'(newVal, oldVal) {
      // this.updateRoute(newVal)
      this.fromStorage(newVal)
    },
    itemsPerPage(newVal, oldVal) {
      this.page = 1
      this.fromStorage(this.page)
    },
  },
  methods: {
    updateRoute(page) {
      this.$router
        .replace({
          query: { page },
        })
        .catch(() => {
          console.log('Replaced')
        })
    },
    onClear() {
      this.form = new Park({
        query: null,
        vigilance: null,
        park_type: [],
        location: null,
        upz: null,
        neighborhood: null,
        equipment_id: null,
        endowment_id: null,
        enclosure: [],
        stratum: [],
      })
      this.page = 1
      this.onSubmit()
    },
    fromStorage(page) {
      if (page !== parseInt(this.$route.params.page)) {
        this.onSubmit()
      }
    },
    onSearch() {
      this.page = 1
      this.onSubmit()
    },
    onSubmitCache() {
      this.finding = true
      const {
        query,
        location,
        vigilance,
        enclosure,
        upz,
        neighborhood,
        stratum,
      } = this.form
      this.form.resetOnlyWhenUpdate = false
      const params = {
        query,
        locality_id: location,
        upz_id: upz,
        neighborhood_id: neighborhood,
        type_id: this.form.park_type,
        vigilance,
        enclosure,
        stratum,
        page: this.page,
        per_page: this.itemsPerPage,
      }
      this.form
        .index({ params })
        .then((response) => {
          this.items = response.data
          this.pageCount = response.meta.last_page
          this.total = response.meta.total
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
          if (errors.errors) {
            this.$refs.basic.setErrors(errors.errors)
            this.$refs.advance.setErrors(errors.errors)
          }
        })
        .finally(() => {
          this.finding = false
          this.sheet = false
        })
    },
    onSubmit() {
      this.finding = true
      const {
        query,
        location,
        vigilance,
        enclosure,
        upz,
        neighborhood,
        stratum,
      } = this.form
      this.form.resetOnlyWhenUpdate = false
      const params = {
        query,
        locality_id: location,
        upz_id: upz,
        neighborhood_id: neighborhood,
        type_id: this.form.park_type,
        vigilance,
        enclosure,
        stratum,
        endowment_id: this.form.endowment_id,
        page: this.page,
        per_page: this.itemsPerPage,
      }
      this.form
        .index({ params })
        .then((response) => {
          this.items = response.data
          this.pageCount = response.meta.last_page
          this.total = response.meta.total
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
          if (errors.errors) {
            this.$refs.basic.setErrors(errors.errors)
            this.$refs.advance.setErrors(errors.errors)
          }
        })
        .finally(() => {
          this.finding = false
          this.sheet = false
        })
    },
    onAdvance() {
      this.sheet = true
      if (this.params.location) {
        this.getUpz(this.params.location)
      }
      if (this.params.upz) {
        this.getNeighborhoods(this.params.upz)
      }
    },
    getLocalities() {
      this.finding = true
      this.locality
        .index()
        .then((response) => {
          this.localities = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding = false
        })
    },
    onClearLocality() {
      // this.upz = []
      // this.neighborhoods = []
    },
    getEquipments() {
      this.finding = true
      this.equipment.resetOnlyWhenUpdate = false
      this.equipment
        .index()
        .then((response) => {
          this.equipments = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding = false
        })
    },
    getEndowments(id) {
      return new Promise((resolve) => {
        this.endowments = []
        if (id) {
          this.endowmentLoading = true
          this.equipment.resetOnlyWhenUpdate = false
          this.equipment
            .endowments(id)
            .then((response) => {
              this.endowments = response.data
            })
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.endowmentLoading = false
              resolve()
            })
        }
      })
    },
    onClearEquipments() {
      this.endowments = []
    },
    getUpzAll() {
      this.finding = true
      this.up
        .index()
        .then((response) => {
          this.upz = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding = false
        })
    },
    getNBAll() {
      this.finding = true
      this.neighborhood
        .index()
        .then((response) => {
          this.neighborhoods = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding = false
        })
    },
    getUpz(id) {
      return new Promise((resolve) => {
        this.neighborhoods = []
        if (id) {
          this.start()
          this.locality
            .upz(id)
            .then((response) => {
              this.upz = response.data
            })
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.stop()
              resolve()
            })
        }
      })
    },
    onClearUpz() {
      // this.neighborhoods = []
    },
    getNeighborhoods(id) {
      const upz = this.upz.find((upz) => upz.upz_code === id)
      if (upz && upz.id) {
        this.start()
        this.locality
          .neighborhoods(this.form.locality_id, upz.id)
          .then((response) => {
            this.neighborhoods = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => this.stop())
      }
    },
    getScales() {
      this.finding = true
      this.scale
        .index()
        .then((response) => {
          this.scales = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding = false
        })
    },
    getVigilance() {
      this.finding = true
      this.security
        .index()
        .then((response) => {
          this.vigilance = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding = false
        })
    },
    getEnclosures() {
      this.finding = true
      this.enclosure
        .index()
        .then((response) => {
          this.enclosures = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding = false
        })
    },
    onExcel() {
      this.finding = true
      this.form.resetOnlyWhenUpdate = false
      const params = this.form.data()
      this.form
        .excel({ params })
        .then((response) => {
          FileSaver.saveAs(
            new Base64ToBlob(response.data.file).blob(),
            response.data.name
          )
        })
        .then(() => {
          this.arrow.show(6000)
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
          if (errors.errors) {
            this.$refs.basic.setErrors(errors.errors)
            this.$refs.advance.setErrors(errors.errors)
          }
        })
        .finally(() => {
          this.finding = false
          this.sheet = false
        })
    },
    // Loading
    start() {
      this.finding = true
    },
    stop() {
      this.finding = false
    },
  },
  beforeDestroy() {
    dispatch('parks/reset')
    this.$store.dispatch('parks/reset')
  },
}
</script>
