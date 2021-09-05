<template>
  <div>
    <v-sheet
      tile
      height="54"
      class="d-flex"
    >
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="type"
      ></v-select>
      <v-select
        v-model="mode"
        :items="modes"
        dense
        outlined
        hide-details
        label="event-overlap-mode"
        class="ma-2"
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        dense
        outlined
        hide-details
        label="weekdays"
        class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
     <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
export default {
    data: () => ({
      type: 'month',
      types: ['month', 'week', 'day'],
      mode: 'column',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      selectedOpen: false,
      selectedElement: null,
      selectedEvent: {},
      activityItem: [],
    }),
    mounted() {
      this.axios.get(process.env.VUE_APP_API_PATH + '/api/activity/ActivityApply', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          console.log('huihihihihih', response.data)
          this.activityItem = response.data.data
          const events = []

          for (let i = 0; i < this.activityItem.length; i++) {
            let activityBasic = this.activityItem[i]['activityBasics']
            let startD = new Date(activityBasic['apply_sdate'])
            let endD = new Date(activityBasic['apply_edate'])

            events.push({
              name: activityBasic['theme'],
              start: startD.getTime(),
              end: endD.getTime(),
              color: 'green lighten-1',
              timed: true,
            })
          }

          this.events = events
        }).catch((err) => {
          console.log('Vuex setUser ERR', err)
        })
    },
    methods: {
      getEvents ({ start, end }) {
        console.log(start, end)
        const events = []

        for (let i = 0; i < this.activityItem.length; i++) {
          let activityBasic = this.activityItem[i]['activityBasics']
          let startD = new Date(activityBasic['apply_sdate'])
          let endD = new Date(activityBasic['apply_edate'])

          events.push({
            name: activityBasic['theme'],
            start: startD.getTime(),
            end: endD.getTime(),
            color: 'green lighten-1',
            timed: true,
          })
        }

        this.events = events
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      showEvent ({ nativeEvent, event }) {
        console.log(nativeEvent, event)
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
    },
}
</script>