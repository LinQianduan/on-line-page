import { RouteRecordRaw } from "vue-router";
import Layout from '@/Layout/index.vue'

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: '/home'
	},
	{
		path: '/home',
		component: Layout,
		redirect: '/home/index',
		children: [
			{
				path: '/home/index',
				name: 'Home',
				component: () => import("@/views/home/index.vue"),
				meta: {
					title: "首页"
				},
			},
			{
				path: '/home/info',
				name: 'Info',
				component: () => import("@/views/info/index.vue"),
				meta: {
					title: "信息"
				},
			},
			{
				path: '/home/navigation',
				name: 'Navigation',
				component: () => import("@/views/navigation/index.vue"),
				meta: {
					title: "网页导航"
				},
			}
		]
	},
	{
		path: '/largeScreen',
		component: () => import("@/views/largeScreen/index.vue"),
		meta: { title: '可视化大屏' }
	},
	{
		path: '/login',
		component: () => import("@/views/login/index.vue"),
		meta: { title: '登录' }
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