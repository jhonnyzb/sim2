import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class UpzAll extends Model {
  constructor(data = { name: null }) {
    super(Api.END_POINTS.UPZALL(), data)
  }

  upzs(options = {}) {
    return this.get(Api.END_POINTS.UPZALL(), options)
  }
}
