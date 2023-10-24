import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Certified extends Model {
  constructor(data = { name: null }) {
    super(Api.END_POINTS.CERTIFICATE_STATUS(), data)
  }
}
