import {Model} from "~/models/Model";
import {Api} from "~/models/Api";

export class Assignment extends Model {
  constructor(
    contractId,
    data = {
      id: null,
      number: null,
      document_type_id: null,
      document: null,
      name: null,
      dv: 0,
      value: null,
      date: null
    }
  ) {
    super(Api.END_POINTS.CERTIFICATIONS_ASSIGNMENTS(contractId), data);
  }
}
