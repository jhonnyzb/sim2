import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class StageType extends Model {
  constructor(
    data = {
      name: null,
    }
  ) {
    super(Api.END_POINTS.STAGE_TYPES(), data)
  }
}
