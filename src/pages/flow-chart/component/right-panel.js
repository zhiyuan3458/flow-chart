import React from 'react';
import Styles from '../index.less';

function RightPanel (props) {
  const { nodes } = props;

  return (
    <div className={ Styles.rightPanel }>
      {
        nodes.map(node => (
          <div
            id={ node.id }
            key={ node.id }
            className={ Styles.rect }
            style={{
              position: 'absolute',
              transform: `translate(${ node.x }px, ${ node.y }px)`
            }}
          >
            { node.name }
          </div>
        ))
      }
    </div>
  );
}

export default RightPanel;
