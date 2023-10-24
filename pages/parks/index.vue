<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" md="12">
        <v-alert
          color="success"
          border="left"
          elevation="2"
          colored-border
          icon="mdi-information"
        >
          <i18n
            :path="badge > 0 ? 'parks.stats.parksFilter' : 'parks.stats.parks'"
            class="display-1 grey--text font-weight-regular"
          >
            <template #parks>
              <span class="display-serif-1 text--primary">
                <animated-number
                  :duration="500"
                  :value="count.data.total"
                  :round="1"
                />
              </span>
            </template>
            <template #admin>
              <span class="display-serif-1 text--primary">
                <animated-number
                  :value="count.data.admin"
                  :duration="500"
                  :round="1"
                />
              </span>
            </template>
          </i18n>
        </v-alert>
      </v-col>
      <v-col class="my-4" cols="12">
        <base-material-card icon="mdi-map" color="success">
          <template #toolbar>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="card-title font-weight-light">
                {{ $t('parks.titles.locality') }}
              </v-toolbar-title>
              <v-spacer />
              <v-time-ago
                :loading="loading.type"
                :prefix="$t('buttons.Updated')"
                classes="caption grey--text font-weight-light hidden-sm-and-down"
                :date-time="stats.requested_at"
              />
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
                  <v-list-item @click="onReloadLocation">
                    <v-list-item-icon>
                      <v-icon>mdi-refresh</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Refresh') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="onExcelByLocations">
                    <v-list-item-icon>
                      <v-icon>mdi-cloud-download</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Download') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </template>
          <v-row dense>
            <v-col cols="12" sm="12">
              <v-btn
                :aria-label="$t('buttons.ResetFilters')"
                :disabled="badge <= 0"
                class="my-2"
                small
                block
                color="primary"
                @click="onClear"
              >
                {{ $t('buttons.ResetFilters') }}
              </v-btn>
              <v-bogota-map
                ref="v_map"
                :filter="model.data()"
                @change="onSelect"
                @ondata="onData"
              />
            </v-col>
            <v-col cols="12" class="hidden-md-and-up">
              <v-data-table
                dense
                :headers="locations_table.headers"
                :items="locations"
                item-key="id"
              >
                <template #[`item.icon`]>
                  <v-icon>mdi-pin</v-icon>
                </template>
              </v-data-table>
            </v-col>
            <!--
            <v-col cols="12" sm="12" md="3">
              <i18n
                :path="badge > 0 ? 'parks.stats.maxFilter' : 'parks.stats.max'"
                class="display-1 grey--text font-weight-regular"
              >
                <template #parks>
                  <span class="display-serif-2 text--primary">
                    <animated-number
                      :value="count.data.not_admin.parks_count"
                      :duration="500"
                      :round="1"
                    />
                  </span>
                </template>
                <template #type>
                  <span class="display-serif-1 text--primary">
                    {{ count.data.not_admin.name }}
                  </span>
                </template>
              </i18n>
              <v-btn
                :aria-label="$t('buttons.ResetFilters')"
                :disabled="badge <= 0"
                class="my-2"
                small
                block
                color="primary"
                @click="onClear"
              >
                {{ $t('buttons.ResetFilters') }}
              </v-btn>
            </v-col>
            -->
          </v-row>
        </base-material-card>
      </v-col>

      <v-col class="my-4" cols="12">
        <base-material-card icon="mdi-folder" color="warning">
          <template #toolbar>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="card-title font-weight-light">
                {{ $t('parks.titles.type') }}
              </v-toolbar-title>
              <v-spacer />
              <v-time-ago
                :loading="loading.type"
                :prefix="$t('buttons.Updated')"
                classes="caption grey--text font-weight-light hidden-sm-and-down"
                :date-time="stats.requested_at"
              />
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
                  <v-list-item @click="getByType">
                    <v-list-item-icon>
                      <v-icon>mdi-refresh</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Refresh') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="onExcelByType">
                    <v-list-item-icon>
                      <v-icon>mdi-cloud-download</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Download') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </template>
          <v-row dense>
            <v-col cols="12" sm="12" md="12">
              <v-apexchart
                ref="donutChart"
                width="100%"
                height="400px"
                type="donut"
                :options="options"
                :series="series"
              />
            </v-col>
            <v-col cols="12" sm="12" md="12" class="hidden-md-and-up">
              <v-skeleton-loader
                ref="skeleton"
                :loading="loading.type"
                transition="scale-transition"
                type="table"
                class="mx-auto"
              >
                <v-data-table
                  dense
                  hide-default-footer
                  :loading="loading.type"
                  :headers="types_table.headers"
                  :items="stats.data"
                  item-key="id"
                >
                  <template #[`item.icon`]>
                    <v-icon>mdi-domain</v-icon>
                  </template>
                </v-data-table>
              </v-skeleton-loader>
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>
      <!--
      <v-col cols="12" md="6">
        <base-material-card hover-reveal color="warning">
          <template #heading>
            <v-apexchart
              ref="enclosure"
              type="bar"
              height="150"
              class="mb-n3 v-apexchart-card"
              :options="enclosure.chartOptions"
              :series="enclosure.series"
            />
          </template>
          <template #reveal-actions>
            <v-tooltip top>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="success"
                  light
                  icon
                  @click="onExcelByEnclosure"
                  v-on="on"
                >
                  <v-icon>mdi-cloud-download</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('buttons.Download') }}</span>
            </v-tooltip>
            <v-tooltip top>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="info"
                  light
                  icon
                  @click="getByEnclosure"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('buttons.Refresh') }}</span>
            </v-tooltip>
          </template>
          <v-card-text>
            <h1 class="card-title font-weight-light">
              {{ $t('parks.titles.stratum') }}
            </h1>
            <v-row dense>
              <v-col
                v-for="(type, i) in enclosure.data.data"
                :key="i"
                cols="12"
                md="6"
              >
                <span class="caption font-weight-bold">
                  {{ `${type.name}: ${type.parks_count}` }}
                </span>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-time-ago
              :loading="loading.enclosure"
              :prefix="$t('buttons.Updated')"
              classes="caption grey--text font-weight-light hidden-sm-and-down"
              :date-time="enclosure.data.requested_at"
            />
          </v-card-actions>
        </base-material-card>
      </v-col>
      -->
      <v-col cols="12" md="12">
        <v-card>
          <v-card-text>
            <validation-observer ref="advance" v-slot="{ handleSubmit }">
              <v-form @submit.prevent="handleSubmit(onSearchEndowment)">
                <v-row dense>
                  <v-col cols="12" md="6" sm="12">
                    <v-col cols="12">
                      <i18n path="parks.stats.equipment" tag="p" />
                    </v-col>
                    <!-- Equipment -->
                    <v-col cols="12" sm="12" md="12" class="mx-auto">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="equipment.validations.input_number"
                        vid="equipment"
                        :name="$t('parks.park.equipment').toLowerCase()"
                      >
                        <v-select
                          id="equipment"
                          v-model="equipment.equipment_id"
                          :items="equipments"
                          item-value="id"
                          item-text="name"
                          name="equipment"
                          :loading="endowmentLoading"
                          :readonly="endowmentLoading"
                          prepend-icon="mdi-map-marker"
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
                    <v-col cols="12" sm="12" md="12" class="mx-auto">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="{ min: 1 }"
                        vid="endowment"
                        :name="$t('parks.park.endowment').toLowerCase()"
                      >
                        <v-select
                          id="endowment"
                          v-model="equipment.endowment_id"
                          name="endowment"
                          :items="endowments"
                          item-value="id"
                          item-text="name"
                          :loading="endowmentLoading"
                          :readonly="endowmentLoading"
                          prepend-icon="mdi-crosshairs-gps"
                          autocomplete="off"
                          clearable
                          :error-messages="errors"
                          :label="$t('parks.park.endowment')"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Buttons -->
                    <v-col cols="12">
                      <v-btn
                        :aria-label="$t('buttons.Submit')"
                        class="my-2"
                        small
                        block
                        color="primary"
                        type="submit"
                      >
                        {{ $t('buttons.Submit') }}
                      </v-btn>
                    </v-col>
                    <v-col cols="12">
                      <v-divider></v-divider>
                    </v-col>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                    class="display-serif-4 my-auto"
                  >
                    <v-card
                      v-for="(edw, i) in countEndowment"
                      flat
                      class="text-center v-card--plan"
                      :key="`plan-${i}`"
                    >
                      <v-avatar size="80">
                        <v-icon size="50">mdi-soccer</v-icon>
                      </v-avatar>
                      <v-card-text>
                        <animated-number
                          class="display-serif-2 my-6"
                          :value="edw.parks_count || 0"
                          :duration="1000"
                          :round="1"
                          :delay="100"
                        />
                        <p
                          v-text="
                            $tc('parks.map.counterText', edw.parks_count || 0, {
                              count: edw.parks_count,
                            })
                          "
                        />
                      </v-card-text>
                    </v-card>
                    <v-card
                      v-if="countEndowment.length < 1"
                      flat
                      class="text-center v-card--plan my-auto"
                    >
                      <v-avatar size="80">
                        <v-icon size="50">mdi-soccer</v-icon>
                      </v-avatar>
                      <v-card-text>
                        <animated-number
                          class="display-serif-2 my-6"
                          :value="0"
                          :duration="1000"
                          :round="1"
                          :delay="100"
                        />
                        <p
                          v-text="$tc('parks.map.counterText', 0, { count: 0 })"
                        />
                      </v-card-text>
                    </v-card>
                     <v-card class="text-center" flat>
                      <v-btn 
                         color="primary"
                         dark 
                         v-if="items_parks.length > 0" 
                         @click="dialog = true"
                       >
                        {{ $t('buttons.SeeParks') }}
                       </v-btn>
                     </v-card>
                    <template>
                      <div class="text-center">
                        <v-dialog
                          v-model="dialog"
                          width="500"
                        >
                          <v-card>
                            <v-card-title class="text-h5 primary lighten-2" dark>
                              PARQUES
                            </v-card-title>
                            <v-card-text class="container-park-staff">
                                <template>
                                      <v-list dense>
                                        <v-list-item-group
                                          color="primary"
                                        >
                                          <v-list-item
                                            v-for="(item, i) in items_parks"
                                            :key="i"
                                            :to="
                                              localePath({
                                                name: 'parks-id-details',
                                                params: { id: item ? item.id : 1 },
                                              })
                                            "
                                          >
                                            <v-list-item-avatar>
                                             <v-icon
                                                large
                                                :color="item.managed ? 'green darken-2' : 'gray darken-2'"
                                              >
                                                  mdi-pine-tree
                                              </v-icon>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                              <v-list-item-title >
                                                 <span class="hidden-sm-and-down">
                                                    {{item.name}}
                                                </span>
                                              </v-list-item-title>
                                               <v-list-item-subtitle >
                                                    {{item.address}}
                                               </v-list-item-subtitle>
                                                <v-list-item-subtitle >
                                                  <span class="font-weight-bold">
                                                    {{ `${$t('parks.park.locality')}: ` }}
                                                  </span>
                                                   {{item.locality}}
                                               </v-list-item-subtitle>
                                            </v-list-item-content>
                                          </v-list-item>
                                        </v-list-item-group>
                                      </v-list>
                                  </template>    
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                              <v-btn
                                color="primary"
                                dark
                                @click="getExcelnew()"
                              >
                               DESCARGAR
                              </v-btn>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="primary"
                                dark
                                @click="dialog = false"
                              >
                               CERRAR
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                    </template>
                  </v-col>
                </v-row>
              </v-form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </v-col>
      <!--
      <v-col cols="12" md="6">
        <base-material-card hover-reveal color="success">
          <template #heading>
            <v-apexchart
              ref="certified"
              class="v-apexchart-card"
              type="radialBar"
              :options="certified.chartOptions"
              :series="certified.series"
            />
          </template>
          <template #reveal-actions>
            <v-tooltip top>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="success"
                  light
                  icon
                  @click="onExcelByCertification"
                  v-on="on"
                >
                  <v-icon>mdi-cloud-download</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('buttons.Download') }}</span>
            </v-tooltip>
            <v-tooltip top>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="info"
                  light
                  icon
                  @click="getByCertification"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('buttons.Refresh') }}</span>
            </v-tooltip>
          </template>
          <v-card-text>
            <h1 class="card-title font-weight-light">
              {{
                `${$t('parks.titles.system_certified')}:
                ${certified.data.data.value}`
              }}
            </h1>
          </v-card-text>
          <v-card-actions>
            <v-time-ago
              :loading="loading.certified"
              :prefix="$t('buttons.Updated')"
              classes="caption grey--text font-weight-light hidden-sm-and-down"
              :date-time="certified.data.requested_at"
            />
          </v-card-actions>
        </base-material-card>
      </v-col>
      <v-col class="my-4" cols="12" sm="12" md="8">
        <base-material-card
          icon="mdi-map-outline"
          class="v-card--material-stats"
        >
          <template #after-heading>
            <i18n
              :path="
                badge > 0 ? 'parks.stats.parksFilter' : 'parks.stats.parks'
              "
              class="display-1 grey--text font-weight-regular"
            >
              <template #parks>
                <span class="display-serif-2 text--primary">
                  <animated-number
                    :value="count.data.total"
                    :duration="500"
                    :rounded="1"
                  />
                </span>
              </template>
              <template #admin>
                <span class="display-serif-1 text--primary">
                  <animated-number
                    :value="count.data.admin"
                    :duration="500"
                    :rounded="1"
                  />
                </span>
              </template>
            </i18n>
          </template>
          <v-col cols="12" class="px-0">
            <v-divider />
          </v-col>
          <v-card-actions class="ma-0 pa-0">
            <v-time-ago
              :loading="loading.counter"
              :prefix="$t('buttons.Updated')"
              classes="caption grey--text font-weight-light"
            />
            <v-spacer />
            <v-tooltip top>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="primary"
                  light
                  icon
                  x-small
                  @click="getByCount"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('buttons.Refresh') }}</span>
            </v-tooltip>
          </v-card-actions>
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            :active="loading.counter"
            height="6"
          ></v-progress-linear>
        </base-material-card>
      </v-col>
      <v-col class="my-4" cols="12" sm="12" md="4">
        <base-material-card
          icon="mdi-developer-board"
          color="success"
          class="v-card--material-stats"
        >
          <template #after-heading>
            <i18n
              :path="badge > 0 ? 'parks.stats.maxFilter' : 'parks.stats.max'"
              class="display-1 grey--text font-weight-regular"
            >
              <template #parks>
                <span class="display-serif-2 text--primary">
                  <animated-number
                    :value="count.data.not_admin.parks_count"
                    :duration="500"
                    :rounded="1"
                  />
                </span>
              </template>
              <template #type>
                <span class="display-serif-1 text--primary">
                  {{ count.data.not_admin.name }}
                </span>
              </template>
            </i18n>
          </template>
        </base-material-card>
      </v-col>
      <v-col class="my-4" cols="12">
        <base-material-card icon="mdi-map" color="success">
          <template #toolbar>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="card-title font-weight-light">
                {{ $t('parks.titles.locality') }}
              </v-toolbar-title>
              <v-spacer />
              <v-time-ago
                :loading="loading.type"
                :prefix="$t('buttons.Updated')"
                classes="caption grey--text font-weight-light hidden-sm-and-down"
                :date-time="stats.requested_at"
              />
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
                  <v-list-item @click="onReloadLocation">
                    <v-list-item-icon>
                      <v-icon>mdi-refresh</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Refresh') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="onExcelByLocations">
                    <v-list-item-icon>
                      <v-icon>mdi-cloud-download</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Download') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </template>
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <i18n tag="p" path="parks.help.map">
                <template #icon>
                  <v-icon>mdi-cursor-default-click</v-icon>
                </template>
              </i18n>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-bogota-map
                ref="v_map"
                :filter="model.data()"
                @change="onSelect"
                @ondata="onData"
              />
            </v-col>
            <v-col cols="12" class="hidden-md-and-up">
              <v-data-table
                dense
                :headers="locations_table.headers"
                :items="locations"
                item-key="id"
              >
                <template #[`item.icon`]>
                  <v-icon>mdi-pin</v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>
      -->
      <!--
      <v-col class="my-4" cols="12">
        <base-material-card icon="mdi-map" color="success">
          <template #toolbar>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="card-title font-weight-light">
                {{ $t('parks.titles.upz') }}
              </v-toolbar-title>
              <v-spacer />
              <v-time-ago
                :loading="loading.upz"
                :prefix="$t('buttons.Updated')"
                classes="caption grey--text font-weight-light hidden-sm-and-down"
                :date-time="upz.data.requested_at"
              />
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
                  <v-list-item @click="getByUpz">
                    <v-list-item-icon>
                      <v-icon>mdi-refresh</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Refresh') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="onExcelByUpz">
                    <v-list-item-icon>
                      <v-icon>mdi-cloud-download</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Download') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </template>
          <v-apexchart
            ref="upz"
            type="treemap"
            :options="upz.chartOptions"
            :series="upz.series"
          />
          <v-overlay v-model="loading.upz" absolute>
            <v-progress-circular color="primary" indeterminate size="64" />
          </v-overlay>
        </base-material-card>
      </v-col>
      -->
    </v-row>
    <v-speed-dial fixed bottom right>
      <template #activator>
        <v-badge color="red" overlap :content="badge" :value="badge > 0">
          <v-btn color="primary" dark fab @click="sheet = true">
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </v-badge>
      </template>
    </v-speed-dial>
    <v-bottom-sheet v-model="sheet" scrollable>
      <v-card flat>
        <v-card-title>
          {{ $t('buttons.MoreOptions') }}
          <v-spacer />
          <v-btn icon @click="sheet = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="text-center">
          <validation-observer ref="advance" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(onSubmit)">
              <v-row dense>
                <!-- Locality -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="model.validations.input_number"
                    vid="location"
                    :name="$t('parks.park.locality').toLowerCase()"
                  >
                    <v-autocomplete
                      id="location"
                      v-model="model.location"
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
                      v-model="model.upz"
                      name="upz_code"
                      :items="upzData"
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
                    :rules="model.validations.input_number"
                    vid="neighborhood_id"
                    :name="$t('parks.park.block').toLowerCase()"
                  >
                    <v-autocomplete
                      id="neighborhood_id"
                      v-model="model.neighborhood"
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
                    :rules="model.validations.input_number"
                    vid="park_type"
                    :name="$t('parks.park.scale').toLowerCase()"
                  >
                    <v-select
                      id="park_type"
                      v-model="model.park_type"
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
                    :rules="model.validations.input_text"
                    vid="vigilance"
                    :name="$t('parks.park.vigilance').toLowerCase()"
                  >
                    <v-select
                      id="vigilance"
                      v-model="model.vigilance"
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
                    :rules="model.validations.input_text"
                    vid="enclosure"
                    :name="$t('parks.park.enclosure').toLowerCase()"
                  >
                    <v-select
                      id="enclosure"
                      v-model="model.enclosure"
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
                    :rules="model.validations.input_number"
                    vid="stratum"
                    :name="$t('parks.park.stratum').toLowerCase()"
                  >
                    <v-select
                      id="stratum"
                      v-model="model.stratum"
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
                    :rules="model.validations.input_number"
                    vid="equipment"
                    :name="$t('parks.park.equipment').toLowerCase()"
                  >
                    <v-select
                      id="equipment"
                      v-model="model.equipment_id"
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
                    :rules="{ min: 1, required: !!model.equipment_id }"
                    vid="endowment"
                    :name="$t('parks.park.endowment').toLowerCase()"
                  >
                    <v-select
                      id="endowment"
                      v-model="model.endowment_id"
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
                <!-- Admin -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="model.validations.input_text"
                    vid="admin"
                    :name="$t('parks.park.admin').toLowerCase()"
                  >
                    <v-select
                      id="admin"
                      v-model="model.admin"
                      :items="admins"
                      item-value="id"
                      item-text="name"
                      name="admin"
                      :loading="finding"
                      :readonly="finding"
                      prepend-icon="mdi-domain"
                      autocomplete="off"
                      clearable
                      :error-messages="errors"
                      :label="$t('parks.park.admin')"
                    />
                  </validation-provider>
                </v-col>
                <!-- Certified -->
                <v-col cols="12" sm="12" md="8" class="mx-auto">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="model.validations.input_text"
                    vid="certified"
                    :name="$t('parks.park.concept').toLowerCase()"
                  >
                    <v-select
                      id="certified"
                      v-model="model.certified"
                      :items="certificates"
                      item-value="id"
                      item-text="name"
                      name="certified"
                      :loading="finding"
                      :readonly="finding"
                      prepend-icon="mdi-file"
                      autocomplete="off"
                      clearable
                      :error-messages="errors"
                      :label="$t('parks.park.concept')"
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
  title: parks.titles.dashboard
</router>

<script>
import AnimatedNumber from 'animated-number-vue'
import FileSaver from 'file-saver'
import Base64ToBlob from '~/utils/Base64ToBlob'
import { Arrow } from '~/plugins/Arrow'
import { Menu } from '~/models/services/parks/Menu'
import { Stats } from '~/models/services/parks/Stats'
import { Api } from '~/models/Api'
import { Locality } from '~/models/services/parks/Locality'
import { Scale } from '~/models/services/parks/Scale'
import { Enclosure } from '~/models/services/parks/Enclosure'
import { Equipment } from '~/models/services/parks/Equipment'
import { UpzAll } from '~/models/services/parks/UpzAll'
import { NeighborhoodAll } from '~/models/services/parks/NeighborhoodAll'
import { Vigilance } from '~/models/services/parks/Vigilance'

export default {
  name: 'Parks',
  nuxtI18n: {
    paths: {
      en: '/parks',
      es: '/parques',
    },
  },
  components: {
    BaseMaterialCard: () => import('@/components/base/MaterialCard'),
    VTimeAgo: () => import('@/components/base/TimeAgo'),
    // BaseMaterialStatsCard: () => import('@/components/base/MaterialStatsCard'),
    VBogotaMap: () => import('@/components/parks/Map'),
    AnimatedNumber,
  },
  auth: 'auth',
  middleware: ['permissions'],
  head: (vm) => ({
    title: vm.$t('parks.titles.dashboard'),
  }),
  meta: {
    permissionsUrl: Api.END_POINTS.PARKS_PERMISSIONS(),
    title: 'parks.titles.dashboard',
  },
  data: (vm) => ({
    arrow: new Arrow(window, window.document, 'primary'),
    finding: false,
    model: new Stats({
      park_type: [],
      location: null,
      upz: null,
      neighborhood: null,
      enclosure: [],
      admin: null,
      certified: null,
      vigilance: null,
      stratum: [],
      equipment_id: null,
      endowment_id: null,
    }),
    sheet: false,
    loading: {
      type: false,
      counter: false,
      locality: false,
      enclosure: false,
      certified: false,
      upz: false,
    },
    stats: {},
    count: {
      data: {
        total: 0,
        admin: 0,
        not_admin: {
          parks_count: 0,
          name: 'Vecinal',
        },
      },
    },
    selectedMap: {},
    locations: [],
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'right',
      },
      tooltip: {
        theme: 'dark',
      },
      title: {
        text: vm.$t('parks.titles.type'),
        align: 'center',
      },
      labels: [],
    },
    series: [],
    enclosure: {
      data: {
        data: {},
      },
      series: [
        {
          name: 'Cantidad',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          foreColor: '#fff',
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
            export: {
              csv: {
                filename: vm.$t('parks.titles.stratum').toUpperCase(),
                columnDelimiter: ',',
                headerCategory: 'NOMBRE',
                headerValue: 'TOTAL',
                dateFormatter(timestamp) {
                  return new Date(timestamp).toDateString()
                },
              },
            },
            autoSelected: 'zoom',
          },
          zoom: {
            autoScaleYaxis: true,
          },
        },
        fill: {
          colors: ['#fff'],
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: true,
          borderColor: '#fff',
          strokeDashArray: 0,
          position: 'back',
        },
        xaxis: {
          categories: [],
          tickPlacement: 'on',
          labels: {
            show: false,
          },
        },
      },
    },
    certified: {
      data: {
        data: {},
      },
      series: [0],
      chartOptions: {
        chart: {
          type: 'radialBar',
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
            export: {
              csv: {
                filename: vm.$t('parks.titles.certified').toUpperCase(),
                columnDelimiter: ',',
                headerCategory: 'NOMBRE',
                headerValue: 'TOTAL',
                dateFormatter(timestamp) {
                  return new Date(timestamp).toDateString()
                },
              },
            },
            autoSelected: 'zoom',
          },
        },
        stroke: {
          dashArray: 4,
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              show: false,
            },
            dataLabels: {
              name: {
                offsetY: -6,
                color: '#fff',
              },
              value: {
                offsetY: -50,
                fontSize: '22px',
                color: '#fff',
              },
            },
          },
        },
        grid: {
          padding: {
            top: -10,
          },
        },
        tooltip: {
          theme: 'dark',
        },
        fill: {
          colors: ['#fff'],
          type: 'solid',
        },
        labels: [`${vm.$t('parks.titles.system_certified')}`],
      },
    },
    upz: {
      data: {
        data: {},
      },
      series: [
        {
          data: [
            {
              x: 'Sin Datos',
              y: 0,
            },
          ],
        },
      ],
      chartOptions: {
        legend: {
          show: false,
        },
        chart: {
          height: 350,
          type: 'treemap',
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
            export: {
              csv: {
                filename: vm.$t('parks.titles.upz'),
                columnDelimiter: ',',
                headerCategory: 'NOMBRE',
                headerValue: 'TOTAL',
                dateFormatter(timestamp) {
                  return new Date(timestamp).toDateString()
                },
              },
            },
            autoSelected: 'zoom',
          },
        },
        title: {
          text: vm.$t('parks.titles.upz'),
        },
        tooltip: {
          theme: 'dark',
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
          },
          formatter(text, op) {
            return [text, op.value]
          },
          offsetY: -4,
        },
        fill: {
          colors: ['#ff5722'],
        },
        plotOptions: {
          treemap: {
            enableShades: true,
            shadeIntensity: 0.5,
            reverseNegativeShade: true,
          },
        },
      },
    },
    // Data
    locality: new Locality(),
    localities: [],
    up: new UpzAll(),
    upzData: [],
    neighborhood: new NeighborhoodAll(),
    neighborhoods: [],
    scale: new Scale(),
    scales: [],
    security: new Vigilance(),
    vigilance: [],
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
    enclosureModel: new Enclosure(),
    enclosures: [],
    equipment: new Equipment({
      equipment_id: null,
      endowment_id: null,
    }),
    endowmentLoading: false,
    equipments: [],
    endowments: [],
    countEndowment: [],
    admins: [
      { id: 'admin', name: 'Administrado por el IDRD' },
      { id: 'is_not_admin', name: 'No Administrado por el IDRD' },
    ],
    certificates: [
      { id: 'certified', name: 'Certificado' },
      { id: 'not_certified', name: 'Sin Certificar' },
    ],
    dialog: false,
    selectedItem: 0,
    items_parks: [],
  }),
  fetch() {
    this.onSubmit()
    this.getLocalities()
    this.getUpzAll()
    this.getNBAll()
    this.getScales()
    this.getVigilance()
    this.getEnclosures()
    this.getEquipments()
  },
  computed: {
    percent() {
      const data = this.selectedMap.parksCount || 0
      const number = (data * 100) / this.totalLocations
      const total =
        Math.round(number) === 0 ? number.toFixed(1) : Math.round(number)
      return isNaN(number) ? 0 : total
    },
    totalLocations() {
      return this.locations.reduce(function (prev, cur) {
        return prev + cur.parksCount
      }, 0)
    },
    types_table() {
      return {
        headers: [
          { text: '', value: 'icon', sortable: false },
          { text: this.$t('parks.table.name'), value: 'name' },
          { text: 'Total', value: 'parks_count' },
        ],
      }
    },
    locations_table() {
      return {
        headers: [
          { text: '', value: 'icon', sortable: false },
          { text: this.$t('parks.table.locality'), value: 'name' },
          { text: 'Total', value: 'parksCount' },
        ],
      }
    },
    badge() {
      return (
        this.model.park_type.length +
        (this.model.admin ? 1 : 0) +
        (this.model.certified ? 1 : 0) +
        (this.model.location ? 1 : 0) +
        (this.model.upz ? 1 : 0) +
        (this.model.neighborhood ? 1 : 0) +
        this.model.stratum.length +
        (this.model.vigilance ? 1 : 0) +
        (this.model.equipment_id ? 1 : 0) +
        (this.model.endowment_id ? 1 : 0) +
        this.model.enclosure.length
      )
    },
  },
  watch: {
    '$refs.v_map.map.locations'(val) {
      const data = val.map((i) => {
        return {
          x: i.name,
          y: i.parksCount,
        }
      })
      this.series_loc = [{ data }]
    },
    '$vuetify.breakpoint.mdAndUp'(value) {
      this.$refs.donutChart.updateOptions({
        legend: {
          position: value ? 'right' : 'bottom',
        },
      })
    },
  },
  created() {
    this.drawerModel = new Menu()
  },
  methods: {
    onSubmit() {
      this.getByType()
      this.getByCount()
      // this.getByEnclosure()
      // this.getByCertification()
      // this.getByUpz()
      this.onReloadLocation()
      this.sheet = false
    },
    onData(items) {
      if (items) {
        this.locations = items
      } else {
        this.locations = []
      }
    },
    getByCount() {
      this.loading.counter = true
      const {
        location,
        upz,
        neighborhood,
        enclosure,
        certified,
        admin,
        vigilance,
        stratum,
      } = this.model
      this.model.resetOnlyWhenUpdate = false
      const params = {
        location,
        upz,
        neighborhood,
        park_type: this.model.park_type,
        enclosure,
        certified,
        admin,
        vigilance,
        stratum,
        equipment_id: this.model.equipment_id,
        endowment_id: this.model.endowment_id,
      }
      this.count.data.total = 0
      this.count.data.admin = 0
      this.count.data.not_admin.parks_count = 0
      this.model
        .byCount({ params })
        .then((response) => {
          this.count = response
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading.counter = false))
    },
    getByType() {
      this.loading.type = true
      const {
        location,
        upz,
        neighborhood,
        enclosure,
        admin,
        certified,
        vigilance,
        stratum,
      } = this.model
      this.model.resetOnlyWhenUpdate = false
      const params = {
        location,
        upz,
        neighborhood,
        park_type: this.model.park_type,
        enclosure,
        certified,
        admin,
        vigilance,
        stratum,
        equipment_id: this.model.equipment_id,
        endowment_id: this.model.endowment_id,
      }
      this.model
        .byType({ params })
        .then((response) => {
          this.stats = response
          this.options = {
            ...this.options,
            labels: response.data.map(
              (type) => `${type.name}: ${type.parks_count}`
            ),
          }
          this.series = response.data.map((type) => type.parks_count)
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading.type = false))
    },
    getByCertification() {
      this.loading.type = true
      this.certified.series = [0]
      const { location, enclosure, certified, admin, upz, neighborhood } =
        this.model
      this.model.resetOnlyWhenUpdate = false
      const params = {
        location,
        upz,
        neighborhood,
        park_type: this.model.park_type,
        enclosure,
        certified,
        admin,
      }
      this.model
        .byCertification({ params })
        .then((response) => {
          this.certified.data = response
          this.certified.series = [response.data.percent]
          if (this.$refs.certified) {
            this.$refs.certified.updateOptions({
              labels: [response.data.name],
            })
          } else {
            this.certified.chartOptions = {
              ...this.certified.chartOptions,
              labels: [response.data.name],
            }
          }
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading.type = false))
    },
    getByEnclosure() {
      this.loading.enclosure = true
      if (this.$refs.enclosure) {
        this.$refs.enclosure.updateSeries([{ data: [] }])
      }
      const { location, enclosure, certified, admin, upz, neighborhood } =
        this.model
      this.model.resetOnlyWhenUpdate = false
      const params = {
        location,
        upz,
        neighborhood,
        park_type: this.model.park_type,
        enclosure,
        certified,
        admin,
      }
      this.model
        .byEnclosure({ params })
        .then((response) => {
          this.enclosure.data = response
          this.enclosure.series = [
            {
              data: response.data.map((s) => s.parks_count),
            },
          ]
          if (this.$refs.enclosure) {
            this.$refs.enclosure.updateOptions({
              xaxis: {
                ...this.enclosure.chartOptions.xaxis,
                categories: response.data.map((s) => s.name),
              },
            })
          } else {
            this.enclosure.chartOptions = {
              ...this.enclosure.chartOptions,
              xaxis: {
                ...this.enclosure.chartOptions.xaxis,
                categories: response.data.map((s) => s.name),
              },
            }
          }
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading.enclosure = false))
    },
    getByUpz() {
      this.loading.upz = true
      if (this.$refs.upz) {
        this.$refs.enclosure.updateSeries([{ data: [] }])
      }
      const { location, enclosure, certified, admin, upz, neighborhood } =
        this.model
      this.model.resetOnlyWhenUpdate = false
      const params = {
        location,
        upz,
        neighborhood,
        park_type: this.model.park_type,
        enclosure,
        certified,
        admin,
      }
      this.model
        .byUpz({ params })
        .then((response) => {
          this.upz.data = response
          this.upz.series = [
            {
              data: response.data.map((upz) => {
                return {
                  x: upz.name,
                  y: upz.parks_count,
                }
              }),
            },
          ]
          if (this.$refs.upz) {
            this.$refs.upz.updateOptions({
              xaxis: {
                categories: response.data.map((upz) => upz.name),
              },
            })
          } else {
            this.upz.chartOptions = {
              ...this.upz.chartOptions,
              xaxis: {
                categories: response.data.map((s) => s.name),
              },
            }
          }
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading.upz = false))
    },
    onSearchEndowment() {
      this.endowmentLoading = true
      this.countEndowment = []
      this.model
        .byEndowment(this.equipment.endowment_id)
        .then((response) => {
          this.items_parks = response.data.parks.filter(park => park.id !== null) || []
          this.countEndowment = [{ parks_count : this.items_parks.length }]  || []
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.endowmentLoading = false
        })
    },
    onExcelByType() {
      const headers = this.types_table.headers
        .filter((h) => h.value !== 'icon')
        .map((h) => {
          return {
            label: h.text,
            field: h.value,
          }
        })
      const data = this.stats.data
      const fName = this.$t('parks.titles.type')
      if (data.length > 0) {
        this.createExcelFile(fName, headers, data)
      } else {
        this.$snackbar({ message: 'No data' })
      }
    },
    onExcelByCertification() {
      const headers = [
        {
          label: this.certified.data.data.name,
          value: 'value',
        },
      ]
      const data = [
        {
          value: this.certified.data.data.value,
        },
      ]
      const fName = this.$t('parks.titles.certified')
      if (data.length > 0) {
        this.createExcelFile(fName, headers, data)
      } else {
        this.$snackbar({ message: 'No data' })
      }
    },
    onExcelByLocations() {
      const headers = this.locations_table.headers.filter(
        (h) => h.value !== 'icon'
      )
      const data = this.locations
      const fName = this.$t('parks.titles.locality')
      if (data.length > 0) {
        this.createExcelFile(fName, headers, data)
      } else {
        this.$snackbar({ message: 'No data' })
      }
    },
    onExcelByEnclosure() {
      const data = this.enclosure.data.data
      if (data.length > 0) {
        const headers = [
          {
            label: this.$t('parks.titles.stratum'),
            field: 'name',
          },
          {
            label: 'TOTAL',
            field: 'parks_count',
          },
        ]
        const fName = this.$t('parks.titles.stratum')
        this.createExcelFile(fName, headers, data)
      } else {
        this.$snackbar({ message: 'No data' })
      }
    },
    onExcelByUpz() {
      const data = this.upz.data.data
      if (data.length > 0) {
        const headers = [
          {
            label: this.$t('parks.titles.upz'),
            field: 'name',
          },
          {
            label: this.$t('parks.park.upz'),
            field: 'code',
          },
          {
            label: 'TOTAL',
            field: 'parks_count',
          },
        ]
        const fName = this.$t('parks.titles.upz')
        this.createExcelFile(fName, headers, data)
      } else {
        this.$snackbar({ message: 'No data' })
      }
    },
    onSelect(data) {
      this.selectedMap = data
      if (this.selectedMap) {
        this.model.reset()
        this.model.location = [this.selectedMap.id]
        this.onSubmit()
        this.$nextTick(this.onReloadLocation)
      }
    },
    onReloadLocation() {
      return this.$refs && this.$refs.v_map && this.$refs.v_map.getByLocation()
    },
    // Data
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
    getUpzAll() {
      this.finding = true
      this.up
        .index()
        .then((response) => {
          this.upzData = response.data
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
    onClearLocality() {
      // this.upzData = []
      // this.neighborhoods = []
    },
    getUpz(id) {
      return new Promise((resolve) => {
        this.neighborhoods = []
        if (id) {
          this.start()
          this.locality
            .upz(id)
            .then((response) => {
              this.upzData = response.data
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
      const upz = this.upzData.find((upz) => upz.upz_code === id)
      if (upz && upz.id) {
        this.start()
        this.locality
          .neighborhoods(this.model.location, upz.id)
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
      this.enclosureModel
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
      this.countEndowment = []
    },
    onExcel() {
      this.finding = true
      const {
        location,
        upz,
        neighborhood,
        enclosure,
        admin,
        certified,
        vigilance,
        stratum,
      } = this.model
      this.model.resetOnlyWhenUpdate = false
      const params = {
        location,
        upz,
        neighborhood,
        park_type: this.model.park_type,
        enclosure,
        certified,
        admin,
        vigilance,
        stratum,
        equipment_id: this.model.equipment_id,
        endowment_id: this.model.endowment_id,
      }
      this.model
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
        })
        .finally(() => {
          this.finding = false
          this.sheet = false
          this.onSubmit()
        })
    },
    onClear() {
      this.model.reset()
      this.onSubmit()
      this.$nextTick(this.onReloadLocation)
    },
    start() {
      this.finding = true
    },
    stop() {
      this.finding = false
    },
    getExcelnew(){
      window.open(`${process.env.VUE_APP_API_URL_BASE}api/parks/reportEndowmentDotacion/?endowmentId=${this.equipment.endowment_id}`, '_blank')
    }


  },
}
</script>

<style lang="scss">
.v-apexchart-card {
  .apexcharts-menu-item {
    color: black;
  }
  .apexcharts-toolbar {
    color: white;
  }
  .apexcharts-tooltip {
    color: black;
  }
  .apexcharts-menu-icon svg,
  .apexcharts-pan-icon svg,
  .apexcharts-zoom-icon svg,
  .apexcharts-zoomin-icon svg,
  .apexcharts-zoomout-icon svg,
  .apexcharts-reset-icon svg {
    fill: white !important;
  }
  .apexcharts-menu-icon.apexcharts-selected svg,
  .apexcharts-pan-icon.apexcharts-selected svg,
  .apexcharts-zoom-icon.apexcharts-selected svg,
  .apexcharts-zoomin-icon.apexcharts-selected svg,
  .apexcharts-zoomout-icon.apexcharts-selected svg,
  .apexcharts-reset-icon.apexcharts-selected svg {
    fill: #fff !important;
  }
  .apexcharts-tooltip-marker {
    fill: #00b0ff;
  }

}
.container-park-staff {
  max-height:250px;
  overflow-y:auto
}
  
</style>
