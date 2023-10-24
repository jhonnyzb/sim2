<template>
  <v-skeleton-loader
    ref="skeleton"
    :loading="finding"
    transition="scale-transition"
    type="table"
    class="mx-auto"
  >
    <v-data-table
      :items="members"
      :headers="membersHeaders"
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
              <validation-observer
                ref="member"
                v-slot="{ handleSubmit }"
              >
                <v-form @submit.prevent="handleSubmit(onSubmit)">
                  <v-card-title>
                    <span class="text-h5">{{ currentTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row class="mx-auto align-content-center" dense>
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
                          :rules="form.validations.input_number_required_between(1,100)"
                          vid="percent"
                          name="porcentaje del integrante"
                        >
                          <v-text-field
                            id="percent"
                            v-model="form.percent"
                            name="percent"
                            :loading="finding"
                            :readonly="finding"
                            :error-messages="errors"
                            label="Porcentaje del integrante"
                            color="primary"
                            clearable
                            counter
                            :maxlength="3"
                            autocomplete="off"
                            required="required"
                            prepend-icon="mdi-numeric"
                          />
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
      <template #[`item.percent`]="{ item }">
        <div class="text-center">
          <v-progress-circular
            :value="item.percent"
            size="38"
            color="primary"
          >
            <small>{{ item.percent }}%</small>
          </v-progress-circular>
        </div>
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
          @click="dialogDelete = true"
        >
          mdi-delete
        </v-icon>
        <v-dialog
          v-model="dialogDelete"
          max-width="500px"
          :retain-focus="false"
        >
          <v-card>
            <v-card-title class="text-h5 justify-center">Está seguro de eliminar este integrante?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" text @click="closeDelete">No</v-btn>
              <v-btn color="primary darken-1" text @click="onDelete(item)">Si</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
  </v-skeleton-loader>
</template>

<script>
import {Member} from "~/models/services/certifications/Member";
import {DocumentType} from "~/models/services/certifications/DocumentType";

export default {
  name: "Member",
  auth: 'auth',
  props: {
    members: {
      type: Array,
      default: null
    },
    membersHeaders: {
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
    form: new Member(vm.$route.params.id),
    document_type: new DocumentType(),
    document_types: [],
    interval: {},
    value: 0,
  }),
  fetch() {
    this.getDocumentTypes()
  },
  computed: {
    currentTitle() {
      return !this.edit ? 'Nuevo Integrante' : 'Editar Integrante';
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
      this.form.setFormInstance(this.$refs.member)
      if (!this.edit) {
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
            this.dialog = false
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
            this.dialog = false
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
      this.form.document_type_id = item.document_type_id
      this.form.document = item.document
      this.form.name = item.name
      this.form.percent = item.percent
      this.dialog = true
    },
    onDelete(item) {
      this.form
        .destroy(item.id)
        .then((response) => {
          this.$snackbar({
            message: response.data,
            color: 'success'}
          )
        })
        .then(() => {
          this.$emit('getData')
          this.dialogDelete = false
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
      this.$refs.member.reset()
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
    }
  }
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
