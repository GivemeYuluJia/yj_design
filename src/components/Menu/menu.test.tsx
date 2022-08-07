import React from "react";
import { render, screen, fireEvent, RenderResult, cleanup } from '@testing-library/react';
import { MenuProps } from './menu';
import Menu from './index'

const testProps: MenuProps = {
  defaultKey: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultKey: '0',
  mode: 'vertical'
}

const generateMenu = (props:MenuProps) => {
  return (
    <Menu {...props}>
      <Menu.Item index="0">
        active
      </Menu.Item>
      <Menu.Item disabled index="1">
        disabled
      </Menu.Item>
      <Menu.Item index="2">
        abc
      </Menu.Item>
    </Menu>
  )
} 
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    render(generateMenu(testProps))
    menuElement = screen.getByTestId('test-menu');
    activeElement = screen.getByText('active');
    disabledElement = screen.getByText('disabled');
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('yj-menu test');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = screen.getByText('abc');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1")
  })
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    render(generateMenu(testVerProps));
    const element = screen.getByTestId('test-menu');
    expect(element).toHaveClass('menu-vertical');
  })
})