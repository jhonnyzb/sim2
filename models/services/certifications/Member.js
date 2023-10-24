import {Model} from "~/models/Model";
import {Api} from "~/models/Api";

export class Member extends Model {
  constructor(
    contractId,
    data = {
      id: null,
      document_type_id: null,
      document: null,
      name: null,
      percent: null
    }
  ) {
    super(Api.END_POINTS.CERTIFICATIONS_MEMBERS(contractId), data);
  }
}
