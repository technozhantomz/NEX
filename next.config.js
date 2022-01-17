/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: "babel-loader",
        },
        {
          loader: "@svgr/webpack",
          options: {
            babel: false,
            icon: true,
          },
        },
      ],
    });
    return config;
  },
};
