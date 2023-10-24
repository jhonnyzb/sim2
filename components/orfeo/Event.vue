<template>
  <v-list two-line>
    <template v-for="(item, i) in items">
      <v-list-item :key="`item-${i}`">
        <v-list-item-icon>
          <v-icon
            v-if="item.text === 'read' && selectedEvent[item.text]"
            v-text="item.icon"
          />
          <v-icon
            v-else-if="item.text === 'read' && !selectedEvent[item.text]"
            v-text="`${item.icon}-off`"
          />
          <v-icon
            v-else-if="item.text === 'status'"
            v-text="getStatusIcon(selectedEvent[item.text])"
          />
          <v-icon v-else v-text="item.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            v-if="item.text === 'read' && selectedEvent[item.text]"
            :style="styles"
            v-text="$t('orfeo.event.read')"
          />
          <v-list-item-title
            v-else-if="item.text === 'read' && !selectedEvent[item.text]"
            :style="styles"
            v-text="$t('orfeo.event.not_read')"
          />
          <v-list-item-title
            v-else-if="item.text === 'created_at'"
            :style="styles"
            v-text="
              selectedEvent[item.text]
                ? selectedEvent[item.text].split('.').shift()
                : ''
            "
          />
          <v-list-item-title
            v-else-if="item.text === 'open_new_link'"
            :style="styles"
          >
            <v-btn
              v-if="selectedEvent[item.text]"
              color="primary"
              :href="selectedEvent[item.text]"
              text
              small
              target="_blank"
              v-text="$t(`orfeo.event.${item.text}`)"
            />
          </v-list-item-title>
          <v-list-item-title
            v-else
            :style="styles"
            v-text="selectedEvent[item.text]"
          />
          <v-list-item-subtitle
            :style="styles"
            v-text="$t(`orfeo.event.${item.text}`)"
          />
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'Event',
  props: {
    selectedEvent: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    items() {
      return [
        { icon: 'mdi-pound', text: 'id' },
        { icon: 'mdi-file', text: 'document_type' },
        { icon: 'mdi-eye', text: 'read' },
        { icon: 'mdi-clipboard-check', text: 'status' },
        { icon: 'mdi-folder-text', text: 'folder' },
        { icon: 'mdi-account', text: 'current_user_name' },
        { icon: 'mdi-domain', text: 'current_dependency_name' },
        { icon: 'mdi-calendar', text: 'created_at' },
        { icon: 'mdi-calendar', text: 'final_day' },
        { icon: 'mdi-account', text: 'addressee_full_name' },
        { icon: 'mdi-routes', text: 'address' },
        { icon: 'mdi-city', text: 'city' },
        { icon: 'mdi-map-outline', text: 'state' },
        { icon: 'mdi-map-marker', text: 'country' },
        { icon: 'mdi-paperclip', text: 'attachments_count' },
        { icon: 'mdi-folder-pound-outline', text: 'associates_count' },
        { icon: 'mdi-bullhorn', text: 'informed_count' },
        { icon: 'mdi-open-in-new', text: 'open_new_link' },
      ]
    },
    styles() {
      return this.$vuetify.breakpoint.smAndDown ? 'white-space: pre-wrap' : null
    },
  },
  methods: {
    getStatusIcon(status) {
      switch (status) {
        case 'CON IMAGEN PRINCIPAL':
          return 'mdi-file-cloud-outline'
        case 'IMPRESO':
          return 'mdi-printer'
        case 'ENVIADO':
          return 'mdi-send'
        case 'RADICADO':
        default:
          return 'mdi-clipboard-check'
      }
    },
  },
}
</script>
