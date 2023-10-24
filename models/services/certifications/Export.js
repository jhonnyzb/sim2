import {Model} from "~/models/Model";
import {Api} from "~/models/Api";

export class Export extends Model {
  constructor(file) {
    super(Api.END_POINTS.CERTIFICATIONS_EXPORTS_FILES(file), {});
  }
}
