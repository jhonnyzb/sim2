<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col class="my-4" cols="12">
        <base-material-card :icon="cardIcon" :color="cardColor">
          <template #toolbar>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="card-title font-weight-light">
                {{ title }}
              </v-toolbar-title>
              <v-spacer />
              <v-time-ago
                :loading="loading"
                :prefix="$t('buttons.Updated')"
                classes="caption grey--text font-weight-light hidden-sm-and-down"
                :date-time="requestedAt"
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
                  <v-list-item v-if="showCreateButton" @click="onCreate">
                    <v-list-item-icon>
                      <v-icon>mdi-plus-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('buttons.Create') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="onRefresh">
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
          </template>
          <v-card-title>
            <v-text-field
              v-model="filter"
              type="search"
              :label="$t('buttons.Search')"
              prepend-icon="mdi-magnify"
              single-line
              hide-details
              clearable
            />
          </v-card-title>
          <v-card-text>
            <v-swiper
              :item-text="itemText"
              :list-icon="listIcon"
              :items="filterableData"
              :show-delete-button="showDeleteButton"
              :show-history-button="showViewAuditButton"
              :show-update-button="showUpdateButton"
              @update="onUpdate"
              @delete="onDelete"
            >
              <template #list-content="{ item }">
                <v-list-item-subtitle
                  v-if="!!item[itemSubText]"
                  v-text="itemSubTextFormat(item[itemSubText])"
                />
              </template>
            </v-swiper>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <slot />
    <!-- Form -->
    <v-form-dialog
      ref="dialogForm"
      :title="title"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :max-width="$vuetify.breakpoint.smAndDown ? undefined : 600"
      transition="dialog-bottom-transition"
      @click:close="onCloseForm"
    >
      <validation-observer ref="dialogFormModel" v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit(onSubmit)">
          <v-row>
            <slot name="form-inputs" />
            <!-- Submit -->
            <v-col cols="12" md="12" sm="12" class="text-right">
              <v-btn
                text
                :aria-label="$t('buttons.Close')"
                color="primary"
                :loading="loading"
                :disabled="loading"
                @click="$refs.dialogForm.close()"
              >
                {{ $t('buttons.Close') }}
              </v-btn>
              <v-btn
                :aria-label="$t(`buttons.${id ? 'Update' : 'Submit'}`)"
                :loading="loading"
                :disabled="loading"
                type="submit"
                color="primary"
              >
                {{ $t(`buttons.${id ? 'Update' : 'Submit'}`) }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </v-form-dialog>
    <!-- Delete -->
    <v-check-dialog ref="confirmDialog">
      {{ $t('confirm.delete') }}
    </v-check-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'VManagement',
  props: {
    id: {
      type: [String, Number],
      default: null,
    },
    itemText: {
      type: String,
      default: 'name',
    },
    itemSubText: {
      type: String,
      default: 'parks_count',
    },
    itemSubTextFormat: {
      type: Function,
      default: (value) => value,
    },
    requestedAt: {
      type: String,
      default: null,
    },
    listIcon: {
      type: String,
      default: 'mdi-format-list-bulleted',
    },
    cardIcon: {
      type: String,
      default: 'mdi-format-list-bulleted',
    },
    cardColor: {
      type: String,
      default: 'primary',
    },
    cardTitle: {
      type: String,
      default: 'primary',
    },
    cardTitleTrans: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showCreateButton: {
      type: Boolean,
      default: false,
    },
    showUpdateButton: {
      type: Boolean,
      default: false,
    },
    showDeleteButton: {
      type: Boolean,
      default: false,
    },
    showViewAuditButton: {
      type: Boolean,
      default: false,
    },
    items: {
      type: [Array, Object],
      default: () => [],
    },
  },
  components: {
    BaseMaterialCard: () => import('~/components/base/MaterialCard'),
    VTimeAgo: () => import('~/components/base/TimeAgo'),
    VSwiper: () => import('~/components/base/VSwiper'),
    VFormDialog: () => import('~/components/base/VFormDialog'),
    VCheckDialog: () => import('@/components/base/VCheckDialog'),
  },
  data: () => ({
    filter: '',
  }),
  computed: {
    title() {
      return this.cardTitleTrans ? this.$t(this.cardTitle) : this.cardTitle
    },
    filterableData() {
      if (!this.filter) {
        return this.items
      } else {
        return this.items.filter((l) =>
          l.name.toLowerCase().includes(this.filter.toLowerCase())
        )
      }
    },
  },
  methods: {
    onRefresh() {
      this.$emit('refresh')
    },
    onSubmit() {
      this.$emit('submit', this.$refs.dialogForm)
    },
    onCreate() {
      this.$refs.dialogForm.open().then(() => {
        this.$emit('create', this.$refs.dialogFormModel)
      })
    },
    onUpdate(item) {
      this.$refs.dialogForm.open().then(() => {
        this.$emit('update', item, this.$refs.dialogFormModel)
      })
    },
    onDelete(item) {
      this.$refs.confirmDialog.open().then(() => {
        this.$emit('delete', item)
      })
    },
    onCloseForm() {
      this.$emit('form:closed')
    },
  },
}
</script>
