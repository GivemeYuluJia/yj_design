import React, { useContext } from "react";
import classNames from 'classnames';
import { MenuContext } from './menu'

export interface MenuItemProps {
  index?: string,
  subGroup?: string[],
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties,
  children?: React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    index,
    disabled,
    className,
    style,
    children,
    subGroup = []
  } = props;

  const { currentKey, onSelect } = useContext(MenuContext);

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': !disabled && currentKey === index
  })

  const handleClick = () => {
    if(onSelect && !disabled && (typeof index === 'string')) {
      onSelect(index, subGroup)
    }
  }
  
  return (
    <li 
      className={classes}
      style={style}
      onClick={handleClick}
      // key={index}
      data-xx={index}
    >
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem';

export default MenuItem;