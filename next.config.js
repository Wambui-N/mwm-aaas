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
  // The Proposal Audit lives at /audit. The old /scorecard URLs (links in earlier results emails) always redirect.
  // /assessment moves to /audit too, unless NEXT_PUBLIC_SCORECARD_LIVE=false.
  async redirects() {
    const always = [
      { source: "/scorecard", destination: "/audit", statusCode: 301 },
      { source: "/scorecard/results/:id", destination: "/audit/results/:id", statusCode: 301 },
    ];
    return process.env.NEXT_PUBLIC_SCORECARD_LIVE !== "false"
      ? [...always, { source: "/assessment", destination: "/audit", statusCode: 301 }]
      : always;
  },
  env: {
    // Make sure environment variables are available at build time
    NEXT_PUBLIC_CALCOM_API_KEY: process.env.NEXT_PUBLIC_CALCOM_API_KEY,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_SCORECARD_URL: process.env.NEXT_PUBLIC_SCORECARD_URL,
  },
};

module.exports = nextConfig;
