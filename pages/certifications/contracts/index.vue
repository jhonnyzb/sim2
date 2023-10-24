<template>
  <v-container id="contracts" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12">
        <base-material-card
          class="mt-6"
          icon="mdi-file-sign"
          color="primary"
          title="Contratos"
        >
          <v-card-text>
            <v-skeleton-loader
              ref="skeleton"
              transition="scale-transition"
              :loading="finding"
              type="table"
              class="mx-auto"
            >
              <v-data-table
                v-model="selected"
                :items="items"
                :headers="headers"
                :items-per-page.sync="itemsPerPage"
                :options.sync="pagination"
                item-key="id"
                :server-items-length="total"
                :loading="finding"
                :footer-props="{ 'items-per-page-options': itemsPerPageArray }"
              >
                <template #top>
                  <v-toolbar flat color="transparent">
                    <v-text-field
                      id="search"
                      v-model="form.query"
                      name="search"
                      append-icon="mdi-magnify"
                      :hint="$t('certificates.search.account')"
                      persistent-hint
                      :label="$t('certificates.labels.account')"
                      clearable
                      @click:append="onSearch"
                      @click:clear="onClearSearch"
                    />
                    <v-spacer></v-spacer>
                    <v-tooltip top>
                      <template #activator="{ on }">
                        <v-btn
                          :loading="finding"
                          :disabled="finding"
                          fab
                          small
                          color="primary"
                          class="mr-2 my-2"
                          @click="dialog_create = true"
                          v-on="on"
                        >
                          <v-icon color="white" dark>mdi-file-document-plus</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $t('buttons.Create') }}</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template #activator="{ on }">
                        <v-btn
                          color="primary"
                          class="mr-2 my-2"
                          :loading="finding"
                          :disabled="finding"
                          fab
                          small
                          v-on="on"
                          @click="getData"
                        >
                          <v-icon color="white" dark>mdi-reload</v-icon>
                        </v-btn>
                      </template>
                      <span>Recargar</span>
                    </v-tooltip>
                    <v-btn
                      class="my-2 hidden-sm-and-down"
                      color="primary"
                      :loading="finding"
                      :disabled="finding"
                      @click="onExcel"
                    >
                      <v-icon color="white" left dark>
                        mdi-cloud-download
                      </v-icon>
                      Descargar Excel
                    </v-btn>
                  </v-toolbar>
                </template>
                <template #[`item.view`]="{ item }">
                  <v-tooltip top>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        icon
                        color="primary"
                        v-bind="attrs"
                        :loading="finding"
                        :disabled="finding"
                        :to="localePath({
                          name: 'certifications-contracts-id-contract',
                          params: { id: item.id }
                        })"
                        v-on="on"
                      >
                        <v-icon>mdi-eye</v-icon>
                      </v-btn>
                    </template>
                    <span>Ver</span>
                  </v-tooltip>
                </template>
                <template #[`item.actions`]="{ item }">
                  <v-icon
                    dense
                    color="error"
                    @click="onDelete(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <template #no-data>
                  <v-empty-state
                    class="my-2"
                    :rounded="$vuetify.breakpoint.mdAndUp"
                    icon="mdi-file-alert"
                    :label="$t('certificates.labels.noData')"
                    :description="$t('certificates.labels.description')"
                    :loading="finding"
                    :disabled="finding"
                  />
                </template>
                <template #no-results>
                  <v-empty-state
                    class="my-2"
                    icon="mdi-alphabetical-off"
                    :label="$tc('certificates.labels.result', 0)"
                    :loading="finding"
                    :disabled="finding"
                  />
                </template>
              </v-data-table>
            </v-skeleton-loader>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog_create" persistent>
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
            <v-form @submit.prevent="handleSubmit(onContract)">
              <v-card>
                <v-card-text>
                  <v-row class="mx-auto align-content-center">
                    <!-- Document Type -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="contract.validations.required"
                        vid="document_type"
                        name="tipo de documento"
                      >
                        <v-select
                          id="document_type"
                          v-model="contract.document_type_id"
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
                        :rules="contract.validations.input_number_required"
                        vid="document"
                        name="número de documento"
                      >
                        <v-text-field
                          id="document"
                          v-model.number="contract.document"
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
                        :rules="contract.validations.input_number"
                        vid="dv"
                        name="dígito de verificación"
                      >
                        <v-text-field
                          id="dv"
                          v-model.number="contract.dv"
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
                        :rules="contract.validations.input_alpha_spaces_required"
                        vid="name"
                        name="nombre del contratista"
                      >
                        <v-text-field
                          id="name"
                          v-model="contract.name"
                          name="name"
                          :loading="finding"
                          :readonly="finding"
                          :error-messages="errors"
                          color="primary"
                          label="Nombre Completo"
                          clearable
                          counter
                          :maxlength="
                        contract.validations.input_alpha_spaces_required.max
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
                        :rules="contract.validations.input_number"
                        vid="document_type_representative_id"
                        name="tipo de documento representante"
                      >
                        <v-select
                          id="document_type_representative_id"
                          v-model="contract.document_type_representative_id"
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
                    <!-- Document -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="contract.validations.input_document"
                        vid="document_representative"
                        name="número de documento representante"
                      >
                        <v-text-field
                          id="document_representative"
                          v-model.number="contract.document_representative"
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
                        :rules="contract.validations.input_alpha_spaces"
                        vid="name_representative"
                        name="nombre representante"
                      >
                        <v-text-field
                          id="name_representative"
                          v-model="contract.name_representative"
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
            <v-form @submit.prevent="handleSubmit(onContract)">
              <v-card>
                <v-card-text>
                  <v-row class="mx-auto align-content-center">
                    <!-- Contract Type -->
                    <v-col cols="12" md="6" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="contract.validations.required"
                        vid="contract_type_id"
                        name="tipo de contrato"
                      >
                        <v-select
                          id="contract_type_id"
                          v-model="contract.contract_type_id"
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
                        :rules="contract.validations.input_number_required"
                        vid="contract_number"
                        name="número de contrato"
                      >
                        <v-text-field
                          id="contract_number"
                          v-model="contract.contract_number"
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
                      contract.validations.input_number_required_between(
                        1900,
                        2500
                      )
                    "
                        vid="contract_year"
                        name="año de contrato"
                      >
                        <v-text-field
                          id="contract_year"
                          v-model="contract.contract_year"
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
                          :return-value.sync="contract.signature_date"
                          persistent
                          width="290px"
                        >
                          <template #activator="{ on }">
                            <v-text-field
                              id="signature_date"
                              v-model="contract.signature_date"
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
                            v-model="contract.signature_date"
                            locale="es"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="sign_date = false">
                              Cancelar
                            </v-btn>
                            <v-btn
                              color="primary"
                              @click="$refs.dialog_sign.save(contract.signature_date)"
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
                          :return-value.sync="contract.start_date"
                          persistent
                          width="290px"
                        >
                          <template #activator="{ on }">
                            <v-text-field
                              id="start_date"
                              v-model="contract.start_date"
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
                            v-model="contract.start_date"
                            locale="es"
                            :min="contract.signature_date"
                            :max="contract.final_date"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="start_date = false">
                              Cancelar
                            </v-btn>
                            <v-btn
                              color="primary"
                              @click="$refs.dialog_start.save(contract.start_date)"
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
                          :return-value.sync="contract.final_date"
                          persistent
                          width="290px"
                        >
                          <template #activator="{ on }">
                            <v-text-field
                              id="final_date"
                              v-model="contract.final_date"
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
                            v-model="contract.final_date"
                            locale="es"
                            :min="contract.start_date"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="final_date = false">
                              Cancelar
                            </v-btn>
                            <v-btn
                              color="primary"
                              @click="$refs.dialog_final.save(contract.final_date)"
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
                          :return-value.sync="contract.anticipated_date"
                          persistent
                          width="290px"
                        >
                          <template #activator="{ on }">
                            <v-text-field
                              id="anticipated_date"
                              v-model="contract.anticipated_date"
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
                            v-model="contract.anticipated_date"
                            locale="es"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="final_date_anticipated = false">
                              Cancelar
                            </v-btn>
                            <v-btn
                              color="primary"
                              @click="$refs.dialog_anticipated_final.save(contract.anticipated_date)"
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
                        :rules="contract.validations.input_number_required"
                        vid="initial_value"
                        name="valor total del contrato"
                      >
                        <v-text-field
                          id="initial_value"
                          v-model="contract.initial_value"
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
                        :rules="contract.validations.input_number_required"
                        vid="monthly_value"
                        name="valor mensual del contrato"
                      >
                        <v-text-field
                          id="monthly_value"
                          v-model="contract.monthly_value"
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
                        :rules="contract.validations.input_number_required"
                        vid="duration_months"
                        name="duración del contrato en meses"
                      >
                        <v-text-field
                          id="duration_month"
                          v-model="contract.duration_months"
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
                        :rules="contract.validations.input_number_required"
                        vid="duration_days"
                        name="duración del contrato en días"
                      >
                        <v-text-field
                          id="duration_days"
                          v-model="contract.duration_days"
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
                        :rules="contract.validations.input_text"
                        vid="duration_other"
                        name="otra duración"
                      >
                        <v-text-field
                          id="duration_other"
                          v-model="contract.duration_other"
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
                        :rules="contract.validations.required"
                        vid="object"
                        name="objeto"
                      >
                        <v-textarea
                          id="object"
                          v-model="contract.object"
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
    <v-dialog
      v-model="dialog_delete"
      max-width="500px"
      :retain-focus="false"
    >
      <v-card>
        <v-card-title class="justify-center text-h5">Está seguro de eliminar este contrato?</v-card-title>
        <v-card-actions class="justify-center">
          <v-btn color="primary darken-1" text @click="closeDelete">No</v-btn>
          <v-btn color="primary darken-1" text @click="onDeleteConfirm">Si</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import _ from "lodash";
import {Contract} from "~/models/services/certifications/Contract";
import {DocumentType} from "~/models/services/certifications/DocumentType";
import {ContractType} from "~/models/services/certifications/ContractType";
import {Menu} from "~/models/services/certifications/Menu";

export default {
  name: "Contracts",
  auth: 'auth',
  nuxtI18n: {
    paths: {
      en: '/certifications/contracts',
      es: '/certificaciones/contratos',
    },
  },
  components: {
    VEmptyState: () => import('@/components/base/EmptyState'),
    BaseMaterialCard: () => import('@/components/base/MaterialCard')
  },
  data: () => ({
    finding: false,
    form: new Contract({
      query: null
    }),
    contract: new Contract(),
    document_type: new DocumentType(),
    document_types: [],
    contract_type: new ContractType(),
    contract_types: [],
    items: [],
    headers: [],
    pageCount: 0,
    total: 0,
    itemsPerPage: 12,
    page: 1,
    pagination: {},
    itemsPerPageArray: [10, 15, 20, 25, 30],
    dialog_create: false,
    sign_date: false,
    start_date: false,
    final_date: false,
    final_date_anticipated: false,
    selected: [],
    search: null,
    step: 1,
    dialog_delete: false,
  }),
  fetch() {
    this.getDocumentTypes()
    this.getContractTypes()
  },
  head: (vm) => ({
    title: vm.$t('certificates.titles.contracts')
  }),
  computed: {
    //
  },
  watch: {
    'pagination.page'() {
      return this.getData()
    },
    itemsPerPage() {
      return this.getData()
    },
    sign_date(val) {
      val &&
      setTimeout(() => (this.$refs.sign_date_picker.activePicker = "YEAR"));
    },
    start_date(val) {
      val &&
      setTimeout(() => (this.$refs.start_date_picker.activePicker = "YEAR"));
    },
    final_date(val) {
      val &&
      setTimeout(() => (this.$refs.final_date_picker.activePicker = "YEAR"));
    }
  },
  created() {
    this.drawerModel = new Menu()
  },
  methods: {
    onContract() {
      this.contract.setFormInstance(this.$refs[`contract_form_step_${this.step}`])
      this.step ++
      if (this.step > 2) {
        this.start()
        this.contract
          .store()
          .then((response) => {
            this.$snackbar({message: response.data, color: 'success'})
            this.$router.push(
              this.localePath({
                name: 'certifications-contracts-id-contract',
                params: {id: response.details.id},
              })
            )
          })
          .catch((errors) => {
            this.step = 1
            if (_.has(errors, "errors")) {
              Array.from(2).forEach((v, i) => {
                if (_.has(this.$refs, `contract_form_step_${i}`)) {
                  this.$refs[`contract_form_step_${i}`].setErrors(errors.errors);
                }
              });
            }
            this.$snackbar({message: errors.message})
          })
          .finally(() => this.stop())
      }
    },
    onSearch() {
      this.pagination.page = 1
      this.getData()
    },
    onClearSearch() {
      this.form.reset()
      this.getData()
    },
    onCancel() {
      this.step = 1
      this.dialog_create = false
    },
    onDelete(item) {
      this.form.id = item.id
      this.dialog_delete = true
    },
    onDeleteConfirm() {
      this.form
        .destroy(this.form.id)
        .then((response) => {
          this.$snackbar({
            message: response.data,
            color: 'success'
          })
          this.dialog_delete = false
        })
        .then(() => this.getData())
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    closeDelete() {
      this.dialog_delete = false
      this.form.reset()
    },
    getData() {
      const params = {
        query: this.form.query,
        page: this.pagination.page,
        per_page: this.itemsPerPage,
      }
      this.start()
      this.form.resetOnlyWhenUpdate = false
      this.form
        .index({ params })
        .then((response) => {
          this.items = response.data
          this.pageCount = response.meta.last_page
          this.total = response.meta.total
          this.headers = response.details.headers
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
          this.$snackbar({message: errors.message})
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
          this.$snackbar({message: errors.message})
        })
        .finally(() => this.stop())
    },
    onExcel() {
      this.$router.push(this.localePath({ name: 'certifications-reports'}))
    },
    start() {
      this.finding = true
    },
    stop() {
      this.finding = false
    }
  },
}
</script>

<style scoped>

</style>
