import React, { useState, createContext, Dispatch } from "react";
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';

export interface MenuProps {
  defaultKey?: string,
  className?: string,
  mode?: MenuMode,
  style?: React.CSSProperties,
  onSelect?: (selected: string) => void,
  children?: React.ReactNode,
}

interface IMenuContext {
  currentKey: string,
  onSelect?: (selectedIndex: string, selectedGroup: string[]) => void;
  currentSubGroup: string[];
  setSubGroup?: Dispatch<string[]>;
  mode?: MenuMode,
}

export const MenuContext = createContext<IMenuContext>({ currentKey: '0', currentSubGroup: [] });

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultKey,
    className,
    mode,
    style,
    onSelect,
    children,
  } = props;

  const [ currentActive, setActive ] = useState(defaultKey)
  const [ selectSubGroup, setSelectSubGroup] = useState<string[]>([]);

  const classes = classNames('yj-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })

  const handleClick = (index: string, group: string[]) => {
    setActive(index)
    setSelectSubGroup(group)
    if(onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    currentKey: currentActive ? currentActive : '0',
    onSelect: handleClick,
    currentSubGroup: selectSubGroup,
    setSubGroup: setSelectSubGroup,
    mode,
  }

  const RenderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        // return  React.cloneElement(childElement, {
        //   index: index.toString()
        // })
        return childElement;
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }
    })
  }
  const myClick = (e: any) => {
    console.log(e, e.target.dataset.xx)
  }
  
  return (
    <ul
      className={classes}
      style={style}
      data-testid="test-menu"
      onClick={myClick}
    >
      <MenuContext.Provider value={passedContext}>
        {RenderChildren()}
      </MenuContext.Provider>
    </ul>
  )
};
Menu.defaultProps = {
  defaultKey: '0',
  mode: 'horizontal',
}
export default Menu;