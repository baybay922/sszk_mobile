<template>
  <div class="login common-margin-top">
    <div class="logo-img">
      <img class="logo-img" src="../images/logo.png" alt="">
    </div>
    <mt-navbar v-model="logintab">
      <mt-tab-item id="1">
        <p><img src="../images/loginicona.png" class="loginicon" v-if="logintab == '1'"><img src="../images/loginiconc.png" class="loginicon" v-if="logintab == '2'"></p>
        <span class="navbarborder">
            <i>验证码登录</i>
        </span>
      </mt-tab-item> 
      <mt-tab-item id="2">
        <p><img src="../images/loginicond.png" class="loginicon" v-if="logintab == '2'"><img src="../images/loginiconb.png" class="loginicon" v-if="logintab == '1'"></p>
        <span class="navbarborder">
          <i>密码登录</i>
        </span>
      </mt-tab-item>
    </mt-navbar>
   
    <div class="inputbox" v-if="logintab == '1'">
      <input type="tel" v-model="loginForm.loginName" placeholder="请输入手机号" class="mt30 info-box pwdBxo" maxlength="11">
      <div class="mt30 info-box pwdBxo"  v-if="!isweixin">
        <input type="tel" v-model="loginForm.imgValidateCode" placeholder="请输入右侧图片验证码">
        <span class="getImgCode" @click="getimgValidateCode"><img v-bind:src="this.imgValidateCodeImg" class="borad"></span>
      </div>
      <div class="mt30 info-box pwdBxo">
        <input type="tel" v-model="loginForm.msgValidateCode" placeholder="请输入短信验证码" maxlength="6">
        <mt-button type="default" class="msgbtn" v-bind:disabled="this.msgdisabled" @click="getSmsCode">{{ msgtitle }}</mt-button>
      </div>
      
      <!-- <mt-field placeholder="请输入手机号" type="tel" v-model="loginForm.loginName" class="mt30 info-box"></mt-field>
      <mt-field v-if="!isweixin" placeholder="请输入右侧图片验证码" v-model="loginForm.imgValidateCode" class="mt30 info-box">
        
      </mt-field>
      <mt-field placeholder="请输入短信验证码" type="tel" v-model="loginForm.msgValidateCode" class="mt30 info-box" style="color:#000">
        <mt-button type="default" class="msgbtn" v-bind:disabled="this.msgdisabled" @click="getSmsCode">{{ msgtitle }}</mt-button>
      </mt-field> -->
      <mt-button type="primary" class="loginbutton mt30" @click="submit">登录</mt-button>
      <p class="othdo mt30">
        <a class="fl" @click="goSupplierReg">立即注册</a>
        <a class="fr"  @click="goForgetPwd">忘记密码</a>
      </p>
    </div>
     <div class="inputbox" v-if="logintab == '2'">
       <input type="tel" v-model="loginForm.loginName" placeholder="请输入手机号" class="mt30 info-box pwdBxo">
       <input type="password" v-model="loginForm.pwd" placeholder="请输入密码" class="mt30 info-box pwdBxo">
      <!-- <mt-field placeholder="请输入手机号" v-model="loginForm.loginName" class="mt30 info-box"></mt-field> -->
      <!-- <mt-field placeholder="请输入密码" type="password" v-model="loginForm.pwd" class="mt30 info-box"></mt-field> -->
      
      <mt-button type="primary" class="loginbutton mt30" @click="submit">登录</mt-button>
      <p class="othdo mt30"><a class="fl" @click="goSupplierReg">立即注册</a>
      <a class="fr"  @click="goForgetPwd">忘记密码</a></p>
    </div>
  </div>
</template>

<script>
import {loginService} from "../services/login";
import {Toast} from 'mint-ui';
import $ from 'jquery';
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        loginName: '',
        pwd: '',
        imgValidateCode: '',
        msgValidateCode: ''
      },
      logintab: '1',
      imgValidateCodeImg: '',
      msgtitle: '发送验证码',
      msgdisabled: false,
      isweixin: false,
      type:'',
      cookieVal:""
    }
  },
  watch: {
    logintab(data) {
      if(data == '1'){
        this.getimgValidateCode()
      }
    }
  },
  methods: {
    goForgetPwd(){
      let path = {path: '/getpwd', query: {orgType:"P"}}
          this.$router.push(path)
    },
    //读取cookie
    getCookie(name){
        name = name + "="
        var start = document.cookie.indexOf(name),
            value = null;
        if(start>-1){
            var end = document.cookie.indexOf(";",start);
            if(end == -1){
                end = document.cookie.length;
            }
            value = document.cookie.substring(start+name.length,end);
        }
        return value;
    },
    goSupplierReg(){
      let path = {path:'./supplierRegist',query:{orgType:"P"}}
      this.$router.push(path)
    },
    isWeiXin() { 
      var ua = window.navigator.userAgent.toLowerCase()
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        this.isweixin = true
      }else{ 
        this.isweixin = false
      } 
    },
    getUserInfo() {
      loginService.getUserInfo().then(r => {
        console.log(r)
        if(r.data.orgType !== 'P'){

        }else{
        if (r.flag == 20000) {
          this.type = r.data.supplierType
          console.log(r.data.supplierType)
          if(r.data.status == 1) {
            let path = {path: '/supplierOrder', query: {}}
            this.$router.push(path)
          }
        } else if(r.flag !== 50001) {
          Toast(r.msg)
        }
        }
      }).catch(e => {
        console.log(e)
      })
    },
    submit() {
      this.cookieCode = this.getCookie("JSESSIONNO")
     var myreg = /^[1]\d{10}$/;
      if(!myreg.test(this.loginForm.loginName) || this.loginForm.loginName == "" || this.loginForm.loginName.length < 11){
          Toast('请输入正确的手机号')
          return
      } else if (this.pwd == '') {
        Toast('请输入验证码')
        return
      }
      if(this.logintab == '2'){//密码登录
        loginService.supplierLogin(this.loginForm.loginName, this.loginForm.pwd).then(r => {
          console.log(r)
          if (r.flag == 20000) {
           if(r.data.orgType == "P" || r.data.orgType == "D"){
              let path = {path: '/supplierOrder', query: {}}
              this.$router.push(path)
            }else {
              let path = {path: '/indexpage', query: {}}
              this.$router.push(path)
            }
          }else if(r.flag ==  40100){
            Toast(r.msg)
            let path = {path:'./supplierRegist',query:{orgType:"P"}}
            this.$router.push(path)
          }else if(r.flag ==  40101){
            Toast(r.msg)
          } else if(r.flag == 50002){
            let orgType = r.data.orgType
            if(orgType == 'P'){
              let path = {path: '/noactive', query: {orgType: orgType}}
              this.$router.push(path)
            }
          }else if(r.flag == 500022){
              let orgType = r.data.orgType
              let path = {path: '/auditRejection', query: {orgType: orgType,msg:r.msg}}
              this.$router.push(path)
          } else if(r.flag == 50003 && r.data.orgType == 'C') {
            let path = {path: '/perfectInfo', query: {}}
            this.$router.push(path)
          } else if(r.flag == 50003 && r.data.orgType == 'P') {
            let path = {path: '/perfectInfo', query: {orgType: 'P',type:r.data.supplierType}}
            this.$router.push(path)
          } else if(r.flag == 40000) {
            Toast(r.msg)
            let path = {path: '/supplierRegist', query: {orgType: 'P'}}
            this.$router.push(path)
          } else if(r.flag == 40001){
            let obj = $.parseJSON(r.data)
            let arr = []
            if(obj !== {}){
              for(var i in obj) {
                if(i == 'loginName'){
                  Toast('手机号'+ obj[i])
                  return
                }else if(i == 'pwd'){
                  Toast('密码'+ obj[i])
                  return
                }else if(i == 'msgValidateCode'){
                  Toast('短信验证码'+ obj[i])
                  return
                }
              }
            }
            //console.log(arr)
            //Toast($.parseJSON(r.data));
          }else if(r.flag == 50005){
            let path = {path: '/homepage', query: {orgType: orgType}}
                this.$router.push(path)
          }else{
            Toast(r.msg)
          }
        }).catch(e => {
          console.log(e)
        })
      }else if(this.logintab == '1'){//验证码登录
        if(this.isweixin){
          this.loginForm.imgValidateCode = 'weixin'
        }
        loginService.supplierLogin2(this.loginForm.loginName, this.loginForm.imgValidateCode, this.loginForm.msgValidateCode).then(r => {
          if (r.flag == 20000) {
            if(r.data.orgType == "P" || r.data.orgType == "D"){
              let path = {path: '/supplierOrder', query: {}}
              this.$router.push(path)
            }else {  
                let path = {path: '/indexpage', query: {}}
                this.$router.push(path)              
            }
          }else if(r.flag ==  40100){
            Toast(r.msg)
            let path = {path:'./supplierRegist',query:{orgType:"P"}}
            this.$router.push(path)
          }else if(r.flag ==  40101){
            Toast(r.msg)
          }else if(r.flag == 50002){
            Toast(r.msg)
            let orgType = r.data.orgType
            if(orgType == 'P'){
              let path = {path: '/noactive', query: {orgType: orgType,type:r.data.supplierType}}
              this.$router.push(path)
            }
          }else if(r.flag == 500022){
              let orgType = r.data.orgType
              let path = {path: '/auditRejection', query: {orgType: orgType,msg:r.msg}}
              this.$router.push(path)
          } else if(r.flag == 50003 && r.data.orgType == 'C') {
            Toast(r.msg)
            let path = {path: '/perfectInfo', query: {orgType: 'P'}}
            this.$router.push(path)
          } else if(r.flag == 50003 && r.data.orgType == 'P') {
            Toast(r.msg)
            let path = {path: '/perfectInfo', query: {orgType: 'P',type:r.data.supplierType}}
            this.$router.push(path)
          } else if(r.flag == 50003 && r.data.orgType == 'B') {
            Toast(r.msg)
            let path = {path: '/perfectInfo', query: {orgType: 'P'}}
            this.$router.push(path)
          } else if(r.flag == 40000) {
            Toast(r.msg)
            let path = {path: '/supplierRegist', query: {orgType: 'P'}}
            this.$router.push(path)
          } else if(r.flag == 40001){
            let obj = $.parseJSON(r.data)
            let arr = []
            if(obj !== {}){
              for(var i in obj) {
                if(i == 'loginName'){
                  Toast('手机号'+ obj[i])
                  return
                }else if(i == 'pwd'){
                  Toast('密码'+ obj[i])
                  return
                }else if(i == 'imgValidateCode'){
                  Toast('图片验证码'+ obj[i])
                  this.getimgValidateCode()
                  return
                }else if(i == 'msgValidateCode'){
                  Toast('短信验证码'+ obj[i])
                  return
                }
              }
            }
          }else if(r.flag == 50005){
            console.log(r.data.orgType)
            let orgType = r.data.orgType;
            let path = {path: '/homepage', query: {orgType: orgType}}
            this.$router.push(path)
          } else if(r.flag == 60301) {
            Toast(r.msg)
            this.getimgValidateCode()
          } else if(r.flag == 60302) {
            Toast(r.msg)
            this.getimgValidateCode()
          } else if(r.flag == 60303) {
            Toast(r.msg)
            this.getimgValidateCode()
          } else {
            Toast(r.msg)
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
    getSmsCode() {
      if(!this.loginForm.loginName){
        Toast('请填写手机号!')
        return
      }
      if(this.isweixin){
        this.loginForm.imgValidateCode = 'weixin'
      }
      loginService.getSmsCode(this.loginForm.loginName, 2, '' , this.loginForm.imgValidateCode).then(r => {
          if (r.flag == 20000) {
            Toast('短信已发送，请注意查收！')
            this.msgdisabled = true
            this.makenum()
            return
          } else {
            Toast(r.msg);
          }

        }).catch(e => {
          console.log(e);
        });
    }
  },
  mounted(){    
    this.isWeiXin()
    this.getimgValidateCode()
    $('.mint-tab-item-label').css('line-height','0.6rem');
    $(".mint-field-clear").css({
      "margin":"0 .2rem"
    })
    $(".mint-field-core").css({
      "color":"#484855"
    })
    $(".mint-navbar .mint-tab-item.is-selected").css({
      "color":"#fff"
    })
  },

  created() {
    this.getUserInfo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.pwdBxo{
  padding: 0.13rem 0;
  font-size: 16px;
  margin: 0 auto .4rem!important;
  border-radius: 0;
  line-height: 2.1;
  padding-bottom: 6px;
  position: relative;
}
.fl,.fr{
  color:#9DA3B4;
  font-size: 14px;
}
.loginbutton{
  width:80%;
  background: -webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
}
.info-box{
  width:80%;
  border:none;
  border-bottom:1px solid #E0E3ED;
  background: #fff;
  margin:0.4rem auto;
  outline: none;
  input{
    color:#484855;
  }
}
.mint-cell-value{
  background: #fff;
}
.info-box input{
  border:none;
  width:100%;
  background: #fff;
}
.logo-img{
    width:32.3%;
    height: auto;
    margin: 0 auto;
    padding: 8% 0 5%;
}
.logo-img img{
    width:100%;
    height: auto;
}
.login{
  text-align: center;
  height: 100%;
  overflow: hidden;
  background: #1D1D28;
  .navbarborder{
    font-size: ~`px2rem(24)`;
    color: #9DA3B4;
  }
}
.loginicon{
  width: ~`px2rem(48)`;
  height: ~`px2rem(48)`;
}
.inputbox{
  text-align: center;
  background:#fff;
  border-radius:15px 15px 0 0;
  padding:.5rem 0 0 0;
  overflow: hidden;
}
.msgbtn{
  color: #2CBB55;
  font-size: ~`px2rem(30)`;
  padding: 0 ~`px2rem(5)`;
  border: none;
  background: none;
  position: absolute;
  top: 0;
  right: 0;
}
.othdo {
  width: 80%;
  margin: .5rem auto;
  padding-bottom: 10rem;
  display: -webkit-flex;justify-content: space-between;
}
.borad{
  width: ~`px2rem(180)`;
  height: ~`px2rem(70)`;
}
.navbarborder i{
  font-style: normal;
}
.mint-navbar{
  position: relative;
}
.mint-navbar .mint-tab-item.is-selected .navbarborder{
    position: relative;
    border:none!important;
    color: #fff;
}
.mint-navbar .mint-tab-item.is-selected .navbarborder:after{
    content:'';
    width:16px;
    height:10px;
    display: block;
    background:url(../images/arrow.png) no-repeat center center;
    background-size: cover;
    background-size:contain;
    position: absolute;
    left:50%;
    bottom:-16%;
    margin-left:-8px;
}
.mint-field-core{
  color: #000;
}
.getImgCode{
  position: absolute;
  top: 0;
  right: 0;
}
</style>
