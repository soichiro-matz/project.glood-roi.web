module.exports = {
  extends: [
    "stylelint-config-standard-scss", // ✅ SCSS 用の Stylelint 設定
    "stylelint-config-recess-order", // ✅ CSS プロパティの順序を統一
  ],
  plugins: ["stylelint-scss"], // ✅ SCSS の構文チェック
  ignoreFiles: ["**/node_modules/**"],
  rules: {
    "at-rule-no-unknown": null, // ✅ デフォルトの @rule チェックを無効化
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind"], // ✅ `@tailwind` を例外として許可
      },
    ],
    "selector-id-pattern": null,
    "selector-class-pattern": null,
    "keyframes-name-pattern": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
  },
};
