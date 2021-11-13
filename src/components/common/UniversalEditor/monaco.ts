import 'monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution'

export * from 'monaco-editor'

// eslint-disable-next-line no-restricted-globals
;(self as any).MonacoEnvironment = {
  getWorkerUrl(moduleId: string, label: string) {
    if (label === 'json') {
      return '../json.worker.bundle.js'
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return '../css.worker.bundle.js'
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return '../html.worker.bundle.js'
    }
    if (label === 'typescript' || label === 'javascript') {
      return '../ts.worker.bundle.js'
    }
    return '../editor.worker.bundle.js'
  },
}
