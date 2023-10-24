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
    return this.get(Api.END_POINTS.USER_MODULES(), options)
  }
}
