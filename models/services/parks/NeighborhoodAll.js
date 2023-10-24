import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class NeighborhoodAll extends Model {
  constructor(data = { name: null }) {
    super(Api.END_POINTS.NEIGHBORHOODALL(), data)
  }

  neighborhoods(options = {}) {
    return this.get(Api.END_POINTS.NEIGHBORHOODALL(), options)
  }
}
