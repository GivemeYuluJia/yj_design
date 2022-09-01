import React, { FC, PropsWithChildren } from "react";
import cx from 'classnames';

export type PopoverProps = {
  content: string | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  distance?: number
}

export const Popover: FC<PropsWithChildren<PopoverProps>> = (props) => {
  const { className, style, children, content } = props;

  return (
    <div 
      className={cx(className, 'yj-popover')}
      style={style}
    >
      <div className='yj-popoverCom' style={{ cursor: content ? 'pointer' : 'default' }}>
        {children}
      </div>
      { content && (
        <div
          className="yj-popoverBubble"
        >
          <div className="popoverInner">{content}</div>
          <div className="popoverArrow">
            <div className="popoverArrowContent"></div>
          </div>
        </div>
      )}
    </div>
  )
}