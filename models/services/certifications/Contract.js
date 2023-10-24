import {Model} from "~/models/Model";
import {Api} from "~/models/Api";

export class Contract extends Model {
  constructor(
    data = {
      document_type_id: null,
      document: null,
      dv: 0,
      name: null,
      contract_number: null,
      contract_year: null,
      contract_type_id: null,
      name_representative: null,
      document_type_representative_id: null,
      document_representative: null,
      object: null,
      signature_date: null,
      start_date: null,
      final_date: null,
      anticipated_date: null,
      duration_months: 0,
      duration_days: 0,
      duration_other: null,
      initial_value: null,
      monthly_value: null,
    }
  ) {
    super(Api.END_POINTS.CERTIFICATIONS_CONTRACTS(), data);
  }

  excel(options = {}) {
    return this.get(Api.END_POINTS.CERTIFICATIONS_EXCEL(), options)
  }
}
