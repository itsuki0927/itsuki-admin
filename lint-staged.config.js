module.exports = {
  // 检查 ts 是否有语法错误
  '**/*.ts?(x)': () => 'yarn check-types',
  // eslint 检查
  '*.ts?(x)': 'yarn check-lint',
  // less 检查
  '*.less': 'yarn stylelint',
  // code 格式化
  '*.{ts,tsx,less,md}': 'yarn format',
};
