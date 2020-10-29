import React, { useEffect, useRef } from 'react';
import Styles from './index.less';
import * as d3 from 'd3';

function DragDemo (props) {
  const svgRef = useRef(null);
  // if (moveRef) {
  //   moveRef.ondragstart = e => {
  //
  //   };
  // }
  const handleDragStart = (event) => {
    // 将拖拽对象id存储在dataTransfer中
    event.dataTransfer.setData("dragContent", event.target.id);
  }

  const drop = (event) => {
    event.preventDefault();
    //把拖拽对象放入目标容器中
    // let data = event.dataTransfer.getData('dragContent');
    // event.target.appendChild(document.getElementById(data))
  }

  const dragover = (event) => {
    event.preventDefault();
  }

  useEffect(() => {
    const link = d3.linkHorizontal()
      .x(function(d) { return d.y; })
      .y(function(d) { return d.x; });
    const selectedDrag = d3.select('g.drawingLinkGG_wrapper');
    selectedDrag.append('path')
                .attr('d', link)
                .source(function (d) {
                  console.log('5646467d');
                  console.log(d);
                  return [100, 100];
                })
                .target(function (d) {
                  return d.target;
                });
  }, []);

  return (
    <div className={ Styles.Container }>
      <svg id='svg' ref={ svgRef } width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
           xmlnsXlink="http://www.w3.org/1999/xlink"
           version="1.1"
      >
        <g id="drawingLinkGG" key='drawingLinkGG' className='drawingLinkGG_wrapper'></g>
      </svg>
    </div>
  );
}

export default DragDemo;
