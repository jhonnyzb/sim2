import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Audit extends Model {
  constructor() {
    super(Api.END_POINTS.PARKS_AUDIT(), {})
  }
}
