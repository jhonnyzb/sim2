<template>
  <validation-observer ref="rupiForm" v-slot="{ handleSubmit }">
    <v-form @submit.prevent="handleSubmit(onSubmit)">
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <validation-provider
            v-slot="{ errors }"
            :rules="form.validations.input_text_required"
            vid="name"
            :name="$t('parks.park.rupi').toLowerCase()"
          >
            <v-text-field
              id="name"
              v-model="form.name"
              name="name"
              :loading="loading"
              :readonly="loading"
              prepend-icon="mdi-file"
              autocomplete="off"
              clearable
              :error-messages="errors"
              :label="$t('parks.park.rupi')"
              :counter="20"
              :maxlength="20"
            />
          </validation-provider>
        </v-col>
        <v-col cols="12" md="12" sm="12" class="text-right">
          <v-btn
            :aria-label="$t('buttons.Submit')"
            type="submit"
            color="primary"
          >
            {{ $t('buttons.Submit') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </validation-observer>
</template>

<script>
import { Rupi } from '~/models/services/parks/Rupi'
export default {
  name: 'RupiForm',
  props: {
    parkId: {
      type: [String, Number],
      require: true,
      default: undefined,
    },
    formData: {
      type: Object,
      default: () => ({
        id: undefined,
        name: undefined,
      }),
    },
  },
  data: (vm) => ({
    loading: false,
    form: new Rupi(vm.parkId),
  }),
  watch: {
    formData(val) {
      if (val.id) {
        this.form = new Rupi(this.parkId, val)
      } else {
        this.form = new Rupi(this.parkId)
      }
    },
  },
  created() {
    if (this.formData.id) {
      this.form = new Rupi(this.parkId, this.formData)
    }
  },
  mounted() {
    this.form.setFormInstance(this.$refs.rupiForm)
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$nuxt.$loading.start()
      const request = this.formData.id
        ? this.form.update(this.formData.id)
        : this.form.store()
      request
        .then((response) => {
          this.$snackbar({
            message: response.data,
            color: 'success',
          })
          this.$emit('success')
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => {
          this.loading = false
          this.$nuxt.$loading.finish()
        })
    },
  },
}
</script>
