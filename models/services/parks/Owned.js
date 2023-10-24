import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Owned extends Model {
  constructor(
    data = {
      user_id: null,
      park_id: [],
    }
  ) {
    super(Api.END_POINTS.OWNED(), data)
  }

  parkKeys(options = {}) {
    return this.get(Api.END_POINTS.OWNED_KEYS(), options)
  }

  destroyOwned(userId, parkId, options = {}) {
    return this.delete(Api.END_POINTS.DESTROY_OWNED(userId, parkId), options)
  }

  destroyAllOwned(userId, options = {}) {
    return this.delete(Api.END_POINTS.DESTROY_ALL_OWNED(userId), options)
  }
}
