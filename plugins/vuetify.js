import theme from "~/plugins/theme"
import Sim from "~/components/icons/Sim"
import Es from '@/components/icons/Es'
import En from '@/components/icons/En'
import Bogota from '@/components/icons/Bogota'
import Town from '@/components/icons/Town'
import IDRD from '@/components/icons/IDRD'
import IDRDLogo from '@/components/icons/IDRDLogo'
import IDRDLogoColor from '@/components/icons/IDRDLogoColor'
import Pse from '@/components/icons/Pse'

export default function ({ app }) {
  return {
    theme: {
      dark: false,
      themes: {
        light: theme,
        dark: theme,
      },
    },
    icons: {
      values: {
        sim: {
          component: Sim
        },
        es: {
          component: Es
        },
        en: {
          component: En
        },
        bogota: {
          component: Bogota
        },
        town: {
          component: Town
        },
        idrd_logo: {
          component: IDRDLogo
        },
        idrd_logo_color: {
          component: IDRDLogoColor
        },
        idrd: {
          component: IDRD
        },
        pse: {
          component: Pse
        },
      }
    },
    lang: {
      t: (key, ...params) => app.i18n.t(key, params)
    }
  }
}
