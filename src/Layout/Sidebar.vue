<template>
	<div class="link-container">
		<div class="sidebar-logo">
			<img src="@/assets/img/2.jpg" alt="">
		</div>
		<div class="navigation">
			<router-link active-class="active-link" to="/home/index">{{ $t("sideBar.home") }}</router-link>
			<router-link active-class="active-link" to="/home/info">{{ $t("sideBar.info") }}</router-link>
			<router-link active-class="active-link" to="/home/navigation">{{ $t("sideBar.navigation") }}</router-link>
		</div>
		<div class="controls">
			<div class="controls-item">
				<SvgIcon name="search" :style="{ width: '28px', height: '28px' }"></SvgIcon>
				<span>{{ $t("sideBar.search") }}</span>
			</div>
			<el-dropdown  @command="handleCommand">
				<div class="controls-item">
					<SvgIcon name="language" :style="{ width: '23px', height: '23px', marginRight: '2px' }"></SvgIcon>
					<span>{{ $t("sideBar.language") }}</span>
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="zh">中文</el-dropdown-item>
						<el-dropdown-item command="en">English</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>

	</div>
</template>
<script setup lang='ts'>
import SvgIcon from '@/components/SvgIcon/index.vue'
import { ref, reactive } from 'vue'
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const handleCommand = (lang: string) => {
	i18n.locale.value = lang;
}
</script>
<style scoped lang='scss'>
.link-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	// justify-content: space-between;
	.sidebar-logo {
		width: 84px;
		height: 100%;
		// background-color: #fff;
		img {
			object-fit: cover;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: 4px solid #231b2f;
		}
	}
	.navigation {
		display: flex;
		align-items: center;
		padding: 0 20px;
		a {
			display: inline-block;
			cursor: pointer;
			margin-right: 4px;
			text-decoration: none;
			font-size: 16px;
			padding: 5px 10px;
			border-radius: 5px;
			color: white;
			transition: all 0.4s;
		}
		.active-link {
			background-color: #212121;
			transition: all 0.4s;
		}
	}
	.controls {
		width: 200px;
		height: 100%;
		margin-left: auto;
		display: flex;
		flex-direction: row;
    flex-wrap: nowrap;
		align-items: center;
		.controls-item {
			display: flex;
			align-items: center;
			cursor: pointer;
			margin-right: 12px;
			span {
				text-align: center;
				color: white;
				font-size: 16px;
			}
		}
	}

}
</style>