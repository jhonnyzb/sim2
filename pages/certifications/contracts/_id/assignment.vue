<template>
  <v-skeleton-loader
    ref="skeleton"
    :loading="finding"
    transition="scale-transition"
    type="table"
    class="mx-auto"
  >
    <v-data-table
      :items="assignments"
      :headers="assignmentsHeaders"
      item-key="id"
      :loading="finding"
    >
      <template #top>
        <v-row
          justify="start"
        >
          <v-dialog
            v-model="dialog"
            persistent
          >
            <template #activator="{ on, attrs }">
              <v-btn
                class="my-2"
                color="primary"
                small
                v-bind="attrs"
                v-on="on"
              >
                {{ $t('buttons.Add') }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title v-if="error.message" class="justify-center">
                <v-banner
                  color="error"
                  class="mt-2 white--text"
                  elevation="2"
                  rounded
                  single-line
                >
                  <v-avatar slot="icon" color="white" size="40">
                    <v-icon color="error">mdi-alert</v-icon>
                  </v-avatar>
                  <ul v-for="(k, i) in errorsKeys" :key="i">
                    <li
                      v-for="(val, j) in error.errors[k]"
                      :key="`i-${j}`"
                    >
                      {{ val }}
                    </li>
                  </ul>
                  <template #actions>
                    <v-btn icon @click="error = {}">
                      <v-icon dark>mdi-close</v-icon>
                    </v-btn>
                  </template>
                </v-banner>
              </v-card-title>
              <validation-observer
                ref="assignment"
                v-slot="{ handleSubmit }"
              >
                <v-form @submit.prevent="handleSubmit(onSubmit)">
                  <v-card-title>
                    <span class="text-h5">{{ currentTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row class="mx-auto align-content-center" dense>
                      <v-col v-if="edit" cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          :rules="form.validations.input_number"
                          vid="number"
                          name="número de la cesión"
                        >
                          <v-text-field
                            id="number"
                            v-model="form.number"
                            type="number"
                            name="number"
                            :loading="finding"
                            :readonly="finding"
                            :error-messages="errors"
                            color="primary"
                            label="Número de la cesión"
                            prepend-icon="mdi-numeric"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
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
                      <v-col cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          :rules="form.validations.input_document_required"
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
                            counter
                            :maxlength="12"
                            autocomplete="off"
                            clearable
                            prepend-icon="mdi-numeric"
                            required="required"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          :rules="form.validations.required"
                          vid="dv"
                          name="dígito de verificaión"
                        >
                          <v-text-field
                            id="dv"
                            v-model.number="form.dv"
                            type="number"
                            name="dv"
                            :loading="finding"
                            :readonly="finding"
                            :error-messages="errors"
                            color="primary"
                            label="Dígito de verificaión"
                            prepend-icon="mdi-numeric"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          :rules="form.validations.required"
                          vid="name"
                          name="nombre"
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
                            autocomplete="off"
                            required="required"
                            prepend-icon="mdi-face-agent"
                          />
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          :rules="form.validations.input_number_required"
                          vid="value"
                          name="valor del contrato cedido"
                        >
                          <v-text-field
                            id="value"
                            v-model="form.value"
                            name="value"
                            :loading="finding"
                            :readonly="finding"
                            :error-messages="errors"
                            color="primary"
                            label="Valor del contrato cedido"
                            hint="no es necesario incluir puntos en el valor de cesión"
                            persistent-hint
                            clearable
                            autocomplete="off"
                            required="required"
                            prepend-icon="mdi-currency-usd"
                          />
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          vid="date"
                          name="fecha de cesión"
                        >
                          <v-dialog
                            ref="dialog_date"
                            v-model="date"
                            :close-on-content-click="false"
                            :return-value.sync="form.date"
                            persistent
                            width="290px"
                          >
                            <template #activator="{ on, attrs }">
                              <v-text-field
                                id="date"
                                v-model="form.date"
                                name="date"
                                color="primary"
                                :error-messages="errors"
                                label="Fecha de cesión"
                                prepend-icon="mdi-calendar"
                                autocomplete="off"
                                required="required"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              ref="date_picker"
                              v-model="form.date"
                              locale="es"
                            >
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="date = false">
                                Cancelar
                              </v-btn>
                              <v-btn
                                color="primary"
                                @click="$refs.dialog_date.save(form.date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-dialog>
                        </validation-provider>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary darken-1"
                      text
                      :loading="finding"
                      @click="close"
                    >
                      {{ $t('buttons.Cancel') }}
                    </v-btn>
                    <v-btn
                      color="primary"
                      :loading="finding"
                      type="submit"
                    >
                      {{ $t('buttons.Save') }}
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </validation-observer>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
      <template #[`item.value`]="{ item }">
        $ {{ item.value }}
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="onUpdate(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="onDelete(item)"
        >
          mdi-delete
        </v-icon>
        <v-dialog
          v-model="dialogDelete"
          max-width="500px"
          :retain-focus="false"
        >
          <v-card>
            <v-card-title class="text-h5 justify-center">Está seguro de eliminar esta cesión?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" text @click="closeDelete">No</v-btn>
              <v-btn color="primary darken-1" text @click="onDeleteConfirm">Si</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
  </v-skeleton-loader>
</template>

<script>
import {Assignment} from "~/models/services/certifications/Assignment";
import {DocumentType} from "~/models/services/certifications/DocumentType";

export default {
  name: "Assignment",
  auth: 'auth',
  props: {
    assignments: {
      type: Array,
      default: null
    },
    assignmentsHeaders: {
      type: Array,
      default: null
    }
  },
  data: (vm) => ({
    finding: false,
    dialog: false,
    dialogDelete: false,
    edit: false,
    date: false,
    error: {},
    form: new Assignment(vm.$route.params.id),
    document_type: new DocumentType(),
    document_types: [],
  }),
  fetch() {
    this.getDocumentTypes()
  },
  computed: {
    currentTitle() {
      return !this.edit ? 'Nueva Cesión' : 'Editar Cesión';
    },
    errorsKeys() {
      return this.error.errors ? Object.keys(this.error.errors) : []
    },
    calculateNumber() {
      return this.assignments.length ? Math.max(...this.assignments.map(a => a.number)) + 1 : 1;
    },
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
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
    onSubmit() {
      this.start()
      this.form.setFormInstance(this.$refs.assignment)
      if (!this.edit) {
        this.form.number = this.calculateNumber
        this.form
          .store()
          .then((response) => {
            this.$snackbar({
              message: response.data,
              color: 'success'}
            )
          })
          .then(() => {
            this.$emit('getData')
          })
          .catch((errors) => {
            this.error = errors
            this.$snackbar({message: errors.message})
          })
          .finally(() => this.stop())
      } else {
        this.form
          .update(this.form.id)
          .then((response) => {
            this.$snackbar({
              message: response.data,
              color: 'success'})
          })
          .then(() => {
            this.$emit('getData')
            this.form.reset()
          })
          .catch((errors) => {
            this.error = errors
            this.$snackbar({ message: errors.message })
          })
          .finally(() => this.stop())
      }
    },
    onUpdate(item) {
      this.edit = true
      this.form.id = item.id
      this.form.number = item.number
      this.form.document_type_id = item.document_type_id
      this.form.document = item.document
      this.form.name = item.name
      this.form.dv = item.dv
      this.form.value = item.value.split('.').join('')
      this.form.date = item.date
      this.dialog = true
    },
    onDelete(item) {
      this.form.id = item.id
      this.dialogDelete = true
    },
    onDeleteConfirm() {
      this.form
        .destroy(this.form.id)
        .then((response) => {
          this.$snackbar({
            message: response.data,
            color: 'success'}
          )
        })
        .then(() => {
          this.$emit('getData')
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    close() {
      this.dialog = false
      this.form.reset()
      this.edit = false
      this.error = {}
      this.$refs.assignment.reset()
    },
    closeDelete() {
      this.dialogDelete = false
      this.form.reset()
    },
    start() {
      this.finding = true
    },
    stop() {
      this.finding = false
      this.dialog = false
      this.dialogDelete = false
      this.edit = false
    }
  }
}
</script>

<style scoped>

</style>
