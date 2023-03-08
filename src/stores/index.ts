import { defineStore, createPinia } from "pinia";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	// state: 返回对象的函数
	state: () => ({
		bgImage: ''
	}),
	getters: {

	},
	actions: {
		setGgImage(url: any) {
			this.bgImage = url
		}
	}
});

const pinia = createPinia();

export default pinia;
