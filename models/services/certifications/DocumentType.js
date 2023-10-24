import {Model} from "~/models/Model";
import {Api} from "~/models/Api";

export class DocumentType extends Model{
  constructor(data = {}) {
    super(Api.END_POINTS.DOCUMENT_TYPES(), data);
  }
}
