import type { Config } from "tailwindcss"

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      container: {
         padding: {
            xl: "150px",
            "2xl": "0px",
         },
         center: true,
      },

      extend: {
         colors: {
            titleActive: "#000000",
            body: "#333333",
            label: "#555555",
            placeholder: "#888888",
            line: "#E0CFBA",
            inputBackground: "#F9F9F9",
            background: "#F8F0E7",
            offWhite: "#FCFCFC",
            primary: "#A8715A",
            secondary: "#DD8560",
            foreground: "var(--foreground)",
            white: {
               "100": "#F6F6F6",
               "200": "#E9E9EB",
               "900": "#FFFFFF",
            },
            neutral: {
               "100": "#E6E7E8",
               "200": "#B6B7BC",
               "300": "#878A92",
               "400": "#71747E",
               "500": "#5C5F6A",
               "600": "#474B57",
               "700": "#333845",
               "800": "#202533",
               "900": "#0E1422",
            },
            blue: {
               b100: "#E8EFFD",
               b200: "#D1DEFB",
               b300: "#BACEFA",
               b400: "#A3BEF8",
               b500: "#8CADF6",
               b600: "#759DF4",
               b700: "#5E8CF3",
               b800: "#477CF1",
               b900: "#306CEF",
            },
            green: {
               g100: "#D5E5D7",
               g200: "#C1D8C4",
               g300: "#98BE9E",
               g400: "#83B18B",
               g500: "#6FA479",
               g600: "#5A9868",
               g700: "#458B56",
               g800: "#2C7F45",
               g900: "#057234",
            },
            red: {
               r100: "#FBD9D0",
               r200: "#F8C5B9",
               r300: "#EE9F8D",
               r400: "#E88C77",
               r500: "#E17862",
               r600: "#D9644E",
               r700: "#D14F3A",
               r800: "#C83727",
               r900: "#BE1313",
            },
            yellow: {
               y100: "#FFF1D8",
               y200: "#FFEAC4",
               y300: "#FFDC9E",
               y400: "#FFD58A",
               y500: "#FDCF76",
               y600: "#FBC862",
               y700: "#F9C14C",
               y800: "#F6BB33",
               y900: "#F3B40A",
            },
         },
      },
   },
}
export default config
