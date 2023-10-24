import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class UpzType extends Model {
  constructor(data = { name: null }) {
    super(Api.END_POINTS.UPZ_TYPES(), data)
  }
}
