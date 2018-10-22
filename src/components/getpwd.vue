<template>
  <div class="getpwd mt30 talignc">
    <div v-if="this.tab == 1">
      <mt-field placeholder="请输入手机号" v-model="loginForm.loginName" class="mt30 input11" type="tel"></mt-field>
      <mt-field v-if="!isweixin" placeholder="请输入右侧图片验证码" v-model="loginForm.imgValidateCode" class="mt30 input11">
        <span @click="getimgValidateCode"><img v-bind:src="this.imgValidateCodeImg"  class="borad"></span>
      </mt-field>
      <mt-field placeholder="请输入短信验证码" v-model="loginForm.msgValidateCode" class="mt30 input11" type="tel">
        <mt-button type="primary" class="msgbtn" v-bind:disabled="this.msgdisabled" @click="getSmsCode">{{ msgtitle }}</mt-button>
      </mt-field>
      <mt-button type="primary" class="loginbutton mt30 nextBtn" @click="submit">下一步</mt-button>
    </div>
    <div v-if="this.tab == 2">
      <mt-field placeholder="请输入新密码" type="password" v-model="getpwd.newPwd" class="mt30 input11 oldPwdVal" @blur.native.capture="getPwdType"></mt-field>
      <mt-field placeholder="请重复新密码" type="password" v-model="getpwd.confirmNewPwd" class="mt30 input11 newPwdVal"></mt-field>
      <mt-button type="primary" class="loginbutton mt30 nextBtn" @click="subchange">修改</mt-button>
    </div>
  </div>
</template>

<script>
import {loginService} from "../services/login";
import {Toast} from 'mint-ui';
import $ from 'jquery';
export default {
  name: 'getpwd',
  data () {
    return {
    orgType:this.$route.query.orgType,
     tab: 1, 
     isweixin: false,
     msgtitle: '发送验证码',
     msgdisabled: false,
     imgValidateCodeImg: '',
     loginForm: {
      loginName: '',
      imgValidateCode: '',
      msgValidateCode: ''
    },
    getpwd: {
      newPwd: '',
      confirmNewPwd: ''
    }
      
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
    submit() {
       var myreg = /^[1]\d{10}$/;
      if (!myreg.test(this.loginForm.loginName) || this.loginForm.loginName == "" || this.loginForm.loginName.length < 11) {
        Toast('请输入正确的手机号')
        return
      } else if (this.pwd == '') {
        Toast('请输入验证码')
        return
      }
      if(this.isweixin){
        this.loginForm.imgValidateCode = 'weixin'
      }
      if(this.orgType == 'P'){
        loginService.ChangePwdType(this.loginForm.loginName, this.loginForm.imgValidateCode, this.loginForm.msgValidateCode).then(r => {//g
          if(r.flag == 20000) {
            this.tab = 2;
            this.$nextTick(()=>{
              $(".oldPwdVal").find("input").attr({maxlength:"16"})
            $(".newPwdVal").find("input").attr({maxlength:"16"})
            })
          }else if(r.flag == 50002 || r.flag == 50003) {
            let orgType = r.data.orgType
            if(orgType == 'C'){
              let path = {path: '/noactive', query: {orgType: orgType}}
              this.$router.push(path)
            }else if(orgType == 'B') {
              let path = {path: '/noactive', query: {orgType: orgType}}
              this.$router.push(path)
            }
          }else{
            Toast(r.msg)
            this.getimgValidateCode()
          }
        }).catch(e => {
          console.log(e)
        });
      }else{
        loginService.getpwd(this.loginForm.loginName, this.loginForm.imgValidateCode, this.loginForm.msgValidateCode).then(r => {//q
          if(r.flag == 20000) {
            this.tab = 2;
            this.$nextTick(()=>{
              $(".oldPwdVal").find("input").attr({maxlength:"16"})
            $(".newPwdVal").find("input").attr({maxlength:"16"})
            })
            
          }else if(r.flag == 50002 || r.flag == 50003) {
            let orgType = r.data.orgType
            if(orgType == 'C'){
              let path = {path: '/noactive', query: {orgType: orgType}}
              this.$router.push(path)
            }else if(orgType == 'B') {
              let path = {path: '/noactive', query: {orgType: orgType}}
              this.$router.push(path)
            }
          }else{
            Toast(r.msg)
            this.getimgValidateCode()
          }
        }).catch(e => {
          console.log(e)
        });
      }
        
    },
    getimgValidateCode() {
      let max = 100
      let randnum = parseInt(Math.random()*(max+1),10)
      loginService.getCode().then(r => {
        this.imgValidateCodeImg =  r + '?randnum' + randnum
      }).catch(e => {
        console.log(e)
      });
    },
    isWeiXin() { 
      var ua = window.navigator.userAgent.toLowerCase()
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        this.isweixin = true
      }else{ 
        this.isweixin = false
      } 
    },
    getSmsCode() {
      if(!this.loginForm.loginName){
        Toast('请填写手机号!')
        return
      }
      if(this.isweixin){
        this.loginForm.imgValidateCode = 'weixin'
      }
      loginService.getSmsCode(this.loginForm.loginName, 3, '' , this.loginForm.imgValidateCode).then(r => {
        if (r.flag == 20000) {
          Toast('短信已发送，请注意查收！')
          this.msgdisabled = true
          this.makenum()
          return
        } else {
          Toast(r.msg)
        }

      }).catch(e => {
        console.log(e);
      });
    },
    makenum() {
      let num = 60
      let self = this
      let interval = window.setInterval(function() {
          num--
          self.msgtitle = '重新获取(' + num + ')'
          if (num == 0) {
            self.msgtitle = '获取短信验证码'
            self.msgdisabled = false
            window.clearInterval(interval)
          }
        }, 1000)
    },
    subchange() { 
      if(this.getpwd.newPwd == '' || this.getpwd.confirmNewPwd == ''){
        Toast('请输入新密码！')
        return
      }else if(this.getpwd.newPwd !== this.getpwd.confirmNewPwd) {
         Toast('新密码输入不一致！')
        return
      }
      loginService.sendNewPwd(this.loginForm.loginName, this.getpwd.newPwd, this.getpwd.confirmNewPwd).then(r => {
        console.log(r)
        if(r.flag == 20000) {
          Toast(r.msg)
          if(this.orgType == 'P'){
            let path = {path: '/supplierLogin', query: {}}
            this.$router.push(path)  
          }else{
            let path = {path: '/login', query: {}}
            this.$router.push(path)  
          }
          
        }else if (r.flag == 50005){
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      });
    }
  },
  mounted(){
    this.isWeiXin()
    this.getimgValidateCode();
    
    $(".mint-field-clear").css({
      "margin":"0 .3rem"
    })
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.nextBtn{
  width:95%;
  background: -webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
}
.input11{
    margin: 0rem auto!important;
    padding: .2rem 0;
   border-bottom: 1px solid #363645;
}
.getpwd{
  width:85%;
  height:auto;
  padding: 0 7.5%;
  background:#1D1D28 url(../images/bgimg.png) no-repeat left bottom;
  background-size: 65.1%;
  margin-top: 0!important;
}
.mint-cell-value input{
  
}
.mt30{
  margin: 0 auto;
}
.loginbutton{
  margin: ~`px2rem(60)` 0!important;
}
.borad{
  width: ~`px2rem(180)`;
  height: ~`px2rem(70)`;
}
.msgbtn{
  color: #2CBB55;
  padding: 0 ~`px2rem(5)`;
  border: none;
  background: none;
  font-size: ~`px2rem(30)`;
}
</style>
