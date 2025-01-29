import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'f422107f67f1f1e4da5fa8080e3349b8.r2.cloudflarestorage.com',
      'poskota.co', // Hostname tambahan
      'cdn.rri.co.id',
      'human-initiative.org',
      'cdnx.human-initiative.org',
    ],
  },
  i18n: {
    locales: ['en', 'id', 'ar'], // Bahasa yang didukung
    defaultLocale: 'en',         // Bahasa default
  },
};

export default nextConfig;
