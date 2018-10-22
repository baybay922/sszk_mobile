<template>
  <div id="app">
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title" ></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title" ></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import "./less/functions";
#app {
  //height: 100%;
  background-image: url(./images/bgimg.png);
  background-repeat: no-repeat;
  background-size: 65.1%;
  background-position: 0 1rem;
}
html, body, #app {
  height: 100%;
  //overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #1D1D28;;
}
.mint-msgbox-input{
  text-align: center;
}
.mint-msgbox-input input{
  padding:0.1rem 0!important;
  width:60%!important;
  text-align:center;
}
</style>
