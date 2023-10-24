const api = process.env.VUE_APP_API_URL_BASE
const path = '/api/certifications'

export default {
  CERTIFICATIONS_PERMISSIONS: () => `${api}${path}/permissions`,
  CERTIFICATIONS_MENU: () => `${api}${path}/menu`,
  CERTIFICATIONS: () => `${api}${path}/certifications`,
  CERTIFICATIONS_COUNTERS: () => `${api}${path}/counters`,
  CERTIFICATIONS_STATS: () => `${api}${path}/stats`,
  CERTIFICATIONS_USERS: () => `${api}${path}/users`,
  CERTIFICATIONS_FIND_USERS: () => `${api}${path}/find-users`,
  CERTIFICATIONS_ROLES_USER: (userId) => `${api}${path}/roles/${userId}/user`,
  CERTIFICATIONS_ROLES: () => `${api}${path}/roles`,
  CERTIFICATIONS_SUPPORTS: () => `${api}${path}/supports`,
  CERTIFICATIONS_CONTRACTS: () => `${api}${path}/contracts`,
  CERTIFICATIONS_CONTRACT_TYPES: () => `${api}${path}/contract-types`,
  CERTIFICATIONS_OBLIGATIONS: (contractId) => `${api}${path}/contracts/${contractId}/obligations`,
  CERTIFICATIONS_ADDITIONS: (contractId) => `${api}${path}/contracts/${contractId}/additions`,
  CERTIFICATIONS_EXTENSIONS: (contractId) => `${api}${path}/contracts/${contractId}/extensions`,
  CERTIFICATIONS_ASSIGNMENTS: (contractId) => `${api}${path}/contracts/${contractId}/assignments`,
  CERTIFICATIONS_SUSPENSIONS: (contractId) => `${api}${path}/contracts/${contractId}/suspensions`,
  CERTIFICATIONS_MEMBERS: (contractId) => `${api}${path}/contracts/${contractId}/members`,
  CERTIFICATIONS_EXPORTS_FILES: (file) => `${api}/api/exports/${file}`,
  CERTIFICATIONS_JOB_STATUS: () => `${api}/api/job-status`,
  CERTIFICATIONS_EXCEL: () => `${api}${path}/excel`,
}
