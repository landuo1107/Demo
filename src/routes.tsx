import AuthLayout from "@/layouts";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import {
  AppstoreFilled,
  HomeFilled,
  MehFilled,
  SettingFilled,
  SoundFilled,
} from "@ant-design/icons";
import { Result } from "antd";
import React from "react";
import { createBrowserRouter, useRouteError } from "react-router-dom";

const BannerPage = React.lazy(() => import("@/pages/Banner"));
const NoticePage = React.lazy(() => import("@/pages/Notice"));
const ActivityPage = React.lazy(() => import("@/pages/Activity"));
const UserPage = React.lazy(() => import("@/pages/User"));
const UserSourcePage = React.lazy(() => import("@/pages/UserSource"));
const SettingPage = React.lazy(() => import("@/pages/Setting"));
const InfoPage = React.lazy(() => import("@/pages/Info"));

const CollectionPage = React.lazy(() => import("@/pages/Collection"));
const CollectionClassPage = React.lazy(() => import("@/pages/CollectionClass"));
const BrandPage = React.lazy(() => import("@/pages/Brand"));
const AuthorPage = React.lazy(() => import("@/pages/Author"));
const OrderPage = React.lazy(() => import("@/pages/Order"));
const ProfitPage = React.lazy(() => import("@/pages/Profit"));

export const menus = [
  // {
  //   path: "/",
  //   name: "总览",
  //   icon: <HomeFilled />,
  //   element: <HomePage />,
  // },
  // {
  //   path: "/operate",
  //   name: "运营管理",
  //   icon: <SoundFilled />,
  //   children: [
  //     {
  //       path: "/operate/banner",
  //       name: "轮播管理",
  //       element: <BannerPage />,
  //     },
  //     {
  //       path: "/operate/notice",
  //       name: "公告管理",
  //       element: <NoticePage />,
  //     },
  //     {
  //       path: "/operate/activity",
  //       name: "活动管理",
  //       element: <ActivityPage />,
  //     },
  //   ],
  // },
  // {
  //   path: "/user",
  //   name: "用户管理",
  //   icon: <MehFilled />,
  //   children: [
  //     {
  //       path: "/user/list",
  //       name: "用户列表",
  //       element: <UserPage />,
  //     },
  //     // {
  //     //   path: "/user/source/list",
  //     //   name: "用户来源",
  //     //   element: <UserSourcePage />,
  //     // },
  //   ],
  // },
  // {
  //   path: "/finance",
  //   name: "财务管理",
  //   icon: <AppstoreFilled />,
  //   children: [
  //     {
  //       path: "/finance/order/list",
  //       name: "订单列表",
  //       element: <OrderPage />,
  //     },
  //     {
  //       path: "/finance/profit",
  //       name: "盈亏分析",
  //       element: <ProfitPage />,
  //     },
  //   ],
  // },
  // {
  //   path: "/product",
  //   name: "产品管理",
  //   icon: <AppstoreFilled />,
  //   children: [
  //     {
  //       path: "/product/brand",
  //       name: "品牌管理",
  //       element: <BrandPage />,
  //     },
  //     {
  //       path: "/product/author",
  //       name: "作者管理",
  //       element: <AuthorPage />,
  //     },
  //     {
  //       path: "/product/collection/class",
  //       name: "系列分类",
  //       element: <CollectionClassPage />,
  //     },
  //     {
  //       path: "/product/collection/list",
  //       name: "系列列表",
  //       element: <CollectionPage />,
  //     },
  //   ],
  // },
  // {
  //   path: "/setting",
  //   name: "设置",
  //   icon: <SettingFilled />,
  //   children: [
  //     {
  //       path: "/setting/system",
  //       name: "系统设置",
  //       element: <SettingPage />,
  //     },
  //   ],
  // },
  {
    path: "/info",
    name: "信息管理",
    icon: <SettingFilled />,
    children: [
      {
        path: "/info",
        name: "微信会员管理",
        element: <InfoPage />,
      },
    ],
  }
];

export const routes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: menus,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

const ErrorBoundary = () => {
  const error: any = useRouteError();
  return <Result status="error" title={error.message ?? "页面出错"} />;
};

export const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    children: routes,
  },
]);
