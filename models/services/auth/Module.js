import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Module extends Model {
  constructor(
    data = {
      name: null,
      area: null,
      redirect: null,
      image: null,
      status: null,
      missionary: null,
      compatible: null,
    }
  ) {
    super(Api.END_POINTS.MODULES(), data)
  }

  user(options = {}) {
    return this.get('https://sim.idrd.gov.co/base-ldap/public/api/my-modules?page=1&per_page=35', options)
  }
}
