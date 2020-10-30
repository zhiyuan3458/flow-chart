import React, { useRef } from 'react';
import DraggableNode from '@/pages/flow-chart/component/draggable-node';
import Node from '@/pages/flow-chart/component/node';
import Styles from '../index.less';
import { containerId } from '@/pages/flow-chart/utils';
import FlowLine from '@/pages/flow-chart/component/flow-line';

function RightPanel (props) {
  const rightPanel = useRef(null);
  const { nodes, edges, dragNode, dragLine } = props;

  const onMouseMove = e => {
    const x = e.clientX - rightPanel.current.offsetLeft;
    const y = e.clientY - rightPanel.current.offsetTop;
    props.onMouseMoveInRight({ x, y });
  };

  return (
    <div ref={ rightPanel } id={ containerId } className={ Styles.rightPanel  } onMouseMove={ onMouseMove }>
      {
        nodes.map(node => (
          <DraggableNode
            container={ rightPanel.current }
            key={ node.id }
            node={ node }
            dragNode={ dragNode }
          >
            <Node
              node={ node }
              dragLine={ dragLine }
            />
          </DraggableNode>
        ))
      }
      <svg className={ Styles.canvas } xmlns="http://www.w3.org/2000/svg" version="1.1">
        {
          edges.map(edge => (
            <FlowLine
              key={ edge.id }
              edge={ edge }
            />
          ))
        }
      </svg>
    </div>
  );
}

export default RightPanel;
