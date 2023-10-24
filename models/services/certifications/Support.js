import { Model } from "~/models/Model";
import {Api} from "~/models/Api";

/**
* @Property solution
*/
export class Support extends Model {
  constructor(
    data = {
      document_type_id: null,
      document: null,
      name: null,
      email: null,
      description: null,
      state: null,
      solution: "Respetuosamente se informa que su solicitud de certificación ya se encuentra disponible mediante plataforma SIM, página principal del IDRD, modulo, inferior central, módulo RECURSOS, certificado para contratistas.\n" +
        "Cordialmente.",
      contract_document: null,
      contract_number: null,
      contract_year: null
  }) {
    super(Api.END_POINTS.CERTIFICATIONS_SUPPORTS(), data);
  }
}
