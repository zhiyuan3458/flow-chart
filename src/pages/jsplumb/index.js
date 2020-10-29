import React from 'react';
import jsplumbData from '@/utils/jsplumb-data';
import Style from './index.css';
import Jsplumb from 'jsplumb';

const jsplumb = Jsplumb.jsPlumb;
let instance = null;

export default class JPChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      edges: []
    };
  }

  componentDidMount() {
    const defaultSetting = {
      detachable: false,
      endpoint: 'Blank',
      endpointStyle: { fill: '#08B375', outlineStroke: '#08B375', outlineWidth: 2 },
      connector: ['Straight'],
      anchor: ['Left', 'Right'],
      logEnabled: true,
      paintStyle: { stroke: 'lightgray', strokeWidth: 1 },
      overlays: [ ['Arrow', { width: 12, length: 12, location: 1 }] ]
    };
    this.setState({
      nodes: jsplumbData.nodes,
      edges: jsplumbData.edges
    });
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
      jsplumbData.nodes.forEach(item => {
        instance.draggable(item.id);
      });
    });
  }

  componentWillUnmount() {
    // 如果上面不是直接用jsplumb.getInstance创建实例的话
    // 就使用jsplumb.reset清除数据即可
    instance.reset();
  }

  render () {
    const nodes = this.state.nodes;
    return (
      <div className={ Style.root }>
        <div className={ Style.second }>
          <div className={ Style.LZY } id="LZY">
            {
              nodes.map(item => (
                <div id={ item.id } className={ Style.item } key={ item.id }>
                  { item.label }
                  {
                    item.children.map(v => (
                      <div className={ Style.child } key={ v.id }>{ v.label }</div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
        <div className={ Style.first }>
          <div></div>
        </div>
      </div>
    );
  }
}
