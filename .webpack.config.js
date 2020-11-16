// define child rescript
module.exports = (config) => {
  config.target = "electron-renderer";
  config.node.__dirname = true;
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.(html|njk)$/i,
      use: "raw-loader",
    },
  ];
  return config;
};
