<template>
  <div>
    <div class="grid items-center p-2" style="grid-template-rows: repeat(3, auto); grid-template-columns: repeat(3, auto); justify-items: center;">
      <div></div>
      <div><font-awesome-icon :icon="['fas', 'angle-up']" /></div>
      <div></div>
      <div @click="goPrevDay"><font-awesome-icon :icon="['fas', 'angle-left']" /></div>
      <div class="p-2">
        <Breadcrumbs :items="[
            { label: projectLabel, url: '#' },
            { label: monthLabel, url: '#' },
            { label: weekLabel, url: '#' },
            { label: dayLabel, url: '#' },
          ]" class="ml-3" />
        <div class="board">
          <draggable
            id="first"
            data-source="juju"
            :list="list"
            draggable=".card"
            group="a"
            class="card-group bg-blue-300"
          >
            <div
              v-for="element in list"
              :key="element.name"
              class="card"
              @click="show"
            >
              <div>{{ element.name }}</div>
              <!-- <div>完了の定義</div> -->
              <!--div>細分化タスク１</div>
              <div>細分化タスク２</div>
              <div>細分化タスク３</div-->
              <div class="icon">{{ element.pointMitumori }}</div>
            </div>
            <div slot="header" class="card-group-header">
              <h3 class="title">TODO</h3>
              <div class="icon" @click="add">➕</div>
            </div>
          </draggable>
          <draggable
            :list="list2"
            draggable=".card"
            group="a"
            class="card-group bg-indigo-300"
          >
            <div
              v-for="element in list2"
              :key="element.name"
              class="card"
              @click="showModalComponent"
            >
              <div>{{ element.name }}</div>
              <!-- <div>完了の定義</div> -->
              <!--div>細分化タスク１</div>
              <div>細分化タスク２</div>
              <div>細分化タスク３</div-->
              <div class="icon">{{ element.pointMitumori }}</div>
            </div>
            <div slot="header" class="card-group-header">
              <h3 class="title">DOING</h3>
              <div class="icon" @click="add2">➕</div>
            </div>
          </draggable>
          <draggable
            :list="list3"
            draggable=".card"
            group="a"
            class="card-group bg-gray-400"
          >
            <div
              v-for="element in list3"
              :key="element.name"
              class="card"
            >
              <div>{{ element.name }}</div>
              <!-- <div>完了の定義</div> -->
              <!--div>細分化タスク１</div>
              <div>細分化タスク２</div>
              <div>細分化タスク３</div-->
              <div class="icon">{{ element.pointMitumori }}</div>
            </div>
            <div slot="header" class="card-group-header">
              <h3 class="title">DONE</h3>
              <div class="icon" @click="add3">➕</div>
            </div>
          </draggable>
        </div>
      </div>
      <div @click="goNextDay"><font-awesome-icon :icon="['fas', 'angle-right']" /></div>
      <div></div>
      <div><font-awesome-icon :icon="['fas', 'angle-down']" /></div>
      <div></div>
    </div>
    <div>
      <!--
      <Balloons class="mt-2" :items="[
      { id: 1, name: 'A', message: '成果物と目的の差分は〜だよ！', my: true },
      { id: 2, name: 'A', message: '差分の理由は〜だよ！', my: true },
      { id: 3, name: 'B', message: 'フィードバックは〜だよ！！', my: false },
      { id: 4, name: 'A', message: '感謝！次からは気をつけるよ！', my: true },
      ]" />
      -->
      <BacklogDetail></BacklogDetail>
      <!--
      <nuxt-link to="/works">投稿＆全文検索のサンプルへ飛ぶ</nuxt-link>
      <nuxt-link to="/reports">個別ページのサンプルへ飛ぶ</nuxt-link>
      -->
    </div>
    <!-- Grid -->
    <grid :cols="cols" :rows="rows" :theme="theme"></grid>
    <!-- Gantt -->
    <GSTC :config="config" @state="onState" />
    <!-- Marpit -->
    <div v-for="(htm, index) in html" :key="index" v-html="htm" class="slide"></div>
    <!-- jExcel -->
    <div>
      <div ref="spreadsheet"></div>
      <div><input type="button" value="Add new row" @click="() => spreadsheet.insertRow()" /></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import Balloons from '~/components/Balloons.vue'
import BacklogDetail from '~/components/BacklogDetail.vue'
import Grid from 'gridjs-vue'
import GSTC from 'vue-gantt-schedule-timeline-calendar'
import Marpit from '@marp-team/marpit'
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'

// 1. Create instance (with options if you want)
const marpit = new Marpit()

// 3. Render markdown
const markdown = `

# Hello, Marpit!

Marpit is the skinny framework for creating slide deck from Markdown.

---

## Ready to convert into PDF!

You can convert into PDF slide deck through Chrome.

`

export default {
  components: {
    draggable,
    Breadcrumbs,
    Balloons,
    BacklogDetail,
    Grid,
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
      // Grid
      cols: ['Make', 'Model', 'Year', 'Color'],
      rows: [
        ['Ford', 'Fusion', '2011', 'Silver'],
        ['Chevrolet', 'Cruz', '2018', 'White']
      ],
      theme: 'none',
      // Gantt
      config: {
        height: 300,
        list: {
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
          items: {
            "1": {
              id: "1",
              rowId: "1",
              label: "Item 1",
              time: {
                start: new Date().getTime(),
                end: new Date().getTime() + 24 * 60 * 60 * 1000
              }
            },
            "2": {
              id: "2",
              rowId: "2",
              label: "Item 2",
              time: {
                start: new Date().getTime() + 4 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 5 * 24 * 60 * 60 * 1000
              }
            },
            "3": {
              id: "3",
              rowId: "2",
              label: "Item 3",
              time: {
                start: new Date().getTime() + 6 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 7 * 24 * 60 * 60 * 1000
              }
            },
            "4": {
              id: "4",
              rowId: "3",
              label: "Item 4",
              time: {
                start: new Date().getTime() + 10 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 12 * 24 * 60 * 60 * 1000
              }
            },
            "5": {
              id: "5",
              rowId: "4",
              label: "Item 5",
              time: {
                start: new Date().getTime() + 12 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 14 * 24 * 60 * 60 * 1000
              }
            }
          }
        }
      },
      // Marpit
      subs: [],
      html: [],
      // jExcel
      spreadsheet: null,
      options: {
        data: [
          ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
          ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777']
        ],
        allowToolbar:true,
        columns: [
          { type: 'text', title: 'Car', width: '120px' },
          { type: 'dropdown', title: 'Make', width: '250px', source: [ 'Alfa Romeo', 'Audi', 'Bmw' ] },
          { type: 'calendar', title: 'Available', width: '250px' },
          { type: 'image', title: 'Photo', width: '120px' },
          { type: 'checkbox', title: 'Stock', width: '80px' },
          { type: 'numeric', title: 'Price', width: '100px', mask: '$ #.##,00', decimal: ',' },
          { type: 'color', width: '100px', render: 'square' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('services/Canban', [
      'getBacklogIds'
    ]),
    backlogIds: {
      get() {
        return this.getBacklogIds
      },
      set(value) {
        // this.setHoge(value)
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
    this.$nextTick(() => {
      // marpit
      const { html } = marpit.render(markdown, { htmlAsArray: true })
      this.html = html
      // gannt
      setTimeout(() => {
        const item1 = this.config.chart.items["1"]
        item1.label = "label changed dynamically"
        item1.time.end += 2 * 24 * 60 * 60 * 1000
      }, 2000)
      // jExcel
      this.spreadsheet = jexcel(this.$refs.spreadsheet, this.options)
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
