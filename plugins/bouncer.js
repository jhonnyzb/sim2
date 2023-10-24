import Bouncer from '~/utils/Bouncer'
export default (context, inject) => {
  let user = context.app.store.getters['app/bouncer']
  let bouncer = new Bouncer({
    id: user.id,
    abilities: user.abilities,
    roles: user.roles,
  })
  context.app.store.watch(
    (state) => state.app.bouncer,
    (newValue) => {
      console.log(newValue)
      user = newValue
      bouncer = new Bouncer({
        id: user.id,
        abilities: user.abilities,
        roles: user.roles,
      })
    }
  )
  inject('bouncer', bouncer)
  inject('can', bouncer.can.bind(bouncer))
  inject('cannot', bouncer.cannot.bind(bouncer))
  inject('isA', bouncer.isA.bind(bouncer))
  inject('isAn', bouncer.isAn.bind(bouncer))
  inject('isNotA', bouncer.isNotA.bind(bouncer))
  inject('isNotAn', bouncer.isNotAn.bind(bouncer))
}
