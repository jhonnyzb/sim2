import {Model} from "~/models/Model";
import {Api} from "~/models/Api";

export class Obligation extends Model {
  constructor(
    contractId,
    data = {
      id: null,
      number: null,
      object: null
    }) {
    super(Api.END_POINTS.CERTIFICATIONS_OBLIGATIONS(contractId), data);
  }
}
