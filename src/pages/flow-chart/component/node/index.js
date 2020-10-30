import React, { useRef } from 'react';
import Styles from '@/pages/flow-chart/index.less';
import { getUUID } from '@/pages/flow-chart/utils';

function Node (props) {
  const nodeRef = useRef(null);
  const { node } = props;

  const onMouseDown = (e, node) => {
    e.preventDefault();
    e.stopPropagation();
    const pointX = Math.floor(e.target.offsetWidth / 2);
    const pointY = Math.floor(e.target.offsetHeight / 2);
    const initX = node.x + pointX + e.target.offsetLeft;
    const initY = node.y + pointY + e.target.offsetTop;
    const line = {
      id: getUUID(),
      nodeId: node.id,
      nodeName: node.name,
      fromPos: {
        x: initX,
        y: initY
      },
      toPos: {
        x: initX,
        y: initY
      }
    };
    props.dragLine(line);
  };

  return (
    <div
      ref={ nodeRef }
      id={ node.id }
      className={ Styles.rect }
    >
      <span
        className={ `${ Styles.point } ${ Styles.upPoint }` }
      >
      </span>
      { node.name }
      <span
        className={ `${ Styles.point } ${ Styles.downPoint }` }
        onMouseDown={ (e) => onMouseDown(e, node) }
      >
      </span>
    </div>
  );
}

export default Node;
