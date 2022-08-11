import React from "react";
import { UploadFile } from "./upload";
import { PaperClipOutlined, DeleteOutlined } from '../../icons/index';
import Progress from '../Progress';
import { CloseCircleOutlined, CheckCircleOutlined, LoadingOutlined } from '../../icons';

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}
const UnMemoizedUploadList: React.FC<UploadListProps> = (props) => {
  const {
    fileList,
    onRemove
  } = props;
  return (
    <ul className="yj-upload-list">
      {fileList.map(file => (
        <li 
          className="yj-upload-list-item"
          key={file.uid}
        >
          <div className={`file-name file-name-${file.status}`}>
            <PaperClipOutlined />
            {file.name}
          </div>
          <div className="file-status">
            {(file.status === 'uploading' || file.status === 'ready') && <LoadingOutlined />}
            {file.status === 'success' && <CheckCircleOutlined style={{color: '#0d6efd'}} />}
            {file.status === 'error' && <CloseCircleOutlined style={{color: '#dc3545'}}/>}
          </div>
          {file.status !== 'uploading' &&
            <span className={`file-action file-action-${file.status}`}>
              <DeleteOutlined  onClick={() => onRemove(file)} />
            </span>
          }
          {file.status === 'uploading' && 
            <Progress 
              percent={file.percent || 0}
            />
          }
        </li>
      ))}
    </ul>
  )
};

export default React.memo(UnMemoizedUploadList);