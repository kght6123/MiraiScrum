const state = () => ({
  value: '',
  canbans: [
    {
      id: '',
      title: 'TODO', // TODO, DOING, DONE
      unit: 'weekly', // monthly, weekly, day
      unitNumber: 1, // 1-12, 1-5, 1-7
      parents: ['monthly-id', 'weekly-id'],
      childs: ['day-id', 'day-id'],
    }
  ],
  backlogs: [
    {
      id: '',
      canbanIds: [],
      title: '',
      point: 2, // 1,2,4,5,8
      createAt: '2020-06-20 10:00',
      createUserId: '',
      updateAt: '2020-06-20 10:00',
      updateUserId: '',
      mainUserIds: [],
    }
  ],
  backlogHistries: [
    {
      id: '',
      backlogId: '',
      unit: 'mintus',
      unitNumber: 15,
      registAt: '2020-06-20 10:00',
      registUserId: '',
      comment: ''
    }
  ],
  backlogComments: [
    {
      id: '',
      postAt: '2020-06-20 10:00',
      postUserId: '',
      message: '成果物と目的の差分は〜だよ！'
    },
  ]
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