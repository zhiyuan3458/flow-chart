export const containerId = 'RIGHT_PANEL';

export const arrowHei = 10;

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

export function setGuideLine (moveNode = {}, nodes = [], moveDom) {
  if (nodes.length <= 0 || !moveDom) return [];
  const newNodes = [];
  nodes.forEach(item => {
    if (Math.abs(moveNode.x - item.x) <= 5) {
      moveDom.style.transform = `translate(${ item.x }px, ${ moveNode.y }px)`;
      const moveNodeY = moveNode.y;
      const itemY = item.y;
      if (moveNodeY > itemY) {
        const fromPos = { x: item.x, y: item.y };
        const toPos = { x: item.x, y: moveNode.y + moveNode.height };
        newNodes.push({ id: getUUID(), fromPos, toPos});
      } else {
        const fromPos = { x: item.x, y: moveNode.y };
        const toPos = { x: item.x, y: item.y + item.height };
        newNodes.push({ id: getUUID(), fromPos, toPos});
      }
    }
    if (Math.abs(moveNode.y - item.y) <= 5) {
      moveDom.style.transform = `translate(${ moveNode.x }px, ${ item.y }px)`;
      const moveNodeX = moveNode.x;
      const itemX = item.x;
      if (moveNodeX > itemX) {
        const fromPos = { x: item.x, y: item.y };
        const toPos = { x: moveNodeX + moveNode.width, y: item.y };
        newNodes.push({ id: getUUID(), fromPos, toPos});
      } else {
        const fromPos = { x: item.x + item.width, y: item.y };
        const toPos = { x: moveNodeX, y: item.y };
        newNodes.push({ id: getUUID(), fromPos, toPos});
      }
    }
  });
  return newNodes;
}
