const IDENTIFIER = process.env.VUE_APP_ROLE_IDENTIFIER
const ROLE_ROOT = process.env.VUE_APP_ROLE_ROOT
const ROLE_ADMIN = `${IDENTIFIER}-administrator`
const ROLE_ASSIGNED = `${IDENTIFIER}-assigned-administrator`

const PARK = 'Park'
const CERTIFIED = 'Certified'
const LOCATION = 'Location'
const UPZ = 'Upz'
const NEIGHBORHOOD = 'Neighborhood'
const RUPI = 'Rupi'
const SCALE = 'Scale'
const ENCLOSURE = 'Enclosure'
const STAGE_TYPE = 'StageType'
const STATUS = 'Status'
const STORY = 'Story'
const VOCATION = 'Vocation'
const UPZ_TYPE = 'UpzType'
const USERS = 'User'
const ORIGIN = 'Origin'
const AUDITS = 'Audit'

const classDashName = (name) => {
  return (name || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export const Constants = {
  IDENTIFIER,
  Roles: {
    IDENTIFIER,
    ROLE_ROOT,
    ROLE_ADMIN,
    ROLE_ASSIGNED,
    all: [ROLE_ROOT, ROLE_ADMIN, ROLE_ASSIGNED],
  },
  Models: {
    PARK,
    LOCATION,
    UPZ,
    NEIGHBORHOOD,
    RUPI,
    SCALE,
    ENCLOSURE,
    STAGE_TYPE,
    STATUS,
    STORY,
    VOCATION,
    UPZ_TYPE,
    CERTIFIED,
    ORIGIN,
    USERS,
    AUDITS,
  },
  Actions: {
    VIEW: (model) => `view-${classDashName(model)}-${IDENTIFIER}`,
    MANAGE: (model) => `manage-${classDashName(model)}-${IDENTIFIER}`,
    CREATE: (model) => `create-${classDashName(model)}-${IDENTIFIER}`,
    UPDATE: (model) => `update-${classDashName(model)}-${IDENTIFIER}`,
    DESTROY: (model) => `destroy-${classDashName(model)}-${IDENTIFIER}`,
    HISTORY: (model) => `view-audit-${classDashName(model)}-${IDENTIFIER}`,
  },
}
