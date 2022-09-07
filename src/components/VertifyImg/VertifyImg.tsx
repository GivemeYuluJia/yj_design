import React, { FC, useState, useRef, useEffect } from "react";
import { VertifyImgProps } from "./interface";
import { getRandomNumberByRange, sum, square } from './tools';

import cx from "classnames";

export const VertifyImg: FC<VertifyImgProps> = (props) => {
  const {
    width = 320,
    height = 160,
    l = 42,
    r = 9,
    x,
    y,
    className,
    imgUrl,
    text = '请滑动验证',
    errorText = '请在试一次',
    refreshIcon = 'http://cdn.dooring.cn/dr/icon12.png',
    visible = true,
    onSuccess,
    onFail,
    onRefresh,
  } = props;
  const [ isLoading, setIsLoding ] = useState(false);
  const [ sliderLeft, setSliderLeft ] = useState(0);
  const [ sliderClass, setSliderClass ] = useState('yj-sliderContainer');
  const [ textTip, setTextTip ] = useState(text);

  const canvasRef = useRef<any>(null);
  const blockRef = useRef<any>(null);
  const imgRef = useRef<any>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const originXRef = useRef<number>(0);
  const originYRef = useRef<number>(0);
  const trailRef = useRef<number[]>([]);
  const xRef = useRef<number>(0);
  const yRef = useRef<number>(0);
  const PI = Math.PI;
  // 滑块实际边长
  const L = l + r * 2 + 3;

  // 获取随机imgUrl
  const getRandomImgSrc = () => {
    return (
      imgUrl ||
      `https://picsum.photos/id/${getRandomNumberByRange(
        0,
        1084,
      )}/${width}/${height}`
    );
  };
  // 图片创建
  const createImg = (onload: () => void) => {
    // img标签创建
    const img = new Image();
    // 跨域设置
    img.crossOrigin = "Anonymous"
    img.onload = onload;
    img.onerror = () => {
      (img as any).setSrc(getRandomImgSrc());
    }
    (img as any).setSrc = (src: string) => {
      const isIE = window.navigator.userAgent.indexOf('Trident') > -1;
      if(isIE) {
        const xhr = new XMLHttpRequest();
        xhr.onloadend = (e: any) => {
          // FileReader 仅支持IE10+
          const file = new FileReader();
          file.readAsDataURL(e.target.response);
          file.onloadend = () => {
            img.src = e.target?.result;
          }
        }
        xhr.open('GET', src);
        xhr.responseType = 'blob';
        xhr.send();
      } else {
        img.src = src;
      }
    }
    (img as any).setSrc(getRandomImgSrc());
    return img;
  }

   /** 画出一个以画路径的方式画canvas */
   const drawPath = (
    ctx: any,
    x: number,
    y: number,
    operation: 'fill' | 'clip',
  ) => {
    // 通过清空子路径列表开始一条新路径。当您要创建新路径时调用此方法。
    ctx.beginPath();
    // 将新子路径的起点移动到 (x, y) 坐标。
    ctx.moveTo(x, y);
    // 将圆弧添加到当前路径。
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
    // // 用直线将当前子路径中的最后一个点连接到指定的 (x, y) 坐标。
    ctx.lineTo(x + l, y);
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
    ctx.lineTo(x + l, y + l);
    ctx.lineTo(x, y + l);
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
    ctx.lineTo(x, y);
    // 设置或返回当前的线条宽度
    ctx.lineWidth = 2;
    // 设置或返回用于填充绘画的颜色、渐变或模式
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    // 设置或返回用于笔触的颜色、渐变或模式
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.stroke();
    ctx.globalCompositeOperation = 'destination-over';
    operation === 'fill' ? ctx.fill() : ctx.clip();
  };

  const draw = (img: HTMLImageElement) => {
    // getContext获取canvas画布的绘图环境
    const canvasCtx = canvasRef.current.getContext('2d');
    const blockCtx = blockRef.current.getContext('2d');

    xRef.current = x ? x : getRandomNumberByRange(L + 10, width - (L + 10));
    yRef.current = y
      ? y
      : getRandomNumberByRange(10 + r * 2, height - (L + 10));
      console.log(xRef, yRef)
    drawPath(canvasCtx, xRef.current, yRef.current, 'fill');
    drawPath(blockCtx, xRef.current, yRef.current, 'clip');
    // 画入图片
    canvasCtx.drawImage(img, 0, 0, width, height);
    blockCtx.drawImage(img, 0, 0, width, height);
    console.log(xRef, yRef)
    // 提取滑块并放到最左边
    const y1 = yRef.current - r * 2 - 1;
    // 返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据
    const ImageData = blockCtx.getImageData(xRef.current - 3, y1, L, L);
    blockRef.current.width = L;
    blockCtx.putImageData(ImageData, 0, y1);
  }

  const initImg = () => {
    const img = createImg(() => {
      setIsLoding(false);
      draw(img)
    });
    imgRef.current = img
  }

  const reset = () => {
    const canvasCtx = canvasRef.current.getContext('2d');
    const blockCtx = blockRef.current.getContext('2d');

    setSliderLeft(0);
    setSliderClass('yj-sliderContainer');

    blockRef.current.width = width;
    blockRef.current.left = 0 + 'px';

    canvasCtx.clearRect(0, 0, width, height);
    blockCtx.clearRect(0, 0, width, height);
    setIsLoding(true);
    imgRef.current.setSrc(getRandomImgSrc());
  }

  const handleRefresh = () => {
    reset();
    typeof onRefresh === 'function' && onRefresh();
  }

  const handleDragStart = (e: any) => {
    originXRef.current = e.clientX || e.touches[0].clientX;
    originYRef.current = e.clientY || e.touches[0].clientY;
    console.log(e.clientX, e.clientY, 'down')
    isMouseDownRef.current = true;
  }

  const handleDragMove = (e: any) => {
    if(!isMouseDownRef.current) return false
    e.preventDefault();
    const eventX = e.clientX || e.touches[0].clientX;
    const eventY = e.clientY || e.touches[0].clientY;
    const moveX = eventX - originXRef.current;
    const moveY = eventY - originYRef.current;
    // console.log(moveX, 'moveX')
    if(moveX < 0 || moveX + 38 >= width) return false
    setSliderLeft(moveX);
    const blockLeft = ((width - 40 - 20) / (width - 40)) * moveX;
    blockRef.current.style.left = blockLeft + 'px';

    setSliderClass('yj-sliderContainer yj-sliderContainer_active');
    trailRef.current.push(moveY);
  }

  const handleDragEnd = (e: any) => {
    if (!isMouseDownRef.current) return false;
    isMouseDownRef.current = false;
    const eventX = e.clientX || e.changedTouches[0].clientX;
    if (eventX === originXRef.current) return false;
    setSliderClass('yj-sliderContainer');
    const { spliced, verified } = verify();
    if (spliced) {
      if (verified) {
        setSliderClass('yj-sliderContainer yj-sliderContainer_success');
        typeof onSuccess === 'function' && onSuccess();
      } else {
        setSliderClass('yj-sliderContainer yj-sliderContainer_fail');
        setTextTip(errorText);
        reset();
      }
    } else {
      setSliderClass('yj-sliderContainer yj-sliderContainer_fail');
      setTextTip(errorText);
      typeof onFail === 'function' && onFail();
      setTimeout(reset.bind(this), 1000);
    }
  }

  const verify = () => {
    const arr = trailRef.current; // 拖动时y轴的移动距离
    const average = arr.reduce(sum) / arr.length;
    const deviations = arr.map(x => x - average);
    const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
    const left = parseInt(blockRef.current.style.left);
    return {
      spliced: Math.abs(left - xRef.current) < 10,
      verified: stddev !== 0, // 简单验证拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
    };
  };

  useEffect(() => {
    if(visible) {
      imgRef.current ? reset() : initImg()
    }
  }, [visible])

  return (
    <div 
      className={cx('yj-vertifyImgWrap', className)}
      style={{
        width: width,
        margin: "0 auto",
        display: visible ? '' : 'none'
      }}
      onMouseMove={handleDragMove}
      onTouchMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
    >
      <div className="yj-canvasArea">
        <canvas ref={canvasRef} width={width} height={height} />
        <canvas
          ref={blockRef}
          className="block"
          width={width}
          height={height}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        />
      </div>
      <div 
        className={sliderClass}
        style={{
          width: width
        }}
      >
        <div 
          className="yj-sliderMask"
          style={{ width: sliderLeft }}
        >
          <div 
            className="slider"
            style={{ left: sliderLeft  }}
            onMouseDown={handleDragStart}
          >
            <div className="sliderIcon">&rarr;</div>
          </div>
        </div>
        <div className="sliderText">{textTip}</div>
      </div>
      <div
        className="refreshIcon"
        onClick={handleRefresh}
        style={{ backgroundImage: `url(${refreshIcon})` }}
      />
      <div
        className="loadingContainer"
        style={{
          width: width + 'px',
          height: height + 'px',
          display: isLoading ? '' : 'none',
        }}
      >
        <div className="loadingIcon"></div>
        <span>加载中...</span>
      </div>
    </div>
  );
}