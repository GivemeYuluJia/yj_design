import React, { useCallback } from "react";

import classNames from "classnames";

export type LoadingProps = {
  className?: string;
  style?: React.CSSProperties;
  type?: 'spin';
};
const Loading: React.FC<LoadingProps> = (props) => {
  const { type, className = '', style = {} } = props;

  const LoadingComponents = useCallback(() => {
    if(type === 'spin') {
      return (
        <div className='spinLoading'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }
    return (
      <div className='defaultLoading' style={style} />
    )
  }, [type, style]);

  return (
    <div className={classNames(className, 'loadingContainer')}>
      <LoadingComponents />
    </div>
  )
}

export default Loading;