<template>
  <v-row>
    <v-col cols="12" v-if="$refs.calendar" class="text-center hidden-md-and-up">
      {{ $refs.calendar.title }}
    </v-col>
    <v-col cols="12" md="8" class="text-center mx-auto">
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :label="$t('parks.recreation.date')"
            prepend-icon="mdi-calendar"
            readonly
            persistent-hint
            :hint="$t('buttons.go_date')"
            v-bind="attrs"
            v-on="on"
            clearable
            append-icon="mdi-magnify"
            @click:append="focus = date"
          >
          </v-text-field>
        </template>
        <v-date-picker :locale="$i18n.locale" v-model="date">
          <v-spacer></v-spacer>
          <v-btn
            :aria-label="$t('buttons.cancel')"
            text
            color="primary"
            @click="modal = false"
          >
            {{ $t('buttons.cancel') }}
          </v-btn>
          <v-btn
            aria-label="OK"
            text
            color="primary"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
    <v-col cols="12">
      <v-sheet height="64" class="mb-5">
        <v-toolbar flat>
          <v-btn outlined class="mr-4 hidden-sm-and-down" @click="setToday">
            <v-icon left>mdi-calendar-today</v-icon>
            {{ $t('parks.Calendar.Today') }}
          </v-btn>
          <v-btn icon small class="mr-4 hidden-md-and-up" @click="setToday">
            <v-icon>mdi-calendar-today</v-icon>
          </v-btn>
          <v-btn icon small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title class="hidden-sm-and-down" v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-btn icon small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn class="mx-2" outlined @click="getRecords">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn v-if="$vuetify.breakpoint.mdAndUp" outlined v-on="on">
                <span>{{ $t(typeToLabel[type]) }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
              <v-btn icon small v-else v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>
                  {{ $t('parks.Calendar.Month') }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title v-text="$t('parks.Calendar.Week')" />
              </v-list-item>
              <v-list-item @click="type = 'day'">
                <v-list-item-title v-text="$t('parks.Calendar.Day')" />
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title v-text="$t('parks.Calendar.4day')" />
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          :locale="$i18n.locale"
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        >
        </v-calendar>
        <v-menu
          v-if="$vuetify.breakpoint.mdAndUp"
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card min-width="350px">
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title
                v-if="$vuetify.breakpoint.mdAndUp"
                v-text="selectedEvent.name"
              />
              <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
              <v-btn icon @click="selectedOpen = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-list-item two-line v-if="$vuetify.breakpoint.smAndDown">
                <v-list-item-content>
                  <v-list-item-subtitle :style="stylesList">
                    {{ selectedEvent.name }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title :style="stylesList">
                    {{ $t('parks.recreation.program') }}
                  </v-list-item-title>
                  <v-list-item-subtitle :style="stylesList">
                    {{ selectedEvent.program }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title :style="stylesList">
                    {{ $t('parks.recreation.date') }}
                  </v-list-item-title>
                  <v-list-item-subtitle :style="stylesList">
                    {{ `${selectedEvent.start} - ${selectedEvent.end}` }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title :style="stylesList">
                    {{ $t('parks.recreation.activity') }}
                  </v-list-item-title>
                  <v-list-item-subtitle :style="stylesList">
                    {{ selectedEvent.activity }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title :style="stylesList">
                    {{ $t('parks.recreation.meeting') }}
                  </v-list-item-title>
                  <v-list-item-subtitle :style="stylesList">
                    {{ selectedEvent.meeting_point }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title :style="stylesList">
                    {{ $t('parks.recreation.quantity') }}
                  </v-list-item-title>
                  <v-list-item-subtitle :style="stylesList">
                    {{ selectedEvent.quantity }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title :style="stylesList">
                    {{ $t('parks.recreation.responsable') }}
                  </v-list-item-title>
                  <v-list-item-subtitle :style="stylesList">
                    {{ selectedEvent.responsable }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                :aria-label="$t('buttons.Close')"
                color="primary"
                @click="selectedOpen = false"
              >
                {{ $t('buttons.Close') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-dialog
          v-else
          v-model="selectedOpen"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card min-width="350px">
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title
                v-if="$vuetify.breakpoint.mdAndUp"
                v-text="selectedEvent.name"
              />
              <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
              <v-btn icon @click="selectedOpen = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-list-item two-line v-if="$vuetify.breakpoint.smAndDown">
                <v-list-item-content>
                  <v-list-item-subtitle :style="stylesList">
                    {{ selectedEvent.name }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title :style="stylesList">
                    {{ $t('parks.recreation.program') }}
                  </v-list-item-title>
                  <v-list-item-subtitle :style="stylesList">
                    {{ selectedEvent.program }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title :style="stylesList">
                    {{ $t('parks.recreation.date') }}
                  </v-list-item-title>
                  <v-list-item-subtitle :style="stylesList">
                    {{ `${selectedEvent.start} - ${selectedEvent.end}` }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title :style="stylesList">
                    {{ $t('parks.recreation.activity') }}
                  </v-list-item-title>
                  <v-list-item-subtitle :style="stylesList">
                    {{ selectedEvent.activity }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title :style="stylesList">
                    {{ $t('parks.recreation.meeting') }}
                  </v-list-item-title>
                  <v-list-item-subtitle :style="stylesList">
                    {{ selectedEvent.meeting_point }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title :style="stylesList">
                    {{ $t('parks.recreation.quantity') }}
                  </v-list-item-title>
                  <v-list-item-subtitle :style="stylesList">
                    {{ selectedEvent.quantity }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line v-if="!!selectedEvent.responsable">
                <v-list-item-content>
                  <v-list-item-title :style="stylesList">
                    {{ $t('parks.recreation.responsable') }}
                  </v-list-item-title>
                  <v-list-item-subtitle :style="stylesList">
                    {{ selectedEvent.responsable }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                :aria-label="$t('buttons.Close')"
                color="primary"
                @click="selectedOpen = false"
              >
                {{ $t('buttons.Close') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-sheet>
      <v-overlay absolute :value="ready">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-col>
  </v-row>
</template>

<script>
import { Park } from '~/models/services/parks/Park'

export default {
  name: 'RecreationCalendar',
  data: (vm) => ({
    today: vm.$moment().format('YYYY-MM-DD'),
    focus: vm.$moment().format('YYYY-MM-DD'),
    typeToLabel: {
      month: 'parks.Calendar.Month',
      week: 'parks.Calendar.Week',
      day: 'parks.Calendar.Day',
      '4day': 'parks.Calendar.4day',
    },
    modal: false,
    start: null,
    end: null,
    type: 'month',
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    calendar: new Park(),
    events: [],
    ready: false,
    date: null,
  }),
  mounted() {
    this.type = this.$vuetify.breakpoint.smAndDown ? 'day' : 'month'
    if (this.$route.params.id) {
      this.$refs.calendar.checkChange()
      this.getRecords()
    }
  },
  methods: {
    getRecords() {
      this.ready = true
      const start = this.start ? this.start.date : this.start
      const end = this.end ? this.end.date : this.end
      const params = {
        start_date: start,
        final_date: end,
      }
      this.calendar
        .activities(this.$route.params.id, { params })
        .then((response) => {
          this.events = response.data
        })
        .finally(() => {
          this.ready = false
        })
    },
    /* Calendar Methods */
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
      this.date = null
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = this.today
      this.date = this.today
    },
    prev() {
      this.$refs.calendar.prev()
      this.date = null
    },
    next() {
      this.$refs.calendar.next()
      this.date = null
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        const that = this
        setTimeout(() => {
          that.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start
      this.end = end
      this.date = null
      this.getRecords()
    },
  },
  watch: {
    '$vuetify.breakpoint.smAndDown'(val) {
      if (val) {
        this.type = 'day'
      }
    },
  },
  computed: {
    title() {
      const { start, end } = this
      if (!start || !end) {
        return this.$moment().locale(this.$i18n.locale).format('MMMM')
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? startMonth : endMonth

      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? startYear : endYear

      const startDay = start.day
      const endDay = end.day

      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} - ${suffixMonth} ${endDay}  ${suffixYear}`
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: 'America/Bogota',
        month: 'long',
      })
    },
    stylesList() {
      return {
        whiteSpace: 'break-spaces',
        fontSize: '0.875rem',
      }
    },
  },
}
</script>
