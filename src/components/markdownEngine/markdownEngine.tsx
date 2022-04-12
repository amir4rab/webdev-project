import React from 'react'
import ReactMarkdown from 'react-markdown';
import Highlight, { defaultProps } from "prism-react-renderer";
import PrismTheme from "prism-react-renderer/themes/palenight";
import CodeLangs from '@/types/codeLangs';

import classes from './markdownEngine.module.scss';
import { IoCopy } from 'react-icons/io5';
import CopyToClipBoard from '@/frontend-utils/copyToClipBoard';

interface Props {
  rawMarkdown: string
}
function MarkdownEngine({ rawMarkdown }: Props) {
  return (
    <div className={ classes.markdownEngine }>
      <ReactMarkdown
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <div className={ classes.codeWrapper }>
                <button onClick={ () => CopyToClipBoard( children[0] as string  ) } className={ classes.copyButton }>
                  <IoCopy />
                </button>
                <Highlight {...defaultProps} code={ children[0] as string } language={ match[1] as CodeLangs } theme={ PrismTheme }>
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={[ className, classes.code ].join(' ')} style={style}>
                      {tokens.map((line, i) => (
                        <div key={ i }  {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span key={ key } {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            ) : (
              <code className={className}>
                {children}
              </code>
            )
          }
        }}
      >
        { rawMarkdown }
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownEngine;