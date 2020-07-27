<template>
  <div class="p-1">
    <Breadcrumbs :items="[
        { label: projectLabel, url: '#' },
        { label: monthLabel, url: '#' },
        { label: weekLabel, url: '#' },
        { label: dayLabel, url: '#' },
      ]" class="ml-3" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

export default {
  components: {
    Breadcrumbs
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
