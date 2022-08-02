import React, { useState, useContext} from "react";
import classNames from "classnames";
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
  subGroup?: string[];
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children, subGroup = [] }) => {
  const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
  const context = useContext(MenuContext);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.currentSubGroup[0] === index,
    'is-active-font': context.currentSubGroup.includes(index)
  });
  
  const ulClasses = classNames('yj-submenu', {
    'menu-opened': menuOpen,
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};

  const hoverEvents = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
  } : {}

  const RenderChildren = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          subGroup: subGroup ? [ ...subGroup, index ] : [`${index}`],
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component')
      }
    })
  };

  return (
    <li
      key={index}
      className={classes}
      {...hoverEvents}
    >
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      <ul className={ulClasses}>
        {RenderChildren()}
      </ul>
    </li>
  );
}

SubMenu.displayName = 'SubMenu'

export default SubMenu;