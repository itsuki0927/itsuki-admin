module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-order'],
  rules: {
    'no-descending-specificity': null,
    'at-rule-no-unknown': null,
    // color另起一行
    // 'declaration-colon-newline-after': null,
    // 忽略 Fira Code
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['Fira Code', 'Inter'],
      },
    ],
    // 忽略 :global 伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-class-pattern': null,
    'color-function-notation': null,
    'property-no-vendor-prefix': null,
    'selector-no-vendor-prefix': [
      true,
      {
        ignoreSelectors: ['::-moz-selection'],
      },
    ],
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: ['border-color'],
      },
    ],
    // 忽略指定的函数
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['-webkit-gradient', 'to', 'color-stop'],
      },
    ],
  },
};
