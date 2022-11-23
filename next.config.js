// @ts-check
/** @type {import('next').NextConfig} */

const withLess = require("next-with-less");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const generateBuildId = async () => {
  if (process.env.BUILD_ID) {
    return process.env.BUILD_ID;
  } else {
    return `${new Date().getTime()}`;
  }
};

module.exports = module.exports = (phase, { _defaultConfig }) => {
  const commonConfigs = {
    compiler: {
      styledComponents: {
        // Enabled by default in development, disabled in production to reduce file size,
        // setting this will override the default for all environments.
        displayName: true,
        // Enabled by default.
        ssr: true,
      },
    },
    reactStrictMode: true,
    devIndicators: {
      buildActivity: false,
    },
    webpack: (
      config,
      { _buildId, _dev, _isServer, _defaultLoaders, _nextRuntime, _webpack }
    ) => {
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
      // Important: return the modified config
      return config;
    },
  };
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    /* development only config options here */
    return withLess({
      lessLoaderOptions: {},
      ...commonConfigs,
    });
  }

  /* config options for all phases except development here */
  return withLess({
    lessLoaderOptions: {},
    ...commonConfigs,
    distDir: "build",
    generateBuildId: generateBuildId,
  });
};
