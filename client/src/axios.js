import axios from 'axios';

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'https://easy-mock.com/mock/5b8e6ff6189f3722c8cb6da3/api';
// http://47.100.168.127:5000/api
try {
  let userID = JSON.parse(localStorage.getItem('userInfo')).userID;
  console.log(userID);
  axios.defaults.headers.userID = userID;
} catch (error) {
  console.error('没有在localStorage中读取到userID', error);
}
try {
  let token = JSON.parse(localStorage.getItem('token'));
  console.log(token);
  axios.defaults.headers.Authorization = `Bearer ${token}`;
} catch (error) {
  console.error('没有在localStorage中读取到token', error);
}

export {
  axios
}

// //POST传参序列化(添加请求拦截器)
// axios.interceptors.request.use((config) => {
//   //在发送请求之前做某件事
//   if(config.method  === 'post'){
//     config.data = qs.stringify(config.data);
//   }
//   return config;
// },(error) =>{
//   console.log('错误的传参')
//   return Promise.reject(error);
// });

// //返回状态判断(添加响应拦截器)
// axios.interceptors.response.use((res) =>{
//   //对响应数据做些事
//   if(!res.data.success){
//     return Promise.resolve(res);
//   }
//   return res;
// }, (error) => {
//   console.log('网络异常')
//   return Promise.reject(error);
// });

// //返回一个Promise(发送post请求)
// export function fetchPost(url, params) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, params)
//         .then(response => {
//           resolve(response);
//         }, err => {
//           reject(err);
//         })
//         .catch((error) => {
//           reject(error)
//         })
//   })
// }
// ////返回一个Promise(发送get请求)
// export function fetchGet(url, param) {
//   return new Promise((resolve, reject) => {
//     axios.get(url, {params: param})
//         .then(response => {
//           resolve(response)
//         }, err => {
//           reject(err)
//         })
//         .catch((error) => {
//           reject(error)
//         })
//   })
// }
// export default {
//   fetchPost,
//   fetchGet,
// }