import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Scale extends Model {
  constructor(
    data = {
      name: null,
      description: null,
    }
  ) {
    super(Api.END_POINTS.SCALE(), data)
  }

  scales(options = {}) {
    return this.get(Api.END_POINTS.SCALE(), options)
  }
}
