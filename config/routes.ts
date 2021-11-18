export default [
  { path: '/dashboard', name: 'Dashboard', icon: 'dashboard', component: './dashboard' },
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
  {
    path: '/snippet',
    name: '片段管理',
    icon: 'code',
    routes: [
      { path: '/snippet/list', name: '片段列表', component: './snippet/list' },
      { path: '/snippet/create', name: '创建片段', component: './snippet/create' },
      {
        path: '/snippet/edit/:id',
        name: '编辑片段',
        component: './snippet/edit',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/category',
    name: '分类管理',
    icon: 'folder-open',
    routes: [
      { path: '/category', redirect: '/category/article' },
      {
        path: '/category/article',
        name: '文章分类',
        component: './category/article',
      },
      {
        path: '/category/snippet',
        name: '片段分类',
        component: './category/snippet',
      },
    ],
  },
  { path: '/comment', name: '评论管理', icon: 'message', component: './comment/list' },
  { path: '/tag', name: '标签管理', icon: 'tag', component: './tag/list' },
  { path: '/settings', name: '系统设置', icon: 'setting', component: './config/index' },
  { path: '/', redirect: '/dashboard' },
  { component: './404' },
]
