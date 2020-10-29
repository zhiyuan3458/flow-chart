import React, { useEffect } from 'react';

const FancyButton = () => {
  return <div>564565</div>;
};

function createWaterMark () {
  let cw = document.createElement('canvas');
  const wctx = cw.getContext('2d');
  const width = 50;
  const height = 100;
  const { sqrt, pow, sin, tan } = Math;
  // wctx.width = sqrt(pow(width, 2) + pow(height, 2));
  wctx.width = width;
  wctx.height = height;
  wctx.strokeRect(0, 0, 50, 100);
  const rotate = 20;
  // wctx.rotate(-rotate * Math.PI / 180);
  const y = parseInt(sin(rotate * Math.PI / 180) * width, 10);
  const x = -parseInt(tan((90 - rotate) * Math.PI / 180) * width, 10);
  wctx.fillText('吕智源', 0, 50);
  return cw;
}

function FormDemo (props) {
  useEffect(() => {
    const canvas = document.getElementById('LZY');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 1000;
    const cw = createWaterMark();
    const pat = ctx.createPattern(cw, 'repeat');
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <div>
      <canvas id="LZY" style={{ border: '1px solid blue' }}></canvas>
    </div>
  );
}

export default FormDemo;
