import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Locality extends Model {
  constructor(data = { name: null }) {
    super(Api.END_POINTS.LOCALITIES(), data)
  }

  upz(id, options = {}) {
    return this.get(Api.END_POINTS.UPZ(id), options)
  }

  neighborhoods(location, upz, options = {}) {
    return this.get(Api.END_POINTS.NEIGHBORHOODS(location, upz), options)
  }
}
