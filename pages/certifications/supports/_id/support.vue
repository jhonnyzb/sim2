<template>
  <v-container id="support" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8" class="my-4">
        <base-material-card
          color="primary"
          colored-shadow
        >
          <template #heading>
            <v-card-title class="display-2 font-weight-light">
              SOLICITUD
            </v-card-title>
            <p class="subtitle-3 font-weight-light text-justify"> {{ message }} </p>
            <p v-show="support.description !== message" class="h6 font-weight-black text-left"> {{ support.description }} </p>
            <p class="caption font-weight-light text-right">Fecha de solicitud: {{ support.created_at }}</p>
          </template>
          <v-card-text>
            <v-card-title class="display-2 font-weight-light">
              SOLUCIÓN
            </v-card-title>
            <validation-observer
              ref="support"
              v-slot="{ handleSubmit }"
            >
              <v-form
                @submit.prevent="handleSubmit(onSubmit)"
              >
                <v-row dense>
                  <v-col cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      :rules="form.validations.required"
                      vid="solution"
                      name="solución"
                    >
                      <v-textarea
                        v-if="support.solution"
                        id="solution"
                        v-model="support.solution"
                        name="solution"
                        :loading="finding"
                        :readonly="finding"
                        :error-messages="errors"
                        color="primary"
                        label="Solución"
                        required
                        prepend-icon="mdi-text"
                        disabled
                      />
                      <v-textarea
                        v-else
                        id="solution"
                        v-model="form.solution"
                        name="solution"
                        :loading="finding"
                        :readonly="finding"
                        :error-messages="errors"
                        color="primary"
                        label="Solución"
                        hint="Escriba una solución al soporte"
                        persistent-hint
                        required
                        prepend-icon="mdi-text"
                      />
                    </validation-provider>
                  </v-col>
                  <template v-if="attachment">
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
                          v-model.number="form.contract_document"
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
                          :disabled="checkSolution"
                        />
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
                          :disabled="checkSolution"
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
                        name="año de contrato"
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
                          :disabled="checkSolution"
                        />
                      </validation-provider>
                    </v-col>
                  </template>
                  <v-col cols="12" class="mt-4">
                    <v-row justify="space-between">
                      <v-switch
                        v-model="attachment"
                        class="mx-4"
                        :loading="finding"
                        :disabled="checkSolution"
                        label="Adjuntar certificado"
                      />
                      <v-btn
                        color="primary"
                        class="mt-4 mx-4"
                        :loading="finding"
                        :disabled="checkSolution"
                        type="submit"
                      >
                        <v-icon left dark>mdi-send</v-icon>
                        Enviar
                      </v-btn>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <small><strong>Nota:</strong> Verifique bien los datos antes de responder la solicitud.</small>
                  </v-col>
                </v-row>
              </v-form>
            </validation-observer>
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col cols="12" md="4" class="my-4">
        <base-material-card
          class="v-card-profile"
          :avatar="require('~/static/images/certifications/avatar.png')"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">SOLICITANTE</h6>
            <h4
              class="display-2 font-weight-light mb-3 text-uppercase"
              v-text="support.name"
            ></h4>

            <p
              class="font-weight-light grey--text"
            >
              {{ support.document_type }} - {{ support.document }}
            </p>

            <p
              class="font-weight-light grey--text"
              v-text="support.phone"
            ></p>

            <p
              class="font-weight-light grey--text"
              v-text="support.email"
            ></p>

            <v-chip
              :color="support.state === 'Pendiente' ? 'error' : 'success'"
              rounded
              class="mr-0"
              v-text="support.state"
            ></v-chip>
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col cols="12">
        <base-material-card
          title="Histórico de solicitudes"
          color="primary"
        >
          <v-card-text>
            <v-skeleton-loader
              ref="skeleton"
              :loading="finding"
              transition="scale-transition"
              type="table"
              class="mx-auto"
            >
              <v-data-table
                :headers="headers"
                :items="items"
                item-key="id"
              >
                <template #[`item.view`]="{ item }">
                  <v-btn
                    icon
                    color="primary"
                    :to="localePath({
                        name: 'certifications-supports-id-support',
                        params: { id: item.id },
                    })"
                  >
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>
                <template #[`item.state`]="{ item }">
                  <v-chip
                    :color="getColor(item.state)"
                    dark
                  >
                    {{ item.state }}
                  </v-chip>
                </template>
              </v-data-table>
            </v-skeleton-loader>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {Support} from "~/models/services/certifications/Support";
import {Permission} from "~/models/services/certifications/Permission";
import {Menu} from "~/models/services/certifications/Menu";

export default {
  name: "Support",
  auth: 'auth',
  components: {
    BaseMaterialCard: () => import('@/components/base/MaterialCard'),
  },
  middleware: ['permissions'],
  data: () => ({
    finding: false,
    perm: new Permission(),
    permissions: [],
    form: new Support(),
    support: new Support(),
    headers: [],
    items: [],
    attachment: true,
  }),
  fetch() {
    this.getPermissions()
    this.getSupport()
  },
  head: (vm) => ({
    title: vm.$t('certificates.titles.supports')
  }),
  computed: {
    checkSolution() {
      return !!this.support.solution
    },
    message() {
      const number = this.support.contract_number != null ? this.support.contract_number : '"Sin número de contrato"';
      return "Solicitud de Obligaciones especificas y/o modificaciones al contrato No. " + number + " del año " +
        this.support.contract_year + " a nombre del contratista " + this.support.name + " identificado con " + this.support.document +
        " ó contactar a la persona por medio de teléfono: " + this.support.phone + ", gracias por su solicitud.";
    }
  },
  created() {
    this.drawerModel = new Menu()
  },
  methods: {
    getSupport() {
      this.start()
      this.form
        .show(this.$route.params.id)
        .then((response) => {
          this.support = new Support({
            ...response.data
          })
          this.items = response.details.history
          this.headers = response.details.headers
          if (this.support.document && this.support.contract_number && this.support.contract_year) {
            this.form.contract_document = this.support.document
            this.form.contract_number = this.support.contract_number
            this.form.contract_year = this.support.contract_year
          }
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    onSubmit() {
      this.start()
      this.form.setFormInstance(this.$refs.support)
      this.form
        .update(this.$route.params.id)
        .then((response) => {
          this.attachment = false
          this.getSupport()
          this.$snackbar({ message: response.data, color: 'success' })
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    getColor(state) {
      if (state === 'Pendiente') return 'error'
      else return 'success'
    },
    // Permissions
    getPermissions() {
      this.perm
        .index()
        .then((response) => {
          this.permissions = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
    },
    start() {
      this.finding = true
    },
    stop() {
      this.finding = false
    }
  }
}
</script>

<style scoped>

</style>
