<template>
  <div class="regist mt30">
    <!-- 注册第一步，选择注册类型 -->
    <div class="talignc">
      <div class="regbox mt30">
        <p class="title">同业合伙人</p>
        <div class="mt30">
          <ul class="uls">
            <li>拥有医美大健康领域专业知识</li>
            <li>享受高比例分成</li>
            <li>拓展客户资源</li>
            <li>对接优质医生与高端产品</li>
          </ul>
          <img src="../images/industry.png" class="regimg">
        </div>
        <mt-button type="primary" @click="compnext('B')" class="resbtn">立即注册</mt-button>
      </div>
      <div class="regbox mt30">
        <p class="title">异业合伙人</p>
        <div class="mt30">
          <ul class="uls">
            <li>非医美大健康领域</li>
            <li>发展第二份高收入职业</li>
            <li>分配专业代理商，轻松交易</li>
            <li>抢先体验高端健康产品</li>
          </ul>
          <img src="../images/different.png" class="regimg">
        </div>
        <mt-button type="primary" @click="compnext('b')" class="resbtn">立即注册</mt-button>
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
         let path = {path: '/regist', query: {type: data}}
          this.$router.push(path)
    },
  }, 
  mounted() {
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
