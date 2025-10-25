import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      components={{
        math: ({ value }) => <div><BlockMath math={value} /></div>,
        inlineMath: ({ value }) => <InlineMath math={value} />,
      }}
    />
  );
};

export default MarkdownRenderer;
