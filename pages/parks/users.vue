<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col v-if="canCreateAction" cols="12" sm="12" md="12">
        Realice la búqueda de un usuario, selecciónelo y asígnelos.
        <validation-observer ref="register" v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(findUser)">
            <v-row>
              <v-col cols="12" md="12" sm="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.required"
                  vid="username"
                  name="nombre de usuario"
                >
                  <v-autocomplete
                    v-model="form.username"
                    name="username"
                    :loading="finding"
                    :search-input.sync="search_user"
                    :filter="filterUser"
                    :error-messages="errors"
                    hint="Realice la búqueda por nombre de usuario, luego selecciónelo para mostrar los roles disponbles para asignar."
                    persistent-hint
                    :items="people"
                    color="primary"
                    label="Usuarios"
                    clearable
                    item-text="full_name"
                    item-value="id"
                    return-object
                    @change="setSelectedUser"
                  >
                    <template #item="data">
                      <v-list-item-avatar color="primary">
                        <span
                          class="white--text headline"
                          v-text="getInitials(data.item)"
                        />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-text="data.item.full_name" />
                        <v-list-item-subtitle
                          v-text="`C.C. ${data.item.document}`"
                        />
                      </v-list-item-content>
                    </template>
                    <template v-if="$vuetify.breakpoint.mdAndUp" #append-outer>
                      <v-btn
                        small
                        color="primary"
                        :loading="finding"
                        :disabled="finding"
                        type="submit"
                      >
                        <v-icon left>mdi-magnify</v-icon>
                        Buscar Usuario
                      </v-btn>
                    </template>
                  </v-autocomplete>
                </validation-provider>
              </v-col>
              <v-col v-if="$vuetify.breakpoint.smAndDown" cols="12" sm="12">
                <v-btn
                  small
                  color="primary"
                  :loading="finding_users"
                  :disabled="finding_users"
                  type="submit"
                >
                  <v-icon left>mdi-magnify</v-icon>
                  Buscar Usuario
                </v-btn>
              </v-col>
              <v-col
                v-if="selected_user && selected_user.id"
                cols="12"
                md="12"
                sm="12"
              >
                <p>{{ `${selected_user.full_name}` }}</p>
                <p>{{ `C.C. ${selected_user.document}` }}</p>
                <v-select
                  v-model="form.roles"
                  :loading="finding"
                  :readonly="finding"
                  name="stage"
                  item-text="title"
                  clearable
                  item-value="name"
                  multiple
                  autocomplete="off"
                  :items="roles_data"
                  prepend-icon="mdi-account"
                  menu-props="auto"
                  label="Asignar Rol"
                >
                  <template v-if="$vuetify.breakpoint.mdAndUp" #append-outer>
                    <v-btn
                      small
                      color="primary"
                      :loading="finding"
                      :disabled="finding || !form.roles"
                      @click="setRole"
                    >
                      <v-icon left>mdi-account</v-icon> Asignar Rol
                    </v-btn>
                  </template>
                </v-select>
              </v-col>
              <v-col v-if="$vuetify.breakpoint.smAndDown" cols="12" sm="12">
                <v-btn
                  small
                  color="primary"
                  :loading="finding_users"
                  :disabled="finding_users || !form.roles"
                  @click="setRole"
                >
                  <v-icon left>mdi-account</v-icon> Asignar Rol
                </v-btn>
              </v-col>
            </v-row>
          </form>
        </validation-observer>
      </v-col>
      <v-col cols="12">
        <base-material-card class="mt-12" icon="mdi-account">
          <template #toolbar>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="card-title font-weight-light">
                Usuarios del Sistema
              </v-toolbar-title>
              <v-spacer />
              <time-ago
                :loading="finding"
                :prefix="$t('buttons.Updated')"
                classes="caption grey--text font-weight-light hidden-sm-and-down"
                :date-time="requested_at"
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
                  <v-list-item @click="getUsers">
                    <v-list-item-icon>
                      <v-icon>mdi-refresh</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Refresh') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </template>
          <v-card-text>
            <v-skeleton-loader
              :loading="finding_users"
              type="list-item-avatar-two-line@10"
            >
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    label="Buscar Usuario"
                    v-model="search_user_related"
                    prepend-icon="mdi-account"
                    clearable
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6">
                   <v-select
                      v-model="roles_filter"
                      :loading="finding"
                      :readonly="finding"
                      name="stage"
                      item-text="title"
                      clearable
                      item-value="name"
                      autocomplete="off"
                      :items="roles_data"
                      prepend-icon="mdi-account"
                      menu-props="auto"
                      label="Buscar por Rol"
                      @change="changeSearchRol"
                    >
                     </v-select>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(user, i) in usersQuery"
                      :key="i"
                      @change="onChangeAssigned"
                    >
                      <v-expansion-panel-header>
                        {{ user.full_name }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="12" sm="12">
                            C.C. {{ user.document }}
                          </v-col>
                          <v-col cols="12" sm="12">
                            E-mail: {{ user.email }}
                          </v-col>
                          <v-col cols="12">
                            <v-list>
                              <v-list-item
                                v-for="role in user.roles"
                                :key="`${role.id}-${user.id}`"
                              >
                                <v-list-item-content>
                                  <v-list-item-title v-text="role.title" />
                                  <v-list-item-subtitle v-text="'Rol'" />
                                </v-list-item-content>
                                <v-list-item-action
                                  v-if="role.name.includes('assigned')"
                                >
                                  <v-icon
                                    color="success"
                                    @click="onAssign(user)"
                                  >
                                    mdi-plus-circle-outline
                                  </v-icon>
                                </v-list-item-action>
                                <v-list-item-action v-if="canDeleteAction">
                                  <v-tooltip top>
                                    <template #activator="{ on: tooltip }">
                                      <v-icon
                                        color="error"
                                        v-on="tooltip"
                                        @click="onDelete([role.name], user.id)"
                                      >
                                        mdi-close
                                      </v-icon>
                                    </template>
                                    <i18n path="buttons.Delete" tag="span" />
                                  </v-tooltip>
                                </v-list-item-action>
                              </v-list-item>
                            </v-list>
                          </v-col>
                          <v-col
                            v-if="
                              user.roles.findIndex((rol) =>
                                rol.name.includes('assigned')
                              ) !== -1
                            "
                            cols="12"
                          >
                            <v-btn
                              color="primary"
                              text
                              block
                              @click="getAssigned(user)"
                            >
                              Ver Parques Asignados
                            </v-btn>
                            <v-expand-transition>
                              <v-card v-if="show_assigned" flat>
                                <v-card-title>
                                  <v-btn
                                    color="error"
                                    text
                                    block
                                    @click="onDeleteAll(user)"
                                  >
                                    Eliminar Todos los parques asignados
                                  </v-btn>
                                </v-card-title>
                                <v-card-text>
                                  <v-skeleton-loader
                                    :loading="finding_parks"
                                    type="heading, list-item-avatar-three-line@6"
                                  >
                                    <v-data-iterator
                                      :items="assigned_parks"
                                      :items-per-page.sync="itemsPerPage"
                                      :options.sync="pagination"
                                      item-key="id"
                                      :server-items-length="total"
                                      :loading="finding_parks"
                                      :footer-props="{
                                        'items-per-page-options':
                                          itemsPerPageArray,
                                      }"
                                    >
                                      <template #default="props">
                                        <v-list two-line>
                                          <v-list-item
                                            v-for="item in props.items"
                                            :key="item.code"
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
                                                  {{
                                                    `${$t(
                                                      'parks.park.code_min'
                                                    )}: `
                                                  }}
                                                </span>
                                                {{ `${item.code}` }}
                                                <span
                                                  class="font-weight-bold hidden-sm-and-down"
                                                >
                                                  {{
                                                    ` - ${$t(
                                                      'parks.park.name_min'
                                                    )}: `
                                                  }}
                                                </span>
                                                <span
                                                  class="hidden-sm-and-down"
                                                >
                                                  {{ `${item.name}` }}
                                                </span>
                                              </v-list-item-title>
                                              <v-list-item-subtitle
                                                class="hidden-md-and-up"
                                              >
                                                <span class="font-weight-bold">
                                                  {{
                                                    `${$t(
                                                      'parks.park.name_min'
                                                    )}: `
                                                  }}
                                                </span>
                                                {{ `${item.name}` }}
                                              </v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-action>
                                              <v-btn
                                                icon
                                                @click="
                                                  onDeletePark(user, item.id)
                                                "
                                              >
                                                <v-icon color="red">
                                                  mdi-close
                                                </v-icon>
                                              </v-btn>
                                            </v-list-item-action>
                                          </v-list-item>
                                        </v-list>
                                      </template>
                                    </v-data-iterator>
                                  </v-skeleton-loader>
                                </v-card-text>
                              </v-card>
                            </v-expand-transition>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
                
              </v-row>
            </v-skeleton-loader>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="710">
      <v-card flat>
        <v-card-title>Asociar Parques a Usuario</v-card-title>
        <v-card-text>
          <v-radio-group
            v-model="park.type_assignment"
            row
            mandatory
            @change="onChangeSelection"
          >
            <v-radio label="Por Localidad" value="locality" />
            <v-radio label="Por Upz" value="upz" />
            <!-- <v-radio label="Por Barrio" value="neighborhood" /> -->
            <v-radio label="Manual" value="manual" />
            <v-radio label="Administrados IDRD" value="managed" />
            <v-radio label="Todos los Parques" value="all" />
            <v-radio label="Escalas" value="scale" />
          </v-radio-group>
          <validation-observer
            v-if="park.type_assignment === 'locality'"
            ref="locality"
            v-slot="{ handleSubmit }"
          >
            <v-form @submit.prevent="handleSubmit(onSubmit('locality'))">
              <!-- Locality -->
              <v-col cols="12" sm="12" md="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="assignment.validations.input_number_required"
                  vid="locality_id"
                  :name="$t('parks.park.locality').toLowerCase()"
                >
                  <v-autocomplete
                    id="locality_id"
                    ref="locality_autocomplete"
                    v-model.number="assignment.locality_id"
                    hide-selected
                    :items="localities"
                    item-value="id"
                    item-text="name"
                    name="locality_id"
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
              <!-- Submit -->
              <v-col cols="12" md="12" sm="12" class="text-right">
                <v-btn
                  :aria-label="$t('buttons.Submit')"
                  type="submit"
                  color="primary"
                >
                  {{ $t('buttons.Submit') }}
                </v-btn>
              </v-col>
            </v-form>
          </validation-observer>
          <validation-observer
            v-if="park.type_assignment === 'upz'"
            ref="upz"
            v-slot="{ handleSubmit }"
          >
            <v-form @submit.prevent="handleSubmit(onSubmit('upz'))">
              <!-- Locality
              <v-col cols="12" sm="12" md="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="assignment.validations.input_number_required"
                  vid="locality_id"
                  :name="$t('parks.park.locality').toLowerCase()"
                >
                  <v-autocomplete
                    id="locality_id"
                    ref="upz_autocomplete"
                    v-model.number="assignment.locality_id"
                    :items="localities"
                    hide-selected
                    item-value="id"
                    item-text="name"
                    name="locality_id"
                    :loading="finding"
                    :readonly="finding"
                    prepend-icon="mdi-map-marker"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.locality')"
                    @change="getUpz"
                    @click:clear="onClearLocality"
                  />
                </validation-provider>
              </v-col> -->
              <!-- Upz -->
              <v-col cols="12" sm="12" md="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="assignment.validations.input_number_required"
                  vid="upz_code"
                  :name="$t('parks.park.upz').toLowerCase()"
                >
                  <v-autocomplete
                    id="upz_code"
                    ref="upz_autocomplete"
                    v-model="assignment.upz_code"
                    name="upz_code"
                    hide-selected
                    :items="upz"
                    item-value="upz_code"
                    item-text="composed_name"
                    :hint="hint_locality"
                    :loading="finding"
                    :readonly="finding"
                    prepend-icon="mdi-crosshairs-gps"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.upz')"
                    @click:clear="onClearUpz"
                    @change="setHintLocality"
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
              <!-- Submit -->
              <v-col cols="12" md="12" sm="12" class="text-right">
                <v-btn
                  :aria-label="$t('buttons.Submit')"
                  type="submit"
                  color="primary"
                >
                  {{ $t('buttons.Submit') }}
                </v-btn>
              </v-col>
            </v-form>
          </validation-observer>
          <validation-observer
            v-if="park.type_assignment === 'neighborhood'"
            ref="neighborhood"
            v-slot="{ handleSubmit }"
          >
            <v-form @submit.prevent="handleSubmit(onSubmit('neighborhood'))">
              <!-- Locality -->
              <!-- <v-col cols="12" sm="12" md="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="assignment.validations.input_number_required"
                  vid="locality_id"
                  :name="$t('parks.park.locality').toLowerCase()"
                >
                  <v-autocomplete
                    id="locality_id"
                    ref="neighborhood_autocomplete"
                    v-model.number="assignment.locality_id"
                    :items="localities"
                    item-value="id"
                    hide-selected
                    item-text="name"
                    name="locality_id"
                    :loading="finding"
                    :readonly="finding"
                    prepend-icon="mdi-map-marker"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.locality')"
                    @change="getUpz"
                    @click:clear="onClearLocality"
                  />
                </validation-provider>
              </v-col> -->
              <!-- Upz -->
              <!-- <v-col cols="12" sm="12" md="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="locality.validations.input_number_required"
                  vid="upz_code"
                  :name="$t('parks.park.upz').toLowerCase()"
                >
                  <v-autocomplete
                    id="upz_code"
                    v-model="assignment.upz_code"
                    name="upz_code"
                    :items="upz"
                    item-value="upz_code"
                    hide-selected
                    item-text="composed_name"
                    :loading="finding"
                    :readonly="finding"
                    prepend-icon="mdi-crosshairs-gps"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.upz')"
                    @change="getNeighborhoods"
                    @click:clear="onClearUpz"
                  />
                </validation-provider>
              </v-col> -->
              <!-- Neighborhood -->
              <v-col cols="12" sm="12" md="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="assignment.validations.input_number_required"
                  vid="neighborhood_id"
                  :name="$t('parks.park.block').toLowerCase()"
                >
                  <v-autocomplete
                    id="neighborhood_id"
                    ref="neighborhood_autocomplete"
                    v-model="assignment.neighborhood_id"
                    name="neighborhood_id"
                    :items="neighborhoods"
                    item-value="neighborhood_id"
                    item-text="neighborhood_name"
                    :hint="hint_neighborhood"
                    :loading="finding"
                    :readonly="finding"
                    prepend-icon="mdi-home-city"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('parks.park.block')"
                    @change="setHintNeighborhood"
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
              <!-- Submit -->
              <v-col cols="12" md="12" sm="12" class="text-right">
                <v-btn
                  :aria-label="$t('buttons.Submit')"
                  type="submit"
                  color="primary"
                >
                  {{ $t('buttons.Submit') }}
                </v-btn>
              </v-col>
            </v-form>
          </validation-observer>
          <validation-observer
            v-if="park.type_assignment === 'manual'"
            ref="manual"
            v-slot="{ handleSubmit }"
          >
            <v-form @submit.prevent="handleSubmit(onSubmit('manual'))">
              <!-- Manual -->
              <v-col cols="12" sm="12" md="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="assignment.validations.required"
                  vid="park_id"
                  :name="$t('parks.park.manual').toLowerCase()"
                >
                  <v-autocomplete
                    id="park_id"
                    ref="manual_autocomplete"
                    v-model="assignment.park_id"
                    name="park_id"
                    :items="items"
                    :loading="finding"
                    cache-items
                    multiple
                    hide-selected
                    chips
                    :filter="customFilterPark"
                    deletable-chips
                    small-chips
                    :error-messages="errors"
                    clearable
                    :label="$t('parks.label.search')"
                    :search-input.sync="search"
                    item-text="name"
                    item-value="id"
                    prepend-icon="mdi-magnify"
                    persistent-hint
                    :hint="$t('parks.help.parks')"
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
                </validation-provider>
              </v-col>
              <!-- Submit -->
              <v-col cols="12" md="12" sm="12" class="text-right">
                <v-btn
                  :aria-label="$t('buttons.Submit')"
                  type="submit"
                  color="primary"
                >
                  {{ $t('buttons.Submit') }}
                </v-btn>
              </v-col>
            </v-form>
          </validation-observer>
          <validation-observer
            v-if="park.type_assignment === 'managed'"
            ref="admin"
            v-slot="{ handleSubmit }"
          >
            <v-form @submit.prevent="handleSubmit(onSubmit('managed'))">
              <v-col cols="12" md="12" sm="12" class="text-right">
                <v-btn
                  :aria-label="$t('buttons.Submit')"
                  type="submit"
                  color="primary"
                >
                  {{ $t('buttons.Submit') }}
                </v-btn>
              </v-col>
            </v-form>
          </validation-observer>
          <validation-observer
            v-if="park.type_assignment === 'all'"
            ref="all"
            v-slot="{ handleSubmit }"
          >
            <v-form @submit.prevent="handleSubmit(onSubmit('all'))">
              <v-col cols="12" md="12" sm="12" class="text-right">
                <v-btn
                  :aria-label="$t('buttons.Submit')"
                  type="submit"
                  color="primary"
                >
                  {{ $t('buttons.Submit') }}
                </v-btn>
              </v-col>
            </v-form>
          </validation-observer>
          <validation-observer
            v-if="park.type_assignment === 'scale'"
            ref="scale"
            v-slot="{ handleSubmit }"
          >
            <v-form @submit.prevent="handleSubmit(onSubmit('scale'))">
              <!-- Neighborhood -->
              <v-col cols="12" sm="12" md="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="assignment.validations.input_number_required"
                  vid="id"
                  :name="$t('parks.park.block').toLowerCase()"
                >
                  <v-autocomplete
                    id="id"
                    ref="scale_autocomplete"
                    v-model="assignment.scale_id"
                    name="id"
                    :items="scales"
                    item-value="id"
                    item-text="name"
                    :hint="hint_scales"
                    :loading="finding"
                    :readonly="finding"
                    prepend-icon="mdi-home-city"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    label="ESCALA"
                    @change="setHintScales"
                  >
                    <template #item="{ item }">
                      <v-list-item-content>
                        <v-list-item-title v-text="item.name" />
                        <v-list-item-subtitle v-text="`${item.description}`" />
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </validation-provider>
              </v-col>
              <!-- Submit -->
              <v-col cols="12" md="12" sm="12" class="text-right">
                <v-btn
                  :aria-label="$t('buttons.Submit')"
                  type="submit"
                  color="primary"
                >
                  {{ $t('buttons.Submit') }}
                </v-btn>
              </v-col>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-check-dialog ref="confirmDialog">
      {{ $t('confirm.delete') }}
    </v-check-dialog>
    <v-overlay :value="finding">
      <v-progress-circular indeterminate size="60" color="primary" />
    </v-overlay>
  </v-container>
</template>

<router lang="yaml">
meta:
  title: parks.titles.userManager
</router>

<script>
import _ from 'lodash'
import { Admin } from '~/models/services/parks/Admin'
import { Locality } from '~/models/services/parks/Locality'
import { UpzAll } from '~/models/services/parks/UpzAll'
import { NeighborhoodAll } from '~/models/services/parks/NeighborhoodAll'
import { Scale } from '~/models/services/parks/Scale'
import { Owned } from '~/models/services/parks/Owned'
import { Park } from '~/models/services/parks/Park'
import { Api } from '~/models/Api'
import { Menu } from '~/models/services/parks/Menu'
import AbilityService from '~/models/services/parks/AbilityService'

export default {
  name: 'ParksUsers',
  nuxtI18n: {
    paths: {
      en: '/parks/users',
      es: '/parques/usuarios',
    },
  },
  components: {
    BaseMaterialCard: () => import('~/components/base/MaterialCard'),
    TimeAgo: () => import('~/components/base/TimeAgo'),
    VCheckDialog: () => import('@/components/base/VCheckDialog'),
  },
  auth: 'auth',
  middleware: ['permissions'],
  head: (vm) => ({
    title: vm.$t('parks.titles.userManager'),
  }),
  meta: {
    permissionsUrl: Api.END_POINTS.PARKS_PERMISSIONS(),
    title: 'parks.titles.userManager',
    permissions(bouncer, to, from) {
      const service = new AbilityService()
      const manage = service.manage(service.models.USERS)
      const view = service.view(service.models.USERS)
      const create = service.create(service.models.USERS)
      const destroy = service.destroy(service.models.USERS)
      return (
        bouncer.can(create) ||
        bouncer.can(destroy) ||
        bouncer.can(view) ||
        bouncer.can(manage)
      )
    },
  },
  created() {
    this.drawerModel = new Menu()
  },
  data: () => ({
    dialog: false,
    finding: false,
    finding_users: false,
    finding_parks: false,
    show_assigned: false,
    search: null,
    form: new Admin(),
    park: new Park(),
    items: [],
    assignment: new Owned({
      user_id: null,
      locality_id: null,
      upz_code: null,
      neighborhood_id: null,
      type_assignment: null,
      park_id: [],
      scale_id: null,
    }),
    assigned_parks: [],
    itemsPerPage: 10,
    pagination: {},
    total: 0,
    itemsPerPageArray: [10, 15, 20, 25, 30],
    users: [],
    roles_data: [],
    requested_at: null,
    search_user: null,
    people: [],
    selected_user: {},
    locality: new Locality(),
    upzAll: new UpzAll(),
    neighborhoodAll: new NeighborhoodAll(),
    scaleAll: new Scale(),
    localities: [],
    upz: [],
    neighborhoods: [],
    scales: [],
    hint_locality: '',
    hint_neighborhood: '',
    hint_scales: '',
    search_user_related: null,
    roles_filter: [],
    usersTemporal: []
  }),
  fetch() {
    this.getUsers()
    this.getLocalities()
    this.form
      .rolesData()
      .then((response) => {
        this.roles_data = response.data; 
      })
      .catch((errors) => {
        this.$snackbar({ message: errors.message })
      })
  },
  watch: {
    search_user(val) {
      return val && val.length > 3 && this.findUser(val)
    },
    search(val) {
      return val && val.length > 3 && this.findPark()
    },
    'pagination.page'() {
      return this.selected_user.id && this.getAssigned(this.selected_user)
    },
    itemsPerPage() {
      return this.selected_user.id && this.getAssigned(this.selected_user)
    },
  },
  methods: {
    getUsers() {
      this.finding_users = true
      this.form
        .index()
        .then((response) => {
          this.users = response.data
          this.requested_at = response.requested_at
          this.usersTemporal = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding_users = false
        })
    },
    findUser(val) {
      this.finding_users = true
      this.form
        .findUser({ params: { username: val } })
        .then((response) => {
          this.people = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.finding_users = false
        })
    },
    setSelectedUser(item) {
      this.selected_user = item
    },
    getInitials(item) {
      return `${(item.name.charAt(0) || '').toUpperCase()}${(
        item.surname.charAt(0) || ''
      ).toUpperCase()}`
    },
    onDelete(roles, user) {
      this.$refs.confirmDialog.open().then(() => {
        this.form
          .retractRole(user, { params: { roles } })
          .then((response) => {
            this.$snackbar({ message: response.data, color: 'success' })
          })
          .then(() => this.getUsers())
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
      })
    },
    setRole() {
      if (this.selected_user.id) {
        this.start()
        this.form
          .assignRole(this.selected_user.id)
          .then((response) => {
            this.$snackbar({ message: response.data, color: 'success' })
          })
          .then(() => this.getUsers())
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => this.stop())
      } else {
        this.$snackbar({ message: 'Selecciona un rol para continuar.' })
      }
    },
    // Loading
    start() {
      this.finding = true
    },
    stop() {
      this.finding = false
    },
    // By Locations
    onChangeSelection: _.debounce(function (ref) {
      if (this.$refs[`${ref}_autocomplete`]) {
        this.$refs[`${ref}_autocomplete`].cachedItems = []
      }
      if (this.$refs[ref]) {
        this.$refs[ref].reset()
      }
      this.assignment.reset()
      if (ref === 'upz') {
        this.start()
        this.upzAll
          .upzs()
          .then((response) => {
            this.upz = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => this.stop())
      } else if (ref === 'neighborhood') {
        this.start()
        this.neighborhoodAll
          .neighborhoods()
          .then((response) => {
            this.neighborhoods = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => this.stop())
      } else if (ref === 'scale') {
        this.start()
        this.scaleAll
          .scales()
          .then((response) => {
            this.scales = response.data
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => this.stop())
      }
    }, 300),
    getLocalities() {
      // this.upz = []
      // this.neighborhoods = []
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
    onClearLocality() {
      this.upz = []
      this.neighborhoods = []
    },
    //  getUpz(id) {
    //       return new Promise((resolve) => {
    //         this.neighborhoods = []
    //         if (id) {
    //           this.start()
    //           this.locality
    //             .upz(id)
    //             .then((response) => {
    //               this.upz = response.data
    //             })
    //             .catch((errors) => {
    //               this.$snackbar({ message: errors.message })
    //             })
    //             .finally(() => {
    //               this.stop()
    //               resolve()
    //             })
    //         }
    //       })
    //     },
    onClearUpz() {
      this.neighborhoods = []
    },
    //  getNeighborhoods(id) {
    //       const upz = this.upz.find((upz) => upz.upz_code === id)
    //       if (upz && upz.id) {
    //         this.start()
    //         this.locality
    //           .neighborhoods(this.form.locality_id, upz.id)
    //           .then((response) => {
    //             this.neighborhoods = response.data
    //           })
    //           .catch((errors) => {
    //             this.$snackbar({ message: errors.message })
    //           })
    //           .finally(() => this.stop())
    //       }
    //     },
    onSubmit(ref) {
      if (this.selected_user.id) {
        this.start()
        this.assignment.setFormInstance(this.$refs[ref])
        this.assignment.user_id = this.selected_user.id
        this.assignment.type_assignment = this.park.type_assignment
        this.assignment
          .store()
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
            this.selected_user = {}
            this.dialog = false
          })
      }
    },
    onAssign(user) {
      const open = () => {
        this.selected_user = user
        setTimeout(() => (this.dialog = true), 10)
      }

      if (this.dialog) {
        this.selected_user = {}
        this.dialog = false
        setTimeout(open, 10)
      } else {
        open()
      }
    },
    findPark: _.debounce(function () {
      this.finding = true
      const params = {
        query: this.search,
        per_page: 30,
      }
      this.park
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
      const textOne = (item.name || '').toLowerCase()
      const textTwo = (item.code || '').toLowerCase()
      const textThree = (item.address || '').toLowerCase()
      const searchText = (queryText || '').toLowerCase()
      return (
        textOne.includes(searchText) ||
        textTwo.includes(searchText) ||
        textThree.includes(searchText)
      )
    },
    filterUser(item, queryText, itemText) {
      const text = _.toLower(queryText)
      return _.filter(item, function (object) {
        return _(object).some(function (string) {
          return _(string).toLower().includes(text)
        })
      })
    },
    getAssigned(user) {
      if (user.id) {
        this.selected_user = user
        this.show_assigned = true
        this.finding_parks = true
        const params = {
          page: this.pagination.page,
          per_page: this.itemsPerPage,
        }
        this.assignment
          .show(user.id, { params })
          .then((response) => {
            this.assigned_parks = response.data
            this.total = response.meta.total
          })
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => {
            this.finding_parks = false
          })
      }
    },
    onChangeAssigned() {
      this.show_assigned = false
      this.assigned_parks = []
      this.selected_user = {}
      this.total = 0
      this.pagination.page = 1
    },
    onDeletePark(user, parkId) {
      this.$refs.confirmDialog.open().then(() => {
        if (user.id) {
          this.assignment
            .destroyOwned(user.id, parkId)
            .then((response) => {
              this.$snackbar({
                message: response.data,
                color: 'success',
              })
            })
            .then(() => this.getAssigned(user))
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
        }
      })
    },
    onDeleteAll(user) {
      this.$refs.confirmDialog.open().then(() => {
        if (user.id) {
          this.start()
          this.assignment
            .destroyAllOwned(user.id)
            .then((response) => {
              this.$snackbar({
                message: response.data,
                color: 'success',
              })
            })
            .then(() => this.getAssigned(user))
            .catch((errors) => {
              this.$snackbar({ message: errors.message })
            })
            .finally(() => {
              this.stop()
            })
        }
      })
    },
    setHintLocality(upzCode) {
      const locality = this.upz.find((upz) => upz.upz_code === upzCode)
      this.hint_locality = locality ? locality.locality_name : ''
    },
    setHintNeighborhood(neighborhoodId) {
      const neighborhood = this.neighborhoods.find(
        (neighborhood) => neighborhood.neighborhood_id === neighborhoodId
      )
      this.hint_neighborhood = neighborhood
        ? neighborhood.locality_name + ' - ' + neighborhood.upz_name
        : ''
    },
    setHintScales(scaleId) {
      const scale = this.scales.find((scale) => scale.id === scaleId)
      this.hint_scales = scale ? scale.description : ''
    },
    changeSearchRol(rol){
      if (rol) {
          this.users = this.usersTemporal;
          const userFilter = this.users.filter(user=>user.roles.some(role=>role.name === rol));
          this.users = userFilter;
      }else{
        this.users = this.usersTemporal;
      }
      
    }
  },
  computed: {
    canCreateAction() {
      return this.canManageOrCreate(this.ability_service.models.USERS)
    },
    canDeleteAction() {
      return this.canManageOrDestroy(this.ability_service.models.USERS)
    },
    usersQuery() {
      const queryText = this.search_user_related
      return this.users.filter((value) => {
        const text = _.toLower(queryText)
        return (
          (value.document || '').includes(text) ||
          (value.email || '').includes(text) ||
          (value.full_name || '').includes(text)
        )
      })
    },
  },
}
</script>
