import { markdownToHTML } from '@/transforms/markdown'
import type { CSSProperties, HTMLAttributes } from 'react'

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  className?: string
  style?: CSSProperties
}

const CodeBlock = ({ value }: CodeBlockProps) => (
  <div
    dangerouslySetInnerHTML={{
      __html: markdownToHTML(value),
    }}
  />
)

export default CodeBlock
