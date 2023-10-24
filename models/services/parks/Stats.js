import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Stats extends Model {
  constructor(data = {}) {
    super(Api.END_POINTS.PARKS_STATS_BY_TYPE(), data)
  }

  excel(options = {}) {
    return this.get(Api.END_POINTS.PARKS_STATS_EXCEL(), options)
  }

  byType(options = {}) {
    return this.get(Api.END_POINTS.PARKS_STATS_BY_TYPE(), options)
  }

  byCount(options = {}) {
    return this.get(Api.END_POINTS.PARKS_STATS_BY_COUNT(), options)
  }

  byLocality(options = {}) {
    return this.get(Api.END_POINTS.PARKS_STATS_BY_LOCALITY(), options)
  }

  byEnclosure(options = {}) {
    return this.get(Api.END_POINTS.PARKS_STATS_BY_ENCLOSURE(), options)
  }

  byCertification(options = {}) {
    return this.get(Api.END_POINTS.PARKS_STATS_BY_CERTIFICATION(), options)
  }

  byUpz(options = {}) {
    return this.get(Api.END_POINTS.PARKS_STATS_BY_UPZ(), options)
  }

  byEndowment(equipmentId, options = {}) {
    return this.get(
      Api.END_POINTS.PARKS_STATS_BY_ENDOWMENTS(equipmentId),
      options
    )
  }

  sectors(id, options = {}) {
    return this.get(Api.END_POINTS.PARKS_SECTORS(id), options)
  }

  diagrams(options = {}) {
    return this.get(Api.END_POINTS.DIAGRAMS(), options)
  }

  equipment(parkId, equipmentId, options = {}) {
    return this.get(
      Api.END_POINTS.PARKS_EQUIPMENT(parkId, equipmentId),
      options
    )
  }
}
