module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended"],
  // add your custom rules here
  rules: {
    "nuxt/no-cjs-in-config": "off",
    "semi": ["error", "never"],
    "eol-last": 0,
    "no-multiple-empty-lines": ["error", {
      "max": 1,
      "maxEOF": 0
    }],
    "no-console":0
  }
};
