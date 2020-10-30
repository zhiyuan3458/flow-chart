import React, { useRef } from 'react';
import Styles from '../index.less';
import { dragGrp } from '@/pages/flow-chart/mock';
import { getUUID } from '@/pages/flow-chart/utils';

function LeftPanel (props) {
  const leftPanel = useRef(null);
  let dragDOM = null;

  const createDrag = (e) => {
    dragDOM = e.target.cloneNode(true);
    dragDOM.className = e.target.className;
    dragDOM.style.opacity = 0.6;
    dragDOM.style.position = 'fixed';
    dragDOM.style.filter = 'alpha(opacity=60)';
    document.body.appendChild(dragDOM);
  };

  /* 开始拖拽时 */
  const onMouseDown = (e, node) => {
    e.preventDefault();
    createDrag(e);
    const leftPanelTop = leftPanel.current.offsetTop;
    const leftPanelWidth = leftPanel.current.offsetWidth;
    const tempX = e.clientX - e.target.offsetLeft;
    const tempY = e.clientY - e.target.offsetTop;
    const width = e.target.offsetWidth;
    const height = e.target.offsetHeight;

    function isInRight (e) {
      const left = e.clientX - tempX - leftPanelWidth;
      const top = e.clientY - tempY - leftPanelTop;
      return left + leftPanelWidth > leftPanelWidth && top > leftPanelTop;
    }

    const move = e => {
      const curX = e.clientX;
      const curY = e.clientY;
      dragDOM.style.left = `${ curX -tempX }px`;
      dragDOM.style.top = `${ curY - tempY }px`;
      dragDOM.style.borderColor = isInRight(e) ? 'green' : 'red';
    };

    const mouseup = e => {
      e.preventDefault();
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', mouseup);
      if (dragDOM) {
        document.body.removeChild(dragDOM);
        dragDOM = null;
      }
      const left = e.clientX - tempX - leftPanelWidth;
      const top = e.clientY - tempY - leftPanelTop;
      if (left + leftPanelWidth < leftPanelWidth || top < leftPanelTop) {
        return false;
      }
      props.dropNode({
        ...node,
        id: getUUID(),
        width,
        height,
        x: left,
        y: top
      });
    };

    setTimeout(() => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', mouseup);
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', mouseup);
    }, 20);
  };

  return (
    <div ref={ leftPanel } className={ Styles.leftPanel }>
      {
        dragGrp.map(item => (
          <div
            className={ Styles.rect }
            key={ item.id }
            onMouseDown={ e => onMouseDown(e, item) }
          >
            { item.name }
          </div>
        ))
      }
    </div>
  );
}

export default LeftPanel;
