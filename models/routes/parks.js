const api = process.env.VUE_APP_API_URL_BASE
const social = process.env.VUE_APP_SOCIAL
export default {
  VOCATIONS: () => `${api}/api/vocations`,
  VIGILANCE: () => `${api}/api/vigilance`,
  CONCERNS: () => `${api}/api/concerns`,
  STAGE_TYPES: () => `${api}/api/stage-types`,
  SCALE: () => `${api}/api/scales`,
  STATUS: () => `${api}/api/statuses`,
  UPZ_TYPES: () => `${api}/api/upz-types`,
  CERTIFICATE_STATUS: () => `${api}/api/certificate-status`,
  TYPE_ZONES: () => `${api}/api/type-zones`,
  ENCLOSURES: () => `${api}/api/enclosures`,
  LOCALITIES: () => `${api}/api/localities`,
  UPZ: (location) => `${api}/api/localities/${location}/upz`,
  UPZALL: () => `${api}/api/parks/get-upzs`,
  NEIGHBORHOODS: (location, upz) =>
    `${api}/api/localities/${location}/upz/${upz}/neighborhoods`,
  NEIGHBORHOODALL: () => `${api}/api/parks/get-neighborhood`,
  PARKS: () => `${api}/api/parks`,
  PARKS_AUDIT: () => `${api}/api/parks/audits`,
  OWNED: () => `${api}/api/parks/owned`,
  DESTROY_OWNED: (userId, parkId) =>
    `${api}/api/parks/owned/${userId}/${parkId}`,
  DESTROY_ALL_OWNED: (userId) => `${api}/api/parks/destroy-all-owned/${userId}`,
  OWNED_KEYS: () => `${api}/api/parks/owned-keys`,
  EXCEL: () => `${api}/api/parks/excel`,
  RUPI: (id) => `${api}/api/parks/${id}/rupis`,
  ORIGIN: (id) => `${api}/api/parks/${id}/origin`,
  STORIES: (id) => `${api}/api/parks/${id}/stories`,
  EQUIPMENTS: () => `${api}/api/parks/equipments`,
  EQUIPMENTS_ENDOWMENTS: (id) => `${api}/api/parks/equipments/${id}/endowments`,
  PARKS_ESRI_CONFIG: () => `${api}/api/esri/config`,
  PARKS_SECTORS: (id) => `${api}/api/parks/${id}/sectors`,
  PARKS_ECONOMIC: (id) => `${api}/api/parks/${id}/economic-use`,
  PARKS_FURNITURE: (id) => `${api}/api/parks/${id}/furnishings`,
  PARKS_EQUIPMENT: (parkId, equipmentId) =>
    `${api}/api/parks/${parkId}/equipment/${equipmentId}`,
  SYNTHETIC: () => `${api}/api/parks/synthetic-fields`,
  DIAGRAMS: () => `${api}/api/parks/diagrams`,
  PARKS_PERMISSIONS: () => `${api}/api/parks/user/permissions`,
  PARKS_ADMIN_PERMISSIONS: () => `${api}/api/parks/admin/permissions`,
  PARKS_ADMIN_ROLES: () => `${api}/api/parks/admin/roles`,
  PARKS_ADMIN_ROLES_PERMISSION: (roleId, permissionId) =>
    `${api}/api/parks/admin/roles/${roleId}/permissions/${
      !permissionId ? '' : permissionId
    }`,
  PARKS_ADMIN_ENTITIES: () => `${api}/api/parks/admin/models`,
  PARKS_ROLES: () => `${api}/api/parks/users/roles`,
  PARKS_MENU: () => `${api}/api/parks/user/menu`,
  PARKS_USERS: () => `${api}/api/parks/users`,
  PARKS_FIND_USERS: () => `${api}/api/parks/users/find`,
  PARKS_ROLES_USER: (userId) => `${api}/api/parks/users/roles/${userId}`,
  PARKS_STATS_EXCEL: () => `${api}/api/parks/stats/excel`,
  PARKS_STATS_BY_TYPE: () => `${api}/api/parks/stats`,
  PARKS_STATS_BY_COUNT: () => `${api}/api/parks/stats/count`,
  PARKS_STATS_BY_ENCLOSURE: () => `${api}/api/parks/stats/enclosure`,
  PARKS_STATS_BY_LOCALITY: () => `${api}/api/parks/stats/localities`,
  PARKS_STATS_BY_CERTIFICATION: () => `${api}/api/parks/stats/certified`,
  PARKS_STATS_BY_UPZ: () => `${api}/api/parks/stats/upz`,
  PARKS_STATS_BY_ENDOWMENTS: (id) => `${api}/api/parks/stats/endowments/${id}`,
  PARKS_ACTIVITIES: (parkId) => `${social}/api/recreation/${parkId}/calendar`,
  PARKS_ACTIVITIES_SPORTS: () => `${api}/api/citizen-portal/public-schedules`,
  PARKS_IDRD_EVENTS: () => process.env.VUE_APP_EVENTOS_IDRD,
  PARKS_SOCIAL_PROGRAMS: (parkId) =>
    `${social}/api/social-management/${parkId}/history`,
  PARKS_RESERVATIONS: (parkId, endowmentId) =>
    `https://www.idrd.gov.co/SIM/PAGOS_PSE/?idParque=${parkId}&idDotacion=${endowmentId}`,
  PARKS_FEATURES: () => `${api}/api/parks/features`,
  PARKS_FEATURES_REMOVE: () => `${api}/api/parks/features/remove`,
  PARKS_FEATURES_ADD: () => `${api}/api/parks/features/add`,
  PARKS_CATEGORIES_PLAN: () => `${api}/api/parks/plans/categories-plans`,
  PARKS_PLAN_ADD: () => `${api}/api/parks/plans/add`,
}
