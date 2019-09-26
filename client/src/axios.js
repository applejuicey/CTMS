import axios from 'axios';

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json';
// 开发环境使用这个：
// axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = 'https://easy-mock.com/mock/5b8e6ff6189f3722c8cb6da3/api';
// 生产环境使用这个：
axios.defaults.baseURL = 'http://47.100.168.127:5000/api';

axios.interceptors.request.use(function (config) {
  //判断localStorage中是否存在token，并添加至header中
  if(JSON.parse(localStorage.getItem('token'))){
    config.headers.common['Authentication'] = JSON.parse(localStorage.getItem('token'));
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export {
  axios
}