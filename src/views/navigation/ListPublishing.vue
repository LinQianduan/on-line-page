<template>
  <div class="list-publishing">
	<div class="range">
		<div class="container">
			<h2>表单入口可见范围</h2>
			<div class="select-box" @click="handleClickUser('range')">
				<div class="user-list" v-if="rangeUserList.length > 0">
					<div class="tag-cls" @click.stop v-for="(item, index) in rangeUserList" :key="item.id">
						<span class="first">{{ item.name.substring(0, 1) }}</span>
						<span>{{ item.name }}</span>
						<el-icon @click.stop="handleUserDelect(index, 'range')" style="cursor: pointer; margin-top: 2px; margin-left: 2px;" :size="14">
							<Close />
						</el-icon>
					</div>
				</div>

				<div class="add-btn" v-else>
					<el-icon :size="14">
						<Plus />
					</el-icon>
					<span style="font-size: 14px;">选择人员</span>
				</div>
			</div>
		</div>
	</div>
	<div class="setting">
		<h2>表单内权限设置</h2>
		<div class="data-one data-item" v-for="(item, index) in perSettingList" :key="index">
			<div class="title">
				<div class="left">
					<h3>{{ item.title1 }}</h3>
					<div style="font-size: 12px; color: #c0c2cc;">{{ item.title2 }}</div>
				</div>
				<div class="right">
					<el-switch
						v-model="item.switchValue"
						class="ml-2"
						style="--el-switch-on-color: #fb6e10;"
					/>
				</div>
			</div>
			<div class="select-box" @click="handleClickAddUser(index)">
				<div class="user-list"  v-if="item.selectUserList.length > 0">
					<div class="tag-cls"  @click.stop v-for="(it, inx) in item.selectUserList" :key="it.id">
						<span class="first">{{ it.name.substring(0, 1) }}</span>
						<span>{{ it.name }}</span>
						<el-icon @click.stop="handleDataUserDelect(index, inx)" style="cursor: pointer; margin-top: 2px; margin-left: 2px;" :size="14">
							<Close />
						</el-icon>
					</div>
				</div>

				<div class="add-btn" v-else>
					<el-icon :size="14">
						<Plus />
					</el-icon>
					<span style="font-size: 14px;">选择人员</span>
				</div>
			</div>
		</div>
		<div class="data-two data-item">

		</div>
		<div class="data-three data-item"></div>
		<div class="data-four data-item"></div>
	</div>
	<DialogUserSelect ref="dialogUserSelectRef" @success="handleUserSelect"></DialogUserSelect>
  </div>
</template>

<script>
import DialogUserSelect from './DialogUserSelect.vue'
import { Plus, Close } from '@element-plus/icons-vue'
export default {
    components: { DialogUserSelect, Plus, Close },
	data () {
		return {
			rangeUserList: [],
			switchValue1: false,
			// 下面四条用户选择的数据
			perSettingList: [
				{
					title1: '仅添加数据',
					title2: '在此分组内的成员只可填报数据',
					selectUserList: [],
					switchValue: false
				},
				{
					title1: '添加并管理本人数据',
					title2: '在此分组内的成员可以填报数据、管理自己填报的数据',
					selectUserList: [],
					switchValue: true
				},
				{
					title1: '管理全部数据',
					title2: '在此分组内的成员可以管理全部数据、填报数据、但不可导入数据',
					selectUserList: [],
					switchValue: true
				},
				{
					title1: '查看全部数据',
					title2: '在此分组内的成员可以查看所有数据',
					selectUserList: [],
					switchValue: true
				}
			]
		}
	},
	methods: {
		// 点击显示弹窗
		handleClickUser(type) {
			if(type === 'range') {
				this.$refs.dialogUserSelectRef.open('add', 'range', JSON.parse(JSON.stringify(this.rangeUserList)))
			}
		},
		// 确定新增用户
		handleUserSelect(userList, area) {
			if(area === 'range') {
				this.rangeUserList = userList
			} else if (area === 'data1') {
				this.perSettingList[0].selectUserList = userList
			} else if (area === 'data2') {
				this.perSettingList[1].selectUserList = userList
			} else if (area === 'data3') {
				this.perSettingList[2].selectUserList = userList
			} else if (area === 'data4') {
				this.perSettingList[3].selectUserList = userList
			}
		},
		// 删除用户
		handleUserDelect(index, area) {
			if(area === 'range') {
				this.rangeUserList.splice(index, 1)
			}
		},
		// 下面四个数据选择删除用户
		handleDataUserDelect(index, inx) {
			this.perSettingList[index].selectUserList.splice(inx, 1)
		},
		// 下面四个数据选择弹框显示
		handleClickAddUser(index) {
			this.$refs.dialogUserSelectRef.open('add', `data${index + 1}`, JSON.parse(JSON.stringify(this.perSettingList[index].selectUserList)))
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
				margin-bottom: 12px;
				font-size: 18px;
				font-weight: 700;
			}
		}

	}
	.setting {
		width: 100%;
		margin-top: 20px;
		border: 1px solid #DCDFE6;
		border-radius: 6px;
		padding: 15px;
		h2 {
			margin-bottom: 12px;
			font-size: 18px;
			font-weight: 700;
		}
		.data-item {
			width: 100%;
			margin-bottom: 22px;
			.title {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 12px;
			}
		}
	}
	.select-box {
		width: 100%;
		min-height: 80px;
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
