module.exports = {
  purge: {
    enabled: true,
    mode: 'all',
    preserveHtmlElements: false,
    content:  [
      "../public/*.html",
    ],
  },
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-light': "url('/assets/light.jpg')",
       'hero-dark': "url('/assets/dark.jpg')",
      })
    },
  },
  variants: {
    extend: {
      margin: ["dark"],
      backgroundImage: ["dark"]
    }
  },
  plugins: [],
}
