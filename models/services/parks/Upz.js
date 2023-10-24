import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Upz extends Model {
  constructor(
    localityId,
    data = {
      name: null,
      upz_code: null,
      locality_id: null,
      upz_type_id: null,
    }
  ) {
    super(Api.END_POINTS.UPZ(localityId), data)
  }
}
