import { createVuetify } from 'vuetify'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          colors: {
            primary: '#333333',
          },
        },
        light: {
          colors: {
            primary: '#f5f5f5',
          }
        },

      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
