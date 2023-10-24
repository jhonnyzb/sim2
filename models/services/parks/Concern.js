import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Concern extends Model {
  constructor(
    data = {
      name: null,
    }
  ) {
    super(Api.END_POINTS.CONCERNS(), data)
  }
}
