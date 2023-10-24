<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col class="mb-4" cols="12">
        <v-card flat>
          <v-card-text>
            <validation-observer ref="basic" v-slot="{ handleSubmit }">
              <v-form @submit.prevent="handleSubmit(onSubmit)">
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
                :footer-props="{ 'items-per-page-options': itemsPerPageArray }"
              >
                <template #default="props">
                  <v-list three-line subheader>
                    <v-subheader inset>
                      {{ $tc('parks.label.result', total, { qty: total }) }}
                    </v-subheader>
                    <v-list-item
                      v-for="item in props.items"
                      :key="item.code"
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
            <v-form @submit.prevent="handleSubmit(onSubmit)">
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
                    <v-select
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
                      multiple
                      :error-messages="errors"
                      :label="$t('parks.park.locality')"
                    />
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
  title: parks.titles.owned
</router>

<script>
import { Locality } from '~/models/services/parks/Locality'
import { Vigilance } from '~/models/services/parks/Vigilance'
import { Scale } from '~/models/services/parks/Scale'
import { Enclosure } from '~/models/services/parks/Enclosure'
import { Owned } from '~/models/services/parks/Owned'
import { Api } from '~/models/Api'
import { Menu } from '~/models/services/parks/Menu'
import AbilityService from '~/models/services/parks/AbilityService'

export default {
  name: 'Owned',
  nuxtI18n: {
    paths: {
      en: '/parks/my-parks',
      es: '/parques/mis-parques',
    },
  },
  components: {
    VEmptyState: () => import('@/components/base/EmptyState'),
  },
  auth: 'auth',
  middleware: ['permissions'],
  meta: {
    permissionsUrl: Api.END_POINTS.PARKS_PERMISSIONS(),
    title: 'parks.titles.owned',
    permissions(bouncer, to, from) {
      const service = new AbilityService()
      const manage = service.manage(service.models.PARK)
      const update = service.update(service.models.PARK)
      return (
        bouncer.canAny([manage, update]) ||
        bouncer.isA(service.roles.ROLE_ASSIGNED)
      )
    },
    // roles: ['park-assigned-parks'],
  },
  head: (vm) => ({
    title: vm.$t('parks.titles.owned'),
  }),
  created() {
    this.drawerModel = new Menu()
  },
  data: () => ({
    show: false,
    sheet: false,
    finding: false,
    form: new Owned({
      query: null,
      vigilance: null,
      park_type: [],
      location: [],
      enclosure: [],
    }),
    items: [],
    itemsPerPage: 10,
    pagination: {},
    total: 0,
    itemsPerPageArray: [10, 15, 20, 25, 30],
    // Advance Form
    locality: new Locality(),
    localities: [],
    scale: new Scale(),
    scales: [],
    security: new Vigilance(),
    vigilance: [],
    enclosure: new Enclosure(),
    enclosures: [],
  }),
  fetch() {
    this.getLocalities()
    this.getScales()
    this.getVigilance()
    this.getEnclosures()
  },
  computed: {
    badge() {
      return (
        this.form.park_type.length +
        this.form.location.length +
        this.form.enclosure.length +
        (this.form.vigilance ? 1 : 0)
      )
    },
  },
  watch: {
    'pagination.page'(newVal, oldVal) {
      this.onSubmit()
    },
    itemsPerPage(newVal, oldVal) {
      this.onSubmit()
    },
  },
  methods: {
    onClear() {
      this.form.reset()
      this.pagination.page = 1
    },
    onSubmit() {
      this.finding = true
      const { page } = this.pagination
      const { query, location, vigilance, enclosure } = this.form
      this.form.resetOnlyWhenUpdate = false
      const params = {
        query,
        locality_id: location,
        type_id: this.form.park_type,
        vigilance,
        enclosure,
        page,
        per_page: this.itemsPerPage,
      }
      this.form
        .index({ params })
        .then((response) => {
          this.items = response.data
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
      this.form
        .excel({ responseType: 'blob' })
        .then((response) => {
          const fileURL = window.URL.createObjectURL(new Blob([response]))
          const fileLink = document.createElement('a')
          fileLink.href = fileURL
          fileLink.setAttribute('download', 'REPORTE_PARQUES.xlsx')
          document.body.appendChild(fileLink)
          fileLink.click()
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
  },
}
</script>
