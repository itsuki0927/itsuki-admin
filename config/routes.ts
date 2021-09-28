export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [{ name: '登录', path: '/user/login', component: './admin/Login' }],
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
    icon: 'coffee',
    routes: [
      { path: '/article/create', name: '撰写文章', icon: 'smile', component: './article/create' },
      {
        path: '/article/edit/:id',
        name: '更新文章',
        icon: 'smile',
        component: './article/edit',
        hideInMenu: true,
      },
      { path: '/article/list', name: '文章列表', icon: 'smile', component: './article/list' },
    ],
  },
  { path: '/tag', name: '标签管理', icon: 'tag', component: './tag/list' },
  { path: '/category', name: '分类管理', icon: 'folder-open', component: './category/list' },
  { path: '/settings', name: '系统设置', icon: 'setting', component: './config/index' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
]
