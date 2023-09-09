module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "vue"
  ],
  "rules": {
    // 设置缩进为2个空格
    "indent": [
      "error",
      2
    ],
    // 设置template缩进为2个空格
    "vue/html-indent": [
      "error",
      2
    ],
    // 设置script缩进为2个空格
    "vue/script-indent": [
      "error",
      2
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
    "@typescript-eslint/no-explicit-any": "off",
    "no-undef": "off",
    "@typescript-eslint/no-var-requires": "off",
  }
};
