/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg'),
      );
  
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: {not: [...fileLoaderRule.resourceQuery.not, /url/]}, // exclude if *.svg?url
          use: ['@svgr/webpack'],
        },
        // Convert all mp4 videos imports to React components
        {
          test: /\.(mp4|webm)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '/_next',
                name: 'static/media/[name].[hash].[ext]',
              },
            },
          ],
        },
      );
  
      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i;
  
      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.ultralightstores.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'cdn.shopify.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'ultralight-strapi.s3.eu-central-1.amazonaws.com',
          port: '',
        },
        {
            protocol: 'https',
            hostname: 'scontent.cdninstagram.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'scontent-****-*.cdninstagram.com',
            port: '',
          }
      ],
    },
  };
  
  module.exports = nextConfig;  