import React, { useState } from 'react';
import LeftPanel from './component/left-panel';
import RightPanel from './component/right-panel';
import FlowLine from '@/pages/flow-chart/component/flow-line';
import Styles from './index.less';

function FlowChart () {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [curMove, setCurMove] = useState(null);
  const addNode = (node) => {
    setNodes(nodes => [...nodes, node]);
  };

  const dragNode = (node) => {
    setNodes(nodes => nodes.map(item => item.id === node.id ? node : item));
  };

  /* 拖拽线 */
  const dragLine = (edge) => {
    setCurMove(edge);
    setEdges(edges => [...edges, edge]);
  };

  const onMouseMoveInRight = ({ x, y }) => {
    if (!curMove) return false;
    setEdges(edges => edges.map(edge => edge.id === curMove.id ? { ...edge, toPos: { x, y } } : edge));
  };

  return (
    <div className={ Styles.flowChart }>
      <LeftPanel dropNode={ addNode } />
      <RightPanel
        nodes={ nodes }
        edges={ edges }
        dragNode={ dragNode }
        dragLine={ dragLine }
        onMouseMoveInRight={ onMouseMoveInRight }
      />
    </div>
  );
}

export default FlowChart;
