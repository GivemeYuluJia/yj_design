import React from "react";

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  style?: React.CSSProperties;
  theme?: ThemeProps;
}
const UnMemoizedProgress: React.FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight = 15,
    showText = true,
    style,
    theme = 'primary'
  } = props;

  return (
    <div className="yj-progress-bar" style={style}>
      <div 
        className="yj-progress-bar-outer"
        style={{ height: `${strokeHeight}px`}}
      >
        <div 
          className={`yj-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%`}}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

export default React.memo(UnMemoizedProgress);