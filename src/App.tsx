import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import Menu from './components/Menu';
import Modal from './components/Modal';
import Input from './components/Input';
import { CloseBtnIcon } from './icons';
import './styles/index.scss'
import AutoComplete from './components/AutoComplete';
import Loading from './components/Loading/loading';
import { DataSourceType } from './components/AutoComplete/autoComplete';
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
let timer: any;
function App() {
  const [ visible, setVisible ] = useState(false);
  const [num, setNum] = useState(0);

  const [value, setValue] = useState('');
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);

  const hide = () => {
    setVisible(false);
  }
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }
  const handleChange = (e: any) => {
    console.log(e, 'e')
  }
  const onSearch = (searchText: string) => {
    clearTimeout(timer);
    // setLoading(true);
    timer = setTimeout(() => {
      if(searchText) {
        handleFetch(searchText).then(res => {
          setOptions(res);
          // setLoading(false);
        })
      }
    }, 300)
  };

  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };
  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <div>Name: {itemWithGithub.value}</div>
      </>
    )
  }
  return (
    <div className="App">
      {num + '-' + num}
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
        <button onClick={() => setVisible(true)}>click</button>
        <Modal visible={visible} closeModal={hide}>
          <div>it is my context</div>
        </Modal>
        <br />
        <Input type='text' prepend="https://" append=".com" />
        <Input type='text' size='lg' placeholder="sizes" icon={<CloseBtnIcon />}/>
        <Input type='text' size='sm' placeholder="sizes" />
        <br />
        <AutoComplete 
          value={value}
          options={options}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={onSearch}
          onChange={onChange}
          // loading={loading}
          renderOptions={renderOption}
        />
        <br />
        <div style={{"height": '300px', "width": '200px'}}>
123
        </div>
      </header>
    </div>
  );
}

export default App;
