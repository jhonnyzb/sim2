import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Menu extends Model {
  constructor(data = {}) {
    super(Api.END_POINTS.PARKS_MENU(), data)
  }
}
