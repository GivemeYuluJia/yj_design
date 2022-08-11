import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import Menu from './components/Menu';
import Modal from './components/Modal';
import Input from './components/Input';
import { CloseBtnIcon } from './icons';
import './styles/index.scss'
import AutoComplete from './components/AutoComplete';
import { DataSourceType } from './components/AutoComplete/autoComplete';

import request from './utils/request';
import Progress from './components/Progress';
import Upload from './components/Upload/upload';

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
  const defaultFileList: any[] = [
    { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
    { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
    { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
  ]
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
  const url = "https://jsonplaceholder.typicode.com/posts";
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const newFile = files && new File([files[0]], 'new_name.docx', {type: files[0].type})
    console.log(newFile, '1');
    if(files) {
      const uploadFile = files[0];
      const formData = new FormData();
      formData.append(uploadFile.name, uploadFile);
      console.log(formData.get(uploadFile.name))
      request.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (e) => {
          console.log(e, 'e')
        }
      }).then(resp => {
        console.log(resp, formData);
      }, res => console.log(res, formData))
    }
    
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
        <Upload 
          action="https://jsonplaceholder.typicode.com/posts"
          defaultFileList={defaultFileList}
          onChange={(file) => console.log(file, 'change')}
          // beforeUpload={(file) => {console.log(file, 'before'); return true}}
          onProgress={(percentage, file) => console.log(percentage, file, 'progress')} 
          onSuccess={(data, file) => console.log(data, file, 'success')}
          onError={(err, file) => console.log(err, file, 'error')}
          multiple={true}
          drag
        >
          <br/>
          <p>Drag file over to upload</p>
        </Upload>
      </header>
    </div>
  );
}

export default App;
