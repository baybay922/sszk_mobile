<template>
  <div class="changepwd">
    <div>
      <mt-field label="旧密码" placeholder="请输入旧密码" v-model="getpwd.oldPwd" v-if="isSetPwd == 0" class="mt30" type="password"></mt-field>
      <mt-field label="新密码" placeholder="请输入新密码" v-model="getpwd.newPwd" class="mt30" type="password" @blur.native.capture="getPwdType"></mt-field>
      <mt-field label="新密码" placeholder="请重复新密码" v-model="getpwd.confirmNewPwd" class="mt30" type="password"></mt-field>
      <div class="talignc">
        <mt-button type="primary" class="loginbutton mt30" @click="subchange">修改</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'changepwd',
  data () {
    return {
     getpwd: {
       oldPwd: '',
       newPwd: '',
       confirmNewPwd: ''
     },
     isSetPwd: 0      
      //newUser: true, //用户是否存在
    }
  },
  methods: {
    getPwdType(){
      let pwdReg = /^[a-zA-Z\d_]{8,16}$/;
      if(!pwdReg.test(this.getpwd.newPwd)){
        Toast('密码由数字或字母组合形式，不少于8位！');
        return;
      }
    },
    subchange() {
      if(this.getpwd.newPwd !== this.getpwd.confirmNewPwd) {
        Toast('新密码输入不一致！')
      }else if((this.getpwd.oldPwd == '' || this.getpwd.newPwd == '' || this.getpwd.confirmNewPwd == '') && this.isSetPwd == 0) {
        Toast('请填写完整!')
      }else{
        if(this.isSetPwd == 1){
          this.getpwd.oldPwd = 'haspwd'
        }
        loginService.changePwd(this.getpwd.oldPwd, this.getpwd.newPwd, this.getpwd.confirmNewPwd).then(r => {
          if (r.flag == 20000) {
            Toast(r.msg)
            let path = {path:'/setting',query:{}};
            this.$router.push(path)
          } else {
            Toast(r.msg)
          }
        }).catch(e => {
          console.log(e)
        })
      }
    },
   getUserInfo() {
      loginService.getUserInfo().then(r => {
        this.isSetPwd = r.data.isSetPwd
        if(r.data.isSetPwd == 0){
          document.title = "修改密码"
        }else{
          
            document.title = "设置密码"
        }
    }).catch(e => {
      console.log(e)
    })
    }
  },
  mounted(){
    this.getUserInfo();
    $(".mint-field-core").css({
      "text-align":"right",
      "margin-right":"15px"
    })
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.mt30{
  color:#fff;
  border-bottom: 1px solid #484855;
}
.loginbutton{
  position: absolute;
  bottom:0;
  left:0;
  width:100%;
  background:-webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
  border-radius: 0;
  border:none;
  font-size: 16px;
}
</style>
