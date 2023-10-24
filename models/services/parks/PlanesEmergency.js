import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class PlanEmergency extends Model {
    //   constructor() {
    //     super()
    //   }

    async planAdd(options = {}) {
        const formData = new FormData();
        formData.append('file', options.file);
        formData.append('descripcionArchivo', options.descripcionArchivo);
        formData.append('idCategoria', options.idCategoria);
        formData.append('orden', options.orden);
        formData.append('idParque', options.idParque);
        formData.append('version', options.version);
        const response =  await this.$axios({ method: 'post', url: Api.END_POINTS.PARKS_PLAN_ADD(), data: formData })
        return response;
    }


    async getCategoriesPlan(options = {}) {
        const response = await this.$axios({ method: 'get', url: Api.END_POINTS.PARKS_CATEGORIES_PLAN() })
        return response;
    }
}
