<template>
  <div>
    <swipe-list ref="list" :items="items" item-key="id">
      <template #default="{ item, index }">
        <v-list>
          <v-list-item>
            <v-list-item-icon class="hidden-sm-and-down">
              <v-icon v-text="listIcon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item[itemText]" />
              <slot name="list-content" :item="item"></slot>
            </v-list-item-content>
            <slot name="list-prepend-actions" :item="item"></slot>
            <v-list-item-action
              v-if="$refs.list && !!$refs.list.isRevealed(index)"
              class="hidden-sm-and-down"
            >
              <v-btn
                :aria-label="$t('buttons.Close')"
                icon
                @click="$refs.list && $refs.list.closeActions(index)"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action v-else class="hidden-sm-and-down">
              <v-btn
                :aria-label="$t('buttons.Reveal')"
                icon
                @click="$refs.list && $refs.list.revealRight(index)"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-list-item-action>
            <slot name="list-append-actions" :item="item"></slot>
          </v-list-item>
        </v-list>
      </template>
      <template #right="{ item }">
        <slot name="prepend-right-actions" :item="item" />
        <div v-if="showHistoryButton" class="swipeout-action info">
          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                :aria-label="$t('buttons.History')"
                icon
                dark
                v-on="on"
                @click="onHistory(item)"
              >
                <v-icon dark>mdi-history</v-icon>
              </v-btn>
            </template>
            <i18n path="buttons.History" tag="span" />
          </v-tooltip>
        </div>
        <div v-if="showUpdateButton" class="swipeout-action warning">
          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                :aria-label="$t('buttons.Update')"
                icon
                dark
                v-on="on"
                @click="onUpdate(item)"
              >
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <i18n path="buttons.Update" tag="span" />
          </v-tooltip>
        </div>
        <div v-if="showDeleteButton" class="swipeout-action red">
          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                :aria-label="$t('buttons.Delete')"
                icon
                dark
                v-on="on"
                @click="onDelete(item)"
              >
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </template>
            <i18n path="buttons.Delete" tag="span" />
          </v-tooltip>
        </div>
        <slot name="append-right-actions" :item="item" />
      </template>
      <template #empty>
        <v-card flat>
          <v-card-text>
            <v-empty-state
              :label="$t('texts.Empty')"
              :description="$t('texts.Empty')"
            />
          </v-card-text>
        </v-card>
      </template>
    </swipe-list>
    <!-- History -->
    <v-check-dialog
      ref="historyDialog"
      toolbar-color="primary"
      title="buttons.History"
      :show-btn="false"
      max-width="600"
      scrollable
    >
      <v-audits :audits="history" />
    </v-check-dialog>
  </div>
</template>

<script>
import { SwipeList } from 'vue-swipe-actions'
import 'vue-swipe-actions/dist/vue-swipe-actions.css'
export default {
  name: 'VSwiper',
  components: {
    VAudits: () => import('~/components/base/VAudits'),
    VCheckDialog: () => import('@/components/base/VCheckDialog'),
    VEmptyState: () => import('~/components/base/EmptyState'),
    SwipeList,
  },
  props: {
    itemText: {
      type: String,
      default: 'name',
    },
    listIcon: {
      type: String,
      default: 'mdi-format-list-bulleted',
    },
    items: {
      type: Array,
      default: () => [],
    },
    showHistoryButton: {
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
  },
  data: () => ({
    history: [],
  }),
  methods: {
    onUpdate(item) {
      this.$emit('update', item)
    },
    onDelete(item) {
      this.$emit('delete', item)
    },
    onHistory(item) {
      this.history = item.audit || []
      this.$refs.historyDialog.open().catch(() => {
        this.history = []
      })
    },
  },
}
</script>
