import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonSize, ButtonType} from "./button";

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  classname: 'klass'
}
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test Button Component', () => {
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Nice</Button>);
    const element = screen.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    // 判断targetname
    expect(element.tagName).toEqual('BUTTON');
    // 判断是否存在classname
    expect(element).toHaveClass('btn btn-default');
    // 判断disabled
    expect(element.disabled).toBeFalsy();
    // 监听事件触发
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  })
  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>Nice</Button>);
    const element = screen.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('should render a link when btnType queals link and href is provided', () => {
    render(<Button btnType="link" href="https://yj">Link</Button>);
    const element = screen.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  })
  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>disabled</Button>);
    const element = screen.getByText('disabled') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  })
})