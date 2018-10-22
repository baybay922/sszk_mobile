<template>
  <div class="myselllist">
    <ul class="cells">
      <li @click="gotypeslist">
        <p class="list-title">查看产品分类收益</p>
        <p class="right-arrow">
          <img src="../images/moreinfo.png" alt="">
        </p>
      </li>
      <li @click="godetail">
        <p class="list-title Detailed">查看账单明细</p>
        <p class="right-arrow">
          <img src="../images/moreinfo.png" alt="">
        </p>
      </li>
      <li @click="goReflect" class="Reflect">
        <p class="list-title Reflect">提现</p>
        <p class="right-arrow">
          <img src="../images/moreinfo.png" alt="" >
        </p>
      </li>
      <li @click="setSafetyCode"  class="setSafetyCode">
        <p class="list-title setSafety">安全码</p>
        <p class="right-arrow">
        <img src="../images/moreinfo.png" alt="" >
        </p>
      </li>
      <li @click="gomyBanklist" class="bankInfo" style="border:none;display:none">
        <p class="list-title bankName">银行卡</p>
        <p class="right-arrow">
          <img src="../images/moreinfo.png" alt="">
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'myselllist',
  data () {
    return {
      isSafetyCode:''
    }
  },
  methods: {
    setSafetyCode(){
      let path = {path:'/setSafetyCode',query:{isSafetyCode:this.isSafetyCode}}
          this.$router.push(path)
    },
    gomyBanklist(){//银行卡
      let path = {path: '/banklist', query:{}}
      this.$router.push(path)
    },
    gotypeslist(){//收益分类
      let path = {path: '/typeslist', query:{"productType": "string"}}
      this.$router.push(path)
    },
    godetail(){//账单明细
      let path = {path: '/mybilllist', query:{  "pageNo": 0, "pageSize": 0, "month": "string","isFinish":""}}
      this.$router.push(path)
    },
    goReflect(){//提现
      let path = {path: '/withdrawals', query:{}}
      this.$router.push(path)
    },
    getdata(){
      
    },
    getSecurityCode(){
        loginService.getSecurityCode().then((r)=>{
            if(r.flag == 20000){
                this.isSafetyCode = r.data.isSafetyCode
            }else{
                Toast(r.msg)
            }
        })
    }
  },
  mounted(){
    this.getdata();
    this.getSecurityCode();
    $('.icons').css('width','0.64rem').css('height','0.64rem')
    $('.mint-cell-text').css('font-size','0.4rem')
    $('.mint-cell-value').css('background-color','#fff');
    loginService.myInfo().then(r => {
      if(r.data.orgType == "P" || r.data.orgType == "D"){
        $(".Reflect").hide();
        $(".bankInfo").show();
      }else{
        $(".bankInfo").hide();
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.myselllist{
  width:100%;
    height:100%;
     background: #1D1D28;
  .tabbaricon{
    width:100%;
    height:100%;
    margin-right: ~`px2rem(20)`;
   color:#fff;
  }
  .cells{
    width:100%;
    height: auto;
    border-bottom:~`px2rem(1)` solid #363645;  
    li{
      width:95%;
      border-bottom:~`px2rem(1)` solid #363645;
      display: -webkit-flex;
      justify-content: space-between;
      align-items: center;
      color:#fff;
      padding: .2rem 0;
      margin-left: 5%;
      p{
        width:50%;
        height: 100%;
        padding:.2rem 0;
        font-size: 16px;
      }
      .list-title{
          text-indent:.8rem;
          background:url(../images/Profit/income.png) no-repeat left center;
          background-size: .6rem ;
      }
      .right-arrow{
        width: 40%;
        text-align: right;
        img{
          width:5%;
          height:auto;
          margin-right: 15px;
        }
      }
      .Detailed{
        background:url(../images/Profit/Detailed.png) no-repeat left center;
        background-size: .6rem ;
      }
      .Reflect{
        background:url(../images/Profit/Reflect.png) no-repeat left center;
          background-size: .6rem ;
      }
      .setSafety{
        background:url(../images/safety.png) no-repeat left center;
          background-size: .5rem ;
      }
    }
  }
}
.bankName{
  background:url(../images/bankList.png) no-repeat left center!important;
  background-size: .6rem!important;
}
</style>
