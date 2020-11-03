import React, { useCallback, useRef } from 'react';
import Styles from '@/pages/flow-chart/index.less';
import { containerId } from '@/pages/flow-chart/utils';

function DraggableNode (props) {
  const dragRef = useRef(null);
  const { node, dragNode, container, onMoveNode } = props;
  let dragDOM = null;
  const createDrag = (e) => {
    dragDOM = e.target.cloneNode(true);
    dragDOM.className = e.target.className;
    dragDOM.style.position = 'absolute';
    dragDOM.style.transform = `translate(${ node.x }px, ${ node.y }px)`;
    dragDOM.style.opacity = 0.6;
    dragDOM.style.filter = 'alpha(opacity=60)';
    if (container) {
      container.appendChild(dragDOM);
    }
  };

  const onMouseDown = useCallback((e, node) => {
    e.preventDefault();
    const initX = e.clientX;
    const initY = e.clientY;
    const nodeX = node.x;
    const nodeY = node.y;
    createDrag(e);
    const onMouseMove = e => {
      const curX = e.clientX;
      const curY = e.clientY;
      let disX = nodeX + (curX - initX);
      let disY = nodeY + (curY - initY);
      if (disX < 0) disX = 0;
      if (disY < 0) disY = 0;
      dragDOM.style.transform = `translate(${ disX }px, ${ disY }px)`;
      onMoveNode({ ...node, x: disX, y: disY }, e);
    };
    const onMouseUp = e => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (dragDOM && container) {
        container.removeChild(dragDOM);
        dragDOM = null;
      }
      let disX = node.x + e.clientX - initX;
      let disY = node.y + e.clientY - initY;
      if (disX < 0) disX = 0;
      if (disY < 0) disY = 0;
      dragRef.current.style.transform = `translate(${ disX }px, ${ disY }px)`;
      dragNode({ ...node, x: disX, y: disY }, e);
    };
    setTimeout(() => {
      document.onmousemove = null;
      document.onmouseup = null;
      document.onmousemove = onMouseMove;
      document.onmouseup = onMouseUp;
    }, 20);
  }, [node]);

  return (
    <div
      ref={ dragRef }
      style={{
        position: 'absolute',
        transform: `translate(${ node.x }px, ${ node.y }px)`
      }}
      onMouseDown={ e => onMouseDown(e, node) }
    >
      { props.children }
    </div>
  );
}

export default DraggableNode;
