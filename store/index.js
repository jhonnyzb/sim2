// Utilities
import pathify from '@/plugins/vuex-pathify'
console.log('STORE FILE LOADED!')

const vuexPersistEmitter = () => {
  return (store) => {
    store.subscribe((mutation) => {
      if (mutation.type === 'RESTORE_MUTATION') {
        store._vm.$root.$emit('storageReady')
      }
    })
  }
}
export const plugins = [vuexPersistEmitter(), pathify.plugin]
