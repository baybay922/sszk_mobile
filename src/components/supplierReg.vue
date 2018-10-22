<template>
  <div class="tabb">
      <mt-field placeholder="请输入手机号" type="tel" v-model="loginForm.loginName" class="info-box"></mt-field>
      <mt-field v-if="!isweixin" placeholder="请输入右侧图片验证码" v-model="loginForm.imgValidateCode" class="mt30 info-box">
        <span @click="getimgValidateCode"><img v-bind:src="this.imgValidateCodeImg" class="borad"></span>
      </mt-field>
      <mt-field placeholder="请输入短信验证码" type="tel" v-model="loginForm.msgValidateCode" class="mt30 info-box">
        <mt-button type="default" class="msgbtn" v-bind:disabled="this.msgdisabled" @click="getSmsCode">{{ msgtitle }}</mt-button>
      </mt-field>
      <div class="recommend-wrapper">
        <input placeholder="推荐人手机号（选填）" type="tel" v-model="loginForm.identifier" class="mt30 info-box identifier" maxlength="11" v-on:input="getIdentifier" />
        <div class="market-info">
          {{marketInfo}}
        </div>
      </div>
      <mt-button type="primary" class="loginbutton mt30" @click="tonext">下一步</mt-button>
    </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'regist',
  data () {
    return {
      loginForm: {
        loginName: '',
        imgValidateCode: '',
        msgValidateCode: '',
        identifier:'',
        internalNumber:""
      },
      msgtitle: '发送验证码',
      msgdisabled: false,
      imgValidateCodeImg: '',
      isweixin: false,
      orgType:this.$route.query.orgType,
      type:this.$route.query.type,
      marketInfo:""
    }
  },
  methods: {
     getIdentifier(){
      let len = this.loginForm.identifier.length;
        if(len == 4 || len == 11){
          loginService.marketInfo(this.loginForm.identifier).then(r =>{
            if(r.flag == 20000){
              $(".identifier").blur();
              this.marketInfo = this.loginForm.identifier+"-"+r.data.marketName+"-"+r.data.phone;
              $(".market-info").show();
            }
          })
        }
        if(len == 0){
          $(".market-info").hide()
        }
      
    },
    isWeiXin() { 
      var ua = window.navigator.userAgent.toLowerCase(); 
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        this.isweixin = true
      }else{ 
        this.isweixin = false
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
      var myreg = /^[1]\d{10}$/;
      if(!myreg.test(this.loginForm.loginName) || this.loginForm.loginName == "" || this.loginForm.loginName.length < 11){
        Toast("请输入正确的手机号")
        return
      }
      if(this.isweixin){
        this.loginForm.imgValidateCode = 'weixin'
      }
      loginService.getSmsCode(this.loginForm.loginName, 1, this.orgType, this.loginForm.imgValidateCode).then(r => {
        
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
    },
    tonext() {
      this.cookieCode = this.getCookie("JSESSIONNO")
      if(this.isweixin){
        this.loginForm.imgValidateCode = 'weixin'
      }
      var myreg = /^[1]\d{10}$/;
      if(!myreg.test(this.loginForm.loginName) || this.loginForm.loginName == "" || this.loginForm.loginName.length < 11){
        Toast("请输入正确的手机号")
        return
      }else{
        loginService.sendCode(this.loginForm.loginName, this.loginForm.imgValidateCode, this.loginForm.msgValidateCode, this.type, this.orgType,null, this.loginForm.identifier).then(r => {
        console.log(r)
        if(r.flag == 20000) {
          if(r.data == null){
             if(this.orgType == 'P') {//如果是企业注册，跳去regist2b页面完善企业信息，因为上传图片插件不支持vue判断语法
                let path = {path: '/perfectInfo', query: {orgType: this.orgType,type: this.type}}
                this.$router.push(path)
              }else if(this.orgType == 'D') {//如果是个人注册，跳去regist2c页面完善个人信息
                let path = {path: '/perfectInfo', query: {orgType: this.orgType,type: this.type}}
                this.$router.push(path)
              }
          }else{
            if(r.data.flag == 30100){
              if(r.data.status == 1){
                let path = {path: '/supplierOrder', query: {}}
                this.$router.push(path)  
              }else{
                
                if(this.orgType == 'P') {//如果是企业注册，跳去regist2b页面完善企业信息，因为上传图片插件不支持vue判断语法
                  let path = {path: '/perfectInfo', query: {orgType: this.orgType,type: this.type}}
                  this.$router.push(path)
                }else if(this.orgType == 'D') {//如果是个人注册，跳去regist2c页面完善个人信息
                  let path = {path: '/perfectInfo', query: {orgType: this.orgType,type: this.type}}
                  this.$router.push(path)
                }
              }
            }
          } 
        }else if(r.flag == 50002){
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
          }else if (r.flag == 20000) {
            let path = {path: './perfectInfo', query: {orgType:this.orgType,type: this.type}}
            this.$router.push(path)
          }else if(r.flag == 40001) {
            this.getimgValidateCode();
            let obj = $.parseJSON(r.data)
            let arr = []
            if(obj !== {}){
              for(var i in obj) {
                if(i == 'loginName'){
                  Toast('手机号'+ obj[i])
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
    }
  },
  mounted() {
    this.isWeiXin();
    $("body").css({
      "background-position":"0 100%",
      "overflow":"hidden",
      "background":"none"
    })
    this.getimgValidateCode();
  },
  created() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.tabb{
  margin-top: 0.4rem;
}
.loginbutton{
  width:80%;
 background: -webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
}
.info-box{
  width:85%;
  margin: 0rem auto;
  padding: .2rem 0;
  border-bottom: 1px solid #363645;
}

.loginbutton{
  margin: 0.8rem 0;
}
.regbox{
  width: ~`px2rem(630)`;
  color: #3A3A3A;
  background-color: #fff;
  border-radius: ~`px2rem(25)`;
  padding: ~`px2rem(40)`;
  margin: .5rem 0 0 ~`px2rem(20)`;
}
.tabb{
  text-align: center;
}
.title{
  font-size: ~`px2rem(48)`;
  text-align: left;
}
.resbtn{
  width: ~`px2rem(630)`;
  height: ~`px2rem(82)`;
  background: -webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
}
.uls{
  float: left;
  text-align: left;
  padding-left: ~`px2rem(35)`;
  margin: ~`px2rem(30)` 0 ~`px2rem(40)`;
  line-height: 24px;
}
.uls li{
  color: #484855;
  list-style: disc;
  font-size:14px;
}
.regimg{
  width: ~`px2rem(150)`;
  height: ~`px2rem(150)`;
  float: right;
  margin-right: ~`px2rem(30)`;
  margin-top: 20px;
}
.borad{
  width: ~`px2rem(180)`;
  height: ~`px2rem(70)`;
}
.msgbtn{
  color: #2CBB55;
  font-size: ~`px2rem(30)`;
  padding: 0 ~`px2rem(5)`;
  border: none;
  background: none;
}
.dn{
  display: none;
}
.identifier{
  padding:0.2rem 0;
  border:none;
  outline: none;
  background: none;
  border-bottom: 1px solid #363645;
  display: block;
  min-height: 1.0666666666666667rem;
  color: #fff;
  font-size: 16px;
}
.recommend-wrapper{
  width:85%;
  position:relative;
  margin:0 auto;
  .info-box{
    width:100%;
  }
}
.market-info{
  width:~`px2rem(350)`;
  height: 100%;
  color: #fff;
  font-size: ~`px2rem(26)`;
  display:-webkit-flex;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  display: none;
  line-height: ~`px2rem(120)`;
}
</style>
