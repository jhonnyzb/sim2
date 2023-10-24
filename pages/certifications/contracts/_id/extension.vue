<template>
  <v-skeleton-loader
    ref="skeleton"
    :loading="finding"
    transition="scale-transition"
    type="table"
    class="mx-auto"
  >
    <v-data-table
      :items="extensions"
      :headers="extensionsHeaders"
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
            max-width="600px"
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
                ref="extension"
                v-slot="{ handleSubmit }"
              >
                <v-form @submit.prevent="handleSubmit(onSubmit)">
                  <v-card-title>
                    <span class="text-h5">{{ currentTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-col v-if="edit" cols="12" sm="12" md="12">
                        <validation-provider
                          v-slot="{ errors }"
                          :rules="form.validations.required"
                          vid="number"
                          name="número de la prórroga"
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
                            label="Número de la prórroga"
                            prepend-icon="mdi-numeric"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
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
                            label="Meses de la prórroga"
                            prepend-icon="mdi-numeric"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
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
                            label="Dias de la prórroga"
                            prepend-icon="mdi-numeric"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
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
            <v-card-title class="text-h5 justify-center">Está seguro de eliminar esta prórroga?</v-card-title>
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
import {Extension} from "~/models/services/certifications/Extension";

export default {
  name: "Extension",
  auth: 'auth',
  props: {
    extensions: {
      type: Array,
      default: null
    },
    extensionsHeaders: {
      type: Array,
      default: null
    }
  },
  data: (vm) => ({
    finding: false,
    dialog: false,
    dialogDelete: false,
    edit: false,
    final_date: false,
    form: new Extension(vm.$route.params.id),
    error: {},
  }),
  computed: {
    currentTitle() {
      return !this.edit ? 'Nueva Prórroga' : 'Editar Prórroga';
    },
    errorsKeys() {
      return this.error.errors ? Object.keys(this.error.errors) : []
    },
    calculateNumber() {
      return this.extensions.length ? Math.max(...this.extensions.map(e => e.number)) + 1 : 1;
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
      this.form.setFormInstance(this.$refs.extension)
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
      this.form.final_date = item.final_date
      this.dialog = true
    },
    onDelete(item) {
      this.form.id = item.id
      this.form.number = item.number
      this.form.months = item.months
      this.form.days = item.days
      this.form.final_date = item.final_date
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
      this.form.id = null
      this.form.reset()
      this.edit = false
      this.error = {}
      this.$refs.extension.reset()
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
