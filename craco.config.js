const path = require("path");
const { isEqual } = require("lodash");

module.exports = {
  webpack: {
    alias: {
      "~": path.resolve(__dirname, "src/")
    },
    configure(webpackConfig) {
      const updatedRules = webpackConfig.module.rules.filter(
        rule => !isEqual(rule, { parser: { requireEnsure: false } })
      );
      webpackConfig.module.rules = updatedRules;
      return webpackConfig;
    }
  }
};
