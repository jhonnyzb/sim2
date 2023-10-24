import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Feature extends Model {
//   constructor() {
//     super()
//   }

  featureAll(options = {}) {
    return this.get(Api.END_POINTS.PARKS_FEATURES(), options)
  }

  async featureRemove(options = {}) {
    const response =  await this.$axios({ method: 'post', url: Api.END_POINTS.PARKS_FEATURES_REMOVE(), data: options })
    return response
  }

  async featureAdd(options = {}) {
    const response =  await this.$axios({ method: 'post', url: Api.END_POINTS.PARKS_FEATURES_ADD(), data: options })
    return response
  }
}
