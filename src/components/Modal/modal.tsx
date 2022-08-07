import React, { PropsWithChildren, useEffect, useState, useRef } from "react";
import { createPortal } from 'react-dom';
import classNames from "classnames";

import { CloseBtnIcon } from "../../icons";

export interface ModalProps {
  visible: boolean;
  closeModal: () => void;
  modalHeader?: React.ReactNode;
  style?: string;
  className?: React.CSSProperties;
  title?: string;
  dialogClassName?: string;
  rightBtn?: React.ReactNode;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = React.memo((props) => {
  const {
    visible,
    closeModal,
    modalHeader,
    style = {},
    className = '',
    title = '',
    dialogClassName = '',
    rightBtn = null,
    children
  } = props;
  const [ active, setActive ] = useState<boolean>(false);
  const [aniClassName, setAniClassName] = useState<string>('');
  const [contentClassName, setContentClassName] = useState<string>('');
  // 获取body上的样式
  const bodyOverflow = useRef(window.getComputedStyle(document.body).overflow);

  const modalClasses = classNames('yj-modal', aniClassName, className);
  const dialogClasses = classNames('yj-dialog', contentClassName, dialogClassName)

  const onTransitionEnd = () => {
    console.log('complete');
    setAniClassName(visible ? 'enterDone' : 'exitDone');
    setContentClassName(visible ? 'contentEnterDone' : 'contentExitDone');
    if (!visible) {
      setActive(false);
    }
  };
  
  useEffect(() => {
    if(visible) {
      document.body.style.overflow = 'hidden';
      setActive(true);
      setAniClassName('enter');
      setContentClassName('contentEnter');
      setTimeout(() => {
        setAniClassName('enterActive');
        setContentClassName('contentEnterActive');
      });
    } else {
      //  visible === false 第一次渲染
      document.body.style.overflow = bodyOverflow.current;
      setAniClassName('exit');
      setContentClassName('contentExit');
      setTimeout(() => {
        setAniClassName('exitActive');
        setContentClassName('contentExitActive');
      });
    }
    return () => {
      document.body.style.overflow = bodyOverflow.current;
    }
  }, [visible])
  const handleClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  console.log(aniClassName,'aniClassName',contentClassName, 'contentClassName')
  if(!visible && !active) {
    return null;
  }

  return createPortal(
    <div
      style={style}
      className={modalClasses}
      onTransitionEnd={onTransitionEnd}
      onClick={handleClick}
    >
      <div
        className={dialogClasses}
      >
        {modalHeader || (
          <div className="titleContainer">
            <CloseBtnIcon onClick={closeModal} className='closeBtn'/>
            <div className='title'>{title}</div>
            <div className='rightBtn'>{rightBtn}</div>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
})

export default Modal;