<template>
  <v-card v-bind="$attrs" flat>
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>
    <v-window v-model="step" touchless>
      <v-window-item :value="0">
        <validation-observer ref="parkFormStep0" v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(onNext)">
            <v-row>
              <!-- Code -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_text_required_regex(/^[0-9,-]+$/)"
                  vid="code"
                  :name="$t('parks.park.code').toLowerCase()"
                >
                  <v-text-field
                    id="code"
                    v-model="form.code"
                    name="code"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-pound"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.code')"
                    :counter="10"
                    :maxlength="10"
                  />
                </validation-provider>
              </v-col>
              <!-- Name -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_text_required"
                  vid="name"
                  :name="$t('parks.park.name').toLowerCase()"
                >
                  <v-text-field
                    id="name"
                    v-model="form.name"
                    name="name"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-pine-tree"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.name')"
                    :counter="form.validations.input_text_required.max"
                    :maxlength="form.validations.input_text_required.max"
                  />
                </validation-provider>
              </v-col>
              <!-- Address -->
              <v-col cols="12" sm="12" md="6">
                <v-dialog
                  ref="address"
                  v-model="dialog"
                  fullscreen
                  transition="dialog-bottom-transition"
                >
                  <template #activator="{ on, attrs: addressMenu }">
                    <validation-provider
                      v-slot="{ errors }"
                      :rules="form.validations.input_text_required"
                      vid="address"
                      :name="$t('parks.park.address').toLowerCase()"
                    >
                      <v-text-field
                        id="address"
                        v-model="form.address"
                        name="address"
                        readonly
                        clearable
                        :loading="loading"
                        prepend-icon="mdi-routes"
                        :label="$t('parks.park.address')"
                        autocomplete="off"
                        :error-messages="errors"
                        :counter="120"
                        :maxlength="120"
                        v-bind="{ ...addressMenu }"
                        v-on="on"
                      />
                    </validation-provider>
                  </template>
                  <v-address-field
                    v-model="form.address"
                    @close="dialog = false"
                    @save="dialog = false"
                  >
                    <v-spacer />
                    <v-btn
                      color="primary"
                      text
                      @click="dialog = false"
                      v-text="$t('buttons.Cancel')"
                    />
                    <v-btn color="primary" @click="dialog = false">
                      <v-icon left>mdi-content-save</v-icon>
                      {{ $t('buttons.Save') }}
                    </v-btn>
                  </v-address-field>
                </v-dialog>
              </v-col>
              <!-- Stratum -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number_required_between(0, 6)"
                  vid="stratum"
                  :name="$t('parks.park.stratum').toLowerCase()"
                >
                  <v-text-field
                    id="stratum"
                    v-model.number="form.stratum"
                    type="number"
                    name="stratum"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-layers"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.stratum')"
                    min="0"
                    max="10"
                  />
                </validation-provider>
              </v-col>
              <!-- Locality -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number_required"
                  vid="locality_id"
                  :name="$t('parks.park.locality').toLowerCase()"
                >
                  <v-autocomplete
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
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.locality')"
                    @change="getUpz"
                    @click:clear="onClearLocality"
                  />
                </validation-provider>
              </v-col>
              <!-- Upz -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.required"
                  vid="upz_code"
                  :name="$t('parks.park.upz').toLowerCase()"
                >
                  <v-autocomplete
                    id="upz_code"
                    v-model="form.upz_code"
                    name="upz_code"
                    :items="upz"
                    item-value="upz_code"
                    item-text="composed_name"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-crosshairs-gps"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.upz')"
                    @change="getNeighborhoods"
                    @click:clear="onClearUpz"
                  />
                </validation-provider>
              </v-col>
              <!-- Neighborhood -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number_required"
                  vid="neighborhood_id"
                  :name="$t('parks.park.block').toLowerCase()"
                >
                  <v-autocomplete
                    id="neighborhood_id"
                    v-model="form.neighborhood_id"
                    name="neighborhood_id"
                    :items="neighborhoods"
                    item-value="id"
                    item-text="name"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-home-city"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.block')"
                  />
                </validation-provider>
              </v-col>
              <!-- Urbanization -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_text_required"
                  vid="urbanization"
                  :name="$t('parks.park.urbanization').toLowerCase()"
                >
                  <v-text-field
                    id="urbanization"
                    v-model="form.urbanization"
                    name="urbanization"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-map-marker"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.urbanization')"
                    :counter="form.validations.input_text_required.max"
                    :maxlength="form.validations.input_text_required.max"
                  />
                </validation-provider>
              </v-col>
              <!-- Map -->
              <!--
              <v-col cols="12" sm="12" md="12">
                <gmap-map
                  ref="gMap"
                  style="width: 100%; height: 300px"
                  :center="google.center"
                  :options="google.options"
                  :zoom="11"
                >
                  <gmap-marker
                    :position="google.center"
                    :draggable="true"
                    @dragend="updateCoordinates"
                  />
                </gmap-map>
              </v-col>
              -->
              <v-col cols="12" md="12">
                <p class="caption">
                  Mantén presionado el punto naranja
                  <v-avatar size="10" color="warning" />
                  hasta que el contorno se torne de color
                  <v-avatar size="10" color="#00ffff" />
                  para arrastrarlo y fijar una coordenada.
                </p>
                <v-draggable-map
                  style="height: 350px"
                  :latitude="lat"
                  :longitude="lng"
                  @onposition="updateCoordinates"
                />
              </v-col>
              <!-- Latitude -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.double"
                  vid="latitude"
                  :name="$t('parks.park.latitude').toLowerCase()"
                >
                  <v-text-field
                    id="latitude"
                    v-model="form.latitude"
                    name="latitude"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-latitude"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.latitude')"
                    :counter="20"
                    :maxlength="20"
                  />
                </validation-provider>
              </v-col>
              <!-- Longitude -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.double"
                  vid="longitude"
                  :name="$t('parks.park.longitude').toLowerCase()"
                >
                  <v-text-field
                    id="longitude"
                    v-model="form.longitude"
                    name="longitude"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-longitude"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.longitude')"
                    :counter="20"
                    :maxlength="20"
                  />
                </validation-provider>
              </v-col>
              <!-- Submit -->
              <v-col md="6" sm="12" class="text-left">
                <v-btn
                  :aria-label="$t('buttons.Save')"
                  color="primary"
                  @click="onSubmit"
                >
                  {{ $t('buttons.Save') }}
                </v-btn>
              </v-col>
              <v-col md="6" sm="12" class="text-right">
                <v-btn
                  :aria-label="$t('buttons.Next')"
                  type="submit"
                  color="primary"
                >
                  {{ $t('buttons.Next') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </validation-observer>
      </v-window-item>
      <v-window-item :value="1">
        <validation-observer ref="parkFormStep1" v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(onNext)">
            <v-row>
              <!-- Area Hectare -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  vid="area_hectare"
                  :name="$t('parks.park.area_hectare').toLowerCase()"
                >
                  <v-text-field
                    id="area_hectare"
                    v-model="form.area_hectare"
                    type="number"
                    name="area_hectare"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-aspect-ratio"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.area_hectare')"
                    :min="0"
                  />
                </validation-provider>
              </v-col>
              <!-- Area -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  vid="area"
                  :name="$t('parks.park.area').toLowerCase()"
                >
                  <v-text-field
                    id="area"
                    v-model="form.area"
                    type="number"
                    name="area"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-aspect-ratio"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.area')"
                    :min="0"
                  />
                </validation-provider>
              </v-col>
              <!-- Green Area -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  vid="green_area"
                  :name="$t('parks.park.green_area').toLowerCase()"
                >
                  <v-text-field
                    id="green_area"
                    v-model="form.green_area"
                    type="number"
                    name="green_area"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-pine-tree"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.green_area')"
                    :min="0"
                  />
                </validation-provider>
              </v-col>
              <!-- Grey Area -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  vid="grey_area"
                  :name="$t('parks.park.grey_area').toLowerCase()"
                >
                  <v-text-field
                    id="grey_area"
                    v-model="form.grey_area"
                    type="number"
                    name="grey_area"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-chart-tree"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.grey_area')"
                    :min="0"
                  />
                </validation-provider>
              </v-col>
              <!-- Capacity -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  vid="capacity"
                  :name="$t('parks.park.capacity').toLowerCase()"
                >
                  <v-text-field
                    id="capacity"
                    v-model="form.capacity"
                    type="number"
                    name="capacity"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-human-capacity-increase"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.capacity')"
                    :min="0"
                  />
                </validation-provider>
              </v-col>
              <!-- Children Population -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number"
                  vid="children_population"
                  :name="$t('parks.park.children_population').toLowerCase()"
                >
                  <v-text-field
                    id="children_population"
                    v-model="form.children_population"
                    type="number"
                    name="children_population"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-human-child"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.children_population')"
                    :min="0"
                  />
                </validation-provider>
              </v-col>
              <!-- Youth Population -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number"
                  vid="youth_population"
                  :name="$t('parks.park.youth_population').toLowerCase()"
                >
                  <v-text-field
                    id="youth_population"
                    v-model="form.youth_population"
                    type="number"
                    name="youth_population"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-human-male-female"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.youth_population')"
                    :min="0"
                  />
                </validation-provider>
              </v-col>
              <!-- Older Population -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number"
                  vid="older_population"
                  :name="$t('parks.park.older_population').toLowerCase()"
                >
                  <v-text-field
                    id="older_population"
                    v-model="form.older_population"
                    type="number"
                    name="older_population"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-teach"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.older_population')"
                    :min="0"
                  />
                </validation-provider>
              </v-col>
              <!-- Submit -->
              <v-col md="6" sm="12" class="text-left">
                <v-btn
                  :aria-label="$t('buttons.Save')"
                  color="primary"
                  @click="onSubmit"
                >
                  {{ $t('buttons.Save') }}
                </v-btn>
              </v-col>
              <v-col md="6" sm="12" class="text-right">
                <v-btn
                  text
                  :aria-label="$t('buttons.Back')"
                  color="primary"
                  @click="onBack"
                >
                  {{ $t('buttons.Back') }}
                </v-btn>
                <v-btn
                  :aria-label="$t('buttons.Next')"
                  type="submit"
                  color="primary"
                >
                  {{ $t('buttons.Next') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </validation-observer>
      </v-window-item>
      <v-window-item :value="2">
        <validation-observer ref="parkFormStep2" v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(onNext)">
            <v-row>
              <!-- Enclosure -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_text"
                  vid="enclosure"
                  :name="$t('parks.park.enclosure').toLowerCase()"
                >
                  <v-autocomplete
                    id="enclosure"
                    v-model="form.enclosure"
                    :items="enclosures"
                    item-value="name"
                    item-text="name"
                    name="enclosure"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-door-closed"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.enclosure')"
                  />
                </validation-provider>
              </v-col>
              <!-- Households -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number"
                  vid="households"
                  :name="$t('parks.park.households').toLowerCase()"
                >
                  <v-text-field
                    id="households"
                    v-model="form.households"
                    type="number"
                    name="households"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-home-group"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.households')"
                    :min="0"
                  />
                </validation-provider>
              </v-col>
              <!-- Walking Trails -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number"
                  vid="walking_trails"
                  :name="$t('parks.park.walking_trails').toLowerCase()"
                >
                  <v-text-field
                    id="walking_trails"
                    v-model="form.walking_trails"
                    type="number"
                    name="walking_trails"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-highway"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.walking_trails')"
                    :min="0"
                  />
                </validation-provider>
              </v-col>
              <!-- Walking Trails Status -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_text"
                  vid="walking_trails_status"
                  :name="$t('parks.park.walking_trails_status').toLowerCase()"
                >
                  <v-autocomplete
                    id="walking_trails_status"
                    v-model="form.walking_trails_status"
                    :items="statuses"
                    item-value="name"
                    item-text="name"
                    name="walking_trails_status"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-list-status"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.walking_trails_status')"
                  />
                </validation-provider>
              </v-col>
              <!-- Access Roads -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  vid="access_roads"
                  :name="$t('parks.park.access_roads').toLowerCase()"
                >
                  <v-text-field
                    id="access_roads"
                    v-model="form.access_roads"
                    name="access_roads"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-highway"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.access_roads')"
                    :counter="20"
                    :maxlength="20"
                  />
                </validation-provider>
              </v-col>
              <!-- Access Roads Status -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_text"
                  vid="access_roads_status"
                  :name="$t('parks.park.access_roads_status').toLowerCase()"
                >
                  <v-autocomplete
                    id="access_roads_status"
                    v-model="form.access_roads_status"
                    :items="statuses"
                    item-value="name"
                    item-text="name"
                    name="access_roads_status"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-list-status"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.access_roads_status')"
                  />
                </validation-provider>
              </v-col>
              <!-- Type Zone -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_text"
                  vid="zone_type"
                  :name="$t('parks.park.zone_type').toLowerCase()"
                >
                  <v-autocomplete
                    id="zone_type"
                    v-model="form.zone_type"
                    :items="type_zones"
                    item-value="id"
                    item-text="name"
                    name="zone_type"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-home-city-outline"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.zone_type')"
                  />
                </validation-provider>
              </v-col>
            </v-row>
              <!-- Submit -->
            <v-row>
              <v-col md="6" sm="12" class="text-right">
                <v-col md="6" sm="12" class="text-left">
                  <v-btn
                    :aria-label="$t('buttons.Save')"
                    color="primary"
                    @click="onSubmit"
                  >
                    {{ $t('buttons.Save') }}
                </v-btn>
              </v-col>
              </v-col>
              <v-col md="6" sm="12" class="text-right">
                <v-btn
                  text
                  :aria-label="$t('buttons.Back')"
                  color="primary"
                  @click="onBack"
                >
                  {{ $t('buttons.Back') }}
                </v-btn>
                <v-btn
                  :aria-label="$t('buttons.Next')"
                  type="submit"
                  color="primary"
                >
                  {{ $t('buttons.Next') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </validation-observer>
      </v-window-item>
      <v-window-item :value="3">
        <validation-observer ref="parkFormStep3" v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(onNext)">
            <v-row>
              <!-- Scale -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number"
                  vid="scale_id"
                  :name="$t('parks.park.scale').toLowerCase()"
                >
                  <v-autocomplete
                    id="scale_id"
                    v-model.number="form.scale_id"
                    :items="scales"
                    item-value="id"
                    item-text="name"
                    name="scale_id"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-relative-scale"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.scale')"
                  />
                </validation-provider>
              </v-col>
              <!-- Concern -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  vid="concern"
                  :name="$t('parks.park.regulation').toLowerCase()"
                >
                  <v-autocomplete
                    id="concern"
                    v-model="form.concern"
                    :items="concerns"
                    item-value="id"
                    item-text="name"
                    name="concern"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-image-filter-hdr"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.regulation')"
                  />
                </validation-provider>
              </v-col>
              <!-- Visited At-->
              <v-col cols="12" sm="12" md="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="form.visited_at"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <validation-provider
                      v-slot="{ errors }"
                      :rules="form.validations.input_date"
                      vid="visited_at"
                      :name="$t('parks.park.visited_at').toLowerCase()"
                    >
                      <v-text-field
                        id="visited_at"
                        v-model="form.visited_at"
                        name="visited_at"
                        :label="$t('parks.park.visited_at')"
                        prepend-icon="mdi-calendar"
                        :loading="loading"
                        :error-messages="errors"
                        clearable
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </validation-provider>
                  </template>
                  <v-date-picker
                    v-model="form.visited_at"
                    :locale="$i18n.locale"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      :aria-label="$t('buttons.Cancel')"
                      text
                      color="primary"
                      @click="menu = false"
                      v-text="$t('buttons.Cancel')"
                    />
                    <v-btn
                      :aria-label="$t('buttons.Save')"
                      text
                      color="primary"
                      @click="$refs.menu.save(form.visited_at)"
                      v-text="$t('buttons.Save')"
                    />
                  </v-date-picker>
                </v-menu>
              </v-col>
              <!-- General Status -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_text"
                  vid="general_status"
                  :name="$t('parks.park.general_status').toLowerCase()"
                >
                  <v-text-field
                    id="general_status"
                    v-model="form.general_status"
                    name="general_status"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-list-status"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.general_status')"
                    :counter="form.validations.input_text_required.max"
                    :maxlength="form.validations.input_text_required.max"
                  />
                </validation-provider>
              </v-col>
              <!-- Stage Type -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number"
                  vid="stage_type_id"
                  :name="$t('parks.park.stage_type').toLowerCase()"
                >
                  <v-autocomplete
                    id="stage_type_id"
                    v-model.number="form.stage_type_id"
                    :items="stage_types"
                    item-value="id"
                    item-text="name"
                    name="stage_type_id"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-home-city-outline"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.stage_type')"
                  />
                </validation-provider>
              </v-col>
              <!-- Status -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number"
                  vid="status_id"
                  :name="$t('parks.park.status').toLowerCase()"
                >
                  <v-autocomplete
                    id="status_id"
                    v-model.number="form.status_id"
                    :items="statuses"
                    item-value="id"
                    item-text="name"
                    name="status_id"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-list-status"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.status')"
                  />
                </validation-provider>
              </v-col>
              <!-- Submit -->
              <v-col md="6" sm="12" class="text-left">
                <v-btn
                  :aria-label="$t('buttons.Save')"
                  color="primary"
                  @click="onSubmit"
                >
                  {{ $t('buttons.Save') }}
                </v-btn>
              </v-col>
              <v-col md="6" sm="12" class="text-right">
                <v-btn
                  text
                  :aria-label="$t('buttons.Back')"
                  color="primary"
                  @click="onBack"
                >
                  {{ $t('buttons.Back') }}
                </v-btn>
                <v-btn
                  :aria-label="$t('buttons.Next')"
                  type="submit"
                  color="primary"
                >
                  {{ $t('buttons.Next') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </validation-observer>
      </v-window-item>
      <v-window-item :value="4">
        <validation-observer ref="parkFormStep4" v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(onSubmit)">
            <v-row>
              <!-- Admin -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  vid="admin"
                  :name="$t('parks.park.admin').toLowerCase()"
                >
                  <v-autocomplete
                    id="admin"
                    v-model="form.admin"
                    :items="concerns"
                    item-value="id"
                    item-text="name"
                    name="admin"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-image-filter-hdr"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.admin')"
                  />
                </validation-provider>
              </v-col>
              <!-- Admin Name -->
              <v-col cols="12" md="6" sm="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_text"
                  vid="admin_name"
                  :name="$t('parks.park.admin_name').toLowerCase()"
                >
                  <v-text-field
                    id="admin_name"
                    v-model="form.admin_name"
                    :loading="loading"
                    name="admin_name"
                    :readonly="loading"
                    :error-messages="errors"
                    color="primary"
                    :label="$t('parks.park.admin_name')"
                    clearable
                    counter
                    :maxlength="form.validations.input_text_required.max"
                    autocomplete="off"
                    required="required"
                    prepend-icon="mdi-face-agent"
                  />
                </validation-provider>
              </v-col>
              <!-- Phone -->
              <v-col cols="12" md="6" sm="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_text"
                  vid="phone"
                  :name="$t('parks.park.phone').toLowerCase()"
                >
                  <v-text-field
                    id="phone"
                    v-model="form.phone"
                    name="phone"
                    :loading="loading"
                    :readonly="loading"
                    :error-messages="errors"
                    color="primary"
                    :label="$t('parks.park.phone')"
                    clearable
                    counter
                    hint="Ingrese números de teléfono separados por coma si es necesario. Ej: 6601234, 66604321"
                    persistent-hint
                    :maxlength="90"
                    autocomplete="off"
                    required="required"
                    prepend-icon="mdi-phone"
                  />
                </validation-provider>
              </v-col>
              <!-- Email -->
              <v-col cols="12" md="6" sm="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_email"
                  vid="email"
                  :name="$t('parks.park.email').toLowerCase()"
                >
                  <v-text-field
                    id="email"
                    v-model="form.email"
                    name="email"
                    type="email"
                    :loading="loading"
                    :readonly="loading"
                    :error-messages="errors"
                    color="primary"
                    :label="$t('parks.park.email')"
                    clearable
                    counter
                    :maxlength="form.validations.input_email_required.max"
                    autocomplete="off"
                    required="required"
                    prepend-icon="mdi-email-outline"
                  />
                </validation-provider>
              </v-col>
              <!-- Vigilance -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_text"
                  vid="vigilance"
                  :name="$t('parks.park.vigilance').toLowerCase()"
                >
                  <v-autocomplete
                    id="vigilance"
                    v-model="form.vigilance"
                    :items="vigilance"
                    item-value="id"
                    item-text="name"
                    name="vigilance"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-security"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.vigilance')"
                  />
                </validation-provider>
              </v-col>
              <!-- Received -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  vid="received"
                  :name="$t('parks.park.received').toLowerCase()"
                >
                  <v-autocomplete
                    id="received"
                    v-model="form.received"
                    :items="received"
                    item-value="id"
                    item-text="name"
                    name="received"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-domain"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.received')"
                  />
                </validation-provider>
              </v-col>
              <!-- Vocation -->
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number"
                  vid="vocation_id"
                  :name="$t('parks.park.vocation').toLowerCase()"
                >
                  <v-autocomplete
                    id="vocation_id"
                    v-model.number="form.vocation_id"
                    :items="vocations"
                    item-value="id"
                    item-text="name"
                    name="vocation_id"
                    :loading="loading"
                    :readonly="loading"
                    prepend-icon="mdi-book-check"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.vocation')"
                  />
                </validation-provider>
              </v-col>
              <!-- Submit -->
              <v-col cols="12" md="12" sm="12" class="text-right">
                <v-btn
                  text
                  :aria-label="$t('buttons.Back')"
                  color="primary"
                  @click="onBack"
                >
                  {{ $t('buttons.Back') }}
                </v-btn>
                <v-btn
                  :aria-label="$t('buttons.Save')"
                  type="submit"
                  color="primary"
                >
                  {{ $t('buttons.Save') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </validation-observer>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
// import { gmapApi } from 'vue2-google-maps'
import { Park } from '~/models/services/parks/Park'
import { Locality } from '~/models/services/parks/Locality'
import { Enclosure } from '~/models/services/parks/Enclosure'
import { Status } from '~/models/services/parks/Status'
import { TypeZone } from '~/models/services/parks/TypeZone'
import { Scale } from '~/models/services/parks/Scale'
import { Concern } from '~/models/services/parks/Concern'
import { Vigilance } from '~/models/services/parks/Vigilance'
import { StageType } from '~/models/services/parks/StageType'
import { Vocation } from '~/models/services/parks/Vocation'
import VDraggableMap from '~/components/parks/VDraggableMap'
export default {
  name: 'ParkForm',
  components: {
    VDraggableMap,
    VAddressField: () => import('@/components/base/VAddressField'),
  },
  props: {
    formData: {
      type: Object,
      default: () => new Park().data(),
    },
    finding: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    loading: false,
    dialog: false,
    menu: false,
    step: 0,
    form: new Park(),
    locality: new Locality(),
    localities: [],
    upz: [],
    neighborhoods: [],
    enclosure: new Enclosure(),
    enclosures: [],
    status: new Status(),
    statuses: [],
    type_zone: new TypeZone(),
    type_zones: [],
    scale: new Scale(),
    scales: [],
    concern: new Concern(),
    concerns: [],
    security: new Vigilance(),
    vigilance: [],
    stage_type: new StageType(),
    stage_types: [],
    vocation: new Vocation(),
    vocations: [],
    received: [
      {
        id: 'Si',
        name: 'Si',
      },
      {
        id: 'No',
        name: 'No',
      },
    ],
    google: {
      center: {
        lat: 4.624335,
        lng: -74.063644,
      },
      options: {
        fullscreenControl: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        disableDefaultUI: false,
      },
    },
    lat: 4.624335,
    lng: -74.063644,
  }),
  fetch() {
    this.getInitData()
  },
  computed: {
    currentTitle() {
      return this.$t(`parks.steps.${this.step}`)
    },
    // gMapApi: gmapApi,
  },
  watch: {
    formData(val) {
      if (val.id) {
        this.form = new Park(val)
        this.init()
      } else {
        this.form = new Park()
      }
    },
    finding(val) {
      this.loading = val
    },
  },
  mounted() {
    this.form = new Park(this.formData)
    this.form.setFormInstance(this.$refs.parkFormStep0)
    this.init()
  },
  methods: {
    // Form
    init() {
      const { latitude, longitude } = this.formData
      this.form.visited_at =
        this.formData.visited_at &&
        this.$moment(this.formData.visited_at).isValid()
          ? this.$moment(this.formData.visited_at).format('YYYY-MM-DD')
          : null
      if (this.formData.locality_id) {
        this.getUpz(this.formData.locality_id).then(() => {
          if (this.formData.upz_code) {
            this.getNeighborhoods(this.formData.upz_code)
          }
        })
      }
      if (latitude && longitude) {
        // this.google.center.lat = parseFloat(latitude)
        // this.google.center.lng = parseFloat(longitude)
        this.lat = parseFloat(latitude)
        this.lng = parseFloat(longitude)
      }
    },
    onBack() {
      this.step--
      this.form.setFormInstance(this.$refs[`parkFormStep${this.step}`])
    },
    onNext() {
      this.step++
      this.form.setFormInstance(this.$refs[`parkFormStep${this.step}`])
    },
    async onSubmit() {
      const valid = await this.$refs.parkFormStep0.validate();
      if (!valid) { return;}
      this.start()
      const code = this.form.code
      const id = this.form.id
      const request = this.formData.id
        ? this.form.update(this.formData.id)
        : this.form.store()
      request
        .then((response) => {
          this.$snackbar({
            message: response.data,
            color: 'success',
          })
          this.$emit('success', code || id)
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
          this.$emit('error', this.form.errors.all())
          if (errors.errors) {
            this.$refs.parkFormStep0.setErrors(errors.errors)
            this.$refs.parkFormStep1.setErrors(errors.errors)
            this.$refs.parkFormStep2.setErrors(errors.errors)
            this.$refs.parkFormStep3.setErrors(errors.errors)
            this.$refs.parkFormStep4.setErrors(errors.errors)
          }
        })
        .finally(() => {
          this.stop()
        })
    },
    // Form Data
    getEnclosures() {
      return new Promise((resolve) => {
        this.enclosure
          .index()
          .then((response) => {
            this.enclosures = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => resolve())
      })
    },
    getLocalities() {
      return new Promise((resolve) => {
        this.locality
          .index()
          .then((response) => {
            this.localities = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => resolve())
      })
    },
    onClearLocality() {
      this.upz = []
      this.neighborhoods = []
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
      this.neighborhoods = []
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
    getStatus() {
      return new Promise((resolve) => {
        this.status
          .index()
          .then((response) => {
            this.statuses = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => resolve())
      })
    },
    getTypeZone() {
      return new Promise((resolve) => {
        this.type_zone
          .index()
          .then((response) => {
            this.type_zones = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => resolve())
      })
    },
    getScales() {
      return new Promise((resolve) => {
        this.scale
          .index()
          .then((response) => {
            this.scales = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => resolve())
      })
    },
    getConcerns() {
      return new Promise((resolve) => {
        this.concern
          .index()
          .then((response) => {
            this.concerns = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => resolve())
      })
    },
    getVigilance() {
      return new Promise((resolve) => {
        this.security
          .index()
          .then((response) => {
            this.vigilance = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => resolve())
      })
    },
    getStageType() {
      return new Promise((resolve) => {
        this.stage_type
          .index()
          .then((response) => {
            this.stage_types = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => resolve())
      })
    },
    getVocation() {
      return new Promise((resolve) => {
        this.vocation
          .index()
          .then((response) => {
            this.vocations = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => resolve())
      })
    },
    // Map
    updateCoordinates(data) {
      this.form.latitude = data.latitude // data.latLng.lat()
      this.form.longitude = data.longitude // data.latLng.lng()
    },
    onLocate() {
      if (this.gMapApi && this.form.address) {
        const address = `${this.form.address} BOGOTÁ`
        const geocoder = new this.gMapApi.maps.Geocoder()
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK') {
            this.google.center = results[0].geometry.location
          } else {
            this.$snackbar({
              message:
                'Geocode was not successful for the following reason: ' +
                status,
            })
          }
        })
      }
    },
    // Loading
    start() {
      this.loading = true
    },
    stop() {
      this.loading = false
    },
    // Promise All
    getInitData() {
      this.start()
      Promise.all([
        this.getLocalities(),
        this.getEnclosures(),
        this.getStatus(),
        this.getTypeZone(),
        this.getScales(),
        this.getConcerns(),
        this.getVigilance(),
        this.getStageType(),
        this.getVocation(),
      ]).finally(() => {
        this.stop()
      })
    },
  },
}
</script>
