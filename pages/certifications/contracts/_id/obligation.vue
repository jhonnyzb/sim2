<template>
  <v-skeleton-loader
    ref="skeleton"
    :loading="finding"
    transition="scale-transition"
    type="table"
    class="mx-auto"
  >
    <v-data-table
      :items="obligations"
      :headers="obligationsHeaders"
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
              <validation-observer
                ref="obligation"
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
                          :rules="form.validations.input_number"
                          vid="number"
                          name="número de la obligación"
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
                            label="Número de la obligación"
                            prepend-icon="mdi-numeric"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <validation-provider
                          v-slot="{ errors }"
                          :rules="form.validations.required"
                          vid="object"
                          name="objeto de la obligación"
                        >
                          <v-textarea
                            id="object"
                            v-model="form.object"
                            name="object"
                            :loading="finding"
                            :readonly="finding"
                            :error-messages="errors"
                            color="primary"
                            label="Objeto de la obligación"
                            prepend-icon="mdi-text"
                            required
                          ></v-textarea>
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
            <v-card-title class="justify-center text-h5">Está seguro de eliminar esta obligación?</v-card-title>
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
import {Obligation} from "~/models/services/certifications/Obligation";

export default {
  name: "Obligation",
  auth: 'auth',
  props: {
    obligations: {
      type: Array,
      default: null
    },
    obligationsHeaders: {
      type: Array,
      default: null
    }
  },
  data: (vm) => ({
    finding: false,
    dialog: false,
    dialogDelete: false,
    edit: false,
    form: new Obligation(vm.$route.params.id),
  }),
  computed: {
    currentTitle() {
      return !this.edit ? 'Nueva Obligación' : 'Editar Obligación';
    },
    calculateNumber() {
      return this.obligations.length ? Math.max(...this.obligations.map(o => o.number)) + 1 : 1;
    },
  },
  methods: {
    onSubmit() {
      this.start()
      this.form.setFormInstance(this.$refs.obligation)
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
          .then(() => this.$emit('getData'))
          .catch((errors) => {
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
            this.$snackbar({ message: errors.message })
          })
          .finally(() => this.stop())
      }
    },
    onUpdate(item) {
      this.edit = true
      this.form.id = item.id
      this.form.number = item.number
      this.form.object = item.name
      this.dialog = true
    },
    onDelete(item) {
      this.form.id = item.id
      this.form.number = item.number
      this.form.object = item.name
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
        .then(() => this.$emit('getData'))
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    close() {
      this.dialog = false
      this.form.id = null
      this.form.number = null
      this.form.object = null
      this.edit = false
      this.$refs.obligation.reset()
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
  },
}
</script>

<style scoped>

</style>
