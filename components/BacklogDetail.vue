<template>
  <modal name="backlog-detail" width="90%" height="85%">
    <div class="card-group solid mb-2">
      <div slot="header" class="card-group-header light">
        <h3 class="title">Tasks</h3>
        <div class="icon">➕</div>
      </div>
      <div class="card solid">
        <div>1-1-1 モーダルウィンドウのコンポーネントを調べる</div>
      </div>
      <div class="card solid ml-6">
        <div>1-1-1-1 vue-modalをインストールする</div>
      </div>
      <div class="card solid ml-6">
        <div>1-1-1-2 複数ウィンドウを開けるか検証する</div>
      </div>
      <div class="card solid ml-6">
        <div>1-1-1-3 iOSでフォームがあるときスクロールできるか検証する</div>
      </div>
      <div class="pl-6">
        <input type="text" class="w-full py-2 px-3 leading-tight" placeholder="追加する子タスクを入力してください" />
      </div>
    </div>
    <div class="card-group solid">
      <div slot="header" class="card-group-header light">
        <h3 class="title">Time Records</h3>
        <div class="icon">➕</div>
      </div>
      <div class="card solid">
        <div>15分 2020/06/14 09:00 koga 〜したよ</div>
      </div>
      <div class="card solid">
        <div>45分 2020/06/14 10:30 koga 〜おわってないよ</div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('services/BacklogDetail', ['getValue'])
  },
  methods: {
    ...mapActions('services/BacklogDetail', [
      'showDetail',
      'hideDetail'
    ])
  }
}
</script>

<style scoped>

</style>