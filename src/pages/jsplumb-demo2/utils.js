import React from 'react';
let index = 1;

const operatorConts = {
  width: 160,
  height: 32
};

export function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/* 获取容器的距离整个页面的left，top值 */
export function getContainerCont (id) {
  const container = document.getElementById(id);
  if (!container) return null;
  const { top, left } = container.getBoundingClientRect();
  return { top, left };
}

/* 获取容器中的元素距离容器的left，top值 */
export const getOffset = (event) => {
  const { top, left } = getContainerCont('LZY');
  const { pageX, pageY } = event;
  return { x: pageX - left, y: pageY - top };
};

/* 添加节点 */
export const addNodes = e => {
  const { x, y } =  getOffset(e);
  const obj = {
    id: guid(),
    x,
    y,
    width: operatorConts.width,
    height: operatorConts.height,
    icon: index,
    label: 'item' + (index + 1)
  };
  return obj;
};
