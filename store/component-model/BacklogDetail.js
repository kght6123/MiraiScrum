const state = () => ({
  value: ''
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
      'model/component-model/BacklogDetail/getValue'
    ]
    commit(
      'model/component-model/BacklogDetail/setValue',
      value,
      {
        root: true
      }
    )
    dispatch(
      'model/component-model/BacklogDetail/hoge',
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