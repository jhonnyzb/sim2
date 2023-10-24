<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col class="my-n8" cols="12" md="12" sm="12" lg="12">
        <info-content
          info-horizontal
          icon="mdi-certificate-outline"
          icon-color="warning"
          :subtitle="$t('certificates.titles.certificates') + new Date().getFullYear()"
          text-center
        ></info-content>
      </v-col>
      <v-col cols="12" md="3" sm="6" class="my-4">
        <base-material-stats-card
          icon="mdi-calendar"
          color="success"
          :title="$t('certificates.titles.certificatesContractual')"
          :value="counters.contractual"
          :with-formatter="false"
          animated-number
          :progress="finding"
          sub-icon="mdi-clock-time-eight-outline"
          :time-ago="counters.requested_at"
        >
        </base-material-stats-card>
      </v-col>
      <v-col cols="12" md="3" sm="6" class="my-4">
        <base-material-stats-card
          icon="mdi-calendar"
          color="warning"
          :title="$t('certificates.titles.certificatesTax')"
          :value="counters.tax"
          :with-formatter="false"
          animated-number
          :progress="finding"
          sub-icon="mdi-clock-time-eight-outline"
          :time-ago="counters.requested_at"
        >
        </base-material-stats-card>
      </v-col>
      <v-col cols="12" md="3" sm="6" class="my-4">
        <base-material-stats-card
          icon="mdi-calendar"
          color="info"
          :title="$t('certificates.titles.peaceAndSaveSystems')"
          :value="counters.systems"
          :with-formatter="false"
          animated-number
          :progress="finding"
          sub-icon="mdi-clock-time-eight-outline"
          :time-ago="counters.requested_at"
        >
        </base-material-stats-card>
      </v-col>
      <v-col cols="12" md="3" sm="6" class="my-4">
        <base-material-stats-card
          icon="mdi-calendar"
          color="error"
          :title="$t('certificates.titles.peaceAndSaveWarehouse')"
          :value="counters.warehouse"
          :with-formatter="false"
          animated-number
          :progress="finding"
          sub-icon="mdi-clock-time-eight-outline"
          :time-ago="counters.requested_at"
        >
        </base-material-stats-card>
      </v-col>
      <v-col v-show="userIsA(['certificates-super-admin', 'certifications-hiring'])" cols="12" sm="6" md="6" lg="4" class="my-4">
        <base-material-card
          color="error"
          title="Certificados en trámite"
        >
          <template #toolbar>
            <v-apexchart
              type="donut"
              :options="state.chartOptions"
              :series="state.series"
            ></v-apexchart>
          </template>
          <v-divider></v-divider>
          <v-card-actions>
            <v-time-ago
              :loading="finding"
              :prefix="$t('buttons.Updated')"
              classes="caption grey--text font-weight-light hidden-sm-and-down"
              :date-time="counters.requested_at"
            />
            <v-spacer />
            <v-tooltip top>
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="error"
                  light
                  x-small
                  :to="localePath({
                    name: 'certifications-supports',
                  })"
                  v-on="on"
                >
                  {{ $t('certificates.titles.withoutSolution') }} {{ `${state.data.unprocessed}` }}
                </v-btn>
              </template>
              <span>{{ $t('buttons.View') }}</span>
            </v-tooltip>
            <v-menu>
              <template #activator="{ on: menu, attrs }">
                <v-tooltip top>
                  <template #activator="{ on: tooltip }">
                    <v-btn
                      v-bind="attrs"
                      class="mx-1"
                      color="primary"
                      light
                      icon
                      x-small
                      v-on="{ ...menu, ...tooltip }"
                    >
                     <v-icon>mdi-help-circle-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('buttons.Help') }}</span>
                </v-tooltip>
              </template>
              <v-card max-width="250">
                <v-card-title class="title">
                  <v-icon left>mdi-help-circle-outline</v-icon>
                  Certificados en trámite
                </v-card-title>
                <v-card-text class="caption">
                  Sumatoria global de los certificados que se encuentran en estado pendiente y los que ya se le dieron solución del presente año.
                </v-card-text>
              </v-card>
            </v-menu>
          </v-card-actions>
        </base-material-card>
      </v-col>
      <v-col v-show="userIsA(['certificates-super-admin', 'certifications-hiring'])" cols="12" sm="6" md="6" lg="8" class="my-4">
        <base-material-card
          color="#edf2fb"
        >
          <template #heading>
            <v-apexchart
              ref="dashMonth"
              type="line"
              class="black--text font-weight-light"
              :options="dashMonth.chartOptions"
              :series="dashMonth.series"
            />
          </template>
          <v-divider></v-divider>
          <v-card-actions>
            <v-time-ago
              :loading="finding"
              :prefix="$t('buttons.Updated')"
              classes="caption grey--text font-weight-light hidden-sm-and-down"
              :date-time="dashMonth.data.requested_at"
            />
            <v-spacer />
            <v-menu>
              <template #activator="{ on: menu, attrs }">
                <v-tooltip top>
                  <template #activator="{ on: tooltip }">
                    <v-btn
                      v-bind="attrs"
                      class="mx-1"
                      color="primary"
                      light
                      icon
                      x-small
                      v-on="{ ...menu, ...tooltip }"
                    >
                      <v-icon>mdi-help-circle-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('buttons.Help') }}</span>
                </v-tooltip>
              </template>
              <v-card max-width="250">
                <v-card-title class="title">
                  <v-icon left>mdi-help-circle-outline</v-icon>
                  Soportes Mensuales
                </v-card-title>
                <v-card-text class="caption">
                  Sumatoria de la cantidad de soportes acumulados en el mes del presente año.
                </v-card-text>
              </v-card>
            </v-menu>
          </v-card-actions>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {Permission} from "~/models/services/certifications/Permission";
import {Menu} from "~/models/services/certifications/Menu";
import {Certifications} from "~/models/services/certifications/Certifications";

export default {
  name: 'Certifications',
  nuxtI18n: {
    paths: {
      en: '/certifications',
      es: '/certificaciones'
    }
  },
  components: {
    InfoContent: () => import('@/components/base/InfoContent'),
    BaseMaterialStatsCard: () => import('@/components/base/MaterialStatsCard'),
    BaseMaterialCard: () => import('@/components/base/MaterialCard'),
    VTimeAgo: () => import('@/components/base/TimeAgo')
  },
  auth: 'auth',
  middleware: ['permissions'],
  meta: {
    title: 'certificates.titles.dashboard'
  },
  data: () => ({
    finding: false,
    perm: new Permission(),
    permissions: [],
    certifications: new Certifications(),
    counters: {
      contractual: 0,
      tax: 0,
      systems: 0,
      warehouse: 0,
      requested_at: null
    },
    state: {
      data: {
        data: {},
      },
      series: [],
      chartOptions: {
        chart: {
          type: 'donut',
        },
        colors: ['#F44336', '#00e195'],
        labels: ['POR TRAMITAR', 'SOLUCIONADO'],
        legend: {
          labels: {
            colors: [], // necessary for change text color in dark mode
            useSeriesColors: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            donut: {
              expandOnClick: false,
              labels: {
                show: true,
                name: {
                  show: true,
                  color: [],
                  fontSize: '22px',
                  fontFamily: 'Rubik',
                  offsetY: -10
                },
                value: {
                  show: true,
                  color: ['#F44336', '#00e195'],
                  fontSize: '14px',
                  fontWeight: 600,
                  offsetY: 2,
                },
                total: {
                  show: true,
                  color: ['#F44336', '#00e195'],
                  label: 'TOTAL',
                  fontSize: '14px',
                  fontWeight: 600,
                }
              },
            }
          }
        },
      }
    },
    dashMonth: {
      data: {
        data: {},
      },
      series: [{
        name: 'Cantidad',
        data: []
      }],
      chartOptions: {
        chart: {
          type: 'line',
          zoom: {
            enabled: false,
          },
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: true,
            export: {
              svg: {
                filename: 'Soportes Mensuales',
              },
              png: {
                filename: 'Soportes Mensuales',
              },
              csv: {
                filename: 'Soportes Mensuales',
                headerCategory: 'MES',
                headerValue: 'TOTAL',
              },
            },
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: "REGISTRO DE SOPORTES MENSUALES",
          align: "center"
        },
        labels: {
          useSeriesColors: true,
          position: 'top',
          floating: true,
        },
        xaxis: {
          categories: [],
        },
        tooltip: {
          enabled: true,
          shared: true,
          theme: 'light'
        },
        grid: {
          borderColor: '#d0cccc',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        legend: {
          show: true,
        },
      },
    },
  }),
  fetch() {
    this.getPermissions()
    this.getCounters()
    this.getStats()
  },
  head: (vm) => ({
    title: vm.$t('certificates.titles.dashboard'),
  }),
  created() {
    this.drawerModel = new Menu()
  },
  methods: {
    getCounters() {
      this.start()
      this.certifications
        .counters()
        .then((response) => {
          this.counters = response.data
          this.counters.requested_at = response.requested_at
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    getStats() {
      this.start()
      this.certifications
        .stats()
        .then((response) => {
          this.state.data = response.data
          this.state.series = [
            response.data.unprocessed,
            response.data.processed,
          ]
          this.dashMonth.data = response.data
          this.dashMonth.series = [
            { data: response.data.totals }
          ]
          if (this.$refs.dashMonth) {
            this.$refs.dashMonth.updateOptions({
              xaxis: {
                ...this.dashMonth.chartOptions.xaxis,
                categories: response.data.periods
              }
            })
          } else {
            this.dashMonth.chartOptions = {
              ...this.dashMonth.chartOptions,
              xaxis: {
                ...this.dashMonth.chartOptions.xaxis,
                categories: response.data.periods
              }
            }
          }
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => this.stop())
    },
    getPermissions() {
      this.perm
        .index()
        .then((response) => {
          this.permissions = response.data
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
    },
    userIsA(permission) {
      if (permission && typeof permission === 'string') {
        const admin = this.permissions.find(
          (p) => p.name === 'certifications-super-admin'
        )
        const can = this.permissions.find((p) => p.name === permission)
        return (can && can.can) || (admin && admin.can)
      }
      if (permission && Array.isArray(permission)) {
        permission.push('certifications-super-admin')
        const flag = this.permissions.map((perm) => {
          return permission.includes(perm.name) && perm.can
        })
        return flag.includes(true)
      }
      return false
    },
    start() {
      this.finding = true
    },
    stop(){
      this.finding = false
    }
  }
}
</script>

<style scoped>

</style>
