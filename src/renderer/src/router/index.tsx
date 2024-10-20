import React, { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

// 懒加载组件定义
const Layout = lazy(() => import('../views/layout/index'));
const MenuLayout = lazy(() => import('../views/layout/MeunLayout')); // 修正拼写：Meun -> Menu
const UsersLayout = lazy(() => import('../views/layout/UsersLayout'));
const ImInfo = lazy(() => import('../views/im/imInfo'));

/**
 * 应用路由配置
 * 使用 React Router v6 的配置格式
 */
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    handle: {
      name: '首页',
    },
    children: [
      {
        path: 'imPage',
        element: <MenuLayout />,
        children: [
          {
            path: 'imInfo',
            element: <ImInfo />,
            handle: {
              name: '即时通讯信息',
            },
          },
        ],
      },
      {
        path: 'userPage',
        element: <UsersLayout />,
        handle: {
          name: '用户页面',
        },
      },
      {
        index: true,
        element: <MenuLayout />,
        handle: {
          name: '默认页面',
        },
      },
    ],
  },
];

export default routes;
