import {Model} from "~/models/Model";
import {Api} from "~/models/Api";

export class ContractType extends Model
{
  constructor(data = {}) {
    super(Api.END_POINTS.CERTIFICATIONS_CONTRACT_TYPES(), data);
  }
}
