<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col class="my-4" cols="12">
        <base-material-card
          icon="mdi-map-marker"
          color="success"
          :title="title"
        >
          <v-card-text>
            <v-window v-model="step" touchless>
              <v-window-item :value="0">
                <v-text-field
                  v-model="locationFilter"
                  type="search"
                  :label="$t('buttons.Search')"
                  prepend-icon="mdi-magnify"
                  single-line
                  hide-details
                  clearable
                >
                  <template v-if="canCreateLocation" #append-outer>
                    <v-btn
                      :aria-label="$t('buttons.Add')"
                      block
                      text
                      color="primary"
                      class="my-2 hidden-sm-and-down"
                      :loading="loading"
                      :disabled="loading"
                      @click="onCreateLocality"
                    >
                      {{ $t('buttons.Add') }}
                    </v-btn>
                    <v-btn
                      :aria-label="$t('buttons.Add')"
                      fab
                      small
                      color="primary"
                      class="my-2 hidden-md-and-up"
                      :loading="loading"
                      :disabled="loading"
                      @click="onCreateLocality"
                    >
                      <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
                <v-swiper
                  :items="filterableLocalities"
                  list-icon="mdi-map-marker"
                  :show-delete-button="canDeleteLocation"
                  :show-history-button="canViewHiLocation"
                  :show-update-button="canUpdateLocation"
                  @update="onUpdateLocality"
                  @delete="onDeleteLocality"
                >
                  <template #list-prepend-actions="{ item }">
                    <v-list-item-action>
                      <v-tooltip top>
                        <template #activator="{ on }">
                          <v-btn
                            :aria-label="$t('buttons.Details')"
                            icon
                            @click="onUpzDetails(item)"
                            v-on="on"
                          >
                            <v-icon>mdi-text</v-icon>
                          </v-btn>
                        </template>
                        <i18n path="buttons.Details" tag="span" />
                      </v-tooltip>
                    </v-list-item-action>
                  </template>
                </v-swiper>
                <v-btn
                  v-if="canCreateLocation"
                  :aria-label="$t('buttons.Add')"
                  block
                  text
                  color="primary"
                  class="my-2"
                  :loading="loading"
                  :disabled="loading"
                  @click="onCreateLocality"
                >
                  {{ $t('buttons.Add') }}
                </v-btn>
              </v-window-item>
              <v-window-item :value="1">
                <v-card flat color="transparent">
                  <v-card-title>
                    <i18n path="parks.label.localityBread">
                      <template #locality>
                        {{ locationTemp.name ? locationTemp.name : '' }}
                      </template>
                    </i18n>
                  </v-card-title>
                  <v-card-actions>
                    <v-text-field
                      v-model="upzFilter"
                      type="search"
                      :label="$t('buttons.Search')"
                      single-line
                      hide-details
                      clearable
                    >
                      <template #prepend>
                        <v-btn
                          :aria-label="$t('buttons.Back')"
                          text
                          color="primary"
                          class="my-2 hidden-sm-and-down"
                          :loading="loading"
                          :disabled="loading"
                          @click="step--"
                        >
                          <v-icon left>mdi-chevron-left</v-icon>
                          {{ $t('buttons.Back') }}
                        </v-btn>
                        <v-btn
                          :aria-label="$t('buttons.Back')"
                          fab
                          x-small
                          color="primary"
                          class="my-2 hidden-md-and-up"
                          :loading="loading"
                          :disabled="loading"
                          @click="step--"
                        >
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                      </template>
                      <template v-if="canCreateUpz" #append-outer>
                        <v-btn
                          :aria-label="$t('buttons.Add')"
                          text
                          color="primary"
                          class="my-2 hidden-sm-and-down"
                          :loading="loading"
                          :disabled="loading"
                          @click="onCreateUpz"
                        >
                          <v-icon left>mdi-plus-circle</v-icon>
                          {{ $t('buttons.Add') }}
                        </v-btn>
                        <v-btn
                          :aria-label="$t('buttons.Add')"
                          fab
                          x-small
                          color="primary"
                          class="my-2 hidden-md-and-up"
                          :loading="loading"
                          :disabled="loading"
                          @click="onCreateUpz"
                        >
                          <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                      </template>
                    </v-text-field>
                  </v-card-actions>
                </v-card>
                <v-swiper
                  :items="filterableUpz"
                  list-icon="mdi-map-marker"
                  :show-delete-button="canDeleteUpz"
                  :show-history-button="canViewHiUpz"
                  :show-update-button="canUpdateUpz"
                  @update="onUpdateUpz"
                  @delete="onDeleteUpz"
                  item-text="composed_name"
                >
                  <template #list-content="{ item }">
                    <v-list-item-subtitle v-text="item.upz_type" />
                  </template>
                  <template #list-prepend-actions="{ item }">
                    <v-list-item-action>
                      <v-tooltip top>
                        <template #activator="{ on }">
                          <v-btn
                            :aria-label="$t('buttons.Details')"
                            icon
                            @click="onNeighborhoodsDetails(item)"
                            v-on="on"
                          >
                            <v-icon>mdi-text</v-icon>
                          </v-btn>
                        </template>
                        <i18n path="buttons.Details" tag="span" />
                      </v-tooltip>
                    </v-list-item-action>
                  </template>
                </v-swiper>
                <v-card flat color="transparent">
                  <v-card-actions>
                    <v-btn
                      :aria-label="$t('buttons.Back')"
                      text
                      color="primary"
                      class="my-2 hidden-sm-and-down"
                      :loading="loading"
                      :disabled="loading"
                      @click="step--"
                    >
                      <v-icon left>mdi-chevron-left</v-icon>
                      {{ $t('buttons.Back') }}
                    </v-btn>
                    <v-btn
                      :aria-label="$t('buttons.Back')"
                      fab
                      x-small
                      color="primary"
                      class="my-2 hidden-md-and-up"
                      :loading="loading"
                      :disabled="loading"
                      @click="step--"
                    >
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      v-if="canCreateUpz"
                      :aria-label="$t('buttons.Add')"
                      text
                      color="primary"
                      class="my-2 hidden-sm-and-down"
                      :loading="loading"
                      :disabled="loading"
                      @click="onCreateUpz"
                    >
                      <v-icon left>mdi-plus-circle</v-icon>
                      {{ $t('buttons.Add') }}
                    </v-btn>
                    <v-btn
                      v-if="canCreateUpz"
                      :aria-label="$t('buttons.Add')"
                      fab
                      x-small
                      color="primary"
                      class="my-2 hidden-md-and-up"
                      :loading="loading"
                      :disabled="loading"
                      @click="onCreateUpz"
                    >
                      <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-window-item>
              <v-window-item :value="2">
                <v-card flat color="transparent">
                  <v-card-title>
                    <i18n path="parks.label.upzBread">
                      <template #upz>
                        {{ upzTemp.name ? upzTemp.name : '' }}
                      </template>
                      <template #locality>
                        {{ locationTemp.name ? locationTemp.name : '' }}
                      </template>
                    </i18n>
                  </v-card-title>
                  <v-card-actions>
                    <v-text-field
                      v-model="neighborhoodFilter"
                      type="search"
                      :label="$t('buttons.Search')"
                      single-line
                      hide-details
                      clearable
                    >
                      <template #prepend>
                        <v-btn
                          :aria-label="$t('buttons.Back')"
                          text
                          color="primary"
                          class="my-2 hidden-sm-and-down"
                          :loading="loading"
                          :disabled="loading"
                          @click="step--"
                        >
                          <v-icon left>mdi-chevron-left</v-icon>
                          {{ $t('buttons.Back') }}
                        </v-btn>
                        <v-btn
                          :aria-label="$t('buttons.Back')"
                          fab
                          x-small
                          color="primary"
                          class="my-2 hidden-md-and-up"
                          :loading="loading"
                          :disabled="loading"
                          @click="step--"
                        >
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                      </template>
                      <template v-if="canCreateNeighborhood" #append-outer>
                        <v-btn
                          :aria-label="$t('buttons.Add')"
                          text
                          color="primary"
                          class="my-2 hidden-sm-and-down"
                          :loading="loading"
                          :disabled="loading"
                          @click="onCreateNeighborhood"
                        >
                          <v-icon left>mdi-plus-circle</v-icon>
                          {{ $t('buttons.Add') }}
                        </v-btn>
                        <v-btn
                          :aria-label="$t('buttons.Add')"
                          fab
                          x-small
                          color="primary"
                          class="my-2 hidden-md-and-up"
                          :loading="loading"
                          :disabled="loading"
                          @click="onCreateNeighborhood"
                        >
                          <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                      </template>
                    </v-text-field>
                  </v-card-actions>
                </v-card>
                <v-swiper
                  :items="filterableNeighborhoods"
                  list-icon="mdi-map-marker"
                  :show-delete-button="canDeleteNeighborhood"
                  :show-history-button="canViewHiNeighborhood"
                  :show-update-button="canUpdateNeighborhood"
                  @update="onUpdateNeighborhood"
                  @delete="onDeleteNeighborhood"
                >
                  <template #list-content="{ item }">
                    <v-list-item-subtitle v-text="item.neighborhood_code" />
                  </template>
                </v-swiper>
                <v-card flat color="transparent">
                  <v-card-actions>
                    <v-btn
                      :aria-label="$t('buttons.Back')"
                      text
                      color="primary"
                      class="my-2 hidden-sm-and-down"
                      :loading="loading"
                      :disabled="loading"
                      @click="step--"
                    >
                      <v-icon left>mdi-chevron-left</v-icon>
                      {{ $t('buttons.Back') }}
                    </v-btn>
                    <v-btn
                      :aria-label="$t('buttons.Back')"
                      fab
                      x-small
                      color="primary"
                      class="my-2 hidden-md-and-up"
                      :loading="loading"
                      :disabled="loading"
                      @click="step--"
                    >
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      v-if="canCreateNeighborhood"
                      :aria-label="$t('buttons.Add')"
                      text
                      color="primary"
                      class="my-2 hidden-sm-and-down"
                      :loading="loading"
                      :disabled="loading"
                      @click="onCreateNeighborhood"
                    >
                      <v-icon left>mdi-plus-circle</v-icon>
                      {{ $t('buttons.Add') }}
                    </v-btn>
                    <v-btn
                      v-if="canCreateNeighborhood"
                      :aria-label="$t('buttons.Add')"
                      fab
                      x-small
                      color="primary"
                      class="my-2 hidden-md-and-up"
                      :loading="loading"
                      :disabled="loading"
                      @click="onCreateNeighborhood"
                    >
                      <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <!-- Locality -->
    <v-form-dialog
      ref="localityForm"
      title="parks.park.locality"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :max-width="$vuetify.breakpoint.smAndDown ? undefined : 600"
      transition="dialog-bottom-transition"
      @click:close="onCloseLocality"
    >
      <validation-observer ref="localityFormDialog" v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit(onSubmitLocality)">
          <v-row>
            <!-- Locality -->
            <v-col class="mx-auto" cols="12" sm="12" md="12">
              <validation-provider
                v-slot="{ errors }"
                :rules="form.validations.input_text_required"
                vid="name"
                :name="$t('parks.park.locality').toLowerCase()"
              >
                <v-text-field
                  v-model="form.name"
                  name="name"
                  :loading="loading"
                  :readonly="loading"
                  prepend-icon="mdi-text"
                  autocomplete="off"
                  clearable
                  :counter="50"
                  :maxlength="50"
                  :error-messages="errors"
                  :label="$t('parks.park.locality')"
                />
              </validation-provider>
            </v-col>
            <!-- Submit -->
            <v-col cols="12" md="12" sm="12" class="text-right">
              <v-btn
                text
                :aria-label="$t('buttons.Close')"
                color="primary"
                :loading="loading"
                :disabled="loading"
                @click="onCloseLocality"
              >
                {{ $t('buttons.Close') }}
              </v-btn>
              <v-btn
                :aria-label="$t(`buttons.${form.id ? 'Update' : 'Submit'}`)"
                :loading="loading"
                :disabled="loading"
                type="submit"
                color="primary"
              >
                {{ $t(`buttons.${form.id ? 'Update' : 'Submit'}`) }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </v-form-dialog>
    <!-- Upz -->
    <v-form-dialog
      ref="upzForm"
      title="parks.park.upz"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :max-width="$vuetify.breakpoint.smAndDown ? undefined : 600"
      transition="dialog-bottom-transition"
      @click:close="onCloseUpz"
    >
      <validation-observer ref="upzFormDialog" v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit(onSubmitUpz)">
          <v-row>
            <!-- Locality -->
            <v-col cols="12" sm="12" md="12">
              <validation-provider
                v-slot="{ errors }"
                :rules="form.validations.input_number_required"
                vid="locality_id"
                :name="$t('parks.park.locality').toLowerCase()"
              >
                <v-select
                  id="locality_id"
                  v-model.number="form.locality_id"
                  :items="localities"
                  item-value="id"
                  item-text="name"
                  name="locality_id"
                  :loading="loading"
                  :readonly="loading"
                  prepend-icon="mdi-map-marker"
                  autocomplete="off"
                  :counter="50"
                  :maxlength="50"
                  clearable
                  :error-messages="errors"
                  :label="$t('parks.park.locality')"
                />
              </validation-provider>
            </v-col>
            <!-- Upz -->
            <v-col class="mx-auto" cols="12" sm="12" md="12">
              <validation-provider
                v-slot="{ errors }"
                :rules="form.validations.input_text_required"
                vid="name"
                :name="$t('parks.park.upz').toLowerCase()"
              >
                <v-text-field
                  v-model="form.name"
                  name="name"
                  :loading="loading"
                  :readonly="loading"
                  prepend-icon="mdi-text"
                  autocomplete="off"
                  clearable
                  :counter="50"
                  :maxlength="50"
                  :error-messages="errors"
                  :label="$t('parks.park.upz')"
                />
              </validation-provider>
            </v-col>
            <!-- Upz Code -->
            <v-col class="mx-auto" cols="12" sm="12" md="12">
              <validation-provider
                v-slot="{ errors }"
                :rules="form.validations.required"
                vid="upz_code"
                :name="$t('parks.park.upz_code').toLowerCase()"
              >
                <v-text-field
                  v-model="form.upz_code"
                  name="name"
                  :loading="loading"
                  :readonly="loading"
                  prepend-icon="mdi-numeric"
                  autocomplete="off"
                  clearable
                  :counter="20"
                  :maxlength="20"
                  :error-messages="errors"
                  :label="$t('parks.park.upz_code')"
                />
              </validation-provider>
            </v-col>
            <!-- Upz Type -->
            <v-col cols="12" sm="12" md="12">
              <validation-provider
                v-slot="{ errors }"
                :rules="form.validations.input_number_required"
                vid="upz_type_id"
                :name="$t('parks.park.upz_type').toLowerCase()"
              >
                <v-select
                  id="upz_type_id"
                  v-model.number="form.upz_type_id"
                  :items="types"
                  item-value="id"
                  item-text="name"
                  name="upz_type_id"
                  :loading="loading"
                  :readonly="loading"
                  prepend-icon="mdi-map-marker"
                  autocomplete="off"
                  clearable
                  :error-messages="errors"
                  :label="$t('parks.park.upz_type')"
                />
              </validation-provider>
            </v-col>
            <!-- Submit -->
            <v-col cols="12" md="12" sm="12" class="text-right">
              <v-btn
                text
                :aria-label="$t('buttons.Close')"
                color="primary"
                :loading="loading"
                :disabled="loading"
                @click="onCloseUpz"
              >
                {{ $t('buttons.Close') }}
              </v-btn>
              <v-btn
                :aria-label="$t(`buttons.${form.id ? 'Update' : 'Submit'}`)"
                :loading="loading"
                :disabled="loading"
                type="submit"
                color="primary"
              >
                {{ $t(`buttons.${form.id ? 'Update' : 'Submit'}`) }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </v-form-dialog>
    <!-- Neighborhood -->
    <v-form-dialog
      ref="blockForm"
      title="parks.park.block"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :max-width="$vuetify.breakpoint.smAndDown ? undefined : 600"
      transition="dialog-bottom-transition"
      @click:close="onCloseNeighborhood"
    >
      <validation-observer ref="blockFormDialog" v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit(onSubmitNeighborhood)">
          <v-row>
            <!-- Upz -->
            <v-col cols="12" sm="12" md="12">
              <validation-provider
                v-slot="{ errors }"
                :rules="form.validations.required"
                vid="upz"
                :name="$t('parks.park.upz').toLowerCase()"
              >
                <v-select
                  id="upz"
                  v-model="form.upz_code"
                  :items="items"
                  item-value="upz_code"
                  item-text="name"
                  name="upz"
                  :loading="loading"
                  :readonly="loading"
                  prepend-icon="mdi-map-marker"
                  autocomplete="off"
                  clearable
                  :error-messages="errors"
                  :label="$t('parks.park.upz')"
                />
              </validation-provider>
            </v-col>
            <!-- Neighborhood Code -->
            <v-col class="mx-auto" cols="12" sm="12" md="12">
              <validation-provider
                v-slot="{ errors }"
                :rules="form.validations.input_text"
                vid="neighborhood_code"
                :name="$t('parks.park.neighborhood_code').toLowerCase()"
              >
                <v-text-field
                  v-model="form.neighborhood_code"
                  name="neighborhood_code"
                  :loading="loading"
                  :readonly="loading"
                  prepend-icon="mdi-text"
                  autocomplete="off"
                  clearable
                  :error-messages="errors"
                  :label="$t('parks.park.neighborhood_code')"
                />
              </validation-provider>
            </v-col>
            <!-- Neighborhood -->
            <v-col class="mx-auto" cols="12" sm="12" md="12">
              <validation-provider
                v-slot="{ errors }"
                :rules="form.validations.input_text_required"
                vid="name"
                :name="$t('parks.park.block').toLowerCase()"
              >
                <v-text-field
                  v-model="form.name"
                  name="name"
                  :loading="loading"
                  :readonly="loading"
                  prepend-icon="mdi-text"
                  autocomplete="off"
                  clearable
                  :error-messages="errors"
                  :label="$t('parks.park.block')"
                />
              </validation-provider>
            </v-col>
            <!-- Submit -->
            <v-col cols="12" md="12" sm="12" class="text-right">
              <v-btn
                text
                :aria-label="$t('buttons.Close')"
                color="primary"
                :loading="loading"
                :disabled="loading"
                @click="onCloseNeighborhood"
              >
                {{ $t('buttons.Close') }}
              </v-btn>
              <v-btn
                :aria-label="$t(`buttons.${form.id ? 'Update' : 'Submit'}`)"
                :loading="loading"
                :disabled="loading"
                type="submit"
                color="primary"
              >
                {{ $t(`buttons.${form.id ? 'Update' : 'Submit'}`) }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </v-form-dialog>
    <!-- Delete -->
    <v-check-dialog ref="confirmDialog">
      {{ $t('confirm.delete') }}
    </v-check-dialog>
  </v-container>
</template>

<router lang="yaml">
meta:
  title: parks.titles.dataManager
</router>

<script>
import { Locality } from '~/models/services/parks/Locality'
import { Upz } from '~/models/services/parks/Upz'
import { Neighborhood } from '~/models/services/parks/Neighborhood'
import { Api } from '~/models/Api'
import { Menu } from '~/models/services/parks/Menu'
import AbilityService from '~/models/services/parks/AbilityService'
import { UpzType } from '~/models/services/parks/UpzType'

export default {
  name: 'Locations',
  nuxtI18n: {
    paths: {
      en: '/parks/manage/locations-upz-neighborhoods',
      es: '/parques/administrar/localidades-upz-barrios',
    },
  },
  components: {
    BaseMaterialCard: () => import('~/components/base/MaterialCard'),
    VFormDialog: () => import('~/components/base/VFormDialog'),
    VCheckDialog: () => import('~/components/base/VCheckDialog'),
    VSwiper: () => import('~/components/base/VSwiper'),
  },
  auth: 'auth',
  middleware: ['permissions'],
  head: (vm) => ({
    title: vm.$t('parks.titles.dataManager'),
  }),
  meta: {
    permissionsUrl: Api.END_POINTS.PARKS_PERMISSIONS(),
    title: 'parks.titles.locationManager',
    permissions(bouncer, to, from) {
      const service = new AbilityService()
      const localities = service.manageAbilities(service.models.LOCATION)
      const upz = service.manageAbilities(service.models.UPZ)
      const neighborhood = service.manageAbilities(service.models.NEIGHBORHOOD)
      return bouncer.canAny([...localities, ...upz, ...neighborhood])
    },
  },
  created() {
    this.drawerModel = new Menu()
  },
  data: () => ({
    step: 0,
    loading: false,
    locality: new Locality(),
    form: {
      validations: {},
    },
    locationFilter: '',
    upzFilter: '',
    neighborhoodFilter: '',
    locationTemp: {},
    upzTemp: {},
    localities: [],
    upz: {},
    items: [],
    neighborhood: {},
    neighborhoods: [],
    upz_types: new UpzType(),
    types: [],
  }),
  fetch() {
    this.getLocalities()
    this.geUpzTypes()
  },
  computed: {
    title() {
      switch (this.step) {
        case 1:
          return this.$t('parks.park.upz')
        case 2:
          return this.$t('parks.park.block')
        case 0:
        default:
          return this.$t('parks.park.locality')
      }
    },
    styleCard() {
      return this.$vuetify.breakpoint.smAndDown ? '50' : '100'
    },
    filterableLocalities() {
      if (!this.locationFilter) {
        return this.localities
      } else {
        return this.localities.filter((l) =>
          l.name.toLowerCase().includes(this.locationFilter.toLowerCase())
        )
      }
    },
    filterableUpz() {
      if (!this.upzFilter) {
        return this.items
      } else {
        return this.items.filter((l) =>
          l.name.toLowerCase().includes(this.upzFilter.toLowerCase())
        )
      }
    },
    filterableNeighborhoods() {
      if (!this.neighborhoodFilter) {
        return this.neighborhoods
      } else {
        return this.neighborhoods.filter((l) =>
          l.name.toLowerCase().includes(this.neighborhoodFilter.toLowerCase())
        )
      }
    },
    // Localities
    canCreateLocation() {
      return this.canManageOrCreate(this.ability_service.models.LOCATION)
    },
    canUpdateLocation() {
      return this.canManageOrUpdate(this.ability_service.models.LOCATION)
    },
    canDeleteLocation() {
      return this.canManageOrDestroy(this.ability_service.models.LOCATION)
    },
    canViewHiLocation() {
      return this.canViewHistory(this.ability_service.models.LOCATION)
    },
    // Upz
    canCreateUpz() {
      return this.canManageOrCreate(this.ability_service.models.UPZ)
    },
    canUpdateUpz() {
      return this.canManageOrUpdate(this.ability_service.models.UPZ)
    },
    canDeleteUpz() {
      return this.canManageOrDestroy(this.ability_service.models.UPZ)
    },
    canViewHiUpz() {
      return this.canViewHistory(this.ability_service.models.UPZ)
    },
    // Neighborhood
    canCreateNeighborhood() {
      return this.canManageOrCreate(this.ability_service.models.NEIGHBORHOOD)
    },
    canUpdateNeighborhood() {
      return this.canManageOrUpdate(this.ability_service.models.NEIGHBORHOOD)
    },
    canDeleteNeighborhood() {
      return this.canManageOrDestroy(this.ability_service.models.NEIGHBORHOOD)
    },
    canViewHiNeighborhood() {
      return this.canViewHistory(this.ability_service.models.NEIGHBORHOOD)
    },
  },
  methods: {
    geUpzTypes() {
      this.start()
      this.upz_types
        .index()
        .then((response) => {
          this.types = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    onUpzDetails(item) {
      this.step = 1
      this.locationTemp = item
      this.form = new Upz(item.id)
      this.form.locality_id = item.id
      this.form.setFormInstance(this.$refs.upzFormDialog)
      this.getUpz(item.id)
    },
    onCreateLocality() {
      this.$refs.localityForm.open().then(() => {
        this.form = new Locality()
        this.form.setFormInstance(this.$refs.localityFormDialog)
      })
    },
    onSubmitLocality() {
      this.start()
      const request = this.form.id
        ? this.form.update(this.form.id)
        : this.form.store()
      request
        .then((response) => {
          this.$snackbar({
            message: response.data,
            color: 'success',
          })
          this.$refs.localityForm.close()
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.stop()
          this.getLocalities()
          this.onCloseLocality()
        })
    },
    getLocalities() {
      this.start()
      this.locality
        .index()
        .then((response) => {
          this.localities = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    onUpdateLocality(item) {
      this.form = new Locality(item)
      this.$refs.localityForm.open().then(() => {
        this.form.setFormInstance(this.$refs.localityFormDialog)
      })
    },
    onDeleteLocality(item) {
      this.$refs.confirmDialog.open().then(() => {
        if (item.id) {
          this.form = new Locality(item)
          this.start()
          this.form
            .destroy(item.id)
            .then((response) => {
              this.$snackbar({
                message: response.data,
                color: 'success',
              })
            })
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.stop()
              this.getLocalities()
              this.onCloseLocality()
            })
        }
      })
    },
    onCloseLocality() {
      this.$refs.localityForm.close()
      this.form = {
        validations: {},
      }
    },
    // Upz
    onNeighborhoodsDetails(item) {
      this.step = 2
      this.upzTemp = item
      this.form = new Neighborhood(item.locality_id, item.id)
      this.form.upz_code = item.upz_code
      this.form.upz_id = item.id
      this.form.locality_id = item.locality_id
      this.getNeighborhoods(this.form.data())
    },
    onCreateUpz() {
      this.form = new Upz(this.locationTemp.id)
      this.form.locality_id = this.locationTemp.id
      this.$refs.upzForm.open().then(() => {
        this.form.setFormInstance(this.$refs.upzFormDialog)
      })
    },
    onSubmitUpz() {
      this.start()
      this.form.setFormInstance(this.$refs.upzFormDialog)
      const request = this.form.id
        ? this.form.update(this.form.id)
        : this.form.store()
      const locality = this.form.locality_id
      request
        .then((response) => {
          this.$snackbar({
            message: response.data,
            color: 'success',
          })
          this.onCloseUpz()
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.stop()
          this.getUpz(locality)
        })
    },
    onUpdateUpz(item) {
      this.form = new Upz(item.locality_id, item)
      this.$refs.upzForm.open().then(() => {
        this.form.setFormInstance(this.$refs.upzFormDialog)
      })
    },
    getUpz(id) {
      this.upz = new Upz(id)
      this.upz
        .index()
        .then((response) => {
          this.items = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    onDeleteUpz(item) {
      this.$refs.confirmDialog.open().then(() => {
        if (item.id) {
          this.form = new Upz(item.locality_id, item)
          this.start()
          this.form
            .destroy(item.id)
            .then((response) => {
              this.$snackbar({
                message: response.data,
                color: 'success',
              })
            })
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.stop()
              this.getUpz(item.locality_id)
              this.onCloseUpz()
            })
        }
      })
    },
    onCloseUpz() {
      this.$refs.upzForm.close()
      this.form = {
        validations: {},
      }
    },
    // block
    getNeighborhoods(item) {
      this.neighborhood = new Neighborhood(item.locality_id, item.upz_id)
      this.neighborhood
        .index()
        .then((response) => {
          this.neighborhoods = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    onCreateNeighborhood() {
      this.form = new Neighborhood(this.upzTemp.locality_id, this.upzTemp.id)
      this.form.upz_code = this.upzTemp.upz_code
      this.form.upz_id = this.upzTemp.id
      this.form.locality_id = this.upzTemp.locality_id
      this.$refs.blockForm.open().then(() => {
        this.form.setFormInstance(this.$refs.blockFormDialog)
      })
    },
    onUpdateNeighborhood(item) {
      this.form = new Neighborhood(item.locality_id, item.upz_id, item)
      this.$refs.blockForm.open().then(() => {
        this.form.setFormInstance(this.$refs.blockFormDialog)
      })
    },
    onDeleteNeighborhood(item) {
      this.$refs.confirmDialog.open().then(() => {
        if (item.id) {
          this.form = new Neighborhood(item.locality_id, item.upz_id, item)
          this.start()
          this.form
            .destroy(item.id)
            .then((response) => {
              this.$snackbar({
                message: response.data,
                color: 'success',
              })
            })
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.stop()
              this.getNeighborhoods(item)
              this.onCloseUpz()
            })
        }
      })
    },
    onSubmitNeighborhood() {
      this.start()
      this.form.setFormInstance(this.$refs.blockFormDialog)
      const request = this.form.id
        ? this.form.update(this.form.id)
        : this.form.store()
      const item = this.form
      const object = {
        upz_id: item.upz_id,
        locality_id: item.locality_id,
      }
      request
        .then((response) => {
          this.$snackbar({
            message: response.data,
            color: 'success',
          })
          this.onCloseNeighborhood()
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.stop()
          this.getNeighborhoods(object)
        })
    },
    onCloseNeighborhood() {
      this.$refs.blockForm.close()
      this.form = {
        validations: {},
      }
    },
    // Loading
    start() {
      this.loading = true
    },
    stop() {
      this.loading = false
    },
  },
}
</script>
