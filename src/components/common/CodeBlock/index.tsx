import type { CSSProperties, HTMLAttributes } from 'react';
import { markdownToHTML } from '@/transforms/markdown';

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  className?: string;
  style?: CSSProperties;
}

const CodeBlock = ({ value, ...rest }: CodeBlockProps) => (
  <div
    {...rest}
    dangerouslySetInnerHTML={{
      __html: markdownToHTML(value),
    }}
  />
);

export default CodeBlock;
