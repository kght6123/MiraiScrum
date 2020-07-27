const state = () => ({
  id: '', // 202005, 202005:18W, 202005:18W:0519火
  progresses: ['TODO', 'DOING', 'DONE'], // TODO, DOING, DONE
  // unit: 'weekly', // monthly, weekly, day
  // unitNumber: 1, // 1-12, 1-5, 1-7
  // parents: ['monthly-id', 'weekly-id'],
  // childs: ['day-id', 'day-id'],
  backlogIds: [] // 関連するBacklogのIdリスト
})
const mutations = {
  setBacklogIds(_state, backlogIds) {
    _state.backlogIds = backlogIds
  },
  addBacklogId(_state, backlogId) {
    _state.backlogIds.push(backlogId)
  }
}
const actions = {
  addBacklogId({ commit }, backlogId) {
    commit('addBacklogId', backlogId)
  }
}
const getters = {
  getBacklogIds(_state) {
    return _state.backlogIds
  },
  getProgresses(_state) {
    return _state.progresses
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
  