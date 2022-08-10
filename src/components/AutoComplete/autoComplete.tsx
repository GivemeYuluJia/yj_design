import React, { ReactElement, useEffect, useRef, useState } from "react";
import Input from "../Input";
import { InputProps } from "../Input/input";
import Loading from '../Loading/loading';
import useClickOutSide from "../../hooks/useClickOutSide";
import classNames from 'classnames';

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'>  {
  options?: DataSourceType[];
  onSearch?: (str: string) => void;
  onSelect?: (item: string) => void;
  onChange?: (item: string) => void;
  renderOptions?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    options = [],
    onSearch,
    onSelect,
    value,
    onChange,
    renderOptions,
    style,
    ...restProps
  } = props;

  const [ inputValue, setInputValue ] = useState<string>(value as string);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ showDropdown, setShowDropdown] = useState<boolean>(false);
  const [ active, setActive ] = useState<boolean>(false);
  const [ highlightIndex, setHighlightIndex ] = useState<number>(0);
  const [ contentClassName, setContentClassName] = useState<string>('');

  const autoComplateRef = useRef<HTMLDivElement>(null);

  const onTransitionEnd = () => {
    console.log('complete');
    if(contentClassName !== 'optioncontentEnterDone' && contentClassName !== 'optionContentExitDone') {
      setContentClassName(showDropdown ? 'optioncontentEnterDone' : 'optionContentExitDone')
    }
    if (!showDropdown) {
      setActive(false);
    }
  };

  useClickOutSide(autoComplateRef, () => { showDropdown && setShowDropdown(false) });
  useEffect(() => {
    if(loading) {
      setLoading(false);
    }
    if(highlightIndex) {
      setHighlightIndex(0);
    }
  }, [options]);

  useEffect(() => {
    if(showDropdown) {
      setActive(true);
      setContentClassName('optionContentEnter');
      setTimeout(() => {
        setContentClassName('optionContentEnterActive');
      });
    } else {
      setContentClassName('optionContentExit');
      setTimeout(() => {
        setContentClassName('optionContentExitActive');
      });
    }
  }, [showDropdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!showDropdown) {
      setShowDropdown(true);
    };
    onChange && onChange(e.target.value);
    setInputValue(e.target.value);
    setLoading(true)
    onSearch && onSearch(e.target.value);
    if(e.target.value === '') {
      setShowDropdown(false);
      setLoading(false);
    }
  }

  const handleSelect = (item: DataSourceType) => {
    setShowDropdown(false);
    onSelect && onSelect(item.value);
    setInputValue(item.value);
    onChange && onChange(item.value);
  }

  const hightlight = (index: number) => {
    if(index < 0) index = 0;
    if(index >= options.length) {
      index = options.length - 1
    }
    setHighlightIndex(index);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      //  回车键
      case 13: 
        if(options[highlightIndex]) {
          handleSelect(options[highlightIndex])
        }
        break;
      // 向上
      case 38:
        hightlight(highlightIndex - 1);
        break;
      // 向下
      case 40:
        hightlight(highlightIndex + 1);
        break;
      // 回撤
      case 27:
        setShowDropdown(false);
        break;
      default:
        break;
    }
  }

  const handleMouse = (e: React.MouseEvent, index: number) => {
    if(highlightIndex === index) return;
    e.preventDefault();
    setHighlightIndex(index);
  }

  const renderTemplate = (item: DataSourceType) => renderOptions ? renderOptions(item) : item.value;

  const generateDropdown = () => {
    return (
      <ul 
        className={classNames('yj-options-list', contentClassName, {
          'is-hidden': !showDropdown && !active
        })}
        onTransitionEnd={onTransitionEnd}
      >
        { loading ? 
          <div className="options-loading-icon">
            <Loading />
          </div>
          :
          !options.length ? 
            <div className="notData">暂无数据</div>
            :
            options.map((option, index) => (
              <li 
                className={classNames('options-item', {
                  'is-active': index === highlightIndex
                })}
                key={index}
                onClick={() => handleSelect(option)}
                onMouseEnter={(e) => handleMouse(e, index)}
                onTransitionEnd={(e) => {e.stopPropagation()}}
              >
                {renderTemplate(option)}
              </li>
            ))
        }
      </ul>
    )
  }
  // console.log(contentClassName, 'contentClassName', 'showDropdown', showDropdown, 'active', active)
  return (
    <div 
      className="yj-auto-complete"
      ref={autoComplateRef}
      style={style}
    >
      <Input 
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => { e.target.value !== '' && !showDropdown && !active && setShowDropdown(true) }}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete;