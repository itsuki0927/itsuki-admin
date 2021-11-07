import highlight from '@/utils/highlight'
import marked from 'marked'

const renderer = new marked.Renderer()

renderer.link = (href, title, text) => {
  const textIsImage = text.includes('<img')
  const linkHtml = `
    <a
      href="${href}"
      target="_blank"
      class="${textIsImage ? 'image-link' : 'link'}"
      title="${title || (textIsImage ? href : text)}"
    >
      ${text}
    </a>
  `
  return linkHtml.replace(/\s+/g, ' ').replace(/\n/g, ' ')
}

marked.setOptions({
  renderer,
  gfm: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code, language) {
    return highlight.getLanguage(language)
      ? highlight.highlight(code, { language }).value
      : highlight.highlightAuto(code).value
  },
})

export const genMarkdownString = (code: string | undefined, language = 'js') =>
  code ? '```' + language + '\n' + code + '\n```' : ''

export const markdownToHTML = marked
