import orfeo from '@/models/routes/orfeo'
import parks from '@/models/routes/parks'
import certifications from '@/models/routes/certifications'
const api = process.env.VUE_APP_API_URL_BASE
export const Api = {
  END_POINTS: {
    CSFR_TOKEN: () => `https://sim.idrd.gov.co/base-ldap/public/csfr-cookie`,
    FORGOT_PASSWORD: () => `https://sim.idrd.gov.co/base-ldap/public/password/forgot`,
    RESET_PASSWORD: () => `https://sim.idrd.gov.co/base-ldap/public/password/reset`,
    MODULES: () => `https://sim.idrd.gov.co/base-ldap/public/api/admin/modules`,
    USER_MODULES: () => `https://sim.idrd.gov.co/base-ldap/public/api/my-modules`,
    DOCUMENT_TYPES: () => `https://sim.idrd.gov.co/base-ldap/public/api/document-types`,
    // Orfeo
    ...orfeo,
    // Parks
    ...parks,
    // Certifications
    ...certifications,
  },
}
