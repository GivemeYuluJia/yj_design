import React from 'react';
import Button from './components/Button';
import Menu from './components/Menu';
import './styles/index.scss'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>default</Button>
        <Button disabled>disabled</Button>
        <Button btnType='primary' size='lg'>primary lg</Button>
        <Button btnType='danger' size='sm'>danger sm</Button>
        <Button btnType='link' href='https://www.baidu.com' disabled>baidu</Button>
        <Button btnType='link' href='https://www.baidu.com'>baidu2</Button>
        <button>123</button>
        <br />
        <br />
        <Menu defaultKey={'0'}>
          <Menu.Item index='0'>li 0</Menu.Item>
          <Menu.Item disabled index='1'>li 1</Menu.Item>
          <Menu.SubMenu title='2' index='2'>
            <Menu.Item index='3'>li 3</Menu.Item>
            <Menu.Item index='4'>li 4</Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <Menu defaultKey={'cat'} mode='vertical'>
          <Menu.Item index='cat'>lili 1</Menu.Item>
          <Menu.Item index='dog' disabled>lili 2</Menu.Item>
          <Menu.SubMenu title='pig' index='pig'>
            <Menu.Item index='pig1'>li 3</Menu.Item>
            <Menu.Item index='pig2'>li 4</Menu.Item>
            <Menu.SubMenu title='li 5' index='5'>
              <Menu.Item index='6'>li 6</Menu.Item>
              <Menu.Item index='7'>li 7</Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu>
        <br />
        
      </header>
    </div>
  );
}

export default App;
