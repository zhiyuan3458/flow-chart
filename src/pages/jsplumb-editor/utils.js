import Styles from '@/pages/jsplumb-editor/index.less';
import React from 'react';
import * as d3 from 'd3';

const mockData = {
  nodes: [
    {
      id: 123,
      x: 20,
      y: 30,
      w: 160,
      h: 32,
      icon: '图标',
      label: 'item1'
    }
  ]
};

/* 节点参数 */
export const operatorConts = {
  width: 160,//宽度
  height: 32,//高度
};

/* 节点的连接点的参数 */
export const dotCons = {
  width: 8,
  height: 8,
  left: operatorConts.width - 8,
  top: Math.floor(operatorConts.height / 2),
};
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/* 获取容器的距离整个页面的left，top值 */
function getContainerCont (id) {
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

export const addNode = ({ x, y, w, h, label, icon }) => {
  const id = guid();
  const obj = { id, x, y, w, h, label, icon };
  mockData.nodes.push(obj);

  function clickAnchor (e) {
    e.preventDefault();
    e.stopPropagation();

    const move = e => {
      const { x: posX2, y: posY2 } = getOffset(e);
      drawLink({
        posX1: x + dotCons.left,
        posY1: y + dotCons.top,
        posX2,
        posY2
      });
    };

    const up = e => {
      console.log(e);
      e.preventDefault();
      //移除mousemove mouseup事件
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  return mockData.nodes.map(item => (
    <g
      id={ item.id }
      key={ item.id }
      transform={
        `translate(${ item.x },${ item.y }) scale(1,1)`
      }>
      <foreignObject width={ item.w } height={ item.h }>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          className={ Styles.Item }
          style={{ width: item.w - 8 }}

        >
          <span>{ item.icon }</span>
          <span>{ item.label }</span>
          <span
            className={ `${ Styles.CircleIcon } ${ Styles.LeftIcon }` }
            onMouseDown={ e => clickAnchor(e) }
          >
          </span>
        </div>
      </foreignObject>
    </g>
  ));
};

export const getNodes = (arr) => {

  arr.map(item => {
    return (
      <g>
        <g id="drawingLinkGG" ref="drawingLinkGG" key='drawingLinkGG' className='drawingLinkGG_wrapper' />
        <g
          id={ item.id }
          key={ item.id }
          transform={
            `translate(${ item.x },${ item.y }) scale(1,1)`
          }>
          <foreignObject width={ item.w } height={ item.h }>
            <div className={ Styles.Item }>
              <span>{ item.icon }</span>
              <span>{ item.label }</span>
              <span className={ Styles.CircleIcon } on={ e => drawLink(e).bind(this) }></span>
            </div>
          </foreignObject>
        </g>
      </g>
    )
  });
};

export const drawLink = (link) => {
  const drawingLinkGG_wrapper = d3.select('g.drawingLinkGG_wrapper');
  drawingLinkGG_wrapper.html(null);
  if (link && link.posX1) {
    let linkData = d3.linkVertical()
      .source(function (d) {
        return [link.posX1, link.posY1]
      })
      .target(function (d) {
        return [link.posX2, link.posY2]
      });
    drawingLinkGG_wrapper.append('path')
      .attr('d', linkData)
      .attr('class', Styles.Line);
  }
};
