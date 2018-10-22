<template>
  <div class="addseller">
    <div class="info-container">
      <mt-field label="手机号" placeholder="请输入业务员手机号" v-model="phone" class="mt30"></mt-field>
      <mt-field label="姓名" placeholder="请输入业务员姓名" v-model="name" class="mt30"></mt-field>
      <mt-field label="登录密码" placeholder="请输入业务员登录密码" v-model="loginPwd" class="mt30" style="border:none;"></mt-field>
      <div class="talignc">
         <p class="info">添加的业务员将使用手机号和密码登录本服务平台</p>
        <mt-button type="primary" class="loginbutton" @click="subadd">确认添加</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'addseller',
  data () {
    return {
      phone: '',
      name: '',
      loginPwd: ''
      //newUser: true, //用户是否存在
    }
  },
  methods: {

   subadd() {
     var myreg = /^[1]\d{10}$/;
    if(this.phone == "" && this.name == "" && this.loginPwd == ""){
      Toast("请完善信息")
    }else{
      if(!myreg.test(this.phone) || this.phone == "" || this.phone.length < 11){
          Toast("请输入正确的手机号")
      }else{
        loginService.addSeller(this.phone, this.name, this.loginPwd).then(r => {
          if (r.flag == 20000) {
            Toast(r.msg)
            let path = {path: '/sellers',query: {}}
            this.$router.push(path)
          } else {
            Toast(r.msg)
          }
        }).catch(e => {
          console.log(e)
        })
      }
      
    }
  }
  },
  mounted(){
    $(".mint-field-core").css({
      "text-align":"right",
     "margin-right":"15px"
    })
    $(".mint-cell-text").css({
      "margin-left":"0"
    })
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.info-container{
  border-bottom: ~`px2rem(1)` solid #363645;
}
.addseller{
 
  .info{
    text-align: center;
    font-size: 12px;
    color:#9DA3B4;
    margin-bottom: .2rem;
  }
}
.mt30{
  width: 95%;
  margin-left: 5%;
  color:#fff;
  border-bottom: ~`px2rem(1)` solid #363645;
  margin-top: 0!important;
  padding: .1rem 0;
}
.talignc{
  width: 100%;
  position: absolute;
  bottom:0;
  left:0;
}
.loginbutton{
  width: 100%;
  border-radius: 0;
  background-image: linear-gradient(-135deg, #2CBB86 0%, #2CBB55 100%);
}
</style>
