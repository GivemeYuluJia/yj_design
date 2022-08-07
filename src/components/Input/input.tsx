import React, { ChangeEvent, InputHTMLAttributes, useRef } from "react";
import classNames from 'classnames';

type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  className?: string;
  disabled?: boolean;
  size?: InputSize;
  icon?: any;
  prepend?: string | React.ReactElement;
  append?: string | React.ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = (props) => {
  // 取出各种属性
  const {
    className,
    disabled,
    size,
    icon,
    prepend,
    append,
    ...restProps
  } = props;

  // 根据计算属性计算不同className
  const classes = classNames('yj-input-wrapper', className, {
    [`input-size-${size}`]: size,
    // 'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  // value 和 defaultValue只能存在一个
  if('value' in props) {
    delete props.defaultValue;
    if(typeof props.value === 'undefined' || props.value === null) {
      restProps.value = '';
    }
  }
  
  return (
    <div className={classes}>
      { prepend && <div className="yj-input-group-prepend">{prepend}</div> }
      { icon && <div className="icon-wrapper">{icon}</div>}
      <input  
        className="yj-input-inner"
        disabled={disabled}
        {...restProps}
      />
      { append && <div className="yj-input-group-append">{append}</div>}
    </div>
  )
}

export default Input;