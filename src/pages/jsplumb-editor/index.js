import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './index.less';
import editData from '@/utils/editor-data';
import { operatorConts, addNode, mockData, getNodes, drawLink } from '@/pages/jsplumb-editor/utils';

export default class JsplumbEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: editData.input,
      nodes: []
    };
  }

  /* jsplumb初始化 */
  initContainer = () => {
    // jsplumb.ready(() => {
    //   instance = jsplumb.getInstance();
    //   instance.setContainer('LZY');
    // });
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
      const svgLeft = this.svgContainer.getBoundingClientRect().left;
      const svgTop = this.svgContainer.getBoundingClientRect().top;
      const obj = {
        x: e.clientX - svgLeft,
        y: e.clientY - svgTop,
        w: operatorConts.width,
        h: operatorConts.height,
        icon: '1',
        label: 'item1'
      };
      this.setState({
        nodes: addNode(obj)
      });
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
    // this.getNodes(mockData.nodes);
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
        <div className={ Styles.Right } id='LZY'>
          <svg ref="svg" xmlns="http://www.w3.org/2000/svg"
               xmlnsXlink="http://www.w3.org/1999/xlink"
               version="1.1"
               className={ Styles.Svg }
               ref={ ref => this.svgContainer = ref }
          >
            {
              nodes
            }
            <g id="drawingLinkGG" ref="drawingLinkGG" key='drawingLinkGG' className='drawingLinkGG_wrapper' />
          </svg>
        </div>
      </div>
    );
  }
}
