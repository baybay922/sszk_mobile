<template>
  <div class="registsuc talignc">
    <div class="regbox mt30">
      <div class="img-box">
        <img src="../images/res_fail.png" class="sucimg">
      </div>
      <h1>对不起！您的账号未激活</h1>
      <p>我们的客服人员会尽快联系您审核资料并为您开通使用权限，请您耐心</p>
      <mt-button type="default" class="modify" @click="modify">修改注册资料</mt-button>
      <mt-button type="default" class="getback" onclick="NTKF.im_openInPageChat()">联系客服</mt-button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'registfail',
  data () {
    return {
      
    }
  },
  methods: {
   getback() {
     let path = {path: '/login',query: {}};
     this.$router.push(path);
   },
   modify(){
     let path = {path: '/regist',query: {}};
     this.$router.push(path);
   }
    
  },
  mounted(){
  } 
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.img-box{
  width:70%;
  height: auto;
  margin: 40px auto;
}
.img-box img{
  height: auto;
  width:100%;
}

.registsuc{
  width: ~`px2rem(690)`;
    height: 95%;
    overflow: hidden;
    border-radius: 15px;
    background-color: #fff;
    margin: .4rem auto;
}
.regbox{
  width:95%;
  height:98%;  
  margin: .4rem auto 0!important;
}

h1{
  font-size:18px;
  margin:2rem auto .5rem;
  color:#333;
}
.regbox p{
  color: #9da3b4;
  width:70%;
  margin: 0 auto;
  font-size: 14px;
}
.modify{
  width:60%;
  height: ~`px2rem(82)`;
  background: -webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
  position: absolute;
  bottom: 3rem;
  left: 50%;
  margin-left: -30%;
  color: #fff;
}
.getback{
  width:60%;
  height: ~`px2rem(82)`;
  border: 1px solid #2CBB55;
  position: absolute;
  bottom: 48px;
  left: 50%;
  margin-left: -30%;
  color:#2CBB55;
}
</style>
