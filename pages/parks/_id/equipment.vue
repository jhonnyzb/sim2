<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <material-card class="mt-12" icon="mdi-soccer-field">
          <template #toolbar>
            <v-toolbar flat color="transparent">
              <v-toolbar-title>Dotación</v-toolbar-title>
              <v-spacer />
              <v-toolbar-items>
                <v-btn
                  text
                  :to="
                    localePath({
                      name: 'parks-id-details',
                      params: { id: $route.params.id },
                    })
                  "
                >
                  <v-icon left>mdi-arrow-left</v-icon>
                  Regresar
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
          </template>
          <v-card-text>
            <h3 class="display-serif-2 my-2">Equipamiento Deportivo</h3>
            <equipment-table
              :title="$t('label.fields')"
              :park-id="$route.params.id"
              equipment-id="1"
            />
            <equipment-table
              :title="$t('label.stages')"
              :park-id="$route.params.id"
              equipment-id="3"
            />
            <h3 class="display-serif-2 my-2">Equipamiento Recreativo</h3>
            <equipment-table
              :title="$t('label.recreation')"
              :park-id="$route.params.id"
              equipment-id="4"
            />
            <h3 class="display-serif-2 my-2">Equipamiento Adicional</h3>
            <equipment-table
              :title="$t('label.others')"
              :park-id="$route.params.id"
              equipment-id="2"
            />
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from '~/components/base/MaterialCard'
import EquipmentTable from '~/components/parks/EquipmentTable'
import { Menu } from '~/models/services/parks/Menu'
import { Api } from '~/models/Api'
export default {
  name: 'equipment',
  nuxtI18n: {
    paths: {
      en: '/parks/:id/endowments',
      es: '/parques/:id/dotaciones',
    },
  },
  components: {
    EquipmentTable,
    MaterialCard,
  },
  middleware: ['permissions'],
  meta: {
    permissionsUrl: Api.END_POINTS.PARKS_PERMISSIONS(),
    title: 'parks.titles.details',
  },
  created() {
    this.drawerModel = new Menu()
  },
}
</script>
