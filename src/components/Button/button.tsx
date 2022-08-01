import React from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  classname?: string,
  /**设置 Button 的禁用 */
  disabled?: boolean,
  /**设置 Button 的尺寸 */
  size?: ButtonSize,
  /**设置 Button 的类型 */
  btnType?: ButtonType,
  children?: React.ReactNode,
  href?: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
// props设置为可选属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    classname,
    disabled,
    size,
    btnType,
    children,
    href,
    ...restProps
  } = props;

  const classes = classNames('btn', classname, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })

  if (btnType === 'link' && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  )
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button;