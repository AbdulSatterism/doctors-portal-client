/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        doctortheme: {
          primary: "#0FCFEC",
          secondary: '#19D3AE',
          accent: " #3A4256",
          "base-100": "#FFFFFF",
          neutral: "#3D4451Z"
        }
      }
    ]
  },
  theme: {
    extend: {
    },
  },
  plugins: [require("daisyui")],
}

