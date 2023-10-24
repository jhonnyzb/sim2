import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class TypeZone extends Model {
  constructor(
    data = {
      name: null,
    }
  ) {
    super(Api.END_POINTS.TYPE_ZONES(), data)
  }
}
