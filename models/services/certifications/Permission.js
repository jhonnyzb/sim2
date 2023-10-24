import {Model} from "@/models/Model";
import {Api} from "~/models/Api";

export class Permission extends Model {
  constructor(data = {}) {
    super(Api.END_POINTS.CERTIFICATIONS_PERMISSIONS(), data);
  }
}
