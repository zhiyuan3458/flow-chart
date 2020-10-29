
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/input-demo', component: '../pages/input-demo' },
        { path: '/jsplumb', component: '../pages/jsplumb' },
        { path: '/jsplumb-editor', component: '../pages/jsplumb-editor' },
        { path: '/jsplumb-demo2', component: '../pages/jsplumb-demo2' },
        { path: '/jsplumb-demo4', component: '../pages/jsplumb-demo4' },
        { path: '/form-demo', component: '../pages/form-demo' },
        { path: '/pure-demo', component: '../pages/pure-demo' },
        { path: '/drag-demo', component: '../pages/drag-demo' },
        { path: '/flow-chart', component: '../pages/flow-chart' },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'umi-demo',
      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}
