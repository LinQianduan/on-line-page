import axios from 'axios'
axios.defaults.baseURL = '/api'
 
export const addUser = (data: any) => axios.post('/user',data).then(res => res.data)
 
export const getList = (data: any) => axios.get('/user',{params:data}).then(res => res.data)
 
export const delUser = (data: any) => axios.delete(`/user/${data.id}`).then(res => res.data)
 
export const updateUser = (data: any) => axios.patch(`/user/${data.id}`,data).then(res => res.data)

//添加tag
export const addTags = (data: any) => axios.post(`/user/add/tags`,data).then(res => res.data)