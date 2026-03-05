/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to allow edge runtime compatibility
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    // pdfjs-dist's NodeCanvasFactory does require('canvas') which is a native Node module.
    // Alias it to an empty stub for ALL builds so webpack never tries to resolve it.
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: require("path").resolve(__dirname, "lib/stubs/canvas.js"),
    };
    return config;
  },
  env: {
    // Make sure environment variables are available at build time
    NEXT_PUBLIC_CALCOM_API_KEY: process.env.NEXT_PUBLIC_CALCOM_API_KEY,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_SCORECARD_URL: process.env.NEXT_PUBLIC_SCORECARD_URL,
    // Hardcoded for testing
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID: '5as4idq86u2n',
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: 'niWTNWI_FWacU-P3SPD3Jg3saLxm3vgt4Jguf-IcKSI',
  },
};

module.exports = nextConfig;
