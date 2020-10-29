import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './index.less';
import editData from '@/utils/editor-data';
import Jsplumb from 'jsplumb';
import { getContainerCont, guid, addNodes } from './utils';
import { operatorConts, addNode, getNodes, drawLink } from '@/pages/jsplumb-editor/utils';
const jsplumb = Jsplumb.jsPlumb;
let instance = null;

export default class JsplumbDemo2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: editData.input,
      nodes: []
    };
  }

  /* jsplumb初始化 */
  initContainer = () => {
    jsplumb.ready(() => {
      jsplumb.reset();
      instance = jsplumb.getInstance();
      jsplumb.setContainer('LZY');
    });
  };

  getNodes = () => {};

  /* 生成drag实例 */
  createDrag = () => {
    this.dragDiv = document.createElement("div");
    document.body.appendChild(this.dragDiv);
  };

  renderDrag = (node, e) => {

    let dragUI = () => {
      return React.createElement(
        'div', {
          style: {
            position: 'fixed',
            color: 'green',
            width: operatorConts.width + 'px',
            height: operatorConts.height + 'px',
            top: e.clientY + 'px',
            left: e.clientX + 'px',
            border: '1px dashed #bbbbbb'
          }
        });
    };
    ReactDOM.render(
      React.createElement(
        dragUI,
        null
      ),
      this.dragDiv
    );
  };

  //销毁drag
  destroyDrag = () => {
    if (this.dragDiv) {
      ReactDOM.unmountComponentAtNode(this.dragDiv);
      if (this.dragDiv.parentNode) {
        this.dragDiv.parentNode.removeChild(this.dragDiv);
      }
    }
  };

  /* 为每个节点加上端点 */
  addEndPoints = (node) => {
    const common = {
      isSource: true,
      isTarget: true,
      connector: ['Bezier']
    };
    instance.ready(() => {
      instance.addEndpoint(node.id, {
        anchors: ['Left']
      }, common);
      instance.addEndpoint(node.id, {
        anchors: ['Right']
      }, common);
      instance.draggable(node.id, {
        containment: 'parent'
      });
    });
  };

  /* 渲染节点 */
  renderNodes = (nodes) => {
    return nodes.map(item => {
      return (
        <div
          key={ item.id }
          id={ item.id }
          className={ Styles.Item }
          style={{
            width: item.width,
            height: item.height,
            left: item.x,
            top: item.y
          }}
        >
          <span>{ item.icon }</span>
          <span>{ item.label }</span>
        </div>
      );
    });
  };

  initLink = () => {
    const edges = this.state.edges;
    jsplumb.ready(() => {
      edges.forEach(edge => {
        instance.connect({
          source: edge.source,
          target: edge.target
        });
      });
    });
  };

  clickNode = (node, e) => {
    e.persist();
    if (!e || !e.nativeEvent) return false;
    e.preventDefault();
    const move = (e) => {
      e.preventDefault();
      this.renderDrag(node, e);
    };

    const up = e => {
      e.preventDefault();
      this.destroyDrag();
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      const newNode = addNodes(e);
      this.setState({
        nodes: [...this.state.nodes, newNode]
      });
      this.addEndPoints(newNode);
    };
    setTimeout(() => {
      this.createDrag();
      this.renderDrag(node, e);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }, 200);
  };

  clickFn = () => {
    alert(4354534);
  };

  componentDidMount() {
    this.initContainer();
    const nodes = this.state.nodes;
    // this.getNodes(mockData.nodes);
    // jsplumb.ready(() => {
    //   nodes.forEach(node => {
    //     const common = {
    //       isSource: true,
    //       isTarget: true,
    //       connector: ['Straight']
    //     };
    //
    //     // instance.addEndpoint(node.id, {
    //     //   anchors: ['Left', 'Right']
    //     // }, common);
    //   });
    // });
  }

  componentWillUnmount() {
    // instance = null;
  }

  render () {
    const input = this.state.input;
    const nodes = this.state.nodes;
    return (
      <div className={ Styles.Container }>
        <div className={ Styles.Left }>
          <div className={ Styles.Input }>
            {
              input.map(v => (
                <div
                  className={ Styles.Item }
                  key={ v.id }
                  onMouseDown={ e => this.clickNode(v, e) }
                >
                  { v.label }
                </div>
              ))
            }
          </div>
        </div>
        <div className={ Styles.Right } id='LZY' ref={ ref => this.container = ref }>
          {
            this.renderNodes(nodes)
          }
        </div>
      </div>
    );
  }
}
