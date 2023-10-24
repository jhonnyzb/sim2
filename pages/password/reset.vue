<template>
  <v-row justify="center" align-content="center" class="mx-2">
    <v-col cols="12" md="6" sm="8" class="mx-auto">
      <v-card v-if="success" elevation="6">
        <v-card-text>
          <empty-state
            icon="mdi-check-circle-outline"
            rounded
            :description="message"
          >
            <v-btn color="primary" :to="localePath({ name: 'login' })">
              {{ `${$t('buttons.GoTo')} ${$t('buttons.Login')}` }}
            </v-btn>
          </empty-state>
        </v-card-text>
      </v-card>
      <v-slide-y-transition v-else appear>
        <validation-observer ref="reset" v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(onSubmit)">
            <v-card elevation="6">
              <v-card-text>
                <v-row class="mx-md-2">
                  <v-col cols="12" class="py-0 my-0">
                    <info-content
                      info-horizontal
                      icon="mdi-alert"
                      icon-color="warning"
                      :subtitle="$t('titles.Remember')"
                      class="mb-0"
                    >
                      <p
                        class="ml-md-9 body-1 font-weight-medium"
                        v-text="$t('texts.PasswordWarning')"
                      />
                    </info-content>
                  </v-col>
                  <v-col cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      :rules="form.validations.input_password_required"
                      vid="password"
                      :name="$t('inputs.Password')"
                    >
                      <v-text-field
                        v-model.trim="form.password"
                        name="password"
                        color="primary"
                        :label="$t('inputs.Password')"
                        prepend-icon="mdi-lock-outline"
                        :error-messages="errors"
                        clearable
                        counter
                        :maxlength="32"
                        autocomplete="off"
                        required="required"
                        :type="show ? 'text' : 'password'"
                        :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="show = !show"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      :rules="form.validations.input_password_required"
                      vid="password_confirmation"
                      :name="$t('inputs.PasswordConfirmation')"
                    >
                      <v-text-field
                        v-model.trim="form.password_confirmation"
                        name="password"
                        color="primary"
                        :label="$t('inputs.PasswordConfirmation')"
                        prepend-icon="mdi-lock-outline"
                        :error-messages="errors"
                        clearable
                        counter
                        :maxlength="32"
                        autocomplete="off"
                        required="required"
                        :type="show_confirmation ? 'text' : 'password'"
                        :append-icon="
                          show_confirmation ? 'mdi-eye-off' : 'mdi-eye'
                        "
                        @click:append="show_confirmation = !show_confirmation"
                      />
                    </validation-provider>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :disabled="loading"
                  :loading="loading"
                  outlined
                  :to="localePath({ name: 'login' })"
                >
                  {{ $t('buttons.Cancel') }}
                </v-btn>
                <v-btn
                  color="primary"
                  :disabled="loading"
                  :loading="loading"
                  type="submit"
                >
                  {{ $t('buttons.Submit') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </validation-observer>
      </v-slide-y-transition>
    </v-col>
  </v-row>
</template>

<router lang="yaml">
meta:
  title: PasswordReset
</router>

<script>
import { ResetPassword } from '@/models/services/auth/ResetPassword'

export default {
  name: 'Reset',
  nuxtI18n: {
    paths: {
      en: '/password/reset',
      es: '/contrasena/reiniciar',
    },
  },
  components: {
    InfoContent: () => import('~/components/base/InfoContent'),
    EmptyState: () => import('@/components/base/EmptyState'),
  },
  layout: 'password',
  auth: 'guest',
  data: () => ({
    show: false,
    show_confirmation: false,
    success: false,
    message: null,
    loading: false,
    form: new ResetPassword(),
  }),
  head: (vm) => ({
    title: vm.$t('titles.PasswordReset'),
  }),
  methods: {
    onSubmit() {
      this.loading = true
      this.form.email = this.$route.query.email
      this.form.token = this.$route.query.token
      this.form
        .store()
        .then((response) => {
          this.$snackbar({
            message: response.data,
            color: 'success',
          })
          this.success = true
          this.message = response.data
        })
        .catch((errors) => {
          this.$snackbar({
            show: true,
            message: errors.message,
          })
          this.$router.push(this.localePath({ name: 'login' }))
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>
