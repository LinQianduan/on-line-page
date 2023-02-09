import { RouteRecordRaw } from "vue-router";

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: '/home/index'
	},
	{
		path: '/home/index',
		name: "Home",
		component: () => import("@/views/home/index.vue"),
		meta: {
			title: "首页"
		}
	},
	{
		path: '/login',
		name: "Login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			title: "登录"
		}
	},
	{
		path: '/info',
		name: "Info",
		component: () => import("@/views/info/index"),
		meta: {
			title: "信息"
		}
	},
	{
		path: '/navigation',
		name: "Navigation",
		component: () => import("@/views/navigation/index.vue"),
		meta: {
			title: "网页导航"
		}
	}
];

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
	{
		path: "/403",
		name: "403",
		component: () => import("@/views/ErrorMessage/403.vue"),
		meta: {
			title: "403页面"
		}
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/views/ErrorMessage/404.vue"),
		meta: {
			title: "404页面"
		}
	},
	{
		path: "/500",
		name: "500",
		component: () => import("@/views/ErrorMessage/500.vue"),
		meta: {
			title: "500页面"
		}
	}
];

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
	path: "/:pathMatch(.*)*",
	name: "notFound",
	redirect: { name: "404" }
};