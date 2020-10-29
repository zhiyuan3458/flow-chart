export default {
  nodes: [
    {
      id: 'l1',
      label: 1,
      children: [
        { id: 11, label: 11 },
        { id: 12, label: 12 },
        { id: 13, label: 13 }
      ]
    },
    {
      id: 'l2',
      label: 2,
      children: [
        { id: 21, label: 21 },
        { id: 22, label: 22 },
        { id: 23, label: 23 }
      ]
    },
    {
      id: 'l3',
      label: 3,
      children: [
        { id: 31, label: 31 },
        { id: 32, label: 32 },
        { id: 33, label: 33 }
      ]
    },
    {
      id: 'l4',
      label: 4,
      children: [
        { id: 41, label: 41 },
        { id: 42, label: 42 },
        { id: 43, label: 43 }
      ]
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
