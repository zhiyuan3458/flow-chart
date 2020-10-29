export default {
  nodes: [
    {
      id: 'l1',
      label: 1
    },
    {
      id: 'l2',
      label: 2
    },
    {
      id: 'l3',
      label: 3
    },
    {
      id: 'l4',
      label: 4
    }
  ],
  edges: [
    {
      source: 'l1',
      target: 'l2'
    },
    {
      source: 'l2',
      target: 'l3'
    },
    {
      source: 'l3',
      target: 'l4'
    }
  ]
};
