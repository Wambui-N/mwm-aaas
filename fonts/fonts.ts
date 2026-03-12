import localFont from "next/font/local";

export const brule = localFont({
  src: [
    {
      path: "./Brule-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Brule-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Brule-Text.woff",
      weight: "450",
      style: "normal",
    },
    {
      path: "./Brule-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Brule-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Brule-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Brule-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-brule",
});
