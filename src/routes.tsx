import {
  SettingOutlined,
  DashOutlined,
  TagOutlined,
  MessageOutlined,
  CoffeeOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import Login from './pages/admin/login';
import EditArticle from './pages/article/edit';
import ArticleList from './pages/article/list';
import CommentList from './pages/comment/list';
import Dashboard from './pages/dashboard';
import TagList from './pages/tag/list';
import SystemSettings from './pages/config';
import CreateArticle from './pages/article/create';
import Menu, { MenuProps } from 'rc-menu/lib/Menu';

interface RouteOptoins {
  path: string;
  name?: string;
  icon?: JSX.Element;
  component?: any;
  layout?: boolean;
  routes?: RouteOptoins[];
  redirect?: string;
  needPermission?: boolean;
  hideInMenu?: boolean;
}
export const routes: RouteOptoins[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <DashOutlined />,
    component: Dashboard,
    needPermission: true,
  },
  {
    path: '/user',
    layout: false,
    needPermission: false,
    routes: [
      {
        path: '/user',
        routes: [{ name: '登录', path: '/user/login', component: Login }],
      },
    ],
  },
  {
    path: '/article',
    name: '文章管理',
    icon: <CoffeeOutlined />,
    needPermission: true,
    routes: [
      { path: '/article', redirect: '/article/list' },
      {
        path: '/article/create',
        name: '撰写文章',
        icon: <SmileOutlined />,
        component: CreateArticle,
      },
      {
        path: '/article/edit/:id',
        name: '更新文章',
        icon: <SmileOutlined />,
        component: EditArticle,
        hideInMenu: true,
      },
      {
        path: '/article/list',
        name: '文章列表',
        icon: <SmileOutlined />,
        component: ArticleList,
      },
    ],
  },
  {
    path: '/comment',
    name: '评论管理',
    icon: <MessageOutlined />,
    component: CommentList,
    needPermission: true,
  },
  {
    path: '/tag',
    name: '标签管理',
    icon: <TagOutlined />,
    component: TagList,

    needPermission: true,
  },
  {
    path: '/settings',
    name: '系统设置',
    icon: <SettingOutlined />,
    component: SystemSettings,
    needPermission: true,
  },
  { path: '/', redirect: '/dashboard' },
  { path: '*', component: './404' },
];

const convertRoutesToAntdMenu = (routes: RouteOptoins[]) => {
  const menu = routes.map(({ name, path, icon, routes }) => ({
    label: name,
    key: path,
    icon,
    children: routes ? convertRoutesToAntdMenu(routes) : [],
  })) as MenuProps['items'];

  return menu;
};

export const renderMenu = (routes: RouteOptoins[]) => {
  const menus = convertRoutesToAntdMenu(routes);
  console.log(menus);
  return <Menu items={menus}></Menu>;
};
