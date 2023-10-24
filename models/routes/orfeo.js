const api = process.env.VUE_APP_API_URL_BASE
export default {
  ORFEO: () => `${api}/api/orfeo/filed`,
  ORFEO_DEPENDENCIES: () => `${api}/api/orfeo/dependencies`,
  ORFEO_DOCUMENT_TYPES: () => `${api}/api/orfeo/document-types`,
  ORFEO_FOLDERS: () => `${api}/api/orfeo/folders`,
  ORFEO_USERS: () => `${api}/api/orfeo/users`,
  ORFEO_COUNTERS_MONTHS: () => `${api}/api/orfeo/counters/months`,
  ORFEO_COUNTERS_FOLDER: () => `${api}/api/orfeo/counters/folder`,
  ORFEO_COUNTERS_READ: () => `${api}/api/orfeo/counters/read`,
  ORFEO_COUNTERS_TYPE: () => `${api}/api/orfeo/counters/filed-type`,
  ORFEO_COUNTERS_DEPS: () => `${api}/api/orfeo/counters/dependencies`,
  ORFEO_COUNTERS_STATUS: (id) => `${api}/api/orfeo/counters/status/${id}`,
  ORFEO_COUNTERS_INFORMED: (id) => `${api}/api/orfeo/filed/${id}/informed`,
  ORFEO_COUNTERS_HISTORY: (id) => `${api}/api/orfeo/filed/${id}/history`,
  ORFEO_CALENDAR: () => `${api}/api/orfeo/calendar`,
}
