import React from 'react';
import { computeAbs } from '@/pages/flow-chart/utils';

function MoveLine (props) {
  const { edge } = props;
  const { x: x1, y: y1 } = edge.fromPos;
  const { x: x2, y: y2 } = edge.toPos;
  const abs = computeAbs(y1, y2);

  return (
    <g>
      <path
        d={ `M ${ x1 },${ y1 } C ${ x1 },${ y1 + abs } ${ x2 },${ y2 - abs } ${ x2 },${ y2 }` }
        fill="none"
        stroke="blue"
        opacity="0.3"
        strokeWidth={ 1 }
      >
      </path>
    </g>
  );
}

export default MoveLine;
