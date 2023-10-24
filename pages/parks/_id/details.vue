<template>
  <div>
    <v-parallax
      :lazy-src="bg"
      height="350"
      class="text-center parallax-rounded"
      :src="bg"
    >
      <v-overlay absolute :opacity="0.3">
        <h1 v-if="!!park.name" class="display-serif-2" style="font-size:2.5rem !important">
          {{ `${park.code} - ${park.name}` }}
        </h1>
        <v-time-ago
          v-if="park.updated_at"
          classes="caption"
          icon="mdi-calendar"
          :date-time="park.updated_at"
          :prefix="$t('buttons.Updated')"
        />
      </v-overlay>
    </v-parallax>
    <v-row dense class="main main-raised mb-12 transparent">
      <v-col cols="12" md="4" sm="12">
        <v-card>
          <p class="text-center mb-0 pt-1">Porcentaje Área</p>
          <v-apexchart
            ref="areaChart"
            type="bar"
            :options="chart.chartOptions"
            :series="chart.series"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card class="text-center v-card--plan">
          <v-avatar size="80">
            <v-icon size="50">mdi-account-group</v-icon>
          </v-avatar>
          <v-card-text>
            <animated-number
              class="display-serif-2 my-6"
              :value="park.capacity || 0"
              :duration="1000"
              :formatValue="numberFormat"
              :round="1"
              :delay="100"
            />
            <i18n path="parks.park.capacity" tag="p" />
            <!--
            <v-skeleton-loader
              :loading="finding"
              type="list-item-avatar-three-line@1"
            >
              <v-list class="text-left" dense two-line>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-calendar</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{
                        park.visited_at
                          ? park.visited_at
                          : $t('parks.label.noDate')
                      }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ `${$t('parks.park.visited_at')}` }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-skeleton-loader>
            -->
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card class="text-center v-card--plan">
           <p class="text-center mb-0 pt-1">Destacados</p>
          <!--
          <template>
            <v-avatar size="80">
              <v-icon size="50">mdi-currency-usd</v-icon>
            </v-avatar>
            <v-card-text>
              <animated-number
                class="display-serif-2 my-6"
                :value="park.pse_payments || 0"
                :duration="1000"
                :round="1"
                :formatValue="money"
                :delay="100"
              />
              <p class="text-center mb-0 pt-1">Total recibido PSE</p>
            </v-card-text>
          </template>
          -->
          <template>
              <v-container>
                <v-row dense>
                  <v-col
                    cols="4" sm="3" md="4"
                    v-for="card in park.features"
                    class="d-flex child-flex"
                    :key="card.id"
                  >
                   <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                         <v-img
                            :src="card.Icon"
                            :lazy-src="card.Icon"
                            aspect-ratio="1"
                            class="grey lighten-4 rounded"
                            v-bind="attrs"
                            v-on="on"
                            height="70"
                            contain
                            >
                            <v-btn color="red" @click="onRemoveFeature(park.id, card.id)" icon height="17" width="17" class="btn-remove-feature">
                              <v-icon dark>mdi-close</v-icon>
                            </v-btn>
                          </v-img>
                      </template>
                      <span>{{card.Nombre}}</span>
                    </v-tooltip>
                  </v-col> 
                </v-row>
                <div class="text-center" v-if="park.features ? park.features.length == 0 : true" >
                  <v-avatar size="80">
                    <v-icon size="80">mdi-alert-circle</v-icon>
                  </v-avatar>
                  <v-card-text>
                      Sin Información
                  </v-card-text>
                </div>
                <div class="d-flex justify-end">
                  <v-btn class="mx-2" @click="onFeaturesDialog" fab dark x-small color="success">
                    <v-icon dark>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </div>
              </v-container>
            <!-- <p class="text-center mb-0 pt-1">Población</p>
            <v-apexchart
              ref="populationChart"
              type="donut"
              :options="population_chart.chartOptions"
              :series="population_chart.series"
            /> -->
          </template>
        </v-card>
      </v-col>
      <v-col v-for="(card, i) in cards" cols="12" md="3" :key="i">
        <v-card class="d-flex align-center" height="80" :to="card.to">
          <v-img
            :src="card.image"
            :lazy-src="card.image"
            :alt="card.name"
            aspect-ratio="16/9"
            height="80"
          >
            <v-scroll-y-transition>
              <v-overlay absolute opacity="0.6">
                <div class="flex-grow-1 text-center font-weight-bold">
                  <v-icon dark x-large left v-text="card.icon" />
                  {{ card.name }}
                </div>
              </v-overlay>
            </v-scroll-y-transition>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <base-material-card
      class="my-12"
      icon="mdi-pine-tree"
      :color="park.color || 'grey'"
    >
      <template #toolbar>
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="card-title display-serif-1">
            {{ park.name }}
          </v-toolbar-title>
          <v-spacer />
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
              <v-list-item @click="$fetch">
                <v-list-item-icon>
                  <v-icon>mdi-refresh</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ $t('buttons.Refresh') }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="canUpdatePark"
                :to="
                  localePath({
                    name: 'parks-id-edit',
                    params: { id: $route.params.id },
                  })
                "
              >
                <v-list-item-icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ $t('buttons.Edit') }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </template>
      <v-row dense class="mt-2">
        <v-col cols="12" md="12">
          <v-park-data :paginate="25" :park="park" :loading="finding">
            <!--
            <template #prepend-panel>
              <v-expansion-panel>
                <v-expansion-panel-header ripple>
                  <h1 class="display-serif-1">
                    <v-icon left>mdi-text</v-icon>
                    {{ $t('parks.expansion.origin') }}
                  </h1>
                  <template #actions>
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
                        <v-list-item @click="onHelpOrigin">
                          <v-list-item-icon>
                            <v-icon>mdi-help-circle-outline</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Help') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="onRefreshOrigin">
                          <v-list-item-icon>
                            <v-icon>mdi-refresh</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Refresh') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-if="canCreateOrigin"
                          @click="onCreateOrigin"
                        >
                          <v-list-item-icon>
                            <v-icon>mdi-plus-circle-outline</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Create') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-if="canUpdateOrigin"
                          @click="onUpdateOrigin(park.origin)"
                        >
                          <v-list-item-icon>
                            <v-icon>mdi-pencil</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Update') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-if="canViewHiOrigin"
                          @click="onHistoryOrigin(park.origin)"
                        >
                          <v-list-item-icon>
                            <v-icon>mdi-history</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.History') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-if="canDeleteOrigin"
                          @click="onDeleteOrigin(park.origin)"
                        >
                          <v-list-item-icon>
                            <v-icon>mdi-close</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Delete') }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row v-if="park.origin" dense class="my-3">
                    <v-col cols="12" md="6" sm="12">
                      <v-carousel hide-delimiters cycle height="350">
                        <v-carousel-item
                          v-for="(img, i) in park.origin.images || []"
                          :key="i"
                          :src="img"
                          :lazy-src="img"
                          :href="img"
                          target="_blank"
                          eager
                          reverse-transition="fade-transition"
                          transition="fade-transition"
                        >
                          <v-avatar size="30" color="primary">
                            <span class="white--text">
                              {{ i + 1 }}
                            </span>
                          </v-avatar>
                        </v-carousel-item>
                      </v-carousel>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <h1 class="display-serif-1 mt-3" v-text="park.name" />
                      <v-time-ago
                        v-if="park.origin.updated_at"
                        classes="caption"
                        icon="mdi-calendar"
                        :date-time="park.origin.updated_at"
                        :prefix="$t('buttons.Updated')"
                      />
                      <p class="mt-5" v-text="park.origin.paragraph_1" />
                      <p v-text="park.origin.paragraph_2" />
                    </v-col>
                  </v-row>
                  <v-empty-state
                    v-else
                    icon="mdi-image-text"
                    :label="$t('$vuetify.noDataText')"
                  >
                    <v-btn
                      v-if="canCreateStory"
                      color="primary"
                      @click="onCreateOrigin"
                    >
                      {{ $t('buttons.Create') }}
                    </v-btn>
                  </v-empty-state>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </template>
            -->
            <template #append-panel>
              <v-expansion-panel>
                <v-expansion-panel-header ripple>
                  <h1 class="display-serif-1">
                    <v-icon left>mdi-key</v-icon>
                    {{ $t('parks.park.rupi') }}
                  </h1>
                  <template #actions>
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
                        <v-list-item @click="onHelpRupi">
                          <v-list-item-icon>
                            <v-icon>mdi-help-circle-outline</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Help') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="onRefreshRupi">
                          <v-list-item-icon>
                            <v-icon>mdi-refresh</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Refresh') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="canCreateRupi" @click="onCreateRupi">
                          <v-list-item-icon>
                            <v-icon>mdi-plus-circle-outline</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Create') }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card flat color="transparent">
                    <v-card-text>
                      <v-skeleton-loader
                        :loading="finding"
                        type="list-item-avatar-three-line@2"
                      >
                        <v-list dense>
                          <v-list-item
                            v-for="(rupi, i) in park.rupis"
                            :key="i"
                            ripple
                          >
                            <v-list-item-icon>
                              <v-icon>mdi-file</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ `${$t('parks.park.rupi')}` }}
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                {{ rupi.name }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle v-if="!!rupi.updated_at">
                                <v-time-ago
                                  icon="mdi-calendar"
                                  :date-time="rupi.updated_at"
                                  :prefix="$t('buttons.Updated')"
                                />
                              </v-list-item-subtitle>
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
                                  <v-list-item
                                    v-if="canUpdateRupi"
                                    @click="onUpdateRupi(rupi)"
                                  >
                                    <v-list-item-icon>
                                      <v-icon>mdi-pencil</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>
                                      {{ $t('buttons.Update') }}
                                    </v-list-item-title>
                                  </v-list-item>
                                  <v-list-item
                                    v-if="canViewHiRupi"
                                    @click="onHistoryRupi(rupi)"
                                  >
                                    <v-list-item-icon>
                                      <v-icon>mdi-history</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>
                                      {{ $t('buttons.History') }}
                                    </v-list-item-title>
                                  </v-list-item>
                                  <v-list-item
                                    v-if="canDeleteRupi"
                                    @click="onDeleteRupi(rupi)"
                                  >
                                    <v-list-item-icon>
                                      <v-icon>mdi-close</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>
                                      {{ $t('buttons.Delete') }}
                                    </v-list-item-title>
                                  </v-list-item>
                                </v-list>
                              </v-menu>
                            </v-list-item-action>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-subtitle v-if="canCreateRupi">
                              {{
                                park.rupis && park.rupis.length > 0
                                  ? $t('buttons.Add')
                                  : $t('$vuetify.noDataText')
                              }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle
                              v-else-if="park.rupis && park.rupis.length === 0"
                            >
                              {{ $t('$vuetify.noDataText') }}
                            </v-list-item-subtitle>
                            <v-list-item-action v-if="canCreateRupi">
                              <v-tooltip top>
                                <template #activator="{ on }">
                                  <v-icon v-on="on" @click="onCreateRupi">
                                    mdi-plus-circle-outline
                                  </v-icon>
                                </template>
                                <span>{{ $t('buttons.Add') }}</span>
                              </v-tooltip>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                      </v-skeleton-loader>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h1 class="display-serif-1">
                    <v-icon left>mdi-alert</v-icon>
                    {{ $t('parks.titles.plans') }}
                  </h1>
                  <template #actions>
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
                        <v-list-item @click="onHelpPlan">
                          <v-list-item-icon>
                            <v-icon>mdi-help-circle-outline</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Help') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="$fetch">
                          <v-list-item-icon>
                            <v-icon>mdi-refresh</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Refresh') }}
                          </v-list-item-title>
                        </v-list-item>
                         <v-list-item @click="onUploadPlan">
                          <v-list-item-icon>
                            <v-icon>mdi-file-upload</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Upload') }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-skeleton-loader
                    :loading="finding"
                    type="list-item-avatar-three-line@6"
                    width="100%"
                  >
                    <v-row v-if="!!park.plans && park.plans.length > 0" dense>
                      <v-col
                        v-for="(plan, i) in park.plans"
                        :key="i"
                        cols="12"
                        sm="12"
                        md="6"
                      >
                        <v-list class="ma-0 pa-0" two-line>
                          <v-list-item
                            class="ma-0 pa-0"
                            :href="plan.url"
                            target="_blank"
                          >
                            <v-list-item-avatar>
                              <v-avatar color="primary">
                                <span class="white--text">
                                  {{ plan.order }}
                                </span>
                              </v-avatar>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title v-text="plan.category" />
                              <v-list-item-subtitle
                                class="font-weight-bold"
                                v-text="plan.description"
                              />
                              <v-list-item-subtitle
                                class="font-weight-bold"
                                :v-text="`${$t('parks.label.version')}: ${ plan.version }`"
                              />
                              <v-list-item-subtitle
                                class="font-weight-bold"
                                :v-text="
                                  `${$t('parks.label.created_at')}: ${
                                    plan.created_at
                                  }`
                                "
                              />
                              <v-list-item-subtitle
                                class="font-weight-bold"
                                :v-text="
                                  `${$t('parks.label.updated_at')}: ${
                                    plan.updated_at
                                  }`
                                "
                              />
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-col>
                    </v-row>
                    <v-card-text v-else>
                      <v-empty-state
                        icon="mdi-alert"
                        :label="$t('$vuetify.noDataText')"
                      >
                      </v-empty-state>
                    </v-card-text>
                  </v-skeleton-loader>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!--
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h1 class="display-serif-1">
                    <v-icon>mdi-text</v-icon>
                    {{ $t('parks.titles.story') }}
                  </h1>
                  <template #actions>
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
                        <v-list-item @click="onHelpStory">
                          <v-list-item-icon>
                            <v-icon>mdi-help-circle-outline</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Help') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="onRefreshStory">
                          <v-list-item-icon>
                            <v-icon>mdi-refresh</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Refresh') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-if="canCreateStory"
                          @click="onCreateStory"
                        >
                          <v-list-item-icon>
                            <v-icon>mdi-plus-circle-outline</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('buttons.Create') }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-skeleton-loader
                    :loading="finding"
                    type="card@2"
                    max-width="100%"
                  >
                    <v-card-text v-if="park.story && park.story.length > 0">
                      <v-card
                        v-for="(story, i) in park.story"
                        :key="i"
                        elevation="2"
                        class="my-4"
                        flat
                      >
                        <v-toolbar dense flat color="transparent">
                          <v-toolbar-title class="display-serif-1">
                            {{ story.title }}
                          </v-toolbar-title>
                          <v-spacer />
                          <v-menu offset-y left>
                            <template #activator="{ on, attrs }">
                              <v-btn icon v-bind="attrs" v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                              </v-btn>
                            </template>
                            <v-list dense>
                              <v-list-item
                                v-if="canViewHiStory"
                                @click="onHistoryStory(story)"
                              >
                                <v-list-item-icon>
                                  <v-icon>mdi-history</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>
                                  {{ $t('buttons.History') }}
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item
                                v-if="canUpdateStory"
                                @click="onUpdateStory(story)"
                              >
                                <v-list-item-icon>
                                  <v-icon>mdi-pencil</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>
                                  {{ $t('buttons.Update') }}
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item
                                v-if="canDeleteStory"
                                @click="onDeleteStory(story)"
                              >
                                <v-list-item-icon>
                                  <v-icon>mdi-close</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>
                                  {{ $t('buttons.Delete') }}
                                </v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-toolbar>
                        <v-card-text>
                          {{ story.text }}
                        </v-card-text>
                        <v-card-actions
                          v-if="!!story.updated_at"
                          class="caption"
                        >
                          <v-time-ago
                            icon="mdi-calendar"
                            :date-time="story.updated_at"
                            :prefix="$t('buttons.Updated')"
                          />
                        </v-card-actions>
                      </v-card>
                      <v-btn
                        v-if="canCreateStory"
                        class="mt-3"
                        block
                        color="primary"
                        @click="onCreateStory"
                      >
                        {{ $t('buttons.Add') }}
                      </v-btn>
                    </v-card-text>
                    <v-card-text v-else>
                      <v-empty-state
                        icon="mdi-image-text"
                        :label="$t('$vuetify.noDataText')"
                      >
                        <v-btn
                          v-if="canCreateStory"
                          color="primary"
                          @click="onCreateStory"
                        >
                          {{ $t('buttons.Create') }}
                        </v-btn>
                      </v-empty-state>
                    </v-card-text>
                  </v-skeleton-loader>
                </v-expansion-panel-content>
              </v-expansion-panel>
              -->
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h1 class="display-serif-1">
                    <v-icon>mdi-currency-usd</v-icon>
                    Aprovechamiento Económico
                  </h1>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-skeleton-loader
                    :loading="finding"
                    type="card@2"
                    max-width="100%"
                  >
                    <v-skeleton-loader
                      :loading="finding"
                      type="list-item-avatar-three-line@6"
                      width="100%"
                    >
                      <v-row v-if="economics.length > 0" dense>
                        <v-col
                          v-for="(economic, i) in economics"
                          :key="i"
                          cols="12"
                          sm="12"
                          md="6"
                        >
                          <v-list class="ma-0 pa-0" three-line>
                            <v-list-item class="ma-0 pa-0">
                              <v-list-item-content>
                                <v-list-item-title v-text="economic.activity" />
                                <v-list-item-subtitle
                                  class="font-weight-bold"
                                  v-text="`Permitido: ${economic.status}`"
                                />
                                <v-list-item-subtitle
                                  class="font-weight-bold"
                                  v-text="economic.manager"
                                />
                                <v-list-item-subtitle
                                  style="
                                    white-space: break-spaces;
                                    -webkit-line-clamp: unset;
                                  "
                                >
                                  <span v-text="economic.description" />
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-col>
                      </v-row>
                      <v-card-text v-else>
                        <v-empty-state
                          icon="mdi-alert"
                          :label="$t('$vuetify.noDataText')"
                        >
                        </v-empty-state>
                      </v-card-text>
                    </v-skeleton-loader>
                  </v-skeleton-loader>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </template>
          </v-park-data>
        </v-col>
      </v-row>
    </base-material-card>
    <v-row>
      <v-col
        v-if="park.audit && canViewHiPark"
        cols="12"
        class="mb-12 text-center"
      >
        <h1 class="display-serif-3" v-text="$t('titles.Historic')" />
      </v-col>
      <v-col v-if="park.audit && canViewHiPark" cols="12" md="12">
        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item
            v-for="(timeline, i) in park.audit"
            :key="i"
            color="primary"
            icon="mdi-calendar"
            fill-dot
            :large="$vuetify.breakpoint.mdAndUp"
            :small="$vuetify.breakpoint.smAndDown"
          >
            <template #opposite>
              <v-time-ago :date-time="timeline.created_at" />
            </template>
            <v-card class="pa-6">
              <v-chip
                color="warning"
                class="overline mb-3"
                style="white-space: break-spaces"
                small
                v-text="timeline.event"
              />
              <p>{{ $t('texts.NewValues') }}</p>
              <v-json-pretty :data="timeline.new_values" />
              <p>{{ $t('texts.OldValues') }}</p>
              <v-json-pretty :data="timeline.old_values" />
              <v-list dense two-line>
                <!-- Professional -->
                <v-list-item class="ma-0 pa-0" dense>
                  <v-list-item-icon class="hidden-sm-and-down">
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="timeline.user" />
                    <v-list-item-subtitle v-text="$t('orfeo.event.user')" />
                    <v-list-item-subtitle v-text="timeline.ip" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="$vuetify.breakpoint.smAndDown"
                  class="ma-0 pa-0"
                  dense
                >
                  <v-list-item-icon class="hidden-sm-and-down">
                    <v-icon>mdi-calendar</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="timeline.created_at" />
                    <v-list-item-subtitle
                      v-text="$t('orfeo.event.changed_at')"
                    />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-user-agent :user-agent="timeline.user_agent" />
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
    <v-form-dialog
      ref="rupiDialog"
      title="parks.park.rupi"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :max-width="$vuetify.breakpoint.smAndDown ? undefined : 600"
      transition="dialog-bottom-transition"
      @click:close="onCloseRupi"
    >
      <v-rupi-form
        :form-data="rupiData"
        :park-id="$route.params.id"
        @success="onRefreshRupi"
      />
    </v-form-dialog>
    <v-form-dialog
      ref="storyDialog"
      title="parks.park.story"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :max-width="$vuetify.breakpoint.smAndDown ? undefined : 600"
      transition="dialog-bottom-transition"
      @click:close="onCloseStory"
    >
      <v-story-form
        :form-data="storyData"
        :park-id="$route.params.id"
        @success="onRefreshStory"
      />
    </v-form-dialog>
    <v-form-dialog
      ref="originDialog"
      title="parks.park.origin"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :max-width="$vuetify.breakpoint.smAndDown ? undefined : 600"
      transition="dialog-bottom-transition"
      @click:close="onCloseOrigin"
    >
      <v-origin-form
        :form-data="originData"
        :park-id="park.id"
        @success="onRefreshOrigin"
      />
    </v-form-dialog>
    <v-check-dialog ref="confirmDialog">
      {{ $t('confirm.delete') }}
    </v-check-dialog>
    <v-check-dialog
      ref="historyDialog"
      toolbar-color="primary"
      title="buttons.History"
      :show-btn="false"
      max-width="600"
      @dialog:cancel="history = []"
      @dialog:close="history = []"
    >
      <v-audits :audits="history" />
    </v-check-dialog>
    <v-check-dialog
      ref="helpDialog"
      toolbar-color="primary"
      title="buttons.Help"
      max-width="600"
      @dialog:cancel="helpText = null"
      @dialog:close="helpText = null"
    >
      {{ helpText }}
    </v-check-dialog>

    <v-dialog v-model="featuresDialog" width="600" >
      <v-card>
        <v-card-title class="text-h5 primary lighten-2" dark>
          Agregar Destacados
        </v-card-title>
        <v-card-text class="container-park-staff">
             <v-autocomplete
               v-model="valuesFeatures"
               :items="itemsFeatureSelect"
               auto-select-first
               item-text="name"
               item-value="id"
               chips
               clearable
               deletable-chips
               multiple
               small-chips
               outlined
               label="Destacados"
             ></v-autocomplete>  
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
           <v-btn color="grey" dark @click="featuresDialog = false">
              CERRAR
          </v-btn>
           <v-btn color="primary" dark @click="onAddFeaturePark">
              GUARDAR
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogUploadPlan" width="700" persistent >
     <v-card>
      <validation-observer ref="plansEmergency">
        <v-form  @submit.prevent="onSubmitPlan">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Plan de Emergencia</v-toolbar-title>
            <v-spacer />
            <slot name="toolbar-buttons" />
            <v-btn :aria-label="$t('buttons.Close')" icon dark @click="onCloseUploadPlane">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        <v-divider></v-divider>
          <v-card-text class="container-park-staff container-upload-plan">
               <v-row>
                 <v-col cols="12">
                   <validation-provider
                       v-slot="{ errors }"
                       rules="required"
                       name="Descripción del archivo"
                     >
                       <v-text-field
                         v-model="descriptionFile"
                         label="Descripcion del Archivo "
                         :error-messages="errors"
                         prepend-icon="mdi-format-text"
                         :loading="finding"
                       ></v-text-field>
                   </validation-provider>
                 </v-col>
                  <v-col cols="12" md="6">
                   <validation-provider
                       v-slot="{ errors }"
                       rules="required"
                       name="Categoria del documento"
                     >
                       <v-select
                          name="categoryFilePlan"
                          :error-messages="errors"
                          v-model="categoryFilePlan"
                          label="Categoria del documento"
                          item-text="categoria"
                          item-value="id"
                          :items="plansCategories"
                          density="comfortable"
                          prepend-icon="mdi-currency-eth"
                          :loading="finding"
                        ></v-select>
                   </validation-provider>
                  </v-col>
                  <v-col cols="12" md="6">
                    <validation-provider
                       v-slot="{ errors }"
                       rules="required|numeric"
                       name="Orden"
                     >
                       <v-text-field
                         v-model="orderFile"
                         label="Orden del documento"
                         :error-messages="errors"
                         type="number"
                         prepend-icon="mdi-numeric"
                         :loading="finding"
                       ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" md="6">
                    <validation-provider
                       v-slot="{ errors }"
                       rules="required|numeric"
                       name="Versión"
                     >
                       <v-text-field
                         v-model="versionFile"
                         label="Versión del documento"
                         :error-messages="errors"
                         type="number"
                         prepend-icon="mdi-numeric"
                         :loading="finding"
                       ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" md="6">
                     <validation-provider
                        v-slot="{ errors }"
                        name="Plan de emergencia"
                        rules="required"
                      >
                        <v-file-input
                          v-model="filePlan"
                          :error-messages="errors"
                          label="Plan de emergencia (pdf)"
                          accept="application/pdf"
                          prepend-icon="mdi-cloud-upload"
                          @change="changeFile"
                          :loading="finding"
                        />
                      </validation-provider>
                  </v-col>
               </v-row>
          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
           <v-btn color="grey" :disabled="finding" dark @click="onCloseUploadPlane">
              CERRAR
          </v-btn>
           <v-btn type="submit" :disabled="finding" color="primary" dark>
              GUARDAR
            </v-btn>
        </v-card-actions>
      </v-form>
      </validation-observer>
     </v-card>
    </v-dialog>
   
  </div>
</template>

<router lang="yaml">
meta:
  title: parks.titles.details
</router>

<script>
import AnimatedNumber from 'animated-number-vue'
import { Park } from '~/models/services/parks/Park'
import { Rupi } from '~/models/services/parks/Rupi'
import { Origin } from '~/models/services/parks/Origin'
import { Story } from '~/models/services/parks/Story'
import { Permission } from '~/models/services/parks/Permission'
import { Owned } from '~/models/services/parks/Owned'
import { Api } from '~/models/Api'
import { Menu } from '~/models/services/parks/Menu'
import { Feature } from '~/models/services/parks/Features'
import { PlanEmergency } from '~/models/services/parks/PlanesEmergency'
const defaultArea = [
  {
    name: 'Total',
    data: [0, 0],
  },
]
const defaultPopulation = [0, 0, 0]
export default {
  name: 'ParkDetails',
  nuxtI18n: {
    paths: {
      en: '/parks/:id/details',
      es: '/parques/:id/detalles',
    },
  },
  auth: 'auth',
  components: {
    VParkData: () => import('@/components/parks/ParkDataTabs'),
    BaseMaterialCard: () => import('@/components/base/MaterialCard'),
    VEmptyState: () => import('@/components/base/EmptyState'),
    VCheckDialog: () => import('@/components/base/VCheckDialog'),
    VFormDialog: () => import('@/components/base/VFormDialog'),
    VRupiForm: () => import('@/components/parks/Form/RupiForm'),
    VStoryForm: () => import('@/components/parks/Form/StoryForm'),
    VOriginForm: () => import('@/components/parks/Form/OriginForm'),
    VTimeAgo: () => import('@/components/base/TimeAgo'),
    VAudits: () => import('@/components/base/VAudits'),
    VUserAgent: () => import('@/components/base/VUserAgent'),
    AnimatedNumber,
  },
  middleware: ['permissions'],
  head: (vm) => ({
    title: `${vm.$t('parks.titles.details')} ${vm.park.code || ''} ${
      vm.park.name || ''
    }`.trim(),
  }),
  meta: {
    permissionsUrl: Api.END_POINTS.PARKS_PERMISSIONS(),
    title: 'parks.titles.details',
  },
  created() {
    this.drawerModel = new Menu()
  },
  data: (vm) => ({
    // Bg
    bg: require('@/static/images/parks/profile.jpg'),
    // Permissions
    perm: new Permission(),
    permissions: [],
    // Rupis
    rupis: new Rupi(vm.$route.params.id),
    rupiData: {},
    // Story
    stories: new Story(vm.$route.params.id),
    storyData: {},
    // Origin
    origin: new Origin(vm.$route.params.id),
    originData: {},
    // Park
    model: new Park(),
    finding: false,
    park: {},
    assigned_park: new Owned(),
    assigned_parks: [],
    // Charts
    chart: {
      series: [
        {
          name: 'Total',
          data: [0, 0],
        },
      ],
      chartOptions: {
        chart: {
          height: '200',
          type: 'bar',
        },
        plotOptions: {
          bar: {
            distributed: true,
          },
        },
        toolbar: {
          tools: {
            customIcons: [
              {
                icon: '<v-icon size="20">mdi-refresh</v-icon>',
                index: 4,
                title: vm.$t('buttons.Refresh'),
                // class: 'custom-icon',
                click: vm.resetAreaChart,
              },
            ],
          },
        },
        tooltip: {
          theme: 'dark',
        },
        colors: ['#4caf50', '#607d8b'],
        xaxis: {
          categories: [
            vm.$t('parks.park.green_zone'),
            vm.$t('parks.park.grey_zone'),
          ],
        },
      },
    },
    population_chart: {
      series: [],
      chartOptions: {
        chart: {
          type: 'donut',
        },
        legend: {
          position: 'bottom',
        },
        tooltip: {
          theme: 'dark',
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E'],
        labels: [],
      },
    },
    history: [],
    helpText: null,
    // Economic
    economics: [],
    features: new Feature(),
    featuresDialog: false,
    itemsFeatureSelect: [],
    valuesFeatures: [],
    dialogUploadPlan:  false,
    filePlan: null,
    plansEmergency: new PlanEmergency(),
    plansCategories: [],
    descriptionFile: '',
    categoryFilePlan: '',
    orderFile: '',
    versionFile: '',
  }),
  fetch() {
    this.getEconomic()
    this.finding = true
    this.park.capacity = 0
    if (this.$refs.areaChart) {
      this.$refs.areaChart.updateSeries(defaultArea)
    }
    if (this.$refs.populationChart) {
      this.$refs.populationChart.updateSeries(defaultPopulation)
    }
    this.model
      .show(this.$route.params.id)
      .then((response) => {
        this.park = response.data
        // this.chart.series = response.data.area_chart
        // this.population_chart.series = response.data.population_chart
        if (this.$refs.areaChart) {
          this.$refs.areaChart.updateSeries(
            response.data.area_chart || defaultArea
          )
        }
        if (this.$refs.populationChart) {
          this.$refs.populationChart.updateSeries(
            response.data.population_chart || defaultPopulation
          )
          this.$refs.populationChart.updateOptions({
            ...this.population_chart.chartOptions,
            labels: [
              this.$t('parks.park.children_population'),
              this.$t('parks.park.youth_population'),
              this.$t('parks.park.older_population'),
            ],
          })
        }
        this.map = response.data.map
        const means = ['foto1', 'foto2', 'foto3', 'profile', 'foto1']
        const index = response.data.scale_id - 1
        this.bg = response.data.image !== ''
          ? response.data.image
          : require(`@/static/images/parks/${means[index]}.jpg`)
        // this.bg = means[index]
        // ? require(`@/static/images/parks/${means[index]}.jpg`)
        // : require('@/static/images/parks/profile.jpg')
      })
      .catch((errors) => {
        this.$snackbar({ message: errors.message })
      })
      .finally(() => {
        this.finding = false
      })
    this.assigned_park
      .parkKeys()
      .then((response) => {
        this.assigned_parks = response.data
      })
      .catch((errors) => {
        this.$snackbar({ message: errors.message })
      })
      .finally(() => {
        this.finding = false
      })
  },
  computed: {
    cards() {
      return [
        {
          name: 'Dotación',
          icon: 'mdi-soccer-field',
          image: require('@/static/images/parks/endowment.jpg'),
          to: this.localePath({
            name: 'parks-id-equipment',
            params: { id: this.park.code || this.park.id },
          }),
        },
        {
          name: 'Mobiliario',
          icon: 'mdi-view-grid-plus-outline',
          image: require('@/static/images/parks/furniture.jpg'),
          to: this.localePath({
            name: 'parks-id-furniture',
            params: { id: this.park.code || this.park.id },
          }),
        },
        {
          name: 'Actividades',
          icon: 'mdi-bike',
          image: require('@/static/images/parks/activities.jpg'),
          to: this.localePath({
            name: 'parks-id-activities',
            params: { id: this.park.code || this.park.id },
          }),
        },
        {
          name: 'Gestión Social',
          icon: 'mdi-nature-people',
          image: require('@/static/images/parks/social.jpg'),
          to: this.localePath({
            name: 'parks-id-social',
            params: { id: this.park.code || this.park.id },
          }),
        },
      ]
    },
    canUpdatePark() {
      return this.userHasAbilities
    },
    canViewHiPark() {
      return this.canViewHistory(this.ability_service.models.PARK)
    },
    canCreateRupi() {
      return (
        this.canManageOrCreate(this.ability_service.models.RUPI) &&
        this.userHasAbilities
      )
    },
    canUpdateRupi() {
      return (
        this.canManageOrUpdate(this.ability_service.models.RUPI) &&
        this.userHasAbilities
      )
    },
    canDeleteRupi() {
      return (
        this.canManageOrDestroy(this.ability_service.models.RUPI) &&
        this.userHasAbilities
      )
    },
    canViewHiRupi() {
      return this.canViewHistory(this.ability_service.models.RUPI)
    },
    canCreateStory() {
      return (
        this.canManageOrCreate(this.ability_service.models.STORY) &&
        this.userHasAbilities
      )
    },
    canUpdateStory() {
      return (
        this.canManageOrUpdate(this.ability_service.models.STORY) &&
        this.userHasAbilities
      )
    },
    canDeleteStory() {
      return (
        this.canManageOrDestroy(this.ability_service.models.STORY) &&
        this.userHasAbilities
      )
    },
    canViewHiStory() {
      return this.canViewHistory(this.ability_service.models.STORY)
    },
    canCreateOrigin() {
      return (
        this.canManageOrCreate(this.ability_service.models.ORIGIN) &&
        !this.park.origin &&
        this.userHasAbilities
      )
    },
    canUpdateOrigin() {
      return (
        this.canManageOrUpdate(this.ability_service.models.ORIGIN) &&
        this.park.origin &&
        this.userHasAbilities
      )
    },
    canDeleteOrigin() {
      return (
        this.canManageOrDestroy(this.ability_service.models.ORIGIN) &&
        this.park.origin &&
        this.userHasAbilities
      )
    },
    canViewHiOrigin() {
      return (
        this.canViewHistory(this.ability_service.models.ORIGIN) &&
        this.park.origin
      )
    },
    userHasAbilities() {
      const isAdmin = this.bouncer.isA(this.ability_service.roles.ROLE_ADMIN)
      return this.canManageOrUpdate(
        this.ability_service.models.PARK,
        isAdmin ? null : this.park
      )
    },
    themeFrame() {
      const { url, dark, light } = this.iframe
      return this.$vuetify.theme.dark ? `${url}${dark}` : `${url}${light}`
    },
    frame() {
      const query = this.$route.params.id.includes('-')
        ? `${this.iframe.filter}${this.param}'${this.$route.params.id}'`
        : ''
      return `${this.themeFrame}${query}`
    },
  },
  watch: {
    '$route.params.id': '$fetch',
  },
  methods: {
    // Money
    money(value) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',

        // These options are needed to round to whole numbers if that's what you want.
        // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      }).format(value || 0) /* $2,500.00 */
    },
    numberFormat(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    },
    // Economic Use
    getEconomic() {
      this.model
        .economic(this.$route.params.id)
        .then((response) => {
          this.economics = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
    },
    // Origin
    onRefreshOrigin() {
      this.start()
      this.origin
        .index()
        .then((response) => {
          this.park.origin = response.data
        })
        .then(() => {
          this.originData = {}
          return this.$refs.originDialog && this.$refs.originDialog.close()
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    onCreateOrigin() {
      return this.$refs.originDialog && this.$refs.originDialog.open()
    },
    onUpdateOrigin(item) {
      this.$refs.originDialog.open().then(() => {
        this.originData = item
      })
    },
    onDeleteOrigin(item) {
      this.$refs.confirmDialog.open().then(() => {
        if (item.id) {
          this.start()
          this.origin
            .destroy(item.id)
            .then((response) => {
              this.$snackbar({
                message: response.data,
                color: 'success',
              })
            })
            .then(() => this.onCloseOrigin())
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.stop()
              this.onRefreshOrigin()
            })
        }
      })
    },
    onHistoryOrigin(item) {
      this.history = item.audit || []
      this.$refs.historyDialog.open()
    },
    onHelpOrigin() {
      this.helpText = this.$t('parks.help.origin')
      this.$refs.helpDialog.open()
    },
    onCloseOrigin() {
      this.originData = {}
    },
    // Rupis
    onRefreshRupi() {
      this.start()
      this.rupis
        .index()
        .then((response) => {
          this.park.rupis = response.data
        })
        .then(() => {
          this.rupiData = {}
          return this.$refs.rupiDialog && this.$refs.rupiDialog.close()
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    onCreateRupi() {
      return this.$refs.rupiDialog && this.$refs.rupiDialog.open()
    },
    onUpdateRupi(item) {
      this.$refs.rupiDialog.open().then(() => {
        this.rupiData = item
      })
    },
    onDeleteRupi(item) {
      this.$refs.confirmDialog.open().then(() => {
        if (item.id) {
          this.start()
          this.rupis
            .destroy(item.id)
            .then((response) => {
              this.$snackbar({
                message: response.data,
                color: 'success',
              })
            })
            .then(() => this.onCloseRupi())
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.stop()
              this.onRefreshRupi()
            })
        }
      })
    },
    onHistoryRupi(item) {
      this.history = item.audit || []
      this.$refs.historyDialog.open()
    },
    onHelpRupi() {
      this.helpText = this.$t('parks.help.rupi')
      this.$refs.helpDialog.open()
    },
    onCloseRupi() {
      this.rupiData = {}
    },
    // Stories
    onRefreshStory() {
      this.start()
      this.stories
        .index()
        .then((response) => {
          this.park.story = response.data
        })
        .then(() => {
          this.storyData = {}
          return this.$refs.storyDialog && this.$refs.storyDialog.close()
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    onCreateStory() {
      return this.$refs.storyDialog && this.$refs.storyDialog.open()
    },
    onUpdateStory(item) {
      this.$refs.storyDialog.open().then(() => {
        this.storyData = item
      })
    },
    onDeleteStory(item) {
      this.$refs.confirmDialog.open().then(() => {
        if (item.id) {
          this.start()
          this.stories
            .destroy(item.id)
            .then((response) => {
              this.$snackbar({
                message: response.data,
                color: 'success',
              })
            })
            .then(() => this.onCloseStory())
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.stop()
              this.onRefreshStory()
            })
        }
      })
    },
    onHistoryStory(item) {
      this.history = item.audit || []
      this.$refs.historyDialog.open()
    },
    onHelpStory() {
      this.helpText = this.$t('parks.help.story')
      this.$refs.helpDialog.open()
    },
    onCloseStory() {
      this.storyData = {}
    },
    onHelpPlan() {
      this.helpText = this.$t('parks.help.plan')
      this.$refs.helpDialog.open()
    },
    async onUploadPlan(){
        this.dialogUploadPlan = true;
        try {
          const response = await this.plansEmergency.getCategoriesPlan();
          this.plansCategories = response.data;
        } catch (error) {
          this.plansCategories = [];
          this.$snackbar({ message: "Error inesperado obteniendo las categorias, Intente nuevamente" }) 
        }
    },
    async onRemoveFeature(parkId, featureId){
      try {
          this.start()
          const response = await this.features.featureRemove({parkId, featureId})
          this.$snackbar({ message: response.data.data, color: 'success'})
          const newfeatures = this.park.features.filter(item=>item.id !== featureId)
          this.park.features = newfeatures
          this.stop()
      } catch (error) {
         this.stop()
         this.$snackbar({ message: "Error inesperado al remover el destacado, Intente nuevamente" }) 
      }
    },
    async onFeaturesDialog(){
      try {
        this.featuresDialog = true
        const { features } = this.park
        const response = await this.features.featureAll()
        const temporal = features.map((item, index) => item.id)
        this.itemsFeatureSelect = response.data.filter(item => !temporal.includes(item.id))
      } catch (error) {
         this.itemsFeatureSelect =[]
         this.$snackbar({ message: "Error inesperado al obtener lista destacados, Intente nuevamente" }) 
      } 
    },
    async onAddFeaturePark(){
      try {
          const response = await this.features.featureAdd({ parkId: this.park.id, featureIds: this.valuesFeatures})
          this.itemsFeatureSelect = []
          this.valuesFeatures = []
          this.featuresDialog = false
          this.$fetch()
          this.$snackbar({message: response.data.data, color: 'success'})
      } catch (error) {
          this.itemsFeatureSelect = []
          this.valuesFeatures = []
          this.$snackbar({ message: "Error inesperado al agregar el destacado, Intente nuevamente" }) 
      }
    },
    changeFile(file){
      if (file) {
         const allowedExtensions = /(.pdf)$/i;
          if(!allowedExtensions.exec(file.name)){
            this.filePlan = null;
            this.$snackbar({ message: "Archivo Invalido, solo se permiten documentos con extensión pdf." })
          }
          if (file.size > 5000000) {
            this.filePlan = null;
            this.$snackbar({ message: "Paso maximo permitido del documento 5 MB!" })

          }
      }
    },
    async onSubmitPlan(){
      const valid = await this.$refs.plansEmergency.validate();
      if (valid) {
        const data = {
            file: this.filePlan,
            descripcionArchivo: this.descriptionFile,
            idCategoria: this.categoryFilePlan,
            orden: this.orderFile,
            idParque: this.park.id,
            version: this.versionFile
        }
        try {
          this.start();
          const response = await this.plansEmergency.planAdd(data);
          this.onCloseUploadPlane();
          this.$fetch();
          this.stop();
          this.$snackbar({message: response.data.data, color: 'success'})
        } catch (error) {
          this.stop();
          this.$snackbar({ message: "Error inesperado al cargar el documento, Intente nuevamente" }) 
        }
      }
    },

    onCloseUploadPlane(){
      this.dialogUploadPlan =  false;
      this.descriptionFile = '';
      this.$refs.plansEmergency.reset();
      this.categoryFilePlan = '';
      this.orderFile = '';
      this.versionFile = '';
      this.filePlan = null;
    },
    // Loading
    start() {
      this.finding = true
      this.$nuxt.$loading.start()
    },
    stop() {
      this.finding = false
      this.$nuxt.$loading.finish()
    },
  

  },
}
</script>

<style lang="sass">
@import "~vuetify/src/styles/settings/variables"

.v-card--plan
  .v-avatar
    border-radius: 50%
    border: 1px solid #E5E5E5

.parallax-rounded
  border-radius: $border-radius-root * 2

.main
  background: #FFFFFF
  position: relative
.main-raised
  margin: -60px 15px 20px
  border-radius: $border-radius-root * 2

.theme--dark
  .main
    background: #333

@media (max-width: 991px)
  .main-raised
    margin: -60px 5px 0px

.btn-remove-feature
  position: absolute
  bottom: 5px
  right: 5px
.container-park-staff
  margin-top:10px

.v-parallax__image 
  width: 100% !important
  height: 110vh !important
  object-fit: cover !important

.container-upload-plan
  height: 300px
</style>
