<template>
  <v-management
    :id="form.id"
    :loading="loading"
    card-color="primary"
    card-icon="mdi-format-list-bulleted"
    :card-title="title"
    :requested-at="requested_at"
    :items="items"
    :item-sub-text-format="subtextFormat"
    :show-create-button="canCreateAction"
    :show-update-button="canUpdateAction"
    :show-delete-button="canDeleteAction"
    :show-view-audit-button="canViewHiAction"
    @refresh="getData"
    @create="onCreate"
    @update="onUpdate"
    @delete="onDelete"
    @submit="onSubmit"
    @form:closed="onClose"
  >
    <template #form-inputs>
      <!-- Name -->
      <v-col class="mx-auto" cols="12" sm="12" md="12">
        <validation-provider
          v-slot="{ errors }"
          :rules="form.validations.input_text_required"
          vid="name"
          :name="title.toLowerCase()"
        >
          <v-text-field
            v-model="form.name"
            name="name"
            :loading="loading"
            :readonly="loading"
            prepend-icon="mdi-text"
            autocomplete="off"
            clearable
            :counter="30"
            :maxlength="30"
            :error-messages="errors"
            :label="title"
          />
        </validation-provider>
      </v-col>
    </template>
  </v-management>
</template>

<router lang="yaml">
meta:
  title: parks.titles.dataManager
</router>

<script>
import { Api } from '~/models/Api'
import { Certified } from '~/models/services/parks/Certified'
import { Menu } from '~/models/services/parks/Menu'
import AbilityService from '~/models/services/parks/AbilityService'

export default {
  name: 'CertificateStatus',
  nuxtI18n: {
    paths: {
      en: '/parks/manage/certificate-status',
      es: '/parques/administrar/estado-certificados',
    },
  },
  components: {
    VManagement: () => import('~/components/parks/VManagement'),
  },
  auth: 'auth',
  middleware: ['permissions'],
  head: (vm) => ({
    title: vm.$t('parks.titles.dataManager'),
  }),
  meta: {
    permissionsUrl: Api.END_POINTS.PARKS_PERMISSIONS(),
    title: 'parks.titles.locationManager',
    permissions(bouncer, to, from) {
      const service = new AbilityService()
      const abilities = service.manageAbilities(service.models.CERTIFIED)
      return bouncer.canAny(abilities)
    },
  },
  created() {
    this.drawerModel = new Menu()
  },
  data: () => ({
    loading: false,
    form: new Certified(),
    items: [],
    requested_at: null,
  }),
  fetch() {
    this.getData()
  },
  computed: {
    title() {
      return this.$t('parks.park.certified')
    },
    canCreateAction() {
      return this.canManageOrCreate(this.ability_service.models.CERTIFIED)
    },
    canUpdateAction() {
      return this.canManageOrUpdate(this.ability_service.models.CERTIFIED)
    },
    canDeleteAction() {
      return this.canManageOrDestroy(this.ability_service.models.CERTIFIED)
    },
    canViewHiAction() {
      return this.canViewHistory(this.ability_service.models.CERTIFIED)
    },
  },
  methods: {
    subtextFormat(str) {
      return str ? `Asociado a ${str} parque(s)` : `Sin parques asociados`
    },
    getData() {
      this.start()
      this.form
        .index()
        .then((response) => {
          this.items = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.stop()
        })
    },
    onCreate(ref) {
      this.form = new Certified()
      this.form.setFormInstance(ref)
    },
    onUpdate(item, ref) {
      this.form = new Certified(item)
      this.form.setFormInstance(ref)
    },
    onDelete(item) {
      if (item.id) {
        this.start()
        this.form
          .destroy(item.id)
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
            this.getData()
          })
      }
    },
    onClose() {
      this.form = new Certified()
    },
    onSubmit(ref) {
      this.start()
      this.form.setFormInstance(ref)
      const request = this.form.id
        ? this.form.update(this.form.id)
        : this.form.store()
      request
        .then((response) => {
          this.$snackbar({
            message: response.data,
            color: 'success',
          })
          ref.close().then(() => {
            this.onClose()
          })
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.stop()
          this.getData()
        })
    },
    // Loading
    start() {
      this.loading = true
    },
    stop() {
      this.loading = false
    },
  },
}
</script>
