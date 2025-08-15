/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg'],
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@supabase/ssr'],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL=https://uyjhvrcjwzwmyizcmepq.supabase.co,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_OVDpcei4bwa31xnEPqDERQ_bzosbwcB NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
  },
}

export default nextConfig
