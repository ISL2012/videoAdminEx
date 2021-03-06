/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description router全局配置，如有必要可分文件抽离
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
import EmptyLayout from "@/layouts/EmptyLayout";
import { publicPath, routerMode } from "@/config/settings";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true,
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/401"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
];

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/index/index"),
        meta: {
          title: "首页",
          icon: "home",
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "/personage",
    component: Layout,
    redirect: "/personage",
    meta: {
        title: '个人中心',
        icon: 'home'
    },
    children: [
      {
        path: "/personage",
        name: "personage",
        component: () => import("@/views/personage/index"),
        meta: {
          title: "个人中心",
          icon: "home",
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "/message",
    component: Layout,
    redirect: "/message",
    meta: {
        title: '消息中心',
        icon: 'home'
    },
    children: [
        {
            path: "/message",
            name: "message",
            component: () => import("@/views/message/index"),
            meta: {
            title: "消息中心",
            icon: "home",
            noKeepAlive: true,
            },
        },
        {
            path: "/messageInfo",
            name: "messageInfo",
            component: () => import("@/views/message/messageInfo"),
            hidden: true,
            meta: {
                title: "消息中心-详情",
                icon: "home",
                noKeepAlive: true,
            }
        }
    ],
  },
  {
    path: "/setting",
    component: Layout,
    redirect: "/setting",
    meta: {
        title: '系统设置',
        icon: 'home'
    },
    children: [
        {
            path: "/organizationManage",
            name: "organizationManage",
            component: () => import("@/views/organizationManage/index"),
            meta: {
                title: "单位管理",
                icon: "home",
                noKeepAlive: true,
            }
        },
        {
            path: "/organizationManageEdit",
            name: "organizationManageEdit",
            component: () => import("@/views/organizationManage/edit"),
            hidden: true,
            meta: {
                title: "单位管理-编辑",
                icon: "home",
                noKeepAlive: true,
            }
        },
        {
            path: "/userManage",
            name: "userManage",
            component: () => import("@/views/userManage/index"),
            meta: {
                title: "账户管理",
                icon: "home",
                noKeepAlive: true,
            }
        },
        {
            path: "/userManageEdit",
            name: "userManageEdit",
            component: () => import("@/views/userManage/edit"),
            hidden: true,
            meta: {
                title: "账户管理-编辑",
                icon: "home",
                noKeepAlive: true,
            }
        },
        {
            path: "/powerManage",
            name: "powerManage",
            component: () => import("@/views/powerManage/index"),
            meta: {
                title: "菜单管理",
                icon: "home",
                noKeepAlive: true,
            }
        },
        {
            path: "/powerManageEdit",
            name: "powerManageEdit",
            component: () => import("@/views/powerManage/edit"),
            hidden: true,
            meta: {
                title: "菜单管理-编辑",
                icon: "home",
                noKeepAlive: true,
            }
        },
        {
            path: "/roleManage",
            name: "roleManage",
            component: () => import("@/views/roleManage/index"),
            meta: {
                title: "角色管理",
                icon: "home",
                noKeepAlive: true,
            }
        },
        {
            path: "/operationManage",
            name: "operationManage",
            component: () => import("@/views/operationManage/index"),
            meta: {
                title: "操作日志管理",
                icon: "home",
                noKeepAlive: true,
            }
        },
        {
            path: "/loginManage",
            name: "loginManage",
            component: () => import("@/views/loginManage/index"),
            meta: {
                title: "登录日志管理",
                icon: "home",
                noKeepAlive: true,
            }
        }
    ]
  },
  {
    path: "/endManage",
    component: Layout,
    redirect: "/endManage",
    meta: {
        title: '后端监测',
        icon: 'home'
    },
    children: [
        {
            path: "/endTypeManage",
            name: "endTypeManage",
            component: () => import("@/views/endManage/earlyWarnTypeManage"),
            meta: {
                title: "预警类型管理",
                icon: "home",
                noKeepAlive: true,
            },
        },
        {
            path: "/endEarlyWarn",
            name: "endEarlyWarn",
            component: () => import("@/views/endManage/earlyWarn"),
            meta: {
                title: "监测预警中心",
                icon: "home",
                noKeepAlive: true,
            },
        }
    ],
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  base: routerMode === "history" ? publicPath : "",
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

export function resetRouter() {
  router.matcher = new VueRouter({
    base: routerMode === "history" ? publicPath : "",
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher;
}

export default router;
