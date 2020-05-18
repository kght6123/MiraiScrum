const state = () => ({
  value: '',
  backlogs: [
    {
      id: '', // uuid v4 https://github.com/uuidjs/uuid
      // unit: 'weekly', // monthly, weekly, day
      // unitNumber: 20200511, // 202005, 20200511, 20200516
      title: '',
      point: 2, // 1,2,4,5,8
      // createAt: '2020-06-20 10:00',
      // createUserId: '',
      // updateAt: '2020-06-20 10:00',
      // updateUserId: '',
      // mainUserIds: [],
      progress: 'TODO', // TODO, DOING, DONE
      progressAt: { TODO: '2020-06-20 10:00' },
      progressUserId: { TODO: '' },
      childBacklogIds: ['', ] // 子供のBacklogのIdリスト
    }
  ],
})

const mutations = {
  setValue(_state, value) {
    _state.value = value
    // Vue.set(_state.values, `hoge`, value)
  }
}

const actions = {
  async hogehoge({ dispatch, commit, getters, rootGetters }) {
    await dispatch('hoge', getters.getValue)
    commit('setValue', value)
    const value = rootGetters[
      'model/services/BacklogDetail/getValue'
    ]
    commit(
      'model/services/BacklogDetail/setValue',
      value,
      {
        root: true
      }
    )
    dispatch(
      'model/services/BacklogDetail/hoge',
      {},
      {
        root: true
      }
    )
  },
  hoge({}, payload) {
    console.log(payload)
  },
  showDetail() {
    this._vm.$modal.show('backlog-detail');
    // this._vm.$bvModal.show('backlog-detail');
  },
  hideDetail() {
    this._vm.$modal.hide('backlog-detail');
    // this._vm.$bvModal.hide('backlog-detail');
  }
}

const getters = {
  getValue(_state) {
    return _state.value
  },
  getValueParam1: _state => param1 => {
    return _state.value + param1
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}