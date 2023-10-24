<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col class="my-4" cols="12">
        <base-material-card
          v-if="userHasAbilities"
          icon="mdi-pine-tree"
          color="success"
          :title="$t('parks.titles.edit')"
        >
          <template #toolbar>
            <v-toolbar dense flat color="transparent">
              <v-spacer />
              <v-tooltip left>
                <template #activator="{ on }">
                  <v-btn
                    icon
                    :disabled="loading"
                    :loading="loading"
                    color="red"
                    v-on="on"
                    @click="$router.back()"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </template>
                <i18n path="buttons.Cancel" />
              </v-tooltip>
            </v-toolbar>
          </template>
          <v-alert v-if="!!errors.errors" type="error" dismissible>
            {{ errors.message }}
            <v-divider class="my-4" />
            <ul v-for="(k, i) in errorsKeys" :key="i">
              <li v-for="(val, j) in errors.errors[k]" :key="`i-${j}`">
                {{ val }}
              </li>
            </ul>
          </v-alert>
          <v-park-form
            :form-data="park"
            @success="onSuccess"
            @error="onErrors"
          />
        </base-material-card>
        <v-card v-if="!userHasAbilities && !loading" flat>
          <v-card-text>
            <v-empty-state icon="mdi-alert" :label="$t('parks.errors.update')">
              <v-btn
                class="mt-2"
                color="primary"
                :to="localePath({ name: 'parks-finder' })"
              >
                {{ $t('buttons.Error') }}
              </v-btn>
            </v-empty-state>
          </v-card-text>
        </v-card>
        <v-card v-if="loading" flat>
          <v-card-text class="text-center">
            <v-empty-state
              icon="mdi-progress-clock"
              :label="$t('buttons.Loading')"
            >
              <v-progress-linear
                color="primary"
                indeterminate
                rounded
                height="20"
              />
            </v-empty-state>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<router lang="yaml">
meta:
  title: parks.titles.edit
</router>

<script>
import { Park } from '~/models/services/parks/Park'
import { Api } from '~/models/Api'
import { Menu } from '~/models/services/parks/Menu'
import AbilityService from '~/models/services/parks/AbilityService'

export default {
  name: 'EditParks',
  nuxtI18n: {
    paths: {
      en: '/parks/:id/edit',
      es: '/parques/:id/editar',
    },
  },
  auth: 'auth',
  components: {
    BaseMaterialCard: () => import('@/components/base/MaterialCard'),
    VParkForm: () => import('@/components/parks/Form/ParkForm'),
    VEmptyState: () => import('@/components/base/EmptyState'),
  },
  middleware: ['permissions'],
  head: (vm) => ({
    title: vm.$t('parks.titles.edit'),
  }),
  meta: {
    permissionsUrl: Api.END_POINTS.PARKS_PERMISSIONS(),
    title: 'parks.titles.edit',
    permissions(bouncer, to, from) {
      const service = new AbilityService()
      const manage = service.manage(service.models.PARK)
      const update = service.update(service.models.PARK)
      return (
        bouncer.canAny([manage, update]) ||
        bouncer.isA(service.roles.ROLE_ASSIGNED)
      )
    },
  },
  created() {
    this.drawerModel = new Menu()
  },
  data: () => ({
    loading: false,
    errors: {},
    form: new Park(),
    park: {},
    show: false,
  }),
  fetch() {
    this.getData()
  },
  computed: {
    errorsKeys() {
      return this.errors.errors ? Object.keys(this.errors.errors) : []
    },
    userHasAbilities() {
      const abilities = this.ability_service.manageCustomAbilities(
        ['manage', 'update'],
        this.ability_service.models.PARK,
        this.bouncer.isA(this.ability_service.roles.ROLE_ADMIN)
          ? null
          : this.park
      )
      return this.bouncer.canAny(abilities)
    },
  },
  watch: {
    userHasAbilities(val) {
      if (val) {
        this.show = true
      }
    },
  },
  methods: {
    getData() {
      this.loading = true
      this.form
        .show(this.$route.params.id)
        .then((response) => {
          this.park = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.loading = false
        })
    },
    onErrors(errors) {
      this.errors = errors
    },
    onSuccess(code) {
      this.loading = true
      this.$router.push(
        this.localePath({
          name: 'parks-id-details',
          params: { id: code },
        })
      )
    },
  },
  beforeDestroy() {
    this.loading = true
  },
}
</script>
