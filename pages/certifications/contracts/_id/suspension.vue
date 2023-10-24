<template>
  <v-skeleton-loader
    ref="skeleton"
    :loading="finding"
    transition="scale-transition"
    type="table"
    class="mx-auto"
  >
    <v-data-table
      :items="suspensions"
      :headers="suspensionsHeaders"
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
                ref="suspension"
                v-slot="{ handleSubmit }"
              >
                <v-form @submit.prevent="handleSubmit(onSubmit)">
                  <v-card-title>
                    <span class="text-h5">{{ currentTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row class="mx-auto align-content-center">
                      <v-col v-if="edit" cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          :rules="form.validations.input_number"
                          vid="number"
                          name="número de la suspensión"
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
                            label="Número de la suspensión"
                            prepend-icon="mdi-numeric"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          :rules="form.validations.required"
                          vid="months"
                          name="meses"
                        >
                          <v-text-field
                            id="months"
                            v-model="form.months"
                            type="number"
                            name="months"
                            :loading="finding"
                            :readonly="finding"
                            :error-messages="errors"
                            color="primary"
                            label="Meses de la suspensión"
                            hint="Si no aplica, ingrese el valor 0"
                            persistent-hint
                            prepend-icon="mdi-numeric"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          :rules="form.validations.required"
                          vid="days"
                          name="dias"
                        >
                          <v-text-field
                            id="days"
                            v-model="form.days"
                            type="number"
                            name="days"
                            :loading="finding"
                            :readonly="finding"
                            :error-messages="errors"
                            color="primary"
                            label="Dias de la suspensión"
                            hint="Si no aplica, ingrese el valor 0"
                            persistent-hint
                            prepend-icon="mdi-numeric"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          vid="final_date"
                          name="fecha inicio"
                        >
                          <v-dialog
                            ref="dialog_start"
                            v-model="start_date"
                            :close-on-content-click="false"
                            :return-value.sync="form.start_date"
                            persistent
                            width="290px"
                          >
                            <template #activator="{ on, attrs }">
                              <v-text-field
                                id="start_date"
                                v-model="form.start_date"
                                name="start_date"
                                color="primary"
                                :error-messages="errors"
                                label="Fecha de inicio"
                                prepend-icon="mdi-calendar"
                                autocomplete="off"
                                required="required"
                                readonly
                                clearable
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              ref="start_date_picker"
                              v-model="form.start_date"
                              locale="es"
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
                      <v-col cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          vid="final_date"
                          name="fecha terminación"
                        >
                          <v-dialog
                            ref="dialog_final"
                            v-model="final_date"
                            :close-on-content-click="false"
                            :return-value.sync="form.final_date"
                            persistent
                            width="290px"
                          >
                            <template #activator="{ on, attrs }">
                              <v-text-field
                                id="final_date"
                                v-model="form.final_date"
                                name="final_date"
                                color="primary"
                                :error-messages="errors"
                                label="Fecha de finalización"
                                prepend-icon="mdi-calendar"
                                autocomplete="off"
                                required="required"
                                readonly
                                clearable
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              ref="final_date_picker"
                              v-model="form.final_date"
                              locale="es"
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
                      <v-col cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          vid="restart_date"
                          name="fecha reinicio"
                        >
                          <v-dialog
                            ref="dialog_restart"
                            v-model="restart_date"
                            :close-on-content-click="false"
                            :return-value.sync="form.restart_date"
                            persistent
                            width="290px"
                          >
                            <template #activator="{ on, attrs }">
                              <v-text-field
                                id="restart_date"
                                v-model="form.restart_date"
                                name="restart_date"
                                color="primary"
                                :error-messages="errors"
                                label="Fecha de reinicio"
                                prepend-icon="mdi-calendar"
                                autocomplete="off"
                                required="required"
                                readonly
                                clearable
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              ref="restart_date_picker"
                              v-model="form.restart_date"
                              locale="es"
                            >
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="restart_date = false">
                                Cancelar
                              </v-btn>
                              <v-btn
                                color="primary"
                                @click="$refs.dialog_restart.save(form.restart_date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-dialog>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          vid="final_date_cto"
                          name="fecha terminación del contrato"
                        >
                          <v-dialog
                            ref="dialog_final_dto"
                            v-model="final_date_cto"
                            :close-on-content-click="false"
                            :return-value.sync="form.final_date_cto"
                            persistent
                            width="290px"
                          >
                            <template #activator="{ on, attrs }">
                              <v-text-field
                                id="final_date_cto"
                                v-model="form.final_date_cto"
                                name="final_date_cto"
                                color="primary"
                                :error-messages="errors"
                                label="Fecha de finalización del contrato"
                                prepend-icon="mdi-calendar"
                                autocomplete="off"
                                required="required"
                                readonly
                                clearable
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              ref="final_date_cto_date_picker"
                              v-model="form.final_date_cto"
                              locale="es"
                            >
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="final_date_cto = false">
                                Cancelar
                              </v-btn>
                              <v-btn
                                color="primary"
                                @click="$refs.dialog_final_dto.save(form.final_date_cto)"
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
            <v-card-title class="text-h5 justify-center">Está seguro de eliminar esta suspensión?</v-card-title>
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
import {Suspension} from "~/models/services/certifications/Suspension";

export default {
  name: "Suspension",
  auth: 'auth',
  props: {
    suspensions: {
      type: Array,
      default: null
    },
    suspensionsHeaders: {
      type: Array,
      default: null
    },
    dateFinalDto: {
      type: String,
      default: null
    }
  },
  data: (vm) => ({
    finding: false,
    dialog: false,
    dialogDelete: false,
    edit: false,
    error: {},
    form: new Suspension(vm.$route.params.id),
    start_date: false,
    final_date: false,
    restart_date: false,
    final_date_cto: false,
  }),
  computed: {
    currentTitle() {
      return !this.edit ? 'Nueva Suspensión' : 'Editar Suspensión';
    },
    errorsKeys() {
      return this.error.errors ? Object.keys(this.error.errors) : []
    },
    calculateNumber() {
      return this.suspensions.length ? Math.max(...this.suspensions.map(s => s.number)) + 1 : 1;
    },
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    onSubmit() {
      this.start()
      this.form.setFormInstance(this.$refs.suspension)
      if (this.form.final_date_cto == null) {
        this.form.final_date_cto = this.dateFinalDto
      }
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
      this.form.months = item.months
      this.form.days = item.days
      this.form.start_date = item.start_date
      this.form.final_date = item.final_date
      this.form.restart_date = item.restart_date
      this.form.final_date_cto = item.final_date_cto
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
      this.$refs.suspension.reset()
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
