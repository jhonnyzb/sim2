<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <template #activator="activator">
      <v-fab-transition>
        <v-btn
          v-bind="activator.attrs"
          :loading="loading"
          :disabled="loading"
          color="primary"
          dark
          fixed
          bottom
          right
          fab
          v-on="activator.on"
          @click="dialog = true"
        >
          <v-tooltip left>
            <template #activator="{ attrs, on }">
              <v-icon v-bind="attrs" v-on="on">mdi-filter-variant</v-icon>
            </template>
            <span>{{ $t('buttons.Filter') }}</span>
          </v-tooltip>
        </v-btn>
      </v-fab-transition>
    </template>
    <v-card
      v-bind="$attrs"
      flat
      :max-width="$vuetify.breakpoint.mdAndUp ? '600' : ''"
    >
      <v-toolbar color="primary" dark>
        <v-toolbar-title v-text="`Filtros`" />
        <v-spacer></v-spacer>
        <v-btn icon @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <validation-observer ref="filter" v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(onSubmit)">
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="form.validations.input_number"
                  vid="query"
                  :name="$t('orfeo.inputs.filed').toLowerCase()"
                >
                  <v-text-field
                    id="query"
                    v-model.number="form.query"
                    name="query"
                    :loading="finding"
                    :readonly="finding"
                    prepend-icon="mdi-pound"
                    autocomplete="off"
                    clearable
                    :error-messages="errors"
                    :label="$t('orfeo.inputs.filed')"
                    :counter="20"
                    :maxlength="20"
                  />
                </validation-provider>
              </v-col>

              <!-- Start Date -->
              <v-col cols="12" md="6" sm="12">
                <v-dialog
                  ref="dialog_start"
                  v-model="validity_start"
                  :return-value.sync="form.start_date"
                  persistent
                  class="transparent"
                  width="290px"
                >
                  <template #activator="{ on }">
                    <validation-provider
                      v-slot="{ errors }"
                      :rules="form.validations.input_date_before('final_date')"
                      vid="start_date"
                      :name="$t('orfeo.inputs.start_date').toLowerCase()"
                    >
                      <v-text-field
                        v-model="form.start_date"
                        name="start_date"
                        :error-messages="errors"
                        color="primary"
                        :label="$t('orfeo.inputs.start_date')"
                        clearable
                        counter
                        :maxlength="12"
                        autocomplete="off"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      />
                    </validation-provider>
                  </template>
                  <v-date-picker
                    v-model="form.start_date"
                    :locale="$i18n.locale"
                    :max="form.final_date"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="validity_start = false"
                      v-text="$t('buttons.Cancel')"
                    />
                    <v-btn
                      color="primary"
                      @click="$refs.dialog_start.save(form.start_date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <!-- Final Date -->
              <v-col cols="12" md="6" sm="12">
                <v-dialog
                  ref="dialog_final"
                  v-model="validity_final"
                  :return-value.sync="form.final_date"
                  persistent
                  width="290px"
                >
                  <template #activator="{ on }">
                    <validation-provider
                      v-slot="{ errors }"
                      vid="final_date"
                      :rules="form.validations.input_date_after('start_date')"
                      :name="$t('orfeo.inputs.final_date').toLowerCase()"
                    >
                      <v-text-field
                        v-model="form.final_date"
                        name="final_date"
                        :error-messages="errors"
                        color="primary"
                        :label="$t('orfeo.inputs.final_date')"
                        clearable
                        counter
                        :maxlength="12"
                        autocomplete="off"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      />
                    </validation-provider>
                  </template>
                  <v-date-picker
                    v-model="form.final_date"
                    :locale="$i18n.locale"
                    :min="form.start_date"
                    :max="
                      isCalendar ? setCalendarLimit(form.start_date) : undefined
                    "
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="validity_final = false"
                      v-text="$t('buttons.Cancel')"
                    />
                    <v-btn
                      color="primary"
                      @click="$refs.dialog_final.save(form.final_date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>

              <v-col cols="12" md="6" sm="12">
                <v-autocomplete
                  id="document_type"
                  v-model="form.document_type"
                  name="document_type"
                  :loading="finding"
                  item-text="name"
                  item-value="id"
                  autocomplete="off"
                  cache-items
                  clearable
                  multiple
                  hide-no-data
                  :search-input.sync="search_document"
                  :items="document_types"
                  prepend-icon="mdi-file"
                  menu-props="auto"
                  :label="$t('orfeo.inputs.document_type')"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-autocomplete
                  id="current_user_id"
                  v-model="form.current_user_id"
                  name="current_user_id"
                  :loading="finding"
                  item-text="name"
                  item-value="id"
                  autocomplete="off"
                  cache-items
                  clearable
                  hide-no-data
                  multiple
                  :search-input.sync="search_user"
                  :items="users"
                  prepend-icon="mdi-account"
                  menu-props="auto"
                  :label="$t('orfeo.inputs.current_user_id')"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-select
                  id="folder"
                  v-model="form.folder"
                  name="folder"
                  :loading="finding"
                  :readonly="finding"
                  item-text="name"
                  item-value="id"
                  autocomplete="off"
                  clearable
                  multiple
                  :items="folders"
                  prepend-icon="mdi-folder-text"
                  menu-props="auto"
                  :label="$t('orfeo.inputs.folder')"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-select
                  id="current_dependency_id"
                  v-model="form.current_dependency_id"
                  name="current_dependency_id"
                  :loading="finding"
                  :readonly="finding"
                  item-text="name"
                  item-value="id"
                  autocomplete="off"
                  clearable
                  multiple
                  :items="dependencies"
                  prepend-icon="mdi-domain"
                  menu-props="auto"
                  :label="$t('orfeo.inputs.current_dependency_id')"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-select
                  id="read"
                  v-model="form.read"
                  name="read"
                  :loading="finding"
                  :readonly="finding"
                  item-text="name"
                  item-value="id"
                  autocomplete="off"
                  clearable
                  :items="read"
                  prepend-icon="mdi-eye"
                  menu-props="auto"
                  :label="$t('orfeo.inputs.read')"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-select
                  id="where_has"
                  v-model="form.where_has"
                  name="where_has"
                  :loading="finding"
                  :readonly="finding"
                  item-text="name"
                  item-value="id"
                  autocomplete="off"
                  clearable
                  multiple
                  :items="where_has"
                  prepend-icon="mdi-paperclip"
                  menu-props="auto"
                  :label="$t('orfeo.inputs.where_has')"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-select
                  id="status"
                  v-model="form.status"
                  name="status"
                  :loading="finding"
                  :readonly="finding"
                  item-text="name"
                  item-value="id"
                  autocomplete="off"
                  clearable
                  :items="stats"
                  prepend-icon="mdi-clipboard-check"
                  menu-props="auto"
                  :label="$t('orfeo.inputs.status')"
                ></v-select>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="text-right">
                <v-btn outlined color="primary" @click="onReset">
                  {{ $t('buttons.Reset') }}
                </v-btn>
                <v-btn type="submit" color="primary">
                  {{ $t('buttons.Submit') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { Orfeo } from '@/models/services/orfeo/Orfeo'
import { DocumentType } from '@/models/services/orfeo/DocumentType'
import { User } from '@/models/services/orfeo/User'
import { Folder } from '@/models/services/orfeo/Folder'
import { Dependency } from '@/models/services/orfeo/Dependency'

export default {
  name: 'FilterForm',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    isCalendar: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dialog: false,
    finding: false,
    validity_start: false,
    validity_final: false,
    form: new Orfeo(),
    document: new DocumentType(),
    search_document: null,
    document_types: [],
    user: new User(),
    search_user: null,
    users: [],
    folder: new Folder(),
    folders: [],
    dependency: new Dependency(),
    dependencies: [],
  }),
  computed: {
    read() {
      return [
        { id: true, name: this.$t('orfeo.event.read') },
        { id: false, name: this.$t('orfeo.event.not_read') },
      ]
    },
    where_has() {
      return [
        { id: 'attachments', name: this.$t('orfeo.event.attachments_count') },
        { id: 'associates', name: this.$t('orfeo.event.associates_count') },
        { id: 'informed', name: this.$t('orfeo.event.informed_count') },
      ]
    },
    stats() {
      return [
        { id: 1, name: this.$t('orfeo.stats.filed') },
        { id: 2, name: this.$t('orfeo.stats.principal') },
        { id: 3, name: this.$t('orfeo.stats.printed') },
        { id: 4, name: this.$t('orfeo.stats.sent') },
      ]
    },
  },
  watch: {
    search_document(val) {
      return val && val.length > 3 && this.getDocumentTypes()
    },
    search_user(val) {
      return val && val.length > 3 && this.getUsers()
    },
  },
  mounted() {
    this.getFolders()
    this.getDependencies()
  },
  methods: {
    onSubmit() {
      this.$emit('on-submit', this.form.data())
      this.$nextTick(function () {
        this.onClose()
      })
    },
    onReset() {
      this.form.reset()
      this.$emit('on-submit', this.form.data())
      this.$nextTick(function () {
        this.onClose()
      })
    },
    onClose() {
      this.dialog = !this.dialog
      this.$emit('on-close')
    },
    // Data
    getDocumentTypes() {
      this.finding = true
      this.document
        .index({ params: { query: this.search_document } })
        .then((response) => {
          this.document_types = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.finding = false))
    },
    getUsers() {
      this.finding = true
      this.user
        .index({ params: { query: this.search_user } })
        .then((response) => {
          this.users = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.finding = false))
    },
    getFolders() {
      this.finding = true
      this.folder
        .index()
        .then((response) => {
          this.folders = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.finding = false))
    },
    getDependencies() {
      this.finding = true
      this.dependency
        .index()
        .then((response) => {
          this.dependencies = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.finding = false))
    },
    setCalendarLimit(date) {
      return this.$moment(date).isValid()
        ? this.$moment(date).add(1, 'month').toISOString()
        : undefined
    },
  },
}
</script>
