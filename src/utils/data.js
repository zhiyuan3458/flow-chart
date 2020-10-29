export default {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      labelCfg: {
        style: {
          fill: '#ffffff'
        }
      }
    },
    {
      id: 'node2',
      label: 'node2'
    },
    {
      id: 'node3',
      label: 'node3'
    }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    },
    {
      source: 'node2',
      target: 'node3'
    }
  ]
};
