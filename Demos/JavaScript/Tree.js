let uid = 1;
let tree = [
  {
    name: `测试${uid}`,
    id: uid++,
    children: [],
  },
  {
    name: `测试${uid}`,
    id: uid++,
    children: [
      {
        name: `测试${uid}`,
        id: uid++,
        children: [],
      },
    ],
  },
  {
    name: `测试${uid}`,
    id: uid++,
    children: [
      {
        name: `测试${uid}`,
        id: uid++,
        children: [
          {
            name: `测试${uid}`,
            id: uid++,
            children: [
              {
                name: `测试${uid}`,
                id: uid++,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: `测试${uid}`,
    id: uid++,
    children: [
      {
        name: `测试${uid}`,
        id: uid++,
        children: [
          {
            name: `测试${uid}`,
            id: uid++,
            children: [
              {
                name: `测试${uid}`,
                id: uid++,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

tree = [
  {
    id: 1,
    name: '一级1',
    list: [{
      id: 11,
      name: '二级1',
      list: [{
        id: 111,
        name: '三级1',
        list: []
      }
      ]
    }
    ]
  },
  {
    id: 2,
    name: '一级2',
    list: [{
      id: 21,
      name: '二级2',
      list: [{
        id: 211,
        name: '三级2',
        list: []
      }
      ]
    }
    ]
  }
]


function traverse(tree, callback, childKey = 'children') {
  if (!tree.length) return;
  for (const node of tree) {
    const shouldNotContinue = callback(node);
    if (shouldNotContinue) return shouldNotContinue;
    const breakByChildren = traverse(node[childKey], callback);
    if (breakByChildren) return breakByChildren;
  }
}

traverse(tree, (node) => {
  console.log(node.id, node.name);
  if (node.id === 211) return true;
}, 'list')