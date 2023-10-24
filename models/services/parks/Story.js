import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Story extends Model {
  constructor(
    id,
    data = {
      title: null,
      text: null,
    }
  ) {
    super(Api.END_POINTS.STORIES(id), data)
  }
}
