// https://umijs.org/config/
import { defineConfig } from 'umi'

export default defineConfig({
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
  chainWebpack: (config) => {
    // config.entry('editor.worker').add('monaco-editor/esm/vs/editor/editor.worker.js')
    // config.entry('json.worker').add('monaco-editor/esm/vs/language/json/json.worker')
    // config.entry('css.worker').add('monaco-editor/esm/vs/language/css/css.worker')
    // config.entry('html.worker').add('monaco-editor/esm/vs/language/html/html.worker')
    // config.entry('ts.worker').add('monaco-editor/esm/vs/language/typescript/ts.worker')
    // config.output
    //   .filename('[name].bundle.js')
    //   .globalObject('self')
    //   .path(resolve(__dirname, '../dist'))
  },
})
