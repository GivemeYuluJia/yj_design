import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Upload, { UploadFile } from "./upload";

export default {
  title: 'Example/Upload Component',
  component: Upload,
  decorators: [
    (Story) => (
      <div style={{ marginLeft: '35%' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Upload>
const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
const simpleUpload: ComponentStory<typeof Upload> = (args) => (
  <Upload
    action="https://jsonplaceholder.typicode.com/posts"
    defaultFileList={defaultFileList}
    onChange={(file) => console.log(file, 'change')}
    beforeUpload={(file) => {console.log(file, 'before'); return true}}
    onProgress={(percentage, file) => console.log(percentage, file, 'progress')} 
    onSuccess={(data, file) => console.log(data, file, 'success')}
    onError={(err, file) => console.log(err, file, 'error')}
  />
)
export const UploadWithSize = simpleUpload.bind({});
UploadWithSize.storyName = '简单的 Upload';