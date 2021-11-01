module.exports = {
  purge: ["./index.html", "./src/**/*.{svelte,js}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "spin-reverse": "spin-reverse 2s linear infinite",
      },
      keyframes: {
        "spin-reverse": {
          from: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
