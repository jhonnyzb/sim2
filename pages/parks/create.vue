<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col class="my-4" cols="12">
        <base-material-card
          icon="mdi-pine-tree"
          color="success"
          :title="$t('parks.titles.create')"
        >
          <v-card-text>
            <v-alert v-if="!!errors.errors" type="error" dismissible>
              {{ errors.message }}
              <v-divider class="my-4" />
              <ul v-for="(k, i) in errorsKeys" :key="i">
                <li v-for="(val, j) in errors.errors[k]" :key="`i-${j}`">
                  {{ val }}
                </li>
              </ul>
            </v-alert>
            <v-park-form @error="onErrors" @success="onSuccess" />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<router lang="yaml">
meta:
  title: parks.titles.create
</router>

<script>
import { Api } from '~/models/Api'
import { Menu } from '~/models/services/parks/Menu'
import AbilityService from '~/models/services/parks/AbilityService'

export default {
  name: 'CreateParks',
  nuxtI18n: {
    paths: {
      en: '/parks/create-park',
      es: '/parques/crear-parque',
    },
  },
  components: {
    BaseMaterialCard: () => import('@/components/base/MaterialCard'),
    VParkForm: () => import('@/components/parks/Form/ParkForm'),
  },
  auth: 'auth',
  middleware: ['permissions'],
  head: (vm) => ({
    title: vm.$t('parks.titles.create'),
  }),
  meta: {
    permissionsUrl: Api.END_POINTS.PARKS_PERMISSIONS(),
    title: 'parks.titles.create',
    permissions(bouncer, to, from) {
      const service = new AbilityService()
      const abilities = service.manageCustomAbilities(
        ['manage', 'create'],
        service.models.PARK
      )
      return bouncer.canAny(abilities)
    },
  },
  created() {
    this.drawerModel = new Menu()
  },
  data: () => ({
    errors: {},
  }),
  computed: {
    errorsKeys() {
      return this.errors.errors ? Object.keys(this.errors.errors) : []
    },
  },
  methods: {
    onErrors(errors) {
      this.errors = errors
    },
    onSuccess(code) {
      this.$router.push(
        this.localePath({
          name: 'parks-id-details',
          params: { id: code },
        })
      )
    },
  },
}
</script>
