import { v4 as uuidv4 } from 'uuid'
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
  },
  setBacklogs(_state, backlogs) {
    _state.backlogs = backlogs
  },
  addBacklog(_state, backlog) {
    _state.backlogs.push(backlog)
  }
}

const actions = {
  addBacklog({ commit }, backlog) {
    commit('addBacklog', backlog)
  },
  async doCreateBacklog({ dispatch }, { title, point, progress, userId, childBacklogIds }) {
    const id = uuidv4()
    const updateAt = new Date()
    const progressAt = {}
    progressAt[progress] = updateAt
    const progressUserId = {}
    progressUserId[progress] = userId
    const backlog = {
      id,
      title,
      point, // 1,2,4,5,8
      createAt: updateAt,
      createUserId: userId,
      updateAt: updateAt,
      updateUserId: userId,
      progress, // TODO, DOING, DONE
      progressAt,
      progressUserId,
      childBacklogIds // 子供のBacklogのIdリスト
    }
    await dispatch('addBacklog', backlog)
    await dispatch(
      'services/Canban/addBacklogId', id,
      {
        root: true
      }
    )
  },
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