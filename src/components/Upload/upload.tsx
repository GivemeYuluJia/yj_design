import React, { useState, useRef, PropsWithChildren } from "react";
import UploadList from "./uploadList";

import request from '../../utils/request';
import Dragger from "./dragger";

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  originFileObj?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  //  请求url
  action: string;
  // header 请求头
  header?: { [key: string]: any };
  // 发到后台的文件参数名
  name?: string;
  // 上传所需额外参数或返回上传额外参数的方法
  data?: { [key: string]: any};
  // 上传请求时是否携带 cookie
  withCredentials?: boolean; 
  defaultFileList?: UploadFile[];
  // 接受上传的文件类型
  accept?: string;
  // 是否支持多选文件 
  multiple?: boolean;
  // 拖拽
  drag?: boolean;	
  // 上传之前
  beforeUpload?: (file: File) => boolean | Promise<File>;
  // 上传文件改变时的状态 上传中
  onProgress?: (percentage: number, file: UploadFile) => void;
  // 上传文件改变时的状态 成功
  onSuccess?: (data: any, file: UploadFile) => void;
  // 上传文件改变时的状态 失败
  onError?: (err: any, file: UploadFile) => void; 
  // 上传文件改变时的状态 成功或失败 -> 之后会改为上穿中 成功 失败 三个周期调用
  onChange?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
}

const Upload: React.FC<PropsWithChildren<UploadProps>> = (props) => {
  const {
    action,
    header,
    name = 'file',
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    defaultFileList = [],
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    children
  } = props;
  const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList);
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    requestAnimationFrame(() => {
      setFileList(prevList => {
        return prevList.map(file => {
          if (file.uid === updateFile.uid) {
            return { ...file, ...updateObj }
          } else {
            return file
          }
        })
      })
    })
  }
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if(fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
    
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(!files) return;
    uploadFiles(files);
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile);
          })
        } else if (result !== false) {
          post(file);
        }
      }
    })
  }

  // axios
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      originFileObj: file
    }
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData();
    formData.append(name || file.name, file);
    data && Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    })
    request.post(action, formData, {
      headers: {
        ...header,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round(e.loaded * 100 / e.total) || 0;
        // console.log(percentage, 'pg', e)
        if(percentage <= 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading'} )
          onProgress && onProgress(percentage, { ..._file, percent: percentage, status: 'uploading'})
        }
      }
    }).then(resp => {
      // console.log(resp);
      updateFileList(_file, { response: resp, status: 'success'} )
      onSuccess && onSuccess(resp, { ..._file, response: resp, status: 'success' });
      onChange && onChange({ ..._file, response: resp, status: 'success' });
    }).catch(err => {
      updateFileList(_file, { error: err, status: 'error'} )
      onError && onError(err, { ..._file, error: err, status: 'error' });
      onChange && onChange({ ..._file, error: err, status: 'error' });
    })
  }

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    });
    onRemove && onRemove(file);
  }
  // console.log('up', fileList)
  return (
    <div
      className="yj-upload-component"
    >
      <div 
        className="yj-upload-input"
        style={{ display: 'inline-block'}}
        onClick={handleClick}
      >
        {drag ? 
          <Dragger onFile={(files) => {uploadFiles(files)}}>
            {children}
          </Dragger>
          :
          children
        }
        <input 
          className="yj-file-input"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file" 
          accept={accept}
          multiple={multiple}
        />
      </div>
      
      <UploadList 
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default Upload;