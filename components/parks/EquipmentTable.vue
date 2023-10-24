<template>
  <v-skeleton-loader :loading="finding" type="table">
    <v-data-table
      :headers="headersTable"
      :items="items"
      :options.sync="pagination"
      :loading="finding"
      :items-per-page.sync="itemsPerPage"
      :server-items-length="total"
      show-expand
      single-expand
      class="my-4"
    >
      <template v-if="title" #top>
        <v-toolbar flat>
          <v-toolbar-title v-text="title" />
          <v-spacer />
          <v-tooltip top>
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                :aria-label="$t('buttons.Refresh')"
                class="mx-1"
                color="success"
                icon
                @click="getRecords"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('buttons.Refresh') }}</span>
          </v-tooltip>
        </v-toolbar>
      </template>
      <template #[`item.economic_use`]="{ item }">
        <v-btn
          v-if="item.economic_use && item.economic_use.toUpperCase() === 'SI'"
          :aria-label="$t('parks.endowment.economic_use')"
          outlined
          color="primary"
          rounded
          target="_blank"
          :href="reserve_target.PARKS_RESERVATIONS(item.park_id, item.id)"
        >
          <v-icon left size="44">$vuetify.icons.pse</v-icon>
          {{ item.economic_use }}
        </v-btn>
        <span v-else>{{ item.economic_use }}</span>
      </template>
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <template v-for="(expanded_item, key) in headers_expand">
            <v-row v-if="item[expanded_item.value]" :key="`expanded-${key}`">
              <v-col
                v-if="expanded_item.value !== 'image'"
                cols="12"
                sm="12"
                md="6"
              >
                <div class="font-weight-bold">{{ expanded_item.text }}</div>
              </v-col>
              <v-col
                v-if="expanded_item.value !== 'image'"
                cols="12"
                sm="12"
                md="6"
              >
                {{ item[expanded_item.value] }}
              </v-col>
              <v-col
                v-else
                cols="12"
                align-self="center"
                class="text-center justify-center mx-auto"
                sm="12"
                md="12"
              >
                <v-col cols="12" md="12" class="mx-auto">
                  <v-img
                    v-if="showImage"
                    :max-width="$vuetify.breakpoint.mdAndUp ? '400' : '180'"
                    aspect-ratio="16/9"
                    class="text-center justify-center align-center"
                    :lazy-src="item[expanded_item.value]"
                    :src="item[expanded_item.value]"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="12" class="mx-auto text-center">
                  <v-btn
                    :aria-label="`${$t('buttons.ViewImage')}`"
                    :x-small="$vuetify.breakpoint.smAndDown"
                    text
                    @click="reloadImage"
                  >
                    <v-icon left>mdi-refresh</v-icon>
                    {{ $t('buttons.ViewImage') }}
                  </v-btn>
                  <v-btn
                    :aria-label="$t('buttons.OpenInNewWindow')"
                    :x-small="$vuetify.breakpoint.smAndDown"
                    text
                    :href="item[expanded_item.value]"
                    target="_blank"
                  >
                    <v-icon v-if="$vuetify.breakpoint.mdAndUp" left>
                      mdi-image-outline
                    </v-icon>
                    {{ `${$t('buttons.OpenInNewWindow')}` }}
                  </v-btn>
                </v-col>
              </v-col>
            </v-row>
          </template>
        </td>
      </template>
    </v-data-table>
  </v-skeleton-loader>
</template>

<script>
import { Api } from '@/models/Api'
import { Park } from '~/models/services/parks/Park'
export default {
  name: 'EquipmentTable',
  props: {
    title: {
      type: [Number, String],
      default: undefined,
    },
    parkId: {
      type: [Number, String],
      required: true,
    },
    equipmentId: {
      type: [Number, String],
      required: true,
    },
  },
  data: () => ({
    items: [],
    total: 0,
    pagination: {},
    itemsPerPage: 10,
    model: new Park(),
    finding: false,
    reserve_target: Api.END_POINTS,
    showImage: true,
  }),
  fetch() {
    this.getRecords()
  },
  computed: {
    headersTable() {
      return [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: this.$t('parks.endowment.endowment'),
          align: 'start',
          sortable: false,
          value: 'endowment',
        },
        {
          text: this.$t('parks.endowment.status'),
          align: 'start',
          sortable: false,
          value: 'status',
        },
        {
          text: this.$t('parks.endowment.material'),
          align: 'start',
          sortable: false,
          value: 'material',
        },
        {
          text: this.$t('parks.endowment.dressing_room'),
          align: 'start',
          sortable: false,
          value: 'dressing_room',
        },
        {
          text: this.$t('parks.endowment.illumination'),
          align: 'start',
          sortable: false,
          value: 'illumination',
        },
        {
          text: this.$t('parks.endowment.economic_use'),
          align: 'start',
          sortable: false,
          value: 'economic_use',
        },
        {
          text: this.$t('parks.endowment.area'),
          align: 'start',
          sortable: false,
          value: 'area',
        },
        {
          text: this.$t('parks.endowment.floor_material'),
          align: 'start',
          sortable: false,
          value: 'floor_material',
        },
        {
          text: this.$t('parks.endowment.enclosure'),
          align: 'start',
          sortable: false,
          value: 'enclosure',
        },
      ]
    },
    headers_expand() {
      return [
        {
          text: this.$t('parks.endowment.light'),
          align: 'start',
          sortable: false,
          value: 'light',
        },
        {
          text: this.$t('parks.endowment.water'),
          align: 'start',
          sortable: true,
          value: 'water',
        },
        {
          text: this.$t('parks.endowment.gas'),
          align: 'start',
          sortable: true,
          value: 'gas',
        },
        {
          text: this.$t('parks.endowment.description'),
          align: 'start',
          sortable: true,
          value: 'description',
        },
        {
          text: this.$t('parks.endowment.image'),
          align: 'start',
          sortable: true,
          value: 'image',
        },
      ]
    },
  },
  watch: {
    'pagination.page'(newVal, oldVal) {
      this.getRecords()
    },
    itemsPerPage(newVal, oldVal) {
      this.getRecords()
    },
  },
  methods: {
    getRecords() {
      this.finding = true
      const params = {
        page: this.pagination.page,
        per_page: this.itemsPerPage,
      }
      this.model
        .equipment(this.parkId, this.equipmentId, { params })
        .then((response) => {
          this.items = response.data
          this.total = response.meta.total
        })
        .finally(() => {
          this.finding = false
        })
    },
    reloadImage() {
      this.showImage = false
      this.$nextTick(function () {
        this.showImage = true
      })
    },
  },
}
</script>
