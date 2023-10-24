<template>
  <validation-observer ref="storyForm" v-slot="{ handleSubmit }">
    <v-form @submit.prevent="handleSubmit(onSubmit)">
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <validation-provider
            v-slot="{ errors }"
            :rules="form.validations.text_required"
            vid="paragraph_1"
            :name="$t('parks.label.paragraph_1').toLowerCase()"
          >
            <v-textarea
              id="paragraph_1"
              v-model="form.paragraph_1"
              name="paragraph_1"
              :loading="loading"
              :readonly="loading"
              prepend-icon="mdi-dots-horizontal"
              autocomplete="off"
              clearable
              :error-messages="errors"
              :label="$t('parks.label.paragraph_1')"
              :counter="2500"
              :maxlength="2500"
            />
          </validation-provider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <validation-provider
            v-slot="{ errors }"
            :rules="form.validations.text"
            vid="paragraph_2"
            :name="$t('parks.label.paragraph_2').toLowerCase()"
          >
            <v-textarea
              id="paragraph_2"
              v-model="form.paragraph_2"
              name="paragraph_2"
              :loading="loading"
              :readonly="loading"
              prepend-icon="mdi-dots-horizontal"
              autocomplete="off"
              clearable
              :error-messages="errors"
              :label="$t('parks.label.paragraph_2')"
              :counter="2500"
              :maxlength="2500"
            />
          </validation-provider>
        </v-col>
        <v-col v-for="n in 6" cols="12" sm="12" md="12" :key="n">
          <validation-provider
            v-slot="{ errors }"
            :rules="form.validations.input_image"
            :vid="`image_${n}`"
            :name="`${$t('parks.label.image').toLowerCase()} ${n}`"
          >
            <v-file-input
              :id="`image_${n}`"
              v-model="form[`image_${n}`]"
              :name="`image_${n}`"
              :loading="loading"
              clearable
              :error-messages="errors"
              :label="`${$t('parks.label.image')} ${n}`"
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
import { Origin } from '~/models/services/parks/Origin'
export default {
  name: 'OriginForm',
  props: {
    parkId: {
      type: [String, Number],
      require: true,
      default: undefined,
    },
    formData: {
      type: Object,
      default: () => ({
        park_id: null,
        paragraph_1: null,
        paragraph_2: null,
        image_1: null,
        image_2: null,
        image_3: null,
        image_4: null,
        image_5: null,
        image_6: null,
      }),
    },
  },
  data: (vm) => ({
    loading: false,
    form: new Origin(vm.parkId),
  }),
  watch: {
    formData(val) {
      if (val.id) {
        this.form = new Origin(this.parkId, {
          ...val,
          image_1: null,
          image_2: null,
          image_3: null,
          image_4: null,
          image_5: null,
          image_6: null,
        })
      } else {
        this.form = new Origin(this.parkId, {
          ...this.form.data(),
          park_id: this.parkId,
        })
      }
    },
  },
  created() {
    if (this.formData.id) {
      this.form = new Origin(this.parkId, {
        ...this.formData,
        park_id: this.parkId,
        image_1: null,
        image_2: null,
        image_3: null,
        image_4: null,
        image_5: null,
        image_6: null,
      })
    }
  },
  mounted() {
    this.form.setFormInstance(this.$refs.storyForm)
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$nuxt.$loading.start()
      this.form.setFormInstance(this.$refs.storyForm)
      const request = this.formData.id
        ? this.form.updateWithFiles(this.formData.id)
        : this.form.storeWithFiles()
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
