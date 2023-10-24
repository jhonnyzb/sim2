<template>
  <div>
    <v-expansion-panels v-if="!!history.length">
      <v-expansion-panel v-for="(audit, i) in history" :key="i">
        <v-expansion-panel-header>
          <template #default>
            {{ audit.type_trans }}
            <v-spacer />
            <v-time-ago
              classes="caption"
              :prefix="audit.event"
              :date-time="audit.created_at"
            />
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card flat color="transparent">
            <v-card-title>
              <v-list dense>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-avatar>
                      <v-icon>mdi-account</v-icon>
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="audit.user" />
                    <v-list-item-subtitle v-text="audit.ip" />
                    <v-list-item-subtitle>
                      <v-time-ago
                        :prefix="audit.event"
                        :date-time="audit.created_at"
                      />
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-chip
                        color="primary"
                        class="overline mb-3"
                        style="white-space: break-spaces"
                        small
                        v-text="audit.tags"
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-title>
            <v-card-text>
              <i18n class="display-1" tag="h3" path="form.new_values" />
              <v-json-pretty :data="audit.new_values" />
            </v-card-text>
            <v-divider />
            <v-card-text>
              <i18n class="display-1" tag="h3" path="form.old_values" />
              <v-json-pretty :data="audit.old_values" />
            </v-card-text>
            <v-card-actions class="text-center">
              <v-user-agent :user-agent="audit.user_agent" />
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-empty-state v-else icon="mdi-history" :label="$t('label.no_data')" />
  </div>
</template>

<script>
export default {
  name: 'VAudits',
  props: {
    audits: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    VTimeAgo: () => import('~/components/base/TimeAgo'),
    VEmptyState: () => import('@/components/base/EmptyState'),
    VUserAgent: () => import('@/components/base/VUserAgent'),
  },
  created() {
    this.history = this.audits || []
  },
  data: () => ({
    history: [],
  }),
  watch: {
    audits(val) {
      this.history = val || []
    },
  },
}
</script>
