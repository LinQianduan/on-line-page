<template>
  <div class="list-publishing">
	<div class="range">
		<div class="container">
			<h2>表单入口可见范围</h2>
			<div class="select-box">
				<div class="add-btn" @click="handleClickUser('range')">
					<el-icon :size="14">
						<Plus />
					</el-icon>
					<span style="font-size: 14px;">选择人员</span>
				</div>
				<!-- <div class="user-list">
					<div class="tag-cls">
						<span class="first">蔡</span>
						<span>蔡藤达</span>
						<el-icon style="cursor: pointer; margin-top: 2px; margin-left: 2px;" :size="14">
							<Close />
						</el-icon>
					</div>
				</div> -->
			</div>
		</div>
	</div>
	<DialogUserSelect ref="dialogUserSelectRef"></DialogUserSelect>
  </div>
</template>

<script>
import DialogUserSelect from './DialogUserSelect'
import { Plus, Close } from '@element-plus/icons-vue'
export default {
    components: { DialogUserSelect, Plus, Close },
	data () {
		return {

		}
	},
	methods: {
		// 点击显示弹窗
		handleClickUser(type) {
			if(type === 'range') {
				this.$refs.dialogUserSelectRef.open('add', 'range')
			}
		}
	}
}
</script>

<style scoped lang="scss">
.list-publishing {
	width: 100%;
	height: 100%;
	.range {
		width: 100%;
		border: 1px solid #DCDFE6;
		border-radius: 6px;
		padding: 15px;
		.container {
			width: 100%;
			h2 {
				margin-bottom: 8px;
			}
			.select-box {
				width: 100%;
				min-height: 100px;
				border: 1px dashed #DCDFE6;
				border-radius: 4px;
				padding: 4px;
				position: relative;
				.add-btn {
					cursor: pointer;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}

	}
	.user-list {
		display: flex;
		flex-direction: row;
    flex-wrap: wrap;
		.tag-cls {
			padding: 4px 8px;
			height: 30px;
			border-radius: 15px;
			border: 1px solid #DCDFE6;
			background-color: #f3f6fc;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 5px 5px 0;
			.first {
				width: 22px;
				height: 22px;
				line-height: 22px;
				display: inline-block;
				text-align: center;
				background-color: #499bfe;
				border-radius: 11px;
				color: #fff;
				font-size: 14px;
				margin-right: 3px;
			}
		}
	}

}
</style>
