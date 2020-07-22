let uid = 1;
const data = {};

for (let i = 0; i < 25; i++) {
  const key = `tree${i}`;
  data[key] = [
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
  ];
}

export default data;
