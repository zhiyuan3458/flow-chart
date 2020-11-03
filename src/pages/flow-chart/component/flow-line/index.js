import React from 'react';
import { computeAbs } from '@/pages/flow-chart/utils';

function FlowLine (props) {
  const { edge } = props;
  const { fromPos, toPos } = edge;
  const { x: x1, y: y1 } = fromPos;
  const { x: x2, y: y2 } = toPos;

  const abs = computeAbs(y1, y2);

  return (
    <g>
      <path
        d={ `M ${ x1 },${ y1 } C ${ x1 },${ y1 + abs } ${ x2 },${ y2 - abs } ${ x2 },${ y2 }` }
        fill="none"
        stroke="blue"
        strokeWidth={ 1 }
      >
      </path>
    </g>
  );
}

export default FlowLine;
