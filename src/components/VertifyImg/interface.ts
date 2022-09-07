import React from "react";

export interface VertifyImgProps {
  /** canvas 宽度 */
  width?: number;
  /** canvas 高度 */
  height?: number;
  /** 滑块 边长 */
  l?: number;
  /** 滑块 半径 */
  r?: number;
  x?: number;
  y?: number;
  /** classname */
  className?: string;
  /** 是否可见 */
  visible?: boolean;
  /** 滑块文本 */
  text?: string | React.ReactNode;
  errorText?: string | React.ReactNode;
  /** 刷新按钮icon 为icon的地址 */
  refreshIcon?: string;
  /** 图片地址 */
  imgUrl?: string;
  /** 验证成功回调函数 */
  onSuccess?: () => void;
  /** 验证失败回调函数 */
  onFail?: () => void;
  /** 刷新时的回调 */
  onRefresh?: () => void;
}
