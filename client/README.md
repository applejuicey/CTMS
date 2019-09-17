# client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 关于部署
## windows server 2019 + nginx 1.16.1
1\. 开发时配置
```
router.js
    mode: 'history',
    base: '/ctms/',
```
```
vue.config.js
module.exports = {
  publicPath: '/ctms/',
};
```
2\. nginx.conf
```
server {
    root d:/projects/;
    index index.html;
    location /ctms {
        try_files $uri $uri/ /ctms/index.html;
    }
}
```
3\. ```nginx -s reload```