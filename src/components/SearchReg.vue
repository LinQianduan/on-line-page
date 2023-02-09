<template>
	<div class="layout-search-dialog">
		<el-dialog v-model="isShowSearch" width="300px" destroy-on-close :modal="false" fullscreen :show-close="false">
			<el-autocomplete
				v-model="searchReg"
				:debounce="0"
				:fetch-suggestions="searchMenuList"
				ref="menuInputRef"
				placeholder="城市搜索 ：支持文字、以英文逗号分隔的经度,纬度坐标"
				@select="handleClickReg"
				@blur="closeSearch"
			>
				<template #prefix>
					<el-icon>
						<Search />
					</el-icon>
				</template>
				<template #default="{ item }">
					<span> {{ item.country }} </span>
					<span> {{ item.adm1 }} </span>
					<span>  {{ item.adm2 }} </span>
					<span> {{ item.name }} </span>
				</template>
			</el-autocomplete>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getLookup } from "@/api"

const searchMenuList = (queryString: string, cb: Function) => {
	let results: any[] = []
	if(queryString) {
		getLookup({ location: queryString }).then((res: any) => {
			results = res.data.location || []
			cb(results);
		})
	} else {
		cb(results)
	}
};

// 打开搜索菜单
const isShowSearch = ref(false);
const menuInputRef = ref();
const searchReg = ref("");
const handleOpen = () => {
	isShowSearch.value = true;
	searchReg.value = "";
	nextTick(() => {
		setTimeout(() => {
			menuInputRef.value.focus();
		});
	});
};

// 搜索窗关闭
const closeSearch = () => {
	isShowSearch.value = false;
};

// 点击菜单跳转
interface Emits {
	(e: "checkReg", value: any): void;
}
const emit = defineEmits<Emits>()
const handleClickReg = (regItem: any) => {
	searchReg.value = "";
	emit('checkReg', regItem)
	closeSearch();
};

defineExpose({
  handleOpen
});
</script>

<style scoped lang="scss">
/* 菜单搜索样式 */

.layout-search-dialog {
	:deep(.el-input__wrapper) {
		background-color: transparent;
		border-radius: 4px;
	}
	:deep(.el-dialog) {
		background: rgb(0 0 0 / 50%);
		border-radius: 0 !important;
		box-shadow: unset !important;
		.el-dialog__header {
			border-bottom: none !important;
		}
	}
	:deep(.el-autocomplete) {
		position: absolute;
		top: 100px;
		left: 50%;
		width: 560px;
		transform: translateX(-50%);
	}
	:deep(.el-input__inner) {
		color: #fff;
	}

}
:deep(.el-input__wrapper.is-focus) {
	box-shadow: 0 0 0 1 #fff inset !important;
}
.el-autocomplete__popper {
	.el-icon {
		position: relative;
		top: 2px;
		font-size: 16px;
	}
	span {
		margin: 0 0 0 10px;
		font-size: 14px;
	}
}
</style>
