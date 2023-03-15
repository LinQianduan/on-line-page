<template>
  <el-dialog title="选择人员" v-model="visible" :width="800" destroy-on-close @closed="$emit('closed')">
	<div class="body-dialog">
		<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			<el-tab-pane label="organization" name="organization">
				<div class="container-body">
					<div class="left">
						<el-tree :data="treeData" @node-click="handleNodeClick" highlight-current default-expand-all :props="defaultProps" />
					</div>
					<div class="right">
						<div class="user-item" v-for="item in userList">
							<div class="lf">
								<span class="first">{{ item.name.substring(0, 1) }}</span>
								<span>{{ item.name }}</span>
							</div>
							<div class="rg">
								<el-checkbox @change="$event => handleChange($event, item)" v-model="item.isChecked" size="large" />
							</div>
						</div>
					</div>
				</div>
				<div class="select-all">
					<div class="tag-item" v-for="item in selectUserList" :key="item.id">
						<span class="first">{{ item.name.substring(0, 1) }}</span>
						<span>{{ item.name }}</span>
						<el-icon @click="handleTagClose(item.id)" style="cursor: pointer; margin-top: 2px; margin-left: 2px;" :size="14">
							<Close />
						</el-icon>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
	<template #footer>
    <span class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button style="background-color: #fb6e10; border-color: #fb6e10; color: #fff;" type="default" @click="saveConfirm">确 定</el-button>
    </span>
  </template>
  </el-dialog>
</template>

<script>
export default {
	emits: ['success', 'closed'],
	data () {
		const objectName = {
			2: [{ id: 1, name: '刘斌' }, { id: 2, name: '齐军' }, { id: 3, name: '刘伟' }, { id: 4, name: '袁国顺' }, { id: 5, name: '程鹏' }, { id: 6, name: '冯俊' }, { id: 7, name: '邓丽娟' }],
			3: [{ id: 8, name: '郑俊' }, { id: 9, name: '王希尔' }],
			4: [],
			5: [],
			6: [{ id: 10, name: '彭于晏' }, { id: 11, name: '吴彦祖' }],
			7: []
		}
		return {
			visible: false,
			mode: '',
			area: '',
			activeName: 'organization',
			defaultProps: {
				children: 'children',
				label: 'label',
			},
			// 树形数据
			treeData: [
				{
					id: 1,
					label: '碟普科技',
					children: [
						{
							id: 2,
							label: '销售部'
						},
						{
							id: 3,
							label: '实施部'
						},
						{
							id: 4,
							label: '服务部'
						},
						{
							id: 5,
							label: '研发部'
						},
						{
							id: 6,
							label: '湖北碟部'
						},
						{
							id: 7,
							label: '客户成功部'
						}
					],
				}
			],
			objectName, // 模拟的用户数据
			userList: [], // 右侧用户列表
			selectUserList: [] // 选中的所有用户列表
		}
	},
	watch: {
		// 弹框显示初始化数据
		visible(val) {
			if(val) {
				this.objectName = this.$options.data().objectName
				this.userList = this.$options.data().userList
				this.selectUserList = this.$options.data().selectUserList
			}
		}
	},
	methods: {
		//显示
		open(mode = 'add', area) {
			this.mode = mode;
			this.visible = true;
			this.area = area
			return this
		},
		// tree点击
		handleNodeClick(node) {
			this.userList = this.objectName[node.id]?.map((item, index) => {
				const inx = this.selectUserList.findIndex(v => v.id == item.id)
				return {
					isChecked: inx != -1 ? true : false, 
					...item
				}
			}) || []
		},
		// 复选框值变化
		handleChange(check, item) {
			const inx = this.selectUserList.findIndex(it => it.id === item.id)
			if (check) {
				if(inx == -1) {
					this.selectUserList.push({ id: item.id, name: item.name })
				}
			} else {
				if(inx != -1) {
					this.selectUserList.splice(inx, 1)
				}
			}

		},
		// 确定
		saveConfirm() {
			this.$emit('success', this.selectUserList, this.mode)
		},
		// 点击删除当前用户
		handleTagClose(id) {
			const inx = this.selectUserList.findIndex(it => it.id === id)
			if(inx != -1) this.selectUserList.splice(inx, 1)
			this.userList.forEach((item, index) => {
				if(item.id === id && item.isChecked) {
					this.userList[index].isChecked = false
				}
			})
		}
	}
}
</script>

<style scoped lang="scss">
.body-dialog {
	.demo-tabs :deep(.el-tabs__active-bar) {
		background-color: #fb6e10;
	}
	.demo-tabs :deep(.el-tabs__item.is-active) {
		color: #fb6e10;
	}
	.demo-tabs :deep(.el-tabs__nav-wrap::after) {
		background-color: transparent;
	}
	.container-body {
		width: 100%;
		display: flex;
		.left {
			flex: 1;
			padding: 10px;
			min-height: 280px;
			border-top: 1px solid #DCDFE6;
			border-right: 1px solid #DCDFE6;
			:deep(.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content) {
				background-color: #fef0e5;
			}
		}
		.right {
			flex: 1;
			min-height: 280px;
			border-top: 1px solid #DCDFE6;
			padding: 10px;
			.user-item {
				width: 100%;
				height: 34px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.lf {
					span {
						font-size: 14px;
					}
					.first {
						width: 24px;
						height: 24px;
						line-height: 24px;
						display: inline-block;
						text-align: center;
						background-color: #499bfe;
						border-radius: 12px;
						color: #fff;
						font-size: 16px;
						margin-right: 3px;
					}
				}
				.rg {
					:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
						background-color: #fb6e10;
    				border-color: #fb6e10;
					}
				}
			}
		}
	}
	.select-all {
		box-sizing: border-box;
		width: 100%;
		border: 1px dashed #DCDFE6;
		margin-top: 15px;
		border-radius: 6px;
		padding: 5px 10px;
		min-height: 46px;
		display: flex;
		flex-direction: row;
    flex-wrap: wrap;
		.tag-item {
			box-sizing: border-box;
			padding: 4px 8px;
			height: 30px;
			border-radius: 15px;
			border: 1px solid #DCDFE6;
			background-color: #f3f6fc;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 2px;
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
