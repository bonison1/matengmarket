import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    domains: [
      'mdxeolqfiosscdommyhc.supabase.co',
      'uqtcgvxrcztaffzpxsql.supabase.co', // ✅ Add this line
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
