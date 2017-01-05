import { default as React } from 'react';
import { compose, pure } from 'recompose';
import { default as CodeBlock } from 'mtk-ui/lib/CodeBlock';
import { default as withAttachedProps } from 'mtk-ui/lib/decorators/withAttachedProps';

const Editor = ({ onChange, onCopy, defaultValue, title }) => (
  <div>
    {title}:
    <CodeBlock
      defaultValue={defaultValue}
      onChange={onChange}
      onCopy={onCopy}
      config={{
        lineNumbers: true,
        theme: 'default',
        mode: 'shell',
        styleActiveLine: false,
      }}
      copy={true}
    />
    <br/>
  </div>
);

export default compose(
  pure,
  withAttachedProps(() => ({
    onChange: (value) => console.log(value),
    onCopy: (value) => console.log('copy!', value),
  })),
)(Editor);

