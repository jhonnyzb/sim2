import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Status extends Model {
  constructor(
    data = {
      name: null,
    }
  ) {
    super(Api.END_POINTS.STATUS(), data)
  }
}
