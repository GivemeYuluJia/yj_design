import React, { useCallback, useEffect } from "react";
import classNames from "classnames";

import DefaultLoading, { LoadingProps } from "../Loading/loading";
import { flushSync } from "react-dom";

export interface paginatorProps {
  loadNextPage: () => any;
  element?: React.MutableRefObject<HTMLDivElement | null>;
  Loading?: React.ComponentType<LoadingProps>;
  showLoading?: boolean;
  reverse?: boolean;
  useCapture?: boolean;
};

const UnMemoizedPaginator: React.FC<React.PropsWithChildren<paginatorProps>> = (props) => {
  const {
    children,
    element,
    showLoading = false,
    Loading = DefaultLoading,
    loadNextPage,
    reverse = false,
    useCapture = true,
  } = props;
  const handleScroll = useCallback(async () => {
    if (element && element.current) {
      const el = element.current;
      // scrollHeight整体高度, clientHeight可见区域高度, scrollTop滑动高度
      const { scrollHeight, clientHeight, scrollTop } = el;
      if (reverse && scrollTop === 0) {
        // console.log(el.scrollTop, 'before', el.scrollHeight, scrollHeight)
        const hasMore = await loadNextPage();
        setTimeout(() => {
          !hasMore && (el.scrollTop = getCurrentHeight(el) - scrollHeight);
        })
      }
      if (!reverse && scrollHeight - scrollTop === clientHeight) {
        loadNextPage();
      }
    }
  }, []);

  const getCurrentHeight = useCallback((el: HTMLDivElement) => {
    return el.scrollHeight;
  }, [])  
  
  useEffect(() => {
    if (!element || !element.current) {
      return;
    };
    const scrollElement = element.current;
    getCurrentHeight(scrollElement);
    scrollElement.addEventListener('scroll', handleScroll, useCapture);
    return () => {
      scrollElement.removeEventListener('scroll', handleScroll, useCapture);
    };
  }, []);
  
  const Tip = useCallback(() => {
    if(showLoading) {
      console.log('tip')
      return (
        <Loading
          className={classNames('loadBtn', {
            'btnPosition': reverse,
          })}
          type="spin"
        />
      );
    };
    console.log(null);
    return null;
  }, [showLoading])

  return (
    <div
      className={classNames('yj-paginatorContainer', {
        'paddingTop': reverse
      })}
    >
      {!reverse && children}
      <Tip />
      {reverse && children}
    </div>
  )
}

export default React.memo(UnMemoizedPaginator);