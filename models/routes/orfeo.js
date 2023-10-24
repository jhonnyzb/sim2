const api = process.env.VUE_APP_API_URL_BASE
export default {
  ORFEO: () => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/filed`,
  ORFEO_DEPENDENCIES: () => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/dependencies`,
  ORFEO_DOCUMENT_TYPES: () => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/document-types`,
  ORFEO_FOLDERS: () => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/folders`,
  ORFEO_USERS: () => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/users`,
  ORFEO_COUNTERS_MONTHS: () => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/counters/months`,
  ORFEO_COUNTERS_FOLDER: () => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/counters/folder`,
  ORFEO_COUNTERS_READ: () => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/counters/read`,
  ORFEO_COUNTERS_TYPE: () => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/counters/filed-type`,
  ORFEO_COUNTERS_DEPS: () => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/counters/dependencies`,
  ORFEO_COUNTERS_STATUS: (id) => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/counters/status/${id}`,
  ORFEO_COUNTERS_INFORMED: (id) => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/filed/${id}/informed`,
  ORFEO_COUNTERS_HISTORY: (id) => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/filed/${id}/history`,
  ORFEO_CALENDAR: () => `https://sim.idrd.gov.co/base-ldap/public/api/orfeo/calendar`,
}
