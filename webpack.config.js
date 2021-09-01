const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "workshop",
    projectName: "app-components",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: [
      "react",
      "react-dom",
      "react-router",
      "react-router-dom",
      "redux",
      "react-redux",
      "@workshop/app-core-utils",
      "@workshop/app-nav",
    ],
  });
};
