<template>
  <div class="p-1">
    <Breadcrumbs :items="[
        { label: projectLabel, url: '#' },
        { label: monthLabel, url: '#' },
        { label: weekLabel, url: '#' },
        { label: dayLabel, url: '#' },
      ]" class="ml-3" />
    <!-- Gantt -->
    <GSTC :config="config" @state="onState" />
    <!-- jExcel -->
    <div class="w-full text-xs">
      <div ref="spreadsheet"></div>
      <div>
        <input type="button" value="Add new row" @click="() => spreadsheet.insertRow()" />
      </div>
      <div>
        <button @click="addBacklog">Add Backlog</button>
      </div>
    </div>
    <div ref="chart_div"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import GSTC from 'vue-gantt-schedule-timeline-calendar'
import CalendarScroll from 'gantt-schedule-timeline-calendar/dist/CalendarScroll.plugin.js'
import WeekendHighlight from "gantt-schedule-timeline-calendar/dist/WeekendHighlight.plugin.js"
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'

google.charts.load('current', {'packages': ['gantt']})

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

export default {
  components: {
    Breadcrumbs,
    GSTC
  },
  data() {
    return {
      id: '20200614',
      projectLabel: 'MiraiScrum',
      date: new Date(),
      list: [
        { name: '1-1-1 モーダルウィンドウのコンポーネントを調べる', id: 0, pointMitumori: 1 },
        { name: '1-1-2 モーダルウィンドウのコンポーネントを作る', id: 1, pointMitumori: 2 },
        { name: '1-2 見積もりポイントのアイコンをコンポーネント化する', id: 2, pointMitumori: 1 }
      ],
      list2: [
        { name: '3 見積もりポイントのアイコンを作る', id: 3, pointMitumori: 1 },
        { name: '2-2 mongo-connectorが起動しない問題を調べる', id: 4, pointMitumori: 1 }
      ],
      list3: [
        { name: '2-1 mongo-connectorのコンテナに入る方法を調べる', id: 5, pointMitumori: 1 },
        { name: '4-1 elastic-searchで日本語の全文検索をできる方法を調べる', id: 6, pointMitumori: 1 }
      ],
      // Gantt
      config: {
        height: 200,
        locale: {
          weekdays: ['日', '月', '火', '水', '木', '金', '土'],
          weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
          weekdaysMin: ['日', '月', '火', '水', '木', '金', '土'],
          months: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
          monthsShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
          weekStart: 1
        },
        // headerHeight: 30,
        list: {
          toggle: { display: false },
          rowHeight: 30,
          rows: {
            "1": {
              id: "1",
              label: "Row 1"
            },
            "2": {
              id: "2",
              label: "Row 2"
            },
            "3": {
              id: "3",
              label: "Row 3"
            },
            "4": {
              id: "4",
              label: "Row 4"
            }
          },
          columns: {
            data: {
              id: {
                id: "id",
                data: "id",
                width: 50,
                header: {
                  content: "ID"
                }
              },
              label: {
                id: "label",
                data: "label",
                width: 200,
                header: {
                  content: "Label"
                }
              }
            }
          }
        },
        chart: {
          time: { zoom: 21 },
          items: {
            "1": {
              id: "1",
              rowId: "1",
              label: "Item 1",
              style: { background: 'red', fontSize: '10px', paddingTop: '6px', marginTop: '3px' },
              time: {
                start: new Date().getTime(),
                end: new Date().getTime() + 24 * 60 * 60 * 1000
              }
            },
            "2": {
              id: "2",
              rowId: "2",
              label: "Item 2",
              style: { background: 'red', fontSize: '10px', paddingTop: '6px', marginTop: '3px' },
              time: {
                start: new Date().getTime() + 4 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 5 * 24 * 60 * 60 * 1000
              }
            },
            "3": {
              id: "3",
              rowId: "2",
              label: "Item 3",
              style: { background: 'red', fontSize: '10px', paddingTop: '6px', marginTop: '3px' },
              time: {
                start: new Date().getTime() + 6 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 7 * 24 * 60 * 60 * 1000
              }
            },
            "4": {
              id: "4",
              rowId: "3",
              label: "Item 4",
              style: { background: 'red', fontSize: '10px', paddingTop: '6px', marginTop: '3px' },
              time: {
                start: new Date().getTime() + 10 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 12 * 24 * 60 * 60 * 1000
              }
            },
            "5": {
              id: "5",
              rowId: "4",
              label: "Item 5",
              style: { background: 'red', fontSize: '10px', paddingTop: '6px', marginTop: '3px' },
              time: {
                start: new Date().getTime() + 12 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 14 * 24 * 60 * 60 * 1000
              }
            }
          }
        },
        plugins: [
          // CalendarScroll({
          //   speed: 1,
          //   hideScroll: true,
          //   onChange(time) {
          //     console.log(time);
          //   }
          // }),
          WeekendHighlight({
            weekdays: [0], // Sunday
            // className: 'your-class-for-highlighted-days'
          })
        ]
      },
      subs: [],
      // jExcel
      spreadsheet: null,
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
      // gannt
      setTimeout(() => {
        const item1 = this.config.chart.items["1"]
        item1.label = "label changed dynamically"
        item1.time.end += 2 * 24 * 60 * 60 * 1000
      }, 2000)
      // jExcel
      this.addBacklog()
      const options = {
        sheetName: 'Main',
        data: this.backlogArrays,
        // [
        //   ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
        //   ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777']
        // ],
        // minDimensions: [10, 20],
        defaultColWidth: '5em',
        tableOverflow: true,
        tableWidth: '98.5vw',
        tableHeight: '20vh',
        allowToolbar: true,
        columns: [
          { type: 'hidden', title: 'id' },
          { type: 'numeric', title: '優先度', width: '50px' },
          { type: 'dropdown', title: 'Project', width: '70px', source:[ 'MSC', 'MN1', 'MN2', 'MLT', 'MSH' ] },
           { type: 'dropdown', title: 'Loadmap', width: '70px', source:[ '7/20週' ] },
          { type: 'text', title: 'バックログ', width: '200px' },
          { type: 'hidden', title: 'fullTitle' },
          { type: 'dropdown', title: '見積P', width: '50px', source:[ '1', '2', '4', '5', '8' ] },
          { type: 'hidden', title: 'createAt' },
          { type: 'hidden', title: 'createUser' },
          { type: 'hidden', title: 'updateAt' },
          { type: 'hidden', title: 'updateUser' },
          { type: 'dropdown', title: '責任者', width: '90px', source:[ 'kght6123', '8mitsu3368', 'kgsor0318' ] },
          { type: 'hidden', title: '開始日', width: '80px', options: { format: 'YYYY/MM/DD HH24:MI', time: 1 }, },
          { type: 'calendar', title: '期限', width: '80px', options: { format: 'YYYY/MM/DD HH24:MI', time: 1 } },
          { type: 'dropdown', title: '状態', width: '60px', source:[ '新規', '進行中', 'レビュー', '却下', '完了' ] },
          { type: 'dropdown', title: '進捗率', width: '50px', source:[ '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100' ] },
          { type: 'hidden', title: 'progressAt' },
          { type: 'hidden', title: 'progressUser' },
          { type: 'hidden', title: 'parentBacklogIds' },
          { type: 'hidden', title: 'childBacklogIds' },
          // { type: 'text', title: 'Car', width: '80px' },
          // { type: 'dropdown', title: 'Make', width: '250px', source: [ 'Alfa Romeo', 'Audi', 'Bmw' ] },
          // { type: 'calendar', title: 'Available', width: '250px' },
          // { type: 'image', title: 'Photo', width: '120px' },
          // { type: 'checkbox', title: 'Stock', width: '80px' },
          // { type: 'numeric', title: 'Price', width: '100px', mask: '$ #.##,00', decimal: ',' },
          // { type: 'color', width: '100px', render: 'square' }
        ]
      }
      const sheet2 = {
        sheetName: 'kght6123',
        data: this.backlogArrays,
        // [
        //   ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
        //   ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777']
        // ],
        // minDimensions: [10, 20],
        defaultColWidth: '5em',
        tableOverflow: true,
        tableWidth: '98.5vw',
        tableHeight: '20vh',
        allowToolbar: true,
        columns: [
          { type: 'hidden', title: 'id' },
          { type: 'numeric', title: '優先度', width: '50px' },
          { type: 'dropdown', title: 'Project', width: '70px', source:[ 'MSC', 'MN1', 'MN2', 'MLT', 'MSH' ] },
           { type: 'dropdown', title: 'Loadmap', width: '70px', source:[ '7/20週' ] },
          { type: 'hidden', title: 'title' },
          { type: 'html', title: 'バックログ', width: '250px' },
          { type: 'dropdown', title: '見積P', width: '50px', source:[ '1', '2', '4', '5', '8' ] },
          { type: 'hidden', title: 'createAt' },
          { type: 'hidden', title: 'createUser' },
          { type: 'hidden', title: 'updateAt' },
          { type: 'hidden', title: 'updateUser' },
          { type: 'hidden', title: '責任者', width: '90px', source:[ 'kght6123', '8mitsu3368', 'kgsor0318' ] },
          { type: 'calendar', title: '開始日', width: '80px', options: { format: 'YYYY/MM/DD HH24:MI', time: 1 }, },
          { type: 'calendar', title: '期限', width: '80px', options: { format: 'YYYY/MM/DD HH24:MI', time: 1 } },
          { type: 'dropdown', title: '状態', width: '60px', source:[ '新規', '進行中', 'レビュー', '却下', '完了' ] },
          { type: 'dropdown', title: '進捗率', width: '50px', source:[ '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100' ] },
          { type: 'hidden', title: 'progressAt' },
          { type: 'hidden', title: 'progressUser' },
          { type: 'hidden', title: 'parentBacklogIds' },
          { type: 'hidden', title: 'childBacklogIds' },
        ]
      }
      this.spreadsheet = jexcel.tabs(this.$refs.spreadsheet, [options, sheet2])
      google.charts.setOnLoadCallback(this.drawChart)
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
    drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Task ID');
      data.addColumn('string', 'Task Name');
      data.addColumn('date', 'Start Date');
      data.addColumn('date', 'End Date');
      data.addColumn('number', 'Duration');
      data.addColumn('number', 'Percent Complete');
      data.addColumn('string', 'Dependencies');

      data.addRows([
        ['Research', 'Find sources',
          new Date(2015, 0, 1), new Date(2015, 0, 5), null,  100,  null],
        ['Write', 'Write paper',
          null, new Date(2015, 0, 9), daysToMilliseconds(3), 25, 'Research,Outline'],
        ['Cite', 'Create bibliography',
          null, new Date(2015, 0, 7), daysToMilliseconds(1), 20, 'Research'],
        ['Complete', 'Hand in paper',
          null, new Date(2015, 0, 10), daysToMilliseconds(1), 0, 'Cite,Write'],
        ['Outline', 'Outline paper',
          null, new Date(2015, 0, 6), daysToMilliseconds(1), 100, 'Research']
      ]);

      var options = {
        height: 275
      };

      var chart = new google.visualization.Gantt(this.$refs.chart_div);

      chart.draw(data, options);
    },
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
    add: function() {
      this.list.push({ name: 'Juan1 ' + this.id, id: this.id++ })
    },
    replace: function() {
      this.list = [{ name: 'Edgard1', id: this.id++ }]
    },
    add2: function() {
      this.list2.push({ name: 'Juan2 ' + this.id, id: this.id++ })
    },
    replace2: function() {
      this.list2 = [{ name: 'Edgard2', id: this.id++ }]
    },
    add3: function() {
      this.list3.push({ name: 'Juan3 ' + this.id, id: this.id++ })
    },
    replace3: function() {
      this.list3 = [{ name: 'Edgard3', id: this.id++ }]
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
    },
    onState(state) {
      this.state = state
      this.subs.push(
        state.subscribe("config.chart.items.1", item => {
          console.log("item 1 changed", item)
        })
      )
      this.subs.push(
        state.subscribe("config.list.rows.1", row => {
          console.log("row 1 changed", row)
        })
      )
    }
  },
  beforeDestroy() {
    this.subs.forEach(unsub => unsub());
  }
}
</script>

<style>
/*
.gantt-schedule-timeline-calendar__list-column-row,
.gantt-schedule-timeline-calendar__list-column-header,
.gantt-schedule-timeline-calendar,
.gantt-schedule-timeline-calendar__chart-calendar-date-content.gstc-date-small,
.gantt-schedule-timeline-calendar__chart-calendar-date-content--day,
.gantt-schedule-timeline-calendar__chart-calendar-date-content--week,
.gantt-schedule-timeline-calendar__chart-calendar-date--month {
  font-size: inherit;
}*/
</style>

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
