module.exports = {
  publicPath: '/ctms/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.100.168.127:5000',
        changeOrigin: true,
      },
    },
  },
};