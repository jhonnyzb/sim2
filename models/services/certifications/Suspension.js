import {Model} from "~/models/Model";
import {Api} from "~/models/Api";

export class Suspension extends Model {
  constructor(
    contractId,
    data = {
      id: null,
      number: null,
      months: 0,
      days: 0,
      start_date: null,
      final_date: null,
      restart_date: null,
      final_date_cto: null,
    }
  ) {
    super(Api.END_POINTS.CERTIFICATIONS_SUSPENSIONS(contractId), data);
  }
}
