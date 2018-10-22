<template>
  <div class="regist mt30">
    <!-- 注册第一步，选择注册类型.. -->
    <div class="talignc">
      <div class="regbox mt30">
        <p class="title">我是医院 / 机构</p>
        <div class="mt30">
          <ul class="uls">
            <li>开通企业账号</li>
            <li>上架新产品</li>
            <li>订单跟踪管理</li>
            <li>查看收益</li>
          </ul>
          <img src="../images/supplerP.png" class="regimg">
        </div>
        <mt-button type="primary" @click="compnext('P')" class="resbtn">立即注册</mt-button>
      </div>
      <div class="regbox mt30">
        <p class="title">我是医生</p>
        <div class="mt30">
          <ul class="uls">
            <li>开通个人账号</li>
            <li>上架新产品</li>
            <li>订单跟踪管理</li>
            <li>查看收益</li>
          </ul>
          <img src="../images/supplierD.png" class="regimg">
        </div>
        <mt-button type="primary" @click="compnext('D')" class="resbtn">立即注册</mt-button>
      </div>
    </div>
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
      tab: '1',//步骤
      orgType: '',//注册类型  B-企业，C-个人
      loginForm: {
        loginName: '',
        imgValidateCode: '',
        msgValidateCode: ''
      },
      msgtitle: '发送验证码',
      msgdisabled: false,
      imgValidateCodeImg: '',
      isweixin: false
    }
  },
  watch: {
    tab(data) {
      if(data == '2'){
        this.getimgValidateCode();
      }
    }
  },
  methods: {
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase(); 
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        this.isweixin = true
      }else{ 
        this.isweixin = false
      } 
    },
    compnext(data) {
        this.orgType = data
        if(this.orgType == 'P') {//如果是企业注册，跳去regist2b页面完善企业信息，因为上传图片插件不支持vue判断语法
          let path = {path: '/supplierReg', query: {orgType:this.$route.query.orgType, type:'P'}}
          this.$router.push(path)
        }else if(this.orgType == 'D') {//如果是个人注册，跳去regist2c页面完善个人信息
          let path = {path: '/supplierReg', query: {orgType:this.$route.query.orgType, type:'D'}}
          this.$router.push(path)
        }
    },
    getimgValidateCode() {
      let max = 100;
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
      if(this.isweixin){
        this.loginForm.imgValidateCode = 'weixin'
      }
      loginService.sendCode(this.loginForm.loginName, this.loginForm.imgValidateCode, this.loginForm.msgValidateCode, this.orgType).then(r => {
        console.log(r)
          if (r.flag == 20000) {
            if(this.orgType == 'B') {//如果是企业注册，跳去regist2b页面完善企业信息，因为上传图片插件不支持vue判断语法
              let path = {path: '/regist2b', query: {}}
              this.$router.push(path)
            }else if(this.orgType == 'C') {//如果是个人注册，跳去regist2c页面完善个人信息
              let path = {path: '/regist2c', query: {}}
              this.$router.push(path)
            }
          }else if(r.flag == 40001) {
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
  mounted() {
    this.isWeiXin();
    $("body").css({
      "background-position":"0 100%"
    })
  },
  created() {
    //this.getUserInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.talignc{
    padding: 0.5rem 0;
}
.mt30{
  margin:0;
}
.loginbutton{
  width:80%;
 background: -webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
}
.info-box{
  width:80%;
  margin: 0rem auto;
  padding: .2rem 0;
  border-bottom: 1px solid #363645;
  line-height: 1.6;
}

.loginbutton{
  margin: 0.8rem 0;
}
.regbox{
  width: ~`px2rem(630)`;
  color: #3A3A3A;
  background-color: #363645;
  border-radius: ~`px2rem(25)`;
  padding: ~`px2rem(40)`;
  margin: 0rem 0 ~`px2rem(30)` ~`px2rem(20)`!important;
}
.tabb{
  text-align: center;
}
.title{
  font-size: ~`px2rem(48)`;
  text-align: left;
  color: #2CBB55;
}
.resbtn{
  width: ~`px2rem(630)`;
  height: ~`px2rem(82)`;
  background: #FBC700;
}
.uls{
  float: left;
  text-align: left;
  padding-left: ~`px2rem(35)`;
  margin: ~`px2rem(30)` 0 ~`px2rem(40)`;
  line-height: 24px;
}
.uls li{
  color: #9DA3B4;
  list-style: disc;
  font-size:14px;
}
.regimg{
  width: ~`px2rem(150)`;
  height: ~`px2rem(150)`;
  float: right;
  margin-right: ~`px2rem(30)`;
margin-top: -25px;
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
</style>
