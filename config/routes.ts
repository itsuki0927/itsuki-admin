export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './Admin/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'article',
    path: '/article',
    icon: 'crown',
    routes: [
      {
        path: '/article/create',
        name: 'create',
        icon: 'smile',
        component: './Article/create',
      },
      {
        path: '/article/edit/:id',
        name: 'edit',
        icon: 'smile',
        component: './Article/edit',
        hideInMenu: true,
      },
      {
        path: '/article/list',
        name: 'list',
        icon: 'smile',
        component: './Article/list',
      },
    ],
  },
  {
    name: 'tag',
    path: '/tag',
    icon: 'crown',
    component: './Tag/list',
  },
  {
    name: 'category',
    path: '/category',
    icon: 'crown',
    component: './Category/list',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
]
