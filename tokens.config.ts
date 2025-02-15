import { defineTheme } from 'pinceau'
import colors from 'tailwindcss/colors'

export default defineTheme({
  color: {
    primary: colors.teal,
    secondary: colors.gray
  },
  media: {
    xs: '(min-width: 450px)'
  }
})