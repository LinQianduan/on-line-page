// import Vue from 'vue'
import { createApp } from "vue";
import router from "@/routers/index";
import pinia from "@/stores/index";
import ElementPlus from "element-plus";

const handleClose = (dom: HTMLDivElement) => {
	if (!dom) return;
	if (document.body.contains(dom)) {
		document.body.removeChild(dom);
	}
	dom = null!;
};
/**
 *
 * @param {*} args 一个对象，传入组件需要的props参数 以及需要触发的组件 component
 * args 示例： { title: '弹窗标题', component: testDialog }
 * testDialog 是组件，import testDialog from '...'
 * testDialog 组件内接收一个 fun prop onClose,用于关闭组件
 */
export const createComponent = (args: any) => {
	let mountNode: HTMLDivElement;
	const createNewVMIns = (options: any) => {
	mountNode = document.getElementById("mountNode") as HTMLDivElement;
		if (mountNode) {
			document.body.removeChild(mountNode);
			mountNode = null!;
		}
		let props = {
			...options,
			router
		};
		delete props.component;
		const app = createApp(args.component, props);
		app.use(router).use(pinia).use(ElementPlus);
		
		mountNode = document.createElement("div");
		// 给mountNode设置一个id，方便后面删除
		mountNode.id = "mountNode";
		document.body.appendChild(mountNode);

		app.mount(mountNode);
	};
	createNewVMIns({
		...args,
		onClose: () => handleClose(mountNode)
	});
};
