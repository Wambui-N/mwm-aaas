import localFont from "next/font/local";

// Brule is already loaded site-wide by fonts/fonts.ts; reuse that instance so it is not declared twice.
export { brule } from "../../fonts/fonts";

// Satoshi and Geist Mono reuse the existing files in /fonts (byte-identical to the handoff copies).
export const satoshi = localFont({
  src: [
    { path: "../../fonts/Satoshi-Light.otf", weight: "300", style: "normal" },
    { path: "../../fonts/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "../../fonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
    { path: "../../fonts/Satoshi-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
});

export const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  weight: "100 900",
  variable: "--font-geist-mono",
});
