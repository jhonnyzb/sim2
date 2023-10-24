import { make } from 'vuex-pathify'
import actions from '~/store/app/actions'
import getters from '~/store/app/getters'
import mutations from '~/store/app/mutations'
import state from '~/store/app/state'

export default {
  actions: {
    ...make.actions(state),
    ...actions,
  },
  getters,
  mutations: {
    ...make.mutations(state),
    ...mutations,
  },
  state,
}
