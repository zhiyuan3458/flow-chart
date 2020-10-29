import React from 'react';
import Style from './index.less';
import Jsplumb from 'jsplumb';
import mockData from './mock-data';
import jsplumbData from '@/utils/jsplumb-data';

let instance = null;
const jsplumb = Jsplumb.jsPlumb;

/* global jsPlumb */
export default class JsplumbDemo4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    };
  }

  componentDidMount() {
    console.log(54645);
    jsplumb.ready(() => {
      instance = jsplumb.getInstance();
      instance.setContainer("LZY");
      instance.reset();
      // jsplumbData.edges.forEach(item => {
      //   instance.connect({
      //     ...defaultSetting,
      //     source: item.source,
      //     target: item.target
      //   });
      // });
      this.setState({
        nodes: mockData.nodes,
        edges: mockData.edges
      });
      this.state.edges.forEach(edge => {
          instance.connect({
            source: edge.source,
            target: edge.target
          });
      });

      mockData.nodes.forEach(item => {
        instance.draggable(item.id);
      });
    });
  }

  render () {
    const nodes = this.state.nodes;
    return (
      <div id="LZY" className={ Style.Container }>
        {
          nodes.map(v => (
            <div
              className={ Style.Item }
              key={ v.id }
              id={ v.id }
            >
              { v.label }
            </div>
          ))
        }
      </div>
    );
  }
}
