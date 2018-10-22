<template>
  <div class="setting">
    <div class="cells">
        <!-- <mt-cell title="联系客服" onclick="NTKF.im_openInPageChat()">
          <span ><img src="../images/phone2.png" class="icon"></span>
        </mt-cell> -->
        <mt-cell title="电子合同"
        class="contract"
        is-link
        :to="contactViewUrl" @click.native="goDrawer()">
        </mt-cell>      
        <!-- <mt-cell title="修改密码"
        is-link
        to="/changepwd">
        </mt-cell> -->
      <div class="modify" @click="changepwd" style="border:none;">
        <p class="list-title Detailed">{{pwdStatus}}</p>
        <p class="right-arrow">
          <img src="../images/moreinfo.png" alt="">
        </p>
      </div>
    </div>
    <div class="talignc mt30">
      <mt-button type="primary" class="loginbutton" @click="logout">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'setting',
  data () {
    return {
      contactViewUrl: '',
      orgType:"",
      pwdStatus:"设置密码"
      
      //newUser: true, //用户是否存在
    }
  },
  methods: {
    changepwd(){
      let path = {path: '/changepwd', query:{}}
          this.$router.push(path)
    },
   getMyinfo() {
      loginService.myInfo().then(r => {
        if (r.flag == 20000) {
          console.log(r)
          this.contactViewUrl = r.data.contactViewUrl
          this.orgType = r.data.orgType
        }
      })
   },
   logout() {
     if(this.orgType == "P" || this.orgType == "D"){
       loginService.logout().then(r => {
        if (r.flag == 20000) {
          Toast(r.msg)
          let path = {path: '/supplierLogin', query:{}}
          this.$router.push(path)
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
     }else{
       loginService.logout().then(r => {
        if (r.flag == 20000) {
          Toast(r.msg)
          let path = {path: '/login', query:{}}
          this.$router.push(path);
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
     }
      
    },
    call() {
      document.getElementById('call').click();
    },
    //跳转电子合同页
    goDrawer(){
      
    }
  },
  mounted() {
    this.getMyinfo()
    $('.icons').css('width','0.6rem').css('height','0.6rem')
    $('.mint-cell-text').css({
        'font-size':'0.4rem',
        'margin':'0'
    })
    $('.mint-cell-value').css('background-color','#1d1d28')
    $(".mint-cell-value").css("margin-right",".5rem")
    $(".mint-cell").css({
        "width":"95%",
        "margin-left":"5%"
    })
    $(".mint-cell-allow-right").hide();

     loginService.getUserInfo().then(r => {
        if(r.data.isSetPwd == 0){
          this.pwdStatus = "修改密码"
        }else{
           this.pwdStatus = "设置密码"
        }
      }).catch(e => {
        console.log(e)
      })
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.contract{
  background: url(../images/moreinfo.png) no-repeat 94% center;
  background-size: 0.2rem auto;
}
.setting{
  height: 100%;
  background-color: #1d1d28;
  .cells{
    background-color: #1d1d28;
     border-bottom:~`px2rem(1)` solid #363645;
    .cells .mint-cell-value{
      background: none!important;
    }
    a{
      color:#fff;
      border-bottom:~`px2rem(1)` solid #363645;
      font-size: 14px;
      padding: .1rem 0;
    }
    .icon{
      width: ~`px2rem(30)`;
      height: ~`px2rem(30)`;
    }
  }
  .loginbutton{
    background: #1d1d28;
    border:1px solid#2CBB55;
    color:#2CBB55;
    margin-top: ~`px2rem(60)`;
  }
}
.modify{
    width:100%;
      border-bottom:1px solid #363645;
      display: -webkit-flex;
      justify-content: space-around;
      align-items: center;
      color:#fff;
      padding: .1rem 0;
      p{
        width:50%;
        height: 100%;
        padding:.2rem 0;
        font-size: 16px;
        text-indent: 10px;
      }
      .right-arrow{
        width: 40%;
        text-align: right;
        img{
          width:5%;
          height:auto;
          margin-right:.3rem;
        }
      }
}
</style>