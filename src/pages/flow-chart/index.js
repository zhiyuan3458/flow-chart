import React, { useCallback, useRef, useState } from 'react';
import LeftPanel from './component/left-panel';
import RightPanel from './component/right-panel';
import FlowLine from '@/pages/flow-chart/component/flow-line';
import Styles from './index.less';
import { getUUID } from '@/pages/flow-chart/utils';
import { arrowHei, setGuideLine } from './utils';

function initMartix () {
  return {
    nodeId: ''
  };
}

function FlowChart () {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [moveEdges, setMoveEdges] = useState([]);
  const [guideLines, setGuideLines] = useState([]);
  const [curMove, setCurMove] = useState(null);
  const [martix, setMartix] = useState(initMartix());
  const latestEdges = useRef({});
  latestEdges.current = edges;
  const addNode = (node) => {
    setNodes(nodes => [...nodes, node]);
  };

  const dragNode = (node, e) => {
    setMoveEdges([]);
    setNodes(nodes => nodes.map(item => item.id === node.id ? node : item));
    const edges = latestEdges.current;
    const edgesTemp = edges.map(item => {
      if (item.fromNodeId === node.id) {
        return {
          ...item,
          id: getUUID(),
          fromPos: { x: node.x + Math.floor(node.width / 2), y: node.y + node.height }
        };
      } else if (item.toNodeId === node.id) {
        return {
          ...item,
          id: getUUID(),
          toPos: { x: node.x + Math.floor(node.width / 2), y: node.y - arrowHei }
        };
      } else {
        return item;
      }
    });
    setEdges(edgesTemp);
  };

  /* 拖拽线 */
  const dragLine = (edge) => {
    setCurMove(edge);
    setEdges(edges => [...edges, edge]);
    setMartix({ nodeId: edge.fromNodeId });
  };

  const onMouseMoveInRight = ({ x, y }) => {
    if (!curMove || !martix.nodeId) return false;
    setEdges(edges => edges.map(edge => edge.id === curMove.id ? { ...edge, toPos: { x, y } } : edge));
  };

  const onCanvasMouseUp = e => {
    setEdges(edges.filter(item => !!item.toNodeId));
    setMartix(initMartix());
    setGuideLines([]);
  };

  /* 添加某条线 */
  const addEdge = ({ toPos, toNodeId }, e) => {
    e.preventDefault();
    e.stopPropagation();
    const edgesTemp = edges.map(edge => {
      if (!edge.toNodeId) {
        return { ...edge, toPos, toNodeId };
      }
      return edge;
    });
    setEdges(edgesTemp);
    setMartix(initMartix());
  };

  /* 移动节点时触发 */
  const onMoveNode = (node, e) => {
    const edges = latestEdges.current;
    let relateEdges = edges.filter(item => item.toNodeId === node.id || item.fromNodeId === node.id);
    relateEdges = relateEdges.map(item => item.fromNodeId === node.id ? ({
        ...item,
        id: getUUID(),
        fromPos: { x: node.x + Math.floor(node.width / 2), y: node.y + node.height }
      })
      :
      ({
        ...item,
        id: getUUID(),
        toPos: { x: node.x + Math.floor(node.width / 2), y: node.y - arrowHei }
      })
    );
    setMoveEdges(relateEdges);
    const guideLines = setGuideLine(node, nodes, e.target);
    setGuideLines(guideLines);
  };

  return (
    <div className={ Styles.flowChart }>
      <LeftPanel dropNode={ addNode } />
      <RightPanel
        nodes={ nodes }
        edges={ edges }
        moveEdges={ moveEdges }
        guideLines={ guideLines }
        dragNode={ dragNode }
        dragLine={ dragLine }
        onMouseMoveInRight={ onMouseMoveInRight }
        onCanvasMouseUp={ onCanvasMouseUp }
        addEdge={ addEdge }
        onMoveNode={ onMoveNode }
      />
    </div>
  );
}

export default FlowChart;
