import {Model} from "~/models/Model";
import {Api} from "~/models/Api";

export class Certifications extends Model {
  constructor(data = {}) {
    super(Api.END_POINTS.CERTIFICATIONS(), data);
  }

  counters(options = {}) {
    return this.get(Api.END_POINTS.CERTIFICATIONS_COUNTERS(), options)
  }

  stats(options = {}) {
    return this.get(Api.END_POINTS.CERTIFICATIONS_STATS(), options)
  }
}
