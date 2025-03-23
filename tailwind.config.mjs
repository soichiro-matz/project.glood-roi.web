import plugin from "tailwindcss/plugin";

const defaultViewPort = {
  min: 768,
  max: 1280,
};

// px を rem に変換
const rem = (px) => `${px / 16}rem`;

// clamp関数
const getClamp = (minSize, maxSize, minViewPort, maxViewPort) => {
  const variablePart = (maxSize - minSize) / (maxViewPort - minViewPort);
  const constant = -minViewPort * variablePart + minSize;
  return `clamp(${rem(minSize)}, ${rem(constant)} + ${100 * variablePart}vw, ${rem(maxSize)})`;
};

// fluid スケール関数
const getFluid = (value) => {
  const [minSize, maxSize, minViewPort, maxViewPort] = value.split(",");
  return getClamp(
    Number(minSize),
    Number(maxSize),
    Number(minViewPort) || defaultViewPort.min,
    Number(maxViewPort) || defaultViewPort.max,
  );
};

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto", "Noto Sans JP", "sans-serif"],
    },
    extend: {
      colors: {
        dark: "#151313",
        navy: "#15143F",
        "light-gray": "#E6E6E6",
        line: "#B6C1D3",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus-visible"]);
      addVariant("beforeAfter", ["&:before", "&:after"]);

      matchUtilities(
        {
          "text-fluid": (value) => ({
            fontSize: getFluid(value),
          }),
          "p-fluid": (value) => ({
            padding: getFluid(value),
          }),
          "py-fluid": (value) => ({
            paddingTop: getFluid(value),
            paddingBottom: getFluid(value),
          }),
          "px-fluid": (value) => ({
            paddingLeft: getFluid(value),
            paddingRight: getFluid(value),
          }),
          "pt-fluid": (value) => ({
            paddingTop: getFluid(value),
          }),
          "pr-fluid": (value) => ({
            paddingRight: getFluid(value),
          }),
          "pb-fluid": (value) => ({
            paddingBottom: getFluid(value),
          }),
          "pl-fluid": (value) => ({
            paddingLeft: getFluid(value),
          }),
          "m-fluid": (value) => ({
            margin: getFluid(value),
          }),
          "my-fluid": (value) => ({
            marginTop: getFluid(value),
            marginBottom: getFluid(value),
          }),
          "mx-fluid": (value) => ({
            marginLeft: getFluid(value),
            marginRight: getFluid(value),
          }),
          "mt-fluid": (value) => ({
            marginTop: getFluid(value),
          }),
          "mr-fluid": (value) => ({
            marginRight: getFluid(value),
          }),
          "mb-fluid": (value) => ({
            marginBottom: getFluid(value),
          }),
          "ml-fluid": (value) => ({
            marginLeft: getFluid(value),
          }),
          "w-fluid": (value) => ({
            width: getFluid(value),
          }),
          "h-fluid": (value) => ({
            height: getFluid(value),
          }),
          "wh-fluid": (value) => ({
            width: getFluid(value),
            height: getFluid(value),
          }),
          "gap-fluid": (value) => ({
            gap: getFluid(value),
          }),
          "gap-x-fluid": (value) => ({
            columnGap: getFluid(value),
          }),
          "gap-y-fluid": (value) => ({
            rowGap: getFluid(value),
          }),
          "inset-fluid": (value) => ({
            inset: getFluid(value),
          }),
          "inset-y-fluid": (value) => ({
            top: getFluid(value),
            bottom: getFluid(value),
          }),
          "inset-x-fluid": (value) => ({
            left: getFluid(value),
            right: getFluid(value),
          }),
          "top-fluid": (value) => ({
            top: getFluid(value),
          }),
          "right-fluid": (value) => ({
            right: getFluid(value),
          }),
          "bottom-fluid": (value) => ({
            bottom: getFluid(value),
          }),
          "left-fluid": (value) => ({
            left: getFluid(value),
          }),
        },
        {
          values: {
            xs: "4,8",
            sm: "8,16",
            md: "16,24",
            lg: "24,32",
            xl: "32,40",
          },
        },
      );
    }),
  ],
};
