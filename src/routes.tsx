import type { MenuProps } from 'antd';
import {
  SettingOutlined,
  TagOutlined,
  MessageOutlined,
  CoffeeOutlined,
  SmileOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import Login from './pages/admin/login';
import EditArticle from './pages/article/edit';
import ArticleList from './pages/article/list';
import CommentList from './pages/comment/list';
import Dashboard from './pages/dashboard';
import TagList from './pages/tag/list';
import SystemSettings from './pages/config';
import CreateArticle from './pages/article/create';
import Page404 from './pages/Page404';

export interface RouteOptions {
  path: string;
  name?: string;
  icon?: JSX.Element;
  component?: any;
  layout?: boolean;
  routes?: RouteOptions[];
  redirect?: string;
  needPermission?: boolean;
  hideInMenu?: boolean;
}
export const constantRoutes: RouteOptions[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <DashboardOutlined />,
    component: Dashboard,
    needPermission: true,
  },
  {
    path: '/login',
    layout: false,
    needPermission: false,
    hideInMenu: false,
    name: '登陆',
    component: Login,
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
  { path: '*', component: <Page404 /> },
];

export const convertRoutesToAntdMenu = (routes: RouteOptions[]) => {
  const menus = routes
    .filter(v => {
      return v.layout !== false && !v.redirect && v.path !== '*' && !v.hideInMenu;
    })
    .map(({ name, path, icon, routes: children }) => ({
      label: name,
      key: path,
      icon,
      children: children ? convertRoutesToAntdMenu(children) : null,
    })) as MenuProps['items'];

  return menus;
};
