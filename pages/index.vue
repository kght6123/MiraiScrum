<template>
  <div class="p-1">
    <Breadcrumbs :items="[
        { label: projectLabel, url: '#' },
        { label: monthLabel, url: '#' },
        { label: weekLabel, url: '#' },
        { label: dayLabel, url: '#' },
      ]" class="ml-3" />
    <grid
      :data="gridProps.data"
      :columns="gridProps.columns"
      :rowHeaders="gridProps.rowHeaders"
      :columnOptions="gridProps.columnOptions"
      :options="{ usageStatistics: false }"
    ></grid>
    <calendar style="height: 800px;"
        :calendars="calendarList"
        :schedules="scheduleList"
        :view="view"
        :taskView="taskView"
        :scheduleView="scheduleView"
        :theme="theme"
        :week="week"
        :month="month"
        :timezones="timezones"
        :disableDblClick="disableDblClick"
        :isReadOnly="isReadOnly"
        :template="template"
        :useCreationPopup="useCreationPopup"
        :useDetailPopup="useDetailPopup"
        :usageStatistics="false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

// tui-grid
import 'tui-grid/dist/tui-grid.css'
import { Grid } from '@toast-ui/vue-grid'

// tui-calendar
import { Calendar } from '@toast-ui/vue-calendar';
import 'tui-calendar/dist/tui-calendar.css';

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

export default {
  components: {
    Breadcrumbs,
    grid: Grid,
    calendar: Calendar
  },
  data() {
    return {
      id: '20200614',
      projectLabel: 'MiraiScrum',
      date: new Date(),
      // TOAST UI Grid
      gridProps: {
        data: [
          // for rowData prop
          {
            name: 'Beautiful Lies',
            artist: 'Birdy'
          },
          {
            name: 'X',
            artist: 'Ed Sheeran'
          }
        ],
        columns: [
          // for columnData prop
          {
            header: 'Name',
            name: 'name'
          },
          {
            header: 'Artist',
            name: 'artist'
          }
        ]
      },
      // TOAST UI Calendar
      calendarList: [
          {
              id: '0',
              name: 'home'
          },
          {
              id: '1',
              name: 'office'
          }
      ],
      scheduleList: [
          {
              id: '1',
              calendarId: '1',
              title: 'my schedule',
              category: 'time',
              dueDateClass: '',
              start: '2018-10-18T22:30:00+09:00',
              end: '2018-10-19T02:30:00+09:00'
          },
          {
              id: '2',
              calendarId: '1',
              title: 'second schedule',
              category: 'time',
              dueDateClass: '',
              start: '2018-10-18T17:30:00+09:00',
              end: '2018-10-19T17:31:00+09:00'
          }
      ],
      view: 'day',
      taskView: false,
      scheduleView: ['time'],
      theme: {
          'month.dayname.height': '30px',
          'month.dayname.borderLeft': '1px solid #ff0000',
          'month.dayname.textAlign': 'center',
          'week.today.color': '#333',
          'week.daygridLeft.width': '100px',
          'week.timegridLeft.width': '100px'
      },
      week: {
          narrowWeekend: true,
          showTimezoneCollapseButton: true,
          timezonesCollapsed: false
      },
      month: {
          visibleWeeksCount: 6,
          startDayOfWeek: 1
      },
      timezones: [{
          timezoneOffset: 540,
          displayLabel: 'GMT+09:00',
          tooltip: 'Seoul'
      }, {
          timezoneOffset: -420,
          displayLabel: 'GMT-08:00',
          tooltip: 'Los Angeles'
      }],
      disableDblClick: true,
      isReadOnly: false,
      template: {
          milestone: function(schedule) {
              return `<span style="color:red;">${schedule.title}</span>`;
          },
          milestoneTitle: function() {
              return 'MILESTONE';
          },
      },
      useCreationPopup: true,
      useDetailPopup: false,
    }
  },
  computed: {
    ...mapGetters('services/Canban', [
      'getBacklogIds'
    ]),
    ...mapGetters('services/Backlog', [
      'getBacklogs'
    ]),
    backlogIds: {
      get() {
        return this.getBacklogIds
      },
      set(value) {
        // this.setHoge(value)
      }
    },
    backlogs: {
      get() {
        return this.getBacklogs
      }
    },
    backlogArrays: {
      get() {
        console.log(this.getBacklogs)
        return this.getBacklogs.map(backlog => Object.values(backlog))
      }
    },
    nowId: {
      get: function () {
        return this.getStringForDateFormat('YYYYMMDD', this.date)
      }
    },
    monthLabel: {
      get: function () {
        return this.getStringForDateFormat('MM月', this.date)
      }
    },
    weekLabel: {
      get: function () {
        return this.getStringForDateFormat('第WM/WD週', this.date)
      }
    },
    dayLabel: {
      get: function () {
        return this.getStringForDateFormat('DD日(DW)', this.date)
      }
    }
  },
  mounted() {
    this.$nextTick(async () => {
      
    })
  },
  methods: {
     ...mapActions('services/BacklogDetail', [
      'showDetail',
      'hideDetail'
    ]),
    ...mapActions('services/Backlog', [
      'doCreateBacklog'
    ]),
    async addBacklog() {
      await this.doCreateBacklog({
        title: '子バックログ',
        fullTitle: '<span class="font-extrabold">親バックログ</span>&nbsp;子バックログ',
        point: '1',
        progress: '新規',
        updateUser: 'kght6123',
        supervisorUser: 'kght6123',
        parentBacklogIds: [],
        childBacklogIds: [] })
    },
    goPrevDay: function () {
      // console.log(this.date)
      this.date.setTime(this.date.getTime() - 1 * 24 * 60 * 60 * 1000)
      // this.$set(this, 'date', this.date)
      this.date = new Date(this.date)
    },
    goNextDay: function () {
      // console.log(this.date)
      this.date.setTime(this.date.getTime() + 1 * 24 * 60 * 60 * 1000)
      // this.$set(this, 'date', this.date)
      this.date = new Date(this.date)
    },
    getStringForDateFormat: function (date_format_str, _date) {
      const date = new Date(_date)
      const year_str = date.getFullYear()
      const month_str = 1 + date.getMonth()
      const day_str = date.getDate()
      const hour_str = date.getHours()
      const minute_str = date.getMinutes()
      const second_str = date.getSeconds()
      const dayOfWeek = date.getDay()
      const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeek]
      let format_str = '' + date_format_str // 'YYYYMMDDhhmmss'
      date.setDate(day_str - dayOfWeek + 1)
      format_str = format_str.replace(/YYYY/g, year_str)
      format_str = format_str.replace(/MM/g, month_str)
      format_str = format_str.replace(/WM/g, date.getMonth() + 1)
      format_str = format_str.replace(/DD/g, day_str)
      format_str = format_str.replace(/WD/g, date.getDate())
      format_str = format_str.replace(/hh/g, hour_str)
      format_str = format_str.replace(/mm/g, minute_str)
      format_str = format_str.replace(/ss/g, second_str)
      format_str = format_str.replace(/DW/g, dayOfWeekStr)
      return format_str
    },
    async show () {
      // this.$modal.show('hello-world');
      await this.showDetail()
    },
    async hide () {
      // this.$modal.hide('hello-world');
      await this.hideDetail()
    },
    showDialog () {
      this.$modal.show('dialog', {
        title: 'Alert!',
        text: 'You are too awesome',
        buttons: [
          {
            title: 'Deal with it',
            handler: () => { alert('Woot!') }
          },
          {
            title: '',       // Button title
            default: true,    // Will be triggered by default if 'Enter' pressed.
            handler: () => {} // Button click handler
          },
          {
            title: 'Close'
          }
        ]
      })
    },
    showModalComponent () {
      this.$modal.show(Logo, {
        text: 'This text is passed as a property'
      }, {
        draggable: true
      })
    }
  },
  beforeDestroy() {
    
  }
}
</script>

<style scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.slide {
  @apply flex content-center justify-center w-screen h-screen;
}

</style>
