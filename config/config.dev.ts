// https://umijs.org/config/
import { defineConfig } from 'umi'

const { REACT_APP_ENV, VERSION } = process.env

export default defineConfig({
  define: {
    TAG: REACT_APP_ENV,
    BASE_PATH: 'http://localhost:5555',
    VERSION: VERSION,
  },
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
})
