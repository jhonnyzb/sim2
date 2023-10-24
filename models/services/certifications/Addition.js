import {Model} from "~/models/Model";
import {Api} from "~/models/Api";

export class Addition extends Model {
  constructor(
    contractId,
    data = {
      id: null,
      number: null,
      value: null
    }) {
    super(Api.END_POINTS.CERTIFICATIONS_ADDITIONS(contractId), data);
  }
}
