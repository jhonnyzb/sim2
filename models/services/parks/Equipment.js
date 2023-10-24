import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Equipment extends Model {
  constructor(data = {}) {
    super(Api.END_POINTS.EQUIPMENTS(), data)
  }

  endowments(id, options = {}) {
    return this.get(Api.END_POINTS.EQUIPMENTS_ENDOWMENTS(id), options)
  }
}
