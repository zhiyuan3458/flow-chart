import React, { useState } from 'react';
import LeftPanel from './component/left-panel';
import RightPanel from './component/right-panel';
import Styles from './index.less';

function FlowChart () {
  const [nodes, setNodes] = useState([]);
  const addNode = (node) => {
    setNodes(nodes => [...nodes, node]);
  };
  return (
    <div className={ Styles.flowChart }>
      <LeftPanel dropNode={ addNode } />
      <RightPanel nodes={ nodes } />
    </div>
  );
}

export default FlowChart;
