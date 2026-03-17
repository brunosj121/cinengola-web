import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/w500/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/original/**',
      },
      {
        protocol: 'https',
        hostname: '*.tmdb.org',
        port: '',
        pathname: '/**',
      },
    ],
    // Formatos otimizados
    formats: ['image/avif', 'image/webp'],
    // Cache e performance
    minimumCacheTTL: 60 * 60 * 24, // 24 horas
    // Device sizes para imagens responsivas
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes para imagens específicas
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Domínios locais permitidos (para imagens da pasta public)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Outras configurações úteis
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
