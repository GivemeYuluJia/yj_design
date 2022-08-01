import React from 'react';
import Button from './components/Button';
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
      </header>
    </div>
  );
}

export default App;
