import {Model} from "~/models/Model";
import {Api} from "~/models/Api";

export class Administrator extends Model {
  constructor(data = {
    roles: []
  }) {
    super(Api.END_POINTS.CERTIFICATIONS_USERS(), data);
  }

  findUser(options = {}) {
    return this.get(Api.END_POINTS.CERTIFICATIONS_FIND_USERS(), options)
  }

  assignRole(userId, options = {}) {
    return this.post(Api.END_POINTS.CERTIFICATIONS_ROLES_USER(userId), options)
  }

  retractRole(userId, options = {}) {
    return this.delete(Api.END_POINTS.CERTIFICATIONS_ROLES_USER(userId), options)
  }

  rolesData(options = {}) {
    return this.get(Api.END_POINTS.CERTIFICATIONS_ROLES(), options)
  }
}
