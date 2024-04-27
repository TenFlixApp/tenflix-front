import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, type ThemeDefinition  } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VEmptyState } from 'vuetify/labs/VEmptyState'

const theme: ThemeDefinition = {
  dark: true,
  colors: {
    accent: '#BB86FC',
  },
}


export default createVuetify({
  components: {
    ...components,
    VEmptyState
  },
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: 'theme',
    themes: {
      theme
    }
  },
  display: {
    mobileBreakpoint: 'sm'
  },
})
