export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [{ name: '登录', path: '/user/login', component: './Admin/Login' }],
      },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { component: './404' },
    ],
  },
  {
    path: '/article',
    name: '文章管理',
    icon: 'crown',
    routes: [
      { path: '/article/create', name: '创建文章', icon: 'smile', component: './Article/create' },
      {
        path: '/article/edit/:id',
        name: '更新文章',
        icon: 'smile',
        component: './Article/edit',
        hideInMenu: true,
      },
      { path: '/article/list', name: '文章列表', icon: 'smile', component: './Article/list' },
    ],
  },
  { path: '/tag', name: '标签管理', icon: 'crown', component: './Tag/list' },
  { path: '/category', name: '分类管理', icon: 'crown', component: './Category/list' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
]
