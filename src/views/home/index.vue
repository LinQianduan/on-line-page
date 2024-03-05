<template>
  <div class="home-box">
		<div class="main">
			<div class="container">
				<div class="con-left">
					<Transition appear name="fade-left">
						<div class="left-top">
							<img class="photo-img" src="@/assets/image/logo.png" alt="">
							<div class="name">
								<span class="img-title-big">always online</span>
							</div>
						</div>
					</Transition>
					
					<Transition appear name="fade-left">
						<div class="left-center cards">
							<div class="des-title">
								<span>Hello&nbsp;World&nbsp;!</span><br />
								<span>一个建立于 21 世纪的小站，存活于互联网的边缘。</span>
							</div>
						</div>
					</Transition>
					
					<Transition appear name="fade-left">
						<div class="left-photo">
							<Accordion />
						</div>
					</Transition>
					<Transition appear name="fade-left">
						<div class="left-bottom">
							<div class="icon-list">
								<div class="icon-item" @click="setBgImgInit" @mousemove="iconMousemove('switch')" @mouseout="iconMouseout">
									<SvgIcon name="switch" :iconStyle="{...iconStyle, width: '34px', height: '34px'}" />
								</div>
								<div class="icon-item" @click="getToGithub" @mousemove="iconMousemove('github')" @mouseout="iconMouseout">
									<SvgIcon name="GitHub" :iconStyle="iconStyle" />
								</div>
								<div class="icon-item" @click="leaveInfo" @mousemove="iconMousemove('information')" @mouseout="iconMouseout">
									<SvgIcon name="information" :iconStyle="{...iconStyle, width: '38px', height: '38px'}" />
								</div>
								<div class="icon-item" @click="leaveNavigation" @mousemove="iconMousemove('navigation')" @mouseout="iconMouseout">
									<SvgIcon name="navigation" :iconStyle="{...iconStyle, width: '28px', height: '28px', paddingTop: '2px' }" />
								</div>
								<div class="icon-item" @click="leaveScreen" @mousemove="iconMousemove('largeScreen')" @mouseout="iconMouseout">
									<SvgIcon name="large-screen" :iconStyle="{...iconStyle, paddingTop: '2px' }" />
								</div>
							</div>
							<div class="description">
								{{ iconDescription }}
							</div>
						</div>
					</Transition>
					
				</div>
				<div class="con-right">
					<Transition appear name="fade-right">
						<div class="module">
							<div class="cards hitokoto" :style="{ backgroundColor: isLoading ? 'rgb(0 0 0 / 50%)' : 'rgb(0 0 0 / 25%)' }">
								<div class="tootip">点击切换一言</div>
								<div class="hitokoto-all" @click="switchHitokotoFn">
									<div class="hitokoto-text"><span id="hitokoto_text">{{ hitokoto.hitokoto }}</span>
									</div>
									<div class="hitokoto-from">-「&nbsp;<span id="from_text">{{ hitokoto.from }}</span>&nbsp;」
									</div>
								</div>
							</div>
							<div class="cards time" v-loading="timeLoading" element-loading-background="rgba(0, 0, 0, 0.25)">
								<div class="top">
									{{ date.substring(0, 4) }}&nbsp;年&nbsp;{{
										date.substring(4, 6)
									}}&nbsp;月&nbsp;{{ date.substring(6, 8) }}&nbsp;日&nbsp;
									<span>{{ week }}</span>
								</div>
								<div class="draw">
									<FlipClock></FlipClock>
								</div>
								<div class="weather">
									<a  href="javascript:void(0)" @click="openSearchReg">{{ region }}</a>
									&nbsp;&nbsp;
									&nbsp;
									<span>{{ weather.temp || '--' }}°C</span>
									&nbsp;&nbsp;
									<span>{{ weather.text || '--' }}</span>
									&nbsp;&nbsp;
									<span>{{ weather.windDir || '--' }}</span>
								</div>
							</div>
						</div>
					</Transition>
					<Transition appear name="fade-right">
						<div class="line" style="margin-top: 38px; margin-bottom: 10px;">
							我的音乐
						</div>
					</Transition>
					<Transition appear name="fade-right">
						<div class="music-all">
							<div class="player-box" id="player">
							</div>
						</div>
					</Transition>
					
				</div>
				
				<SearchReg @check-reg="checkReg" ref="searchReg"></SearchReg>
			</div>
		</div>
		
		<div class="footer">
			<div id="lrc">
				<span class="lrc-show">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="18"
						height="18"
					>
						<path fill="none" d="M0 0h24v24H0z" />
						<path
							d="M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465z"
							fill="rgba(255,255,255,1)"
						/>
					</svg>
					&nbsp;&nbsp;&nbsp;{{ footerLrc }}&nbsp;&nbsp;&nbsp;
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="18"
						height="18"
					>
						<path fill="none" d="M0 0h24v24H0z" />
						<path
							d="M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465z"
							fill="rgba(255,255,255,1)"
						/>
					</svg>
				</span>
			</div>
		</div>
  </div>
</template>
<script setup lang="ts" name="Home">
import _ from 'lodash'
import 'aplayer/dist/APlayer.min.css';
import FlipClock from '@/components/FlipClock/index.vue'
import SearchReg from '@/components/SearchReg.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import Accordion from './Accordion.vue'
import background5 from '@/assets/image/background5.webp'
import APlayer from 'aplayer';
import { ref, reactive, unref, nextTick, onBeforeUnmount } from "vue";
import { parseTime } from '@/utils'
import { getWeather, getMusicList, getHitokoto, getRandomCat } from '@/api/index'
import { ElMessage } from 'element-plus'
import musicList  from '@/assets/json/musicList.json'
import { useRouter } from "vue-router";
import { GlobalStore } from "@/stores";
const router = useRouter()
const iconStyle = ref<any>({
	fill: '#fff',
	width: '30px',
	height: '30px'
})
// 图标功能描述
let iconDescription = ref<string>('')
const iconMousemove = (type?: string) => {
	if(type === 'switch') {
		iconDescription.value = '切换壁纸'
	} else if(type === 'github') {
		iconDescription.value = '去 GitHub 看看'
	} else if(type === 'information') {
		iconDescription.value = '我的信息'
	} else if(type === 'navigation') {
		iconDescription.value = '网页导航'
	} else if(type === 'largeScreen') {
		iconDescription.value = '可视化大屏'
	}
}
const leaveInfo = () => {
	router.push('/test')
}
const leaveNavigation = () => {
	router.push('/3dModel')
}
const leaveScreen = () => {
	router.push('/largeScreen')
}

const iconMouseout = () => {
	iconDescription.value = ''
}
// 修改背景图片
const globalStore = GlobalStore();
let bgImage = ref<string>(background5)
// @/assets/image/background5.webp
let bg_img_preinstall = {
    "type": "1", // 1:默认背景 2:每日一图 3:随机风景 4:随机动漫
    "2": "https://api.dujin.org/bing/1920.php", // 每日一图
    "3": "https://api.ixiaowai.cn/gqapi/gqapi.php", // 随机风景
    "4": "https://api.ixiaowai.cn/api/api.php" // 随机动漫
};
let count: number = 1
const setBgImgInit = () => {
	count++
	if(count > 4) count = 1
	switch (count) {
		case 1:
			bgImage.value = background5
			break;
		case 2:
			bgImage.value = bg_img_preinstall[2]
			break;
		case 3:
			bgImage.value = bg_img_preinstall[3]
			break;
		case 4:
			bgImage.value = bg_img_preinstall[4]
			break;
	}
	globalStore.setGgImage(bgImage.value)
	// 判断图片是否加载完毕
	const dom = document.querySelector("#bg") as HTMLElement
	dom.onload = function () {
		ElMessage({
			duration: 2000,
			center: true,
			appendTo: document.querySelector('.home-box') as HTMLElement,
			message: '壁纸切换成功'
		})
	}
}

const getToGithub = () => {  
	const url = 'https://github.com/LinQianduan/on-line-page'
	// window.location.href = url
	window.open(url)
}

// 切换一言
interface Hitokoto {
	[key: string]: any;
}
let hitokoto = ref<Hitokoto>({
	hitokoto: '宇宙很大，生活更大，也许以后还有缘相见。',
	from: '三体'
})

// 点击切换一言
let isLoading = ref<boolean>(false)
const switchHitokotoFn = () => {
	if(unref(isLoading)) {
		ElMessage({
			duration: 2000,
			center: true,
			appendTo: document.querySelector('.home-box') as HTMLElement,
			message: '您点击太快了'
		})
		return
	}
	isLoading.value = true
	getHitokoto().then((res: any) => {
		hitokoto.value = res.data
		isLoading.value = false
	}).catch(_ => {
		isLoading.value = false
	})
}

let date = ref<string>(parseTime(new Date(), '{yyyy}{mm}{dd}'))
let week = ref<string>('星期一');
setInterval(() => {
	let days = new Date().getDay()
	switch(days) {
		 case 1:
				 week.value = '星期一';
				 break;
		 case 2:
				 week.value = '星期二';
				 break;
		 case 3:
				 week.value = '星期三';
				 break;
		 case 4:
				 week.value = '星期四';
				 break;
		 case 5:
				 week.value = '星期五';
				 break;
		 case 6:
				 week.value = '星期六';
				 break;
		 case 0:
				 week.value = '星期日';
				 break;
	}
}, 1000)

// 选择地区获取天气
let timeLoading = ref<boolean>(false)
let searchReg = ref()
let weather = reactive<any>({})
let regionId = ref<number>(101020600)
let region = ref<string>('上海市-浦东新区')

let openSearchReg = () => {
	searchReg.value.handleOpen()
}
const getWeatherFn = () => {
	timeLoading.value = true
	getWeather({
		location: regionId.value
	}).then(res => {
		weather = res.data.now
		timeLoading.value = false
	}).catch( _ => {
		timeLoading.value = false
	})
}
getWeatherFn()
let checkReg = (regItem: any) => {
	region.value = `${regItem.adm2}-${regItem.name}`
	regionId.value = regItem.id
	getWeatherFn()
}

// 接口获取音乐列表
// let audioList = reactive([])
// getMusicList().then((res: any) => {
// 	audioList = res.data || []
// 	ap.value.list.add(audioList)
// }).catch(e => {
// 	console.log(e, 178)
// })
const ap = ref<any>()
let footerLrc = ref<string>('')
let time = ref<any>(null)
nextTick(() => {
	ap.value = new APlayer({
			container: document.getElementById('player'),
			mini: false,
			autoplay: true,
			theme: '#464952',
			loop: 'all',
			order: 'random',
			preload: 'auto',
			volume: 0.7,
			mutex: true,
			listFolded: false,
			listMaxHeight: '165px',
			lrcType: 3,
			audio: musicList
	});
	ap.value.on('noticeshow', function () {
			// ap.value.notice('音频发生错误, 将在2秒内跳过。', 2000, 0.8);
			const dom = document.querySelector('.aplayer-notice')
			if(dom) {
				dom.innerHTML = '音频发生错误, 将在2秒内跳过。'
			}
	});
	ap.value.on('timeupdate', function() {
		const currentDom = document.querySelector(".aplayer-lrc-current") as HTMLElement
		if(currentDom) {
			if(footerLrc.value !== currentDom.innerText) {
				footerLrc.value = currentDom.innerText
			}
		}
	})
})

// 离开之前清楚定时器
onBeforeUnmount(() => {
	if(time.value !== null) {
		clearInterval(time.value)
	}
	if(!ap.value) return
	ap.value.destroy()
})



</script>
<style scoped lang="scss">
.home-box {
	box-sizing: border-box;
	position: relative;
	// min-height: 600px;
  width: 100%;
	min-height: 100%;
	overflow: hidden;
}

.home-box .main {
	width: 1300px;
	height: 100%;
	margin: 0 auto;
	margin-bottom: 80px;
	.container {
		width: 1300px;
		display: flex;
		margin-top: 100px;
		justify-content: space-around;
		align-items: center;
		.con-left {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			flex-direction: column;
			.left-top {
				width: 100%;
				height: 120px;
				display: flex;
				.photo-img {
					border-radius: 60px;
					width: 120px;
					height: 120px;
					transition: 0.3s;
					&:hover {
						transform: rotate(180deg);
					}
				}
				.name {
					width: 100%;
					height: 100%;
					margin-left: 10px;
					.img-title-big {
						color: #fff;
						font-size: 54px;
						line-height: 160px;
						font-family: 'Pacifico-Regular' !important;
					}
				}
			}
			.left-center {
				width: 450px;
				height: 130px;
				margin-top: 44px;
				background: rgb(0 0 0 / 25%);
				padding: 20px 20px;
				border-radius: 6px;
				.des-title {
					width: 100%;
					height: 100%;
					color: #fff;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					&>:nth-child(1) {
						align-self: flex-start;
						font-family: 'Pacifico-Regular' !important;
					}
					&>:nth-child(3) {
						align-self: flex-end;
					}
				}
			}
			.left-bottom {
				box-sizing: border-box;
				width: 450px;
				height: 50px;
				margin-top: 12px;
				padding: 0 6px;
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;
				&:hover {
					background: rgb(0 0 0 / 25%);
					border-radius: 6px;
				}
				.icon-list {
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					.icon-item {
						width: 50px;
						height: 100%;
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				.description {
					color: #fff;
					text-align: right;
					line-height: 50px;
					font-weight: 700;
					font-size: 16px;
				}
			}
			.left-photo {
				box-sizing: border-box;
				overflow: hidden;
				width: 450px;
				height: 160px;
				margin-top: 22px;
				// background: rgb(0 0 0 / 25%);
				// border-radius: 6px;
			}
		}
		.con-right {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.module {
				width: 100%;
				// height: 200px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.line {
				width: 100%;
				height: 30px;
				margin: 0px 6px;
				font-size: 20px;
				margin-top: 12px;
				color: #fff;
				font-weight: 700;
			}
			.music-all {
				box-sizing: border-box;
				backdrop-filter: blur(10px);
				width: 100%;
				height: 300px;
				background: rgb(0 0 0 / 25%);
				padding: 20px;
				border-radius: 6px;
				.player-box {
					width: 100%;
					height: 100%;
					margin: 0 !important;
				}
				// :deep(.aplayer-list) {
				// 	overflow-y: scroll;
				// }
			}
		}
		.hitokoto {
			width: 310px;
			height: 150px;
			background: rgb(0 0 0 / 25%);
			padding: 20px;
			border-radius: 6px;
			position: relative;
			
			&:hover {
				&>.tootip {
					display: block;
				}
			}
			.tootip {
				position: absolute;
				left: 0;
				top: 0;
				color: #fff;
				font-weight: 700;
				text-align: center;
				line-height: 30px;
				font-size: 14px;
				border-top-left-radius: 6px;
				border-top-right-radius: 6px;
				width: 100%;
				height: 30px;
				background-color: rgb(0 0 0 / 50%);
				display: none;
			}
			.hitokoto-all {
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				padding: 12px 0;
				cursor: pointer;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.hitokoto-text {
					color: #fff;
					font-size: 18px;
				}
				#hitokoto_text {
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.hitokoto-from {
					color: #fff;
					font-weight: bold;
					align-self: flex-end;
					font-size: 18px;
				}
			}
		}
		.time {
			width: 310px;
			height: 150px;
			background: rgb(0 0 0 / 25%);
			padding: 10px 20px;
			border-radius: 6px;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			.top {
				width: 100%;
				height: 35px;
				box-sizing: border-box;
				padding-top: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 16px;
			}
			.draw {
				flex: none;
				height: 50%;
			}
			.weather {
				flex: auto;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 16px;
				a {
					color: #fff;
				}
			}
		}
	}
}

.home-box .footer {
	position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
	text-align: center;
  height: 46px;
  backdrop-filter: blur(10px);
  background: rgb(0 0 0 / 25%);
	#lrc {
		color: #fff;
		font-size: 18px;
		height: 100%;
		.lrc-show {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
.cards {
	box-sizing: border-box;
  transition: transform 0.5s;
  backdrop-filter: blur(10px);
  &:hover {
    transform: scale(1.01);
		backdrop-filter: blur(0px);
    transition: transform 0.5s;
  }
  &:active {
    transform: scale(0.95);
		backdrop-filter: blur(0px);
    transition: transform 0.5s;
  }
}
:deep(.el-message--info) {
	--el-message-bg-color: rgb(0 0 0 / 40%) !important;
  --el-message-border-color: rgb(0 0 0 / 40%) !important;
  --el-message-text-color: #fff;
}
:deep(.el-message) {
	border-radius: 24px;
	border-style: none;
}
</style>
<style>
.aplayer {
    background: transparent !important;
    width: 100%;
    /* border-radius: 6px !important; */
		box-shadow: none;
    margin-right: 18px;
    font-family: 'HarmonyOS_Regular', sans-serif !important;
}

/* .aplayer.aplayer-withlrc .aplayer-pic {
    display: none;
} */

.aplayer.aplayer-withlrc .aplayer-info {
    margin-left: 0px !important;
}

.aplayer.aplayer-withlrc .aplayer-info {
    /* background-color: #ffffff26; */
    /* border-radius: 6px; */
}

/*歌曲名称*/
.aplayer .aplayer-info .aplayer-music .aplayer-title {
    font-size: 16px !important;
		margin: 0 0 5px 15px;
}

/*音乐列表*/
.aplayer.aplayer-withlist .aplayer-list {
    margin-top: 6px;
}

.aplayer .aplayer-list ol li.aplayer-list-light {
    background: #ffffff26 !important;
    border-radius: 6px !important;
}

.aplayer .aplayer-list ol li:hover {
    background: #ffffff26 !important;
    border-radius: 6px !important;
}

.aplayer .aplayer-list ol li {
    border-top: 1px solid transparent !important;
}

.aplayer.aplayer-withlist .aplayer-info {
    border-bottom: 1px solid transparent !important;
}

.aplayer-list-cur {
    background-color: #eeeeee !important;
}

/*控制面板 - Bug*/
/* .aplayer .aplayer-info .aplayer-controller {
    display: none !important;
} */

/*歌词间距*/
.aplayer .aplayer-lrc {
    margin: 4px 0 0px !important;
    height: 34px !important;
}

/* .aplayer .aplayer-lrc {
    text-align: left !important;
    margin-left: 100px !important;
} */

/*歌词大小*/
.aplayer .aplayer-lrc p.aplayer-lrc-current {
    font-size: 14.5px !important;
}

/*全局字体颜色*/
.aplayer .aplayer-info .aplayer-music .aplayer-title,
.aplayer .aplayer-info .aplayer-music .aplayer-author,
.aplayer .aplayer-lrc p,
span.aplayer-list-title,
span.aplayer-list-author,
span.aplayer-list-index {
    color: white !important;
}

/*全局背景*/
.aplayer .aplayer-lrc:after,
.aplayer .aplayer-lrc:before {
    background: transparent !important;
}
html {
	/* overflow: overlay; */
	/* overflow-x: hidden; */
}
</style>
