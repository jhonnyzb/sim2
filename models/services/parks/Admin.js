import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Admin extends Model {
  constructor(
    data = {
      roles: [],
    }
  ) {
    super(Api.END_POINTS.PARKS_USERS(), data)
  }

  rolesData(options = {}) {
    return this.get(Api.END_POINTS.PARKS_ROLES(), options)
  }

  findUser(options = {}) {
    return this.get(Api.END_POINTS.PARKS_FIND_USERS(), options)
  }

  assignRole(userId, options = {}) {
    return this.post(Api.END_POINTS.PARKS_ROLES_USER(userId), options)
  }

  retractRole(userId, options = {}) {
    return this.delete(Api.END_POINTS.PARKS_ROLES_USER(userId), options)
  }
}
