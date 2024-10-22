/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self'; default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'self'; object-src 'self'; media-src 'self'; worker-src 'self'; child-src 'self'; manifest-src 'self'; base-uri 'self'; form-action 'none';",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Cache-Control",
            value: "must-revalidate, proxy-revalidate, max-age=600",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
        ],
      },
      // json files
      {
        source: "/(.*).json",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'none'; default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'self'; object-src 'self'; media-src 'self'; worker-src 'self'; child-src 'self'; manifest-src 'self'; base-uri 'self'; form-action 'none';",
          },
          {
            key: "Cache-Control",
            value: "no-store, no-cache",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
