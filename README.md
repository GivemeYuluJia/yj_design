# YJ-Design

### Components
  - AutoComplete
  ```tsx
    interface DataSourceObject {
      value: string;
    }
    type DataSourceType<T = {}> = T & DataSourceObject;
    interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'>  {
      options?: DataSourceType[];
      onSearch?: (str: string) => void;
      onSelect?: (item: string) => void;
      onChange?: (item: string) => void;
      renderOptions?: (item: DataSourceType) => ReactElement;
    }
  ```
  - Button
    ```tsx
      type ButtonSize = 'lg' | 'sm';
      type ButtonType = 'primary' | 'default' | 'danger' | 'link';

      interface BaseButtonProps {
        className?: string,
        /**设置 Button 的禁用 */
        disabled?: boolean,
        /**设置 Button 的尺寸 */
        size?: ButtonSize,
        /**设置 Button 的类型 */
        btnType?: ButtonType,
        children?: React.ReactNode,
        href?: string
      }
    ```
  - Input
    ```tsx
      InputSize = 'lg' | 'sm';
      interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
        className?: string;
        disabled?: boolean;
        size?: InputSize;
        icon?: any;
        prepend?: string | React.ReactElement;
        append?: string | React.ReactElement;
        onChange?: (e: ChangeEvent<HTMLInputElement>) => void
      }
    ```
  - Loading
    - 公司Loding组件学习
    ```tsx
      type LoadingProps = {
        className?: string;
        style?: React.CSSProperties;
        type?: 'spin';
      };
    ```
  - Menu
  - Modal
    - 公司Modal组件学习
    ```tsx
      interface ModalProps {
        visible: boolean;
        closeModal: () => void;
        modalHeader?: React.ReactNode;
        style?: string;
        className?: React.CSSProperties;
        title?: string;
        dialogClassName?: string;
        rightBtn?: React.ReactNode;
      }
    ```
  - Paginator
    - 公司Paginator组件学习
    ```tsx
      interface paginatorProps {
        loadNextPage: () => any;
        element?: React.MutableRefObject<HTMLDivElement | null>;
        Loading?: React.ComponentType<LoadingProps>;
        showLoading?: boolean;
        reverse?: boolean;
        useCapture?: boolean;
      };
    ```
  - Popover
    - 公司Popover组件学习
    ```tsx
      type PopoverProps = {
        content: string | React.ReactNode;
        className?: string;
        style?: React.CSSProperties;
        distance?: number
      }
    ```
  - Progress
    ```tsx
      type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
      interface ProgressProps {
        percent: number;
        strokeHeight?: number;
        showText?: boolean;
        style?: React.CSSProperties;
        theme?: ThemeProps;
      }
    ```
  - Toast
    - 公司Toast组件学习
    ```tsx
      interface ToastProps {
        message: Message;
        opt?: ToastOptions
      }
    ```
  - Upload
    ```tsx
      type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
      interface UploadFile {
        uid: string;
        size: number;
        name: string;
        status?: UploadFileStatus;
        percent?: number;
        originFileObj?: File;
        response?: any;
        error?: any;
      }

      interface UploadProps {
        //  请求url
        action: string;
        // header 请求头
        header?: { [key: string]: any };
        // 发到后台的文件参数名
        name?: string;
        // 上传所需额外参数或返回上传额外参数的方法
        data?: { [key: string]: any};
        // 上传请求时是否携带 cookie
        withCredentials?: boolean; 
        defaultFileList?: UploadFile[];
        // 接受上传的文件类型
        accept?: string;
        // 是否支持多选文件 
        multiple?: boolean;
        // 拖拽
        drag?: boolean;	
        // 上传之前
        beforeUpload?: (file: File) => boolean | Promise<File>;
        // 上传文件改变时的状态 上传中
        onProgress?: (percentage: number, file: UploadFile) => void;
        // 上传文件改变时的状态 成功
        onSuccess?: (data: any, file: UploadFile) => void;
        // 上传文件改变时的状态 失败
        onError?: (err: any, file: UploadFile) => void; 
        // 上传文件改变时的状态 成功或失败 -> 之后会改为上穿中 成功 失败 三个周期调用
        onChange?: (file: UploadFile) => void;
        onRemove?: (file: UploadFile) => void;
      }
    ```
  - VertifyImg
    - 学习参考 https://juejin.cn/search?query=vertify%E7%BB%84%E4%BB%B6

### Tip
  - 样式不够规范
  - 没自定义组件库打包