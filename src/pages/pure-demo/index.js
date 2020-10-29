import React from 'react';

export default class PureDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      id: 'LZY'
    };
  }

  onChange = () => {
    this.setState({ isShow: true });
  };

  componentDidMount() {
    this.generateWaterMark({
      container: this.state.id
    });
  }

  generateWaterMark = (options = {}) => {
    if (!options || !options.container) return null;
    const body = document.getElementById(options.container);
    if (!body) return null;
    const { width, height } = body.getBoundingClientRect();
    const defaultOptions = {
      canvasWidth: width,
      canvasHeight: height,
      waterMarkWidth: 100,
      waterMarkHeigt: 100,
      text: 'dfasfsdf',
      fontSize: 20,
      fontFamily: '黑体',
      color: 'rgba(100, 100, 100, 0.4)'
    };

    const generateTemplate = () => {
      const templ = document.createElement('canvas');
      templ.width = _options.waterMarkWidth;
      templ.height = _options.waterMarkHeigt;
      const ctx = templ.getContext('2d');
      ctx.font = `${ _options.fontSize }px ${ _options.fontFamily }`;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = _options.color;
      ctx.fillText(_options.text, 0, _options.fontSize + 20);
      return templ;
    }

    const _options = { ...defaultOptions, ...options };
    const container = document.createElement('canvas');
    container.width = _options.canvasWidth;
    container.height = _options.canvasHeight;

    const templ = generateTemplate();
    const ctx = container.getContext('2d');
    const pat = ctx.createPattern(templ, 'repeat');
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, container.width, container.height);
    body.appendChild(container);
  };

  render () {
    return (
      <div id={ this.state.id } style={{ width: 800, height: 800, border: '1px solid #dddddd' }}>
      </div>
    );
  }
}
