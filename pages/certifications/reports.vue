<template>
  <v-container id="reports" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <v-card flat>
          <v-card-title>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="card-title font-weight-light">
                Mis Solicitudes
              </v-toolbar-title>
              <v-spacer />
              <time-ago
                :loading="loading"
                :prefix="$t('buttons.Updated')"
                classes="caption grey--text font-weight-light hidden-sm-and-down"
                :date-time="requested_at"
              />
              <v-menu offset-y left>
                <template #activator="{ on: menu, attrs }">
                  <v-tooltip left>
                    <template #activator="{ on: tooltip }">
                      <v-btn
                        :aria-label="$t('buttons.MoreOptions')"
                        icon
                        v-bind="attrs"
                        v-on="{ ...menu, ...tooltip }"
                      >
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t('buttons.MoreOptions') }}</span>
                  </v-tooltip>
                </template>
                <v-list dense>
                  <v-list-item @click="getFileStatus">
                    <v-list-item-icon>
                      <v-icon>mdi-refresh</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Refresh') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-card-title>
          <v-card-subtitle v-if="files.length > 0">
            <v-alert type="info">
              Puedes seguir navegando en el Modulo, cuando tu archivo esté
              disponible para descargarse, se te notificará por correo electrónico.
              <v-icon>mdi-bell</v-icon>
            </v-alert>
          </v-card-subtitle>
          <v-card-text>
            <v-list subheader>
              <v-subheader v-if="files.length > 0">
                Una vez listo el documento da clic en el ícono
                <v-icon class="mx-1">mdi-cloud-download</v-icon>
                para descargar.
              </v-subheader>
              <v-list-item v-for="(file, i) in files" :key="i">
                <v-list-item-avatar>
                  <v-avatar :color="colors(file.status)">
                    <v-icon dark>mdi-file</v-icon>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title v-text="file.key" />
                    <v-list-item-subtitle
                      v-text="`Fecha de solicitud: ${file.created_at}`"
                    />
                    <v-list-item-subtitle
                      v-if="!!file.finished_at"
                      v-text="`Fecha de finalización ${file.finished_at}`"
                    />
                    <v-list-item-subtitle v-text="texts(file.status)" />
                  </v-list-item-content>
                </v-list-item-content>
                <v-list-item-action>
                  <v-tooltip top>
                    <template #activator="{ on }">
                      <v-btn
                        :aria-label="$t('buttons.Download')"
                        icon
                        color="primary"
                        :loading="file.status !== 'exported'"
                        v-on="on"
                        @click="onDownload(file.key)"
                      >
                        <v-icon>mdi-cloud-download</v-icon>
                      </v-btn>
                    </template>
                    <i18n path="buttons.Download" tag="span" />
                  </v-tooltip>
                </v-list-item-action>
              </v-list-item>
              <v-list-item v-if="files.length === 0">
                <v-list-item-avatar>
                  <v-icon>mdi-file</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    No tienes reportes pendientes por generar.
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <base-material-card
          class="mt-6"
          icon="mdi-account-multiple"
          title="Reportes"
        >
          <v-subheader class="mt-2">
            Puedes realizar la consulta por cualquiera de los siguientes
            criterios, dependiendo de la cantidad de datos a exportar, es
            posible que tu reporte se tarde algunos minutos. Mientras el reporte
            es generado puedes seguir navegando en el portal y una vez el
            documento esté listo, se te notificará para proceder a realizar la
            respectiva descarga.
          </v-subheader>
          <validation-observer ref="report" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(onSubmit)">
              <v-card flat color="transparent">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="4" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_text"
                        vid="solved"
                        name="soportes solucionados"
                      >
                        <v-switch
                          v-model="form.solved"
                          :loading="loading"
                          :disabled="loading"
                          :error-messages="errors"
                          value="true"
                          label="Soportes solucionados"
                        />
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" md="4" sm="12">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_text"
                        vid="unsolved"
                        name="soportes sin solucionar"
                      >
                        <v-switch
                          v-model="form.unsolved"
                          :loading="loading"
                          :disabled="loading"
                          :error-messages="errors"
                          value="true"
                          label="Soportes sin solucionar"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Start Date -->
                    <v-col v-show="userIsA(['certificates-super-admin', 'certifications-hiring'])"
                      cols="12" md="6" sm="12">
                      <v-dialog
                        ref="dialog_start"
                        v-model="start_date"
                        :return-value.sync="form.start_date"
                        persistent
                        width="290px"
                      >
                        <template #activator="{ on }">
                          <validation-provider
                            v-slot="{ errors }"
                            :rules="form.validations.input_date"
                            vid="start_date"
                            name="fecha inicial"
                          >
                            <v-text-field
                              id="start_date"
                              v-model="form.start_date"
                              name="start_date"
                              :error-messages="errors"
                              color="primary"
                              label="Fecha de inicio de los soportes"
                              clearable
                              counter
                              :maxlength="191"
                              autocomplete="off"
                              required="required"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                            />
                          </validation-provider>
                        </template>
                        <v-date-picker
                          ref="start_date_picker"
                          v-model="form.start_date"
                          locale="es"
                          :max="form.final_date"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            :aria-label="$t('buttons.Cancel')"
                            text
                            color="primary"
                            @click="start_date = false"
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
                    <v-col v-show="userIsA(['certificates-super-admin', 'certifications-hiring'])" cols="12" md="6" sm="12">
                      <v-dialog
                        ref="dialog_final"
                        v-model="final_date"
                        :return-value.sync="form.final_date"
                        persistent
                        width="290px"
                      >
                        <template #activator="{ on }">
                          <validation-provider
                            v-slot="{ errors }"
                            :rules="form.validations.input_date"
                            vid="final_date"
                            name="fecha final"
                          >
                            <v-text-field
                              id="final_date"
                              v-model="form.final_date"
                              name="final_date"
                              :error-messages="errors"
                              color="primary"
                              label="Fecha final de los soportes"
                              clearable
                              counter
                              :maxlength="191"
                              autocomplete="off"
                              required="required"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                            />
                          </validation-provider>
                        </template>
                        <v-date-picker
                          ref="final_date_picker"
                          v-model="form.final_date"
                          locale="es"
                          :min="form.start_date"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            :aria-label="$t('buttons.Cancel')"
                            text
                            color="primary"
                            @click="final_date = false"
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
                    <!-- Contract -->
                    <v-col v-show="userIsA(['certificates-super-admin', 'certifications-hiring'])" cols="12" md="6" sm="6">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number"
                        vid="contract"
                        name="número de contrato"
                      >
                        <v-text-field
                          id="contract"
                          v-model="form.contract"
                          name="contract"
                          :loading="loading"
                          :readonly="loading"
                          :error-messages="errors"
                          persistent-hint
                          hint="Ejemplo: 933"
                          color="primary"
                          label="Número de contrato"
                          clearable
                          counter
                          :maxlength="4"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-numeric"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Document -->
                    <v-col v-show="userIsA(['certificates-super-admin', 'certifications-hiring'])" cols="12" md="6" sm="6">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="form.validations.input_number"
                        vid="document"
                        name="número de documento"
                      >
                        <v-text-field
                          id="document"
                          v-model="form.document"
                          name="document"
                          :loading="loading"
                          :readonly="loading"
                          :error-messages="errors"
                          persistent-hint
                          color="primary"
                          label="Número de documento"
                          clearable
                          counter
                          :maxlength="12"
                          autocomplete="off"
                          required="required"
                          prepend-icon="mdi-numeric"
                        />
                      </validation-provider>
                    </v-col>
                    <!-- Submit -->
                    <v-col cols="12">
                      <v-btn
                        color="primary"
                        :loading="loading"
                        :disabled="loading"
                        type="submit"
                      >
                        <v-icon left dark>mdi-send</v-icon> Generar Reporte
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-form>
          </validation-observer>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FileSaver from 'file-saver';
import Base64ToBlob from "~/utils/Base64ToBlob";
import {Arrow} from "~/plugins/Arrow";
import {Permission} from "~/models/services/certifications/Permission";
import {Contract} from "~/models/services/certifications/Contract";
import {JobStatus} from "~/models/services/certifications/JobStatus";
import {Export} from "~/models/services/certifications/Export";
import {Menu} from "~/models/services/certifications/Menu";

const STATUS_QUEUED = 'queued'
const STATUS_EXECUTING = 'executing'
const STATUS_FINISHED = 'finished'
const STATUS_EXPORTED = 'exported'
const STATUS_FAILED = 'failed'
const STATUS_RETRYING = 'retrying'

export default {
  name: "Reports",
  nuxtI18n: {
    paths: {
      en: '/certifications/reports',
      es: '/certificaciones/reportes'
    }
  },
  auth: 'auth',
  components: {
    BaseMaterialCard: () => import('~/components/base/MaterialCard.vue'),
    TimeAgo: () => import('~/components/base/TimeAgo.vue')
  },
  middleware: ['permissions'],
  data: () => ({
    loading: false,
    arrow: new Arrow(window, window.document, 'primary'),
    jobs: new JobStatus(),
    files: [],
    interval: null,
    requested_at: null,
    perm: new Permission(),
    permissions: [],
    form: new Contract({
      start_date: null,
      final_date: null,
      contract: null,
      document: null,
      solved: null,
      unsolved: null,
    }),
    start_date: false,
    final_date: false,
  }),
  fetch() {
    this.getFileStatus()
    this.getPermissions()
  },
  head: (vm) => ({
    title: vm.$t('certificates.titles.reports')
  }),
  created() {
    this.drawerModel = new Menu()
  },
  mounted() {
    const that = this
    this.interval = setInterval(that.getFileStatus.bind(that), 30000)
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    onSubmit() {
      this.start()
      const params = this.form.data()
      this.form.setFormInstance(this.$refs.report)
      this.form
        .excel({ params })
        .then((response) => {
          this.$snackbar({ message: response.data, color: 'success' })
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.getFileStatus()
          this.stop()
        })
    },
    getFileStatus() {
      this.start()
      this.jobs
        .index({ params: { type: 'excel-certifications-module' } })
        .then((response) => {
          this.files = response.data
          this.requested_at = response.requested_at
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.stop()
        })
    },
    onDownload(file) {
      this.start()
      new Export(file)
        .index()
        .then((response) => {
          FileSaver.saveAs(
            new Base64ToBlob(response.data.file).blob(),
            response.data.name
          )
        })
        .then(() => {
          this.arrow.show(6000)
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.getFileStatus()
          this.stop()
        })
    },
    // Permissions
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
    colors(status) {
      switch (status) {
        case STATUS_EXECUTING:
          return 'warning'
        case STATUS_FINISHED:
          return 'lime'
        case STATUS_EXPORTED:
          return 'success'
        case STATUS_FAILED:
          return 'red'
        case STATUS_RETRYING:
          return 'deep-orange'
        case STATUS_QUEUED:
        default:
          return 'info'
      }
    },
    texts(status) {
      switch (status) {
        case STATUS_EXECUTING:
          return 'Procesando datos...'
        case STATUS_FINISHED:
          return 'Solicitud creada, en breve empezará a crear el reporte'
        case STATUS_EXPORTED:
          return 'Archivo creado y listo para descargar'
        case STATUS_FAILED:
          return 'Solicitud Fallida'
        case STATUS_RETRYING:
          return 'Reintentando crear su solicitud'
        case STATUS_QUEUED:
        default:
          return 'En cola, pendiente por crear solicitud'
      }
    },
    start() {
      this.loading = true
    },
    stop() {
      this.loading = false
    },
  },
}
</script>

<style scoped>

</style>
