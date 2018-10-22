<template>
  <div class="noactive talignc">
    <div class="regbox mt30">
      <img src="../images/noactiveimg.png" class="sucimg">
      <h1>对不起！您的账号未激活</h1>
      <p>我们的客服人员会尽快联系您审核资料并为您开通使用权限，请您耐心等待</p>
      <mt-button type="default" class="getback" @click="toregistinfo">修改注册信息</mt-button><br>
      <mt-button type="default" class="call" onclick="NTKF.im_openInPageChat()">联系客服</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'noactive',
  data () {
    return {
     orgType: this.$route.query.orgType,
     type:this.$route.query.type
      //newUser: true, //用户是否存在
    }
  },
  methods: {
   toregistinfo() {
     //console.log(this.orgType);
     if(this.orgType == 'C') {
       let path = {path: '/regist2c', query: {}}
       this.$router.push(path)
     } else if (this.orgType == 'B') {
       let path = {path: '/regist2b', query: {}}
       this.$router.push(path)
     }else if(this.orgType == 'P'){
       let path = {path: '/perfectInfo', query: {orgType: 'P',type: this.type}}
       this.$router.push(path)
     }
   },
   call() {
     document.getElementById('call').click();
   }
  },
  mounted(){
    //this.toregistinfo()
  } 
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.talignc{
    padding: 0.3rem 0;
}
.noactive{
  margin-top: 0!important;
}
.regbox{
  width: ~`px2rem(630)`;
  height: ~`px2rem(1000)`;
  margin-left: ~`px2rem(20)`;
  background-color: #fff;
  border-radius: ~`px2rem(25)`;
  padding: ~`px2rem(40)`;
  margin-top: 0!important;
}
.sucimg{
  width: ~`px2rem(180)`;
  height: ~`px2rem(180)`;
  margin-top: ~`px2rem(100)`;
}
h1{
  font-size: ~`px2rem(36)`;
  margin: ~`px2rem(50)` 0
}
p{
  color: #8A8A8A;
}
.getback{
  width: ~`px2rem(300)`;
  height: ~`px2rem(82)`;
  border: ~`px2rem(2)` solid;
  margin-top: ~`px2rem(150)`;
}
.call{
  width: ~`px2rem(300)`;
  height: ~`px2rem(82)`;
  border: ~`px2rem(2)` solid;
  margin-top: ~`px2rem(30)`;
}
</style>
