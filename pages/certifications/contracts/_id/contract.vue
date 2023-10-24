<template>
  <v-container id="contract" fluid tag="section">
    <v-row>
      <v-col cols="12" md="12" lg="6" class="my-4">
        <base-material-card
          :avatar="require('~/static/images/certifications/avatar.png')"
        >
          <template #toolbar>
            <v-toolbar dense flat color="transparent">
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
                  <v-list-item @click="getData">
                    <v-list-item-icon>
                      <v-icon>mdi-refresh</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Refresh') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="dialog_update = true"
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Modificar Datos</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </template>
          <template #default>
            <v-card-text class="text-center">
              <h4
                class="display-2 font-weight-light mb-3"
                v-text="contract.name"
              >
              </h4>
              <p
                class="font-weight-light grey--text"
              >
                {{ contract.document_type }} - {{ contract.document }} <span v-if="contract.dv !== 0"> - {{ contract.dv }}</span>
              </p>
              <p
                class="font-weight-light grey--text"
              >Cantidad de descargas: {{ expeditions.count ? expeditions.count : 0 }}</p>
              <p
                class="font-weight-light grey--text"
              >Código de verificación: {{ expeditions.code ? expeditions.code : 'Sin código' }}</p>
              <p
                class="font-weight-light grey--text"
              >Última fecha de descarga: {{ expeditions.code ? expeditions.updated_at : 'Sin registro' }}</p>
              <p
                class="font-weight-light grey--text"
              ><small class="caption">Fecha de registro: {{ contract.created_at }}</small></p>
              <p
                v-if="contract.name_representative"
                class="display-2 font-weight-light"
              >REPRESENTANTE LEGAL</p>
              <p
                v-if="contract.name_representative"
                class="font-weight-light grey--text"
                v-text="contract.name_representative"
              />
              <p
                v-if="contract.name_representative"
                class="font-weight-light grey--text"
              >{{ contract.document_type_representative }} - {{ contract.document_representative }}</p>
            </v-card-text>
          </template>
        </base-material-card>
      </v-col>
      <v-col cols="12" md="12" lg="6" class="my-4">
        <base-material-card
          color="primary"
          :image="true"
        >
          <template #image>
            <v-card-title dark>
              <v-list dense color="transparent">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>INSTITUTO DISTRITAL DE RECREACIÓN Y DEPORTE</v-list-item-title>
                    <v-list-item-title v-text="contract.contract_type"/>
                    <v-list-item-title v-text="contract.contract"/>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0 my-auto">
                <v-avatar class="ml-2" :color="contract.status === 'Activo' ? 'success' : 'error'" rounded size="14"/>
                <div class="grey--text ms-4">
                  {{ contract.status }}
                </div>
                <div class="mx-2 text-subtitle-1">
                  $ {{ contract.initial_value }}
                </div>
                <div class="grey--text ms-4">
                  Valor Mensual -
                </div>
                <div class="mx-2 text-subtitle-1">
                  $ {{ contract.monthly_value }}
                </div>
              </v-row>
              <v-row align="center" justify="space-around" class="mx-0">
                <v-col cols="12" md="6">
                  <v-timeline align-top dense>
                    <v-timeline-item small>
                      <div class="font-weight-normal caption">
                        <strong>Fecha de firma:</strong>
                      </div>
                      {{ contract.signature_date }}
                    </v-timeline-item>
                    <v-timeline-item small>
                      <div class="font-weight-normal caption">
                        <strong>Fecha de inicio:</strong>
                      </div>
                      {{ contract.start_date }}
                    </v-timeline-item>
                    <v-timeline-item small>
                      <div class="font-weight-normal caption">
                        <strong>Fecha de finalización:</strong>
                      </div>
                      {{ contract.final_date }}
                    </v-timeline-item>
                    <v-timeline-item
                      v-show="contract.anticipated_date !== null"
                      small
                    >
                      <div class="font-weight-normal caption">
                        <strong>Fecha de finalización anticipada:</strong>
                      </div>
                      {{ contract.anticipated_date }}
                    </v-timeline-item>
                  </v-timeline>
                </v-col>
                <v-col cols="12" md="6">
                  <v-timeline align-top dense>
                    <v-timeline-item
                      v-show="contract.duration_months !== 0 &&
                    contract.duration_months !== null"
                      small
                    >
                      <div class="font-weight-normal caption">
                        <strong>Duración:</strong>
                      </div>
                      {{ contract.duration_months }} Meses
                    </v-timeline-item>
                    <v-timeline-item
                      v-show="contract.duration_days !== 0 &&
                    contract.duration_days !== null"
                      small
                    >
                      <div class="font-weight-normal caption">
                        <strong>Duración:</strong>
                      </div>
                      {{ contract.duration_days }} Días
                    </v-timeline-item>
                    <v-timeline-item small>
                      <div class="font-weight-normal caption">
                        <strong>Número de contrato:</strong>
                      </div>
                      {{ contract.contract_number }}
                    </v-timeline-item>
                    <v-timeline-item small>
                      <div class="font-weight-normal caption">
                        <strong>Año de contrato:</strong>
                      </div>
                      {{ contract.contract_year }}
                    </v-timeline-item>
                  </v-timeline>
                </v-col>
              </v-row>
              <v-divider class="my-4"/>
              <h4 class="my-w">Objeto del contrato:</h4>
              <div class="caption" v-text="contract.object"/>
            </v-card-text>
          </template>
        </base-material-card>
      </v-col>
      <v-col cols="12">
        <base-material-card class="px-5 py-3">
          <template #heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
              active-class="active"
              show-arrows
            >
              <v-tab class="mr-3 caption">
                <v-icon class="mr-2">
                  mdi-file-document-edit
                </v-icon>
                Obligaciones
              </v-tab>
              <v-tab class="mr-3 caption">
                <v-icon class="mr-2">
                  mdi-file-document-plus
                </v-icon>
                Adiciones
              </v-tab>
              <v-tab class="mr-3 caption">
                <v-icon class="mr-2">
                  mdi-file-document-arrow-right
                </v-icon>
                Prórrogas
              </v-tab>
              <v-tab class="mr-3 caption">
                <v-icon class="mr-2">
                  mdi-file-document-minus
                </v-icon>
                Suspensiones
              </v-tab>
              <v-tab class="mr-3 caption">
                <v-icon class="mr-2">
                  mdi-file-document-multiple
                </v-icon>
                Cesiones
              </v-tab>
              <v-tab class="mr-3 caption">
                <v-icon class="mr-2">
                  mdi-file-account
                </v-icon>
                Integrantes
              </v-tab>
            </v-tabs>
          </template>
          <v-tabs-items
            v-model="tabs"
            class="transparent"
          >
            <v-tab-item>
              <v-card-text>
                <obligation
                  :obligations="obligations"
                  :obligations-headers="obligationsHeaders"
                  @getData="getData"
                ></obligation>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <addition
                  :additions="additions"
                  :additions-headers="additionsHeaders"
                  @getData="getData"
                ></addition>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <extension
                  :extensions="extensions"
                  :extensions-headers="extensionsHeaders"
                  @getData="getData"
                ></extension>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <suspension
                  :suspensions="suspensions"
                  :suspensions-headers="suspensionsHeaders"
                  :date-final-dto="contract.final_date"
                  @getData="getData"
                ></suspension>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <assignment
                  :assignments="assignments"
                  :assignments-headers="assignmentsHeaders"
                  @getData="getData"
                ></assignment>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <member
                  :members="members"
                  :members-headers="membersHeaders"
                  @getData="getData"
                ></member>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog_update" persistent>
      <v-stepper
        v-model="step"
        vertical
      >
        <v-stepper-step
          :complete="step > 1"
          step="1"
        >
          {{ $t('certificates.titles.contractor') }}
          <small>{{ $t('certificates.titles.contractorSubtitle') }}</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <validation-observer
            :ref="`contract_form_step_${step}`"
            v-slot="{ handleSubmit }"
          >
            <v-form @submit.prevent="handleSubmit(onUpdateContract)">
              <v-card>
                <v-card-text>
                  <v-row class="mx-auto align-content-center">
                    <!-- Document Type -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.required"
                        vid="document_type"
                        name="tipo de documento"
                      >
                        <v-select
                          id="document_type"
                          v-model="form.document_type_id"
                          name="document_type"
                          item-value="id"
                          item-text="combined"
                          clearable
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          min="3"
                          autocomplete="off"
                          required="required"
                          :items="document_types"
                          prepend-icon="mdi-card-account-details"
                          menu-props="auto"
                          label="Tipo de Documento"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Document -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="document"
                        name="número de documento"
                      >
                        <v-text-field
                          id="document"
                          v-model.number="form.document"
                          name="document"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Número de Documento"
                          clearable
                          counter
                          :maxlength="12"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-numeric"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Dv -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number"
                        vid="dv"
                        name="dígito de verificación"
                      >
                        <v-text-field
                          id="dv"
                          v-model.number="form.dv"
                          name="dv"
                          type="number"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Dígito de Verificación"
                          clearable
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-numeric"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Name -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_alpha_spaces_required"
                        vid="name"
                        name="nombre del contratista"
                      >
                        <v-text-field
                          id="name"
                          v-model="form.name"
                          name="name"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Nombre Completo"
                          clearable
                          counter
                          :maxlength="
                        form.validations.input_alpha_spaces_required.max
                      "
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-face-agent"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Document Type Representative -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number"
                        vid="document_type_representative_id"
                        name="tipo de documento representante"
                      >
                        <v-select
                          id="document_type_representative_id"
                          v-model="form.document_type_representative_id"
                          name="document_type_representative_id"
                          item-value="id"
                          item-text="combined"
                          clearable
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          min="3"
                          autocomplete="off"
                          required="required"
                          :items="document_types"
                          prepend-icon="mdi-card-account-details"
                          menu-props="auto"
                          label="Tipo de Documento Representante Legal"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Document Representative -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number"
                        vid="document_representative"
                        name="número de documento representante"
                      >
                        <v-text-field
                          id="document_representative"
                          v-model="form.document_representative"
                          name="document_representative"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Número de Documento Representante Legal"
                          clearable
                          counter
                          :maxlength="12"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-numeric"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Name -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_alpha_spaces"
                        vid="name_representative"
                        name="nombre representante"
                      >
                        <v-text-field
                          id="name_representative"
                          v-model="form.name_representative"
                          name="name_representative"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Nombre Completo del Representante Legal"
                          clearable
                          counter
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-face-agent"
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn text @click="onCancel">
                    {{ $t('buttons.Cancel') }}
                  </v-btn>
                  <v-btn
                    color="primary"
                    type="submit"
                  >
                    {{ $t('buttons.Next') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </validation-observer>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 2"
          step="2"
        >
          {{ $t('certificates.titles.contractTitle') }}
          <small>{{ $t('certificates.titles.contractSubtitle') }}</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <validation-observer
            :ref="`contract_form_step_${step}`"
            v-slot="{ handleSubmit }"
          >
            <v-form @submit.prevent="handleSubmit(onUpdateContract)">
              <v-card>
                <v-card-text>
                  <v-row class="mx-auto align-content-center">
                    <!-- Contract Type -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.required"
                        vid="contract_type_id"
                        name="tipo de contrato"
                      >
                        <v-select
                          id="contract_type_id"
                          v-model="form.contract_type_id"
                          name="contract_type_id"
                          item-text="name"
                          item-value="id"
                          clearable
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          min="3"
                          autocomplete="off"
                          required="required"
                          :items="contract_types"
                          prepend-icon="mdi-clipboard-text-outline"
                          menu-props="auto"
                          label="Tipo de Trámite"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <!-- Contract Number -->
                    <v-col cols="12" md="3" sm="6">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="contract_number"
                        name="número de contrato"
                      >
                        <v-text-field
                          id="contract_number"
                          v-model="form.contract_number"
                          name="contract_number"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          persistent-hint
                          hint="Ejemplo: 933"
                          color="primary"
                          label="Número de contrato"
                          clearable
                          counter
                          :maxlength="4"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-numeric"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Year -->
                    <v-col cols="12" md="3" sm="6">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="
                      form.validations.input_number_required_between(
                        1900,
                        2500
                      )
                    "
                        vid="contract_year"
                        name="año de contraro"
                      >
                        <v-text-field
                          id="contract_year"
                          v-model="form.contract_year"
                          type="number"
                          name="contract_year"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          persistent-hint
                          :hint="`Ejemplo: ${$moment().year()}`"
                          color="primary"
                          label="Año de contrato"
                          clearable
                          counter
                          :min="1900"
                          :max="2500"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-calendar"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Sign Date -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        vid="signature_date"
                        name="fecha de firma"
                      >
                        <v-dialog
                          ref="dialog_sign"
                          v-model="sign_date"
                          :return-value.sync="form.signature_date"
                          persistent
                          width="290px"
                        >
                          <template #activator="{ on }">
                            <v-text-field
                              id="signature_date"
                              v-model="form.signature_date"
                              name="signature_date"
                              :error-messages="errors"
                              color="primary"
                              label="Fecha de firma del contrato"
                              clearable
                              counter
                              :maxlength="191"
                              autocomplete="off"
                              required="required"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            ref="sign_date_picker"
                            v-model="form.signature_date"
                            locale="es"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="sign_date = false">
                              Cancelar
                            </v-btn>
                            <v-btn
                              color="primary"
                              @click="$refs.dialog_sign.save(form.signature_date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </validation-provider>
                    </v-col>
                    <!-- Start Date -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        vid="start_date"
                        name="fecha inicio del contrato"
                      >
                        <v-dialog
                          ref="dialog_start"
                          v-model="start_date"
                          :return-value.sync="form.start_date"
                          persistent
                          width="290px"
                        >
                          <template #activator="{ on }">
                            <v-text-field
                              id="start_date"
                              v-model="form.start_date"
                              name="start_date"
                              :error-messages="errors"
                              color="primary"
                              label="Fecha inicio del contrato"
                              clearable
                              counter
                              :maxlength="191"
                              autocomplete="off"
                              required="required"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            ref="start_date_picker"
                            v-model="form.start_date"
                            locale="es"
                            :min="form.signature_date"
                            :max="form.final_date"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="start_date = false">
                              Cancelar
                            </v-btn>
                            <v-btn
                              color="primary"
                              @click="$refs.dialog_start.save(form.start_date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </validation-provider>
                    </v-col>
                    <!-- Final Date -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        vid="final_date"
                        name="fecha terminación del contrato"
                      >
                        <v-dialog
                          ref="dialog_final"
                          v-model="final_date"
                          :return-value.sync="form.final_date"
                          persistent
                          width="290px"
                        >
                          <template #activator="{ on }">
                            <v-text-field
                              id="final_date"
                              v-model="form.final_date"
                              name="final_date"
                              :error-messages="errors"
                              color="primary"
                              label="Fecha terminación del contrato"
                              clearable
                              counter
                              :maxlength="191"
                              autocomplete="off"
                              required="required"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            ref="final_date_picker"
                            v-model="form.final_date"
                            locale="es"
                            :min="form.start_date"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="final_date = false">
                              Cancelar
                            </v-btn>
                            <v-btn
                              color="primary"
                              @click="$refs.dialog_final.save(form.final_date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </validation-provider>
                    </v-col>
                    <!-- Anticipated Final Date -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        vid="anticipated_date"
                        name="fecha terminación anticipada del contrato"
                      >
                        <v-dialog
                          ref="dialog_anticipated_final"
                          v-model="final_date_anticipated"
                          :return-value.sync="form.anticipated_date"
                          persistent
                          width="290px"
                        >
                          <template #activator="{ on }">
                            <v-text-field
                              id="anticipated_date"
                              v-model="form.anticipated_date"
                              name="anticipated_date"
                              :error-messages="errors"
                              color="primary"
                              label="Fecha terminación anticipada del contrato"
                              clearable
                              counter
                              :maxlength="191"
                              autocomplete="off"
                              required="required"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            ref="final_date_anticipated_picker"
                            v-model="form.anticipated_date"
                            locale="es"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="final_date_anticipated = false">
                              Cancelar
                            </v-btn>
                            <v-btn
                              color="primary"
                              @click="$refs.dialog_anticipated_final.save(form.anticipated_date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </validation-provider>
                    </v-col>
                    <!-- Value -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="initial_value"
                        name="valor total del contrato"
                      >
                        <v-text-field
                          id="initial_value"
                          v-model="form.initial_value"
                          name="initial_value"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Valor total del contrato"
                          hint="no es necesario incluir puntos en el valor del contrato"
                          persistent-hint
                          clearable
                          counter
                          :maxlength="25"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-currency-usd"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Monthly value -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="monthly_value"
                        name="valor mensual del contrato"
                      >
                        <v-text-field
                          id="monthly_value"
                          v-model="form.monthly_value"
                          name="monthly_value"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Valor mensual del contrato"
                          hint="no es necesario incluir puntos en el valor mensual del contrato"
                          persistent-hint
                          clearable
                          counter
                          :maxlength="25"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-currency-usd"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Duration Months -->
                    <v-col cols="12" md="3" sm="6">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="duration_months"
                        name="duración del contrato en meses"
                      >
                        <v-text-field
                          id="duration_month"
                          v-model="form.duration_months"
                          name="duration_months"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Duración del contrato en meses"
                          clearable
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-clipboard-text-clock-outline"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Duration Days -->
                    <v-col cols="12" md="3" sm="6">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number_required"
                        vid="duration_days"
                        name="duración del contrato en días"
                      >
                        <v-text-field
                          id="duration_days"
                          v-model="form.duration_days"
                          name="duration_days"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Duración del contrato en días"
                          clearable
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-clipboard-text-clock-outline"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Duration Other -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_text"
                        vid="duration_other"
                        name="otra duración"
                      >
                        <v-text-field
                          id="duration_other"
                          v-model="form.duration_other"
                          name="duration_other"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Otra duración"
                          clearable
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-clipboard-text-clock-outline"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Object -->
                    <v-col cols="12" md="12" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.required"
                        vid="object"
                        name="objeto"
                      >
                        <v-textarea
                          id="object"
                          v-model="form.object"
                          name="object"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Objeto del contrato"
                          clearable
                          counter
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-file-document-multiple-outline"
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="primary"
                    outlined
                    @click="step = 1"
                  >
                    {{ $t('buttons.Back') }}
                  </v-btn>
                  <v-btn
                    color="primary"
                    :loading="finding"
                    :disabled="finding"
                    type="submit"
                  >
                    <v-icon left dark>mdi-send</v-icon>
                    {{ $t('buttons.Save') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </validation-observer>
        </v-stepper-content>
      </v-stepper>
    </v-dialog>
  </v-container>
</template>

<script>
import {Contract} from "~/models/services/certifications/Contract";
import {DocumentType} from "~/models/services/certifications/DocumentType";
import {ContractType} from "~/models/services/certifications/ContractType";
import {Menu} from "~/models/services/certifications/Menu";

export default {
  name: "Contract",
  nuxtI18n: {
    paths: {
      en: '/certifications/:id/contract',
      es: '/certificaciones/:id/contrato',
    },
  },
  auth: 'auth',
  components: {
    BaseMaterialCard: () => import('@/components/base/MaterialCard'),
    TimeAgo: () => import('~/components/base/TimeAgo'),
    Obligation: () => import('~/pages/certifications/contracts/_id/obligation'),
    Addition: () => import('~/pages/certifications/contracts/_id/addition'),
    Extension: () => import('~/pages/certifications/contracts/_id/extension'),
    Suspension: () => import('~/pages/certifications/contracts/_id/suspension'),
    Assignment: () => import('~/pages/certifications/contracts/_id/assignment'),
    Member: () => import('~/pages/certifications/contracts/_id/member'),
  },
  middleware: ['permissions'],
  data: () => ({
    finding: false,
    error: {},
    form: new Contract(),
    document_type: new DocumentType(),
    document_types: [],
    contract_type: new ContractType(),
    contract_types: [],
    contract: {},
    expeditions: {},
    obligations: [],
    additions: [],
    suspensions: [],
    extensions: [],
    assignments: [],
    members: [],
    obligationsHeaders: [],
    additionsHeaders: [],
    suspensionsHeaders: [],
    extensionsHeaders: [],
    assignmentsHeaders: [],
    membersHeaders: [],
    tabs: 0,
    requested_at: null,
    dialog_update: false,
    sign_date: false,
    start_date: false,
    final_date: false,
    final_date_anticipated: false,
    step: 1,
  }),
  fetch() {
    this.getData()
    this.getDocumentTypes()
    this.getContractTypes()
  },
  head: (vm) => ({
    title: vm.$t('certificates.titles.contracts'),
  }),
  computed: {
    errorsKeys() {
      return this.error.errors ? Object.keys(this.error.errors) : []
    },
  },
  created() {
    this.drawerModel = new Menu()
  },
  methods: {
    onUpdateContract() {
      this.form.setFormInstance(this.$refs[`contract_form_step_${this.step}`])
      this.step ++
      if (this.step > 2) {
        this.start()
        this.form
          .update(this.$route.params.id)
          .then((response) => {
            this.$snackbar({ message: response.data, color: 'success' })
          })
          .then(() => this.getData())
          .catch((errors) => {
            this.$snackbar({ message: errors.message })
          })
          .finally(() => this.stop())
      }
    },
    getData() {
      this.start()
      this.form
        .show(this.$route.params.id)
        .then((response) => {
          this.form = new Contract({
            ...response.data
          })
          this.requested_at = response.requested_at
          this.contract = response.data
          this.expeditions = response.data.expeditions
          this.obligations = response.data.obligations
          this.additions = response.data.additions
          this.suspensions = response.data.suspensions
          this.extensions = response.data.extensions
          this.assignments = response.data.assignments
          this.members = response.data.members
          // headers
          this.obligationsHeaders = response.details.obligations_headers
          this.additionsHeaders = response.details.additions_headers
          this.suspensionsHeaders = response.details.suspensions_headers
          this.extensionsHeaders = response.details.extensions_headers
          this.assignmentsHeaders = response.details.assignments_headers
          this.membersHeaders = response.details.members_headers
        })
        .catch((errors) => {
          this.$snackbar({message: errors.message})
        })
        .finally(() => this.stop())
    },
    getDocumentTypes() {
      this.start()
      this.document_type
        .index()
        .then((response) => {
          this.document_types = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    getContractTypes() {
      this.start()
      this.contract_type
        .index()
        .then((response) => {
          this.contract_types = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    onCancel() {
      this.step = 1
      this.dialog_update = false
    },
    start() {
      this.finding = true
    },
    stop() {
      this.finding = false
      this.dialog_update = false
      this.step = 1
    }
  }
}
</script>

<style scoped>
.active {
  color: white !important;
  font-weight: bold !important;
}
</style>
