import React from 'react';
import ReactDOM from 'react-dom';
import Toaster from './Toaster';

import { Message, ToastType, ToastOptions, ToastHandler } from './type';

const createHandler = (type?: ToastType): ToastHandler => {
  return (message, opt) => {
    let parentNode = document.querySelector('#toast-wrapper');

    if(!parentNode) {
      parentNode = document.createElement('div');
      parentNode.setAttribute('id', 'toast-wrapper');
      parentNode.classList.add('toast-wrapper');
      document.body.append(parentNode);
    }
    let toast = document.createElement('div');
    parentNode.appendChild(toast);
    ReactDOM.render(<Toaster message={message} type={type} {...opt} />, toast)
    setTimeout(() => {
      parentNode?.removeChild(parentNode?.childNodes[0]);
      if (parentNode?.childNodes.length === 0) {
        document.body.removeChild(parentNode);
      }
    }, opt?.duration || 2000)
  }
}

export const toast = (message: Message, opt?: ToastOptions) => createHandler()(message, opt);

toast.error = createHandler('error');
toast.success = createHandler('success');
toast.loading = createHandler('loading');