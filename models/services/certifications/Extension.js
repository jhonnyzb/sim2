import {Model} from "~/models/Model";
import {Api} from "~/models/Api";

export class Extension extends Model {
  constructor(
    contractId,
    data = {
      id: null,
      number: null,
      months: 0,
      days: 0,
      final_date: null
    }
  ) {
    super(Api.END_POINTS.CERTIFICATIONS_EXTENSIONS(contractId), data);
  }
}
