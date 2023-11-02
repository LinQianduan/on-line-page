import axios from 'axios'
// 310116 34a50a58960848069e4c529c69295488
export const QWEATHERKEY = '34a50a58960848069e4c529c69295488'

// 获取浦东天气
// https://geoapi.qweather.com/v2/city/lookup?location=101020600&key=34a50a58960848069e4c529c69295488
export function getWeather(params?: any) {
  return axios({
    url: `https://devapi.qweather.com/v7/weather/now?key=${QWEATHERKEY}`,
    method: 'get',
    params
  })
}

// 搜索地区 location=beij
export function getLookup(params?: any) {
  return axios({
    url: `https://geoapi.qweather.com/v2/city/lookup?key=${QWEATHERKEY}`,
    method: 'get',
    params
  })
}

// 感谢 @武恩赐 提供的 MetingAPI
// https://api.wuenci.com/meting/api/
// /top/playlist?limit=10&order=new
export function getMusicList(params?: any) {
  return axios({
    url: "https://api.wuenci.com/meting/api/?server=netease&type=playlist&id=7452421335",
    method: 'get',
    params
  })
}

// 获取一言
export function getHitokoto(params?: any) {
  return axios({
    url: "https://v1.hitokoto.cn?max_length=24",
    method: 'get',
    params
  })
}

// 随机风景图 https://api.ixiaowai.cn/gqapi/gqapi.php
export function getRandomScy(params?: any) {
  return axios({
    url: "https://api.ixiaowai.cn/gqapi/gqapi.php",
    method: 'get',
    params
  })
}

// 随机动漫图 https://api.ixiaowai.cn/api/api.php
export function getRandomCat(params?: any) {
  return axios({
    url: "https://api.ixiaowai.cn/api/api.php",
    method: 'get',
    params
  })
}

// addUser, updateUser, delUser, getList