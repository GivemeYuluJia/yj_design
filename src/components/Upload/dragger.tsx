import React, { useState, PropsWithChildren } from "react";
import classNames from "classnames";
;
interface DraggerProps {
  onFile: (files: FileList) => void
}
const Dragger: React.FC<PropsWithChildren<DraggerProps>> = (props) => {
  const { onFile, children } = props;
  const [ dragOver, setDragOver ] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over)
  }
  return (
    <div 
      className={classNames('yj-upload-dragger', {
        'is-dragover': dragOver
      })}
      onDrop={handleDrop}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
    >
      {children}
    </div>
  )
}

export default Dragger;