module.exports = {
  purge: {
    enabled: true,
    mode: 'all',
    preserveHtmlElements: false,
    content:  [
      "../public/**/*.html",
    ],
  },
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-light': "url('/assets/light.jpg')",
       'hero-dark': "url('/assets/dark.jpg')",
      }),
      screens: {
        '3xl': '1600px',
        '4xl': '1940px',
        '5xl': '2048px',
      },
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
