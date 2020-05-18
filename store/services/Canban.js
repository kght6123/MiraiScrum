const state = () => ({
  canbans: [
    {
      id: '', // 202005, 202005:18W, 202005:18W:0519火
      progresses: ['TODO', 'DOING', 'DONE'], // TODO, DOING, DONE
      // unit: 'weekly', // monthly, weekly, day
      // unitNumber: 1, // 1-12, 1-5, 1-7
      // parents: ['monthly-id', 'weekly-id'],
      // childs: ['day-id', 'day-id'],
      backlogIds: [] // 関連するBacklogのIdリスト
    }
  ],
})
const mutations = {}
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
  