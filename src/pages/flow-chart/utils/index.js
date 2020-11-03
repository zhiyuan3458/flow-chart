export const containerId = 'RIGHT_PANEL';

export function getUUID () {
  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(32);
  });
}

/* 计算曲线曲率 */
export function computeAbs(y1, y2) {
  const abs = (Math.abs(y2 - y1) * 9) / 16;
  return abs > 25 ? abs : 25;
}
