import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Rupi extends Model {
  constructor(
    id,
    data = {
      name: null,
    }
  ) {
    super(Api.END_POINTS.RUPI(id), data)
  }
}
