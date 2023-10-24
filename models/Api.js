import orfeo from '@/models/routes/orfeo'
import parks from '@/models/routes/parks'
import certifications from '@/models/routes/certifications'
const api = process.env.VUE_APP_API_URL_BASE
export const Api = {
  END_POINTS: {
    CSFR_TOKEN: () => `${api}/csfr-cookie`,
    FORGOT_PASSWORD: () => `${api}/password/forgot`,
    RESET_PASSWORD: () => `${api}/password/reset`,
    MODULES: () => `${api}/api/admin/modules`,
    USER_MODULES: () => `${api}/api/my-modules`,
    DOCUMENT_TYPES: () => `${api}/api/document-types`,
    // Orfeo
    ...orfeo,
    // Parks
    ...parks,
    // Certifications
    ...certifications,
  },
}
