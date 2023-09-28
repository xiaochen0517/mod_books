module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  "rules": {
    // 设置template缩进为2个空格
    "vue/html-indent": [
      "error",
      2
    ],
    // 设置script缩进为2个空格
    "vue/script-indent": [
      "error",
      2,
      {
        "switchCase": 1
      }
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-undef": "off",
    "vue/no-v-model-argument": "off",
    "no-unused-vars": "warn",
  }
};
