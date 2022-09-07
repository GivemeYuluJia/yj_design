import React, { useEffect, useRef, useState, useCallback } from 'react';
import Button from './components/Button';
import Menu from './components/Menu';
import Modal from './components/Modal';
import Input from './components/Input';
import { CloseBtnIcon } from './icons';
import './styles/index.scss'
import AutoComplete from './components/AutoComplete';
import { DataSourceType } from './components/AutoComplete/autoComplete';
import { Popover } from './components/Popover/Popover';
import request from './utils/request';
import Upload from './components/Upload/upload';
import Paginator from './components/Paginator/paginator';
import { toast } from './components';
import { VertifyImg } from './components';
import { flushSync } from 'react-dom';

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
  const [ refreshing, setRefreshing ] = useState<boolean>(false);
  const [ list, setList ] = useState<any[]>([
    { key: 1, value: 1 },
    { key: 2, value: 2 },
    { key: 3, value: 3 },
    { key: 4, value: 4 },
    { key: 5, value: 5 },
    { key: 6, value: 6 },
    { key: 7, value: 7 },
    { key: 8, value: 8 },
    { key: 9, value: 9 },
    { key: 10, value: 10 },
    { key: 11, value: 11 },
    { key: 12, value: 12 },
    { key: 13, value: 13 },
    { key: 14, value: 14 },
    { key: 15, value: 15 },
  ]);
  // const [ loading, setLoading ] = useState<boolean>(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const defaultFileList: any[] = [
    { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
    { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
    { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
  ];
  // const scrollBottom = useCallback((behavior: 'auto' | 'smooth' = 'auto') => {
  //   messagesEndRef.current?.scrollIntoView({ behavior });
  // }, []);
  // 高度不够时自动拉取下一页，解决thread数据多不能加载的问题
  // const autoLoadMoreFromScrollHeight = useCallback(async () => {
  //   if (listRef.current && list !== null) {
  //     const { scrollHeight, clientHeight } = listRef.current;
  //     if (scrollHeight === clientHeight) {
  //       await loadNextPage();
  //       scrollBottom();
  //     }
  //   }
  // }, [list]);
  // useEffect(() => {
  //   // autoLoadMoreFromScrollHeight();
  // }, [autoLoadMoreFromScrollHeight]);
  useEffect(() => {
    // if (!loading) {
      // scrollBottom();
    // }
  }, []);

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
  const post = async () => {
    // flushSync(async() => {
      setRefreshing(true);
      await new Promise((resolve) => {
        // setTimeout(() => {
          setList(pre => {
            return [
              ...pre,
              { key: pre.length + 1, value: pre.length + 1},
              { key: pre.length + 2, value: pre.length + 2 },
              { key: pre.length + 3, value: pre.length + 3},
              { key: pre.length + 4, value: pre.length + 4 },
              { key: pre.length + 5, value: pre.length + 5},
              { key: pre.length + 6, value: pre.length + 6 },
            ]
          });
          resolve('a');
        // },300)
      })
    // })
    
    setRefreshing(false);
  }
  const loadNextPage = async() => {
    await post();
    return false;
  }
  let num1 = 1;
  const handleToast = () => {
    toast.success('hahh' + (num1++),)
  }
  console.log(list,'list', refreshing);
  return (
    <div className="App">
      <button onClick={() => handleToast()}>click</button>
      {num + '-' + num}
      <div style={{ height: '10px' }}>123</div>
      <div style={{ marginLeft: '50px'}}>
        <Popover content='hello'>
          hello
        </Popover>
      </div>
      <VertifyImg imgUrl="./vertify.png" />
      <header className="App-header">
        {/* <Button>default</Button>
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
        <br /> */}
        {/* <Upload 
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
        </Upload> */}
        <br />
        <div 
          ref={listRef} 
          style={{
            height: '500px', 
            overflowY: 'auto',
            border: '1px solid red'
          }}
        >
          <Paginator element={listRef} showLoading={refreshing} loadNextPage={loadNextPage}>
            <div>
              {list.map(item => {
                return (
                  <div key={item.key} style={{ padding: '16px 8px', borderBottom: '1px solid black'}}>
                    {item.key} - {item.value}
                  </div>
                )
              })}
            </div>
          </Paginator>
          <div ref={messagesEndRef} />
        </div>
      </header>
    </div>
  );
}

export default App;
