import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Origin extends Model {
  constructor(
    id,
    data = {
      park_id: null,
      paragraph_1: null,
      paragraph_2: null,
      image_1: null,
      image_2: null,
      image_3: null,
      image_4: null,
      image_5: null,
      image_6: null,
    }
  ) {
    super(Api.END_POINTS.ORIGIN(id), data)
  }
}
