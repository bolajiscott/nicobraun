module.exports = {
  purge: [],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-light': "url('https://cdn.wallpapersafari.com/88/94/sm31PR.jpg')",
       'hero-dark': "url('https://upload.wikimedia.org/wikipedia/commons/6/69/7-78049_small-memory-8k-wallpaper-forest-minimalist-wallpaper-4k.jpg')",
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
