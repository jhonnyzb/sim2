import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Neighborhood extends Model {
  constructor(
    localityId,
    upzId,
    data = {
      name: null,
      neighborhood_code: null,
      upz_code: null,
      upz_id: null,
      locality_id: null,
    }
  ) {
    super(Api.END_POINTS.NEIGHBORHOODS(localityId, upzId), data)
  }
}
