/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Royalty-free hosts used by the curated image registry (lib/images.ts).
    // Swap/extend with your own CDN or the current VRV site host as needed.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "vrv.campaigntag.com" },
    ],
  },
  async redirects() {
    return [
      // Investor Relations is superseded by Ventures.
      { source: "/investors", destination: "/ventures", permanent: false },
      { source: "/investors/:path*", destination: "/ventures", permanent: false },
      { source: "/investor-relations", destination: "/ventures", permanent: false },
    ];
  },
};

export default nextConfig;
