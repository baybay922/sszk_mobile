require('../build/env-config')
//运行多环境配置相关配置

const paths = [
    "index",
    "/product",
    "/order",
    "/user",
    "/common",
    "/trade",
    "/bill",
    "/statistics",
    "/index",
    "weixin",
    "/SevenMoor",
    "/pos",
    "/yunshangtong"
  ]
  
  const useStrategy = {
    target: process.env.BASE_URL,
    changeOrigin: true
  }
  
  const proxyTableObj = {}
  
  paths.forEach(path => {
    proxyTableObj[path] = Object.assign({}, useStrategy)
  })
  
  module.exports = proxyTableObj;
