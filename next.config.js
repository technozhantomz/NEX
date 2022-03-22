// @ts-check
/** @type {import('next').NextConfig} */
const nextBundleAnalyzer = require("@next/bundle-analyzer");
const withPlugins = require("next-compose-plugins");
const withLess = require("next-with-less");

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const plugins = [
  [
    withBundleAnalyzer,
    {
      enabled: process.env.ANALYZE === "true",
    },
  ],
  [
    withLess,
    {
      excludeFile: (str) => /\*.{spec,test,stories}.tsx?/.test(str),
      lessLoaderOptions: {},
    },
  ],
];

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: "json",
      use: "yaml-loader",
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: "@svgr/webpack",
    });
    config.experiments = { asyncWebAssembly: true };
    return config;
  },
};

module.exports = withPlugins(plugins, nextConfig);
