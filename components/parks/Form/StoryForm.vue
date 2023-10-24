<template>
  <validation-observer ref="storyForm" v-slot="{ handleSubmit }">
    <v-form @submit.prevent="handleSubmit(onSubmit)">
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <validation-provider
            v-slot="{ errors }"
            :rules="form.validations.input_text_required"
            vid="title"
            :name="$t('parks.label.title').toLowerCase()"
          >
            <v-text-field
              id="title"
              v-model="form.title"
              name="title"
              :loading="loading"
              :readonly="loading"
              prepend-icon="mdi-dots-horizontal"
              autocomplete="off"
              clearable
              :error-messages="errors"
              :label="$t('parks.label.title')"
              :counter="191"
              :maxlength="191"
            />
          </validation-provider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <validation-provider
            v-slot="{ errors }"
            :rules="form.validations.required"
            vid="text"
            :name="$t('parks.label.text').toLowerCase()"
          >
            <v-textarea
              id="text"
              v-model="form.text"
              name="text"
              :loading="loading"
              :readonly="loading"
              prepend-icon="mdi-text"
              autocomplete="off"
              clearable
              :error-messages="errors"
              :label="$t('parks.label.text')"
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
import { Story } from '~/models/services/parks/Story'
export default {
  name: 'StoryForm',
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
    form: new Story(vm.parkId),
  }),
  watch: {
    formData(val) {
      if (val.id) {
        this.form = new Story(this.parkId, val)
      } else {
        this.form = new Story(this.parkId)
      }
    },
  },
  created() {
    if (this.formData.id) {
      this.form = new Story(this.parkId, this.formData)
    }
  },
  mounted() {
    this.form.setFormInstance(this.$refs.storyForm)
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
