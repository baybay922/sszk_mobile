<template>
    <div class="banklist">
        <div class="enterprise-wrapper">
            <div class="enterprise-title">
                企业对公账户
            </div>
            <div class="cash-bank" v-for="(item, index) in bankInfo" :key="index" @click="goPublicAccountInfo(item.cardId,$event,index)">
                <div class="bank-logo" >
                    <img :src="item.bankLogo" alt="">
                </div>
                <div class="bank-info">
                    <p class="bank-name">{{item.simplify}}</p>
                    <p class="bank-number">尾号{{item.code}} 快捷(含卡通)</p>
                </div>
            </div>
        </div>
        <div class="presonl-wrapper">
            <div class="enterprise-title">
                个人银行卡
            </div>
            <div class="cash-bank" v-for="(item, index) in list" :key="index" v-if="item.gstype ==1"  @click="goPresonlBankInfo(item.cardId,$event)">
                <div class="bank-logo">
                    <img :src="item.bankLogo" alt="">
                </div>
                <div class="bank-info">
                    <p class="bank-name">
                        <span>{{ item.simplify }}</span>
                        <span class="default" v-if="item.cardStatus ==1">默认</span>
                        <span v-else></span>
                    </p>
                    <p class="bank-number">尾号{{ item.code }} 快捷(含卡通)</p>
                </div>
                <div class="right-arrow">
                    <img src="../images/moreinfo.png" alt="">
                </div>
            </div>
        </div>
        
        <div class="addBank" @click="addBank">
            <p class="add-title">添加银行卡</p>
        </div>
        
         <transition name="fade">
            <div class="popupbox"  v-if="markShow"  >
                <div class="top">
                <h6>请选择</h6>
                <p @click="toPresonlBank()">个人银行卡</p>
                <p @click="toEnterpriseBank()" class="contactBox">企业对公账户</p>
                </div>
                <button @click="cancel()">取消</button>
            </div>
        </transition>
        <div class="mark" v-if="markShow" @click="markShow = false"></div>
    </div>

</template>
<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
    data(){
        return{
            pageNo:1,
            pageSize:10,
            bankInfo:[],
            markShow:false,
            cardId:""
        }
    },
    methods: {
        //个人绑卡页面
        toPresonlBank() {
            let path = { path: "/companyAddBank", query: {} };
            this.$router.push(path);
        },
        //企业绑卡页面
        toEnterpriseBank() {
            let path = { path: "/addBank", query: {} };
            this.$router.push(path);
        },
        //取消咨询
        cancel() {
            this.markShow = false;
        },
        addBank() {
            this.markShow = true;
        },
        //跳转对公账号详情
        goPublicAccountInfo(code, event, ind) {
            if(this.list[ind].step != 1 || this.list[ind].step != 2){
                let path = { path: "/publicAccount", query: { code: code } };
                this.$router.push(path);
            }else{
                let path = { path: '/addBank', query: { code: code,step:this.step } };
                this.$router.push(path)
            }
        },
        //跳转个人账号详情
        goPresonlBankInfo(code, event) {
            let path = { path: "/presonAccount", query: { code: code } };
                this.$router.push(path);
            }
        },
    mounted() {
        loginService.bankList(this.pageNo, this.pageSize).then(r=>{
           if(r.flag == 20000){
               console.log(r,'=======================')
               this.bankInfo = r.data.list;
               this.cardId = r.data.cardId
           }else{
               Toast(r.msg)
           }
        })
        $("body").css({
            "overflow-y":"auto"
        })
    },
}
</script>
<style scoped lang="less">
@import url(../less/functions);
.banklist{
    width: 100%;
    height: 100%;
    background: #1D1D28;
    .cash-bank{
    padding:.3rem 4%;    
    display: -webkit-flex;
    align-items: center;
    border-bottom:1px solid #363645;
    .bank-logo{
      width: 1rem;
      height: 1rem;
      overflow: hidden;
      border-radius: 100%;
      img{
        width:100%;
        height:auto;
      }
    }
    .bank-info{
      width:70%;
      margin-left: ~`px2rem(30)`;
      .bank-name{
        color:#fff;
        font-size: 16px;
      }
      .bank-number{
        color:#8A8A8A;
        font-size: 12px;
        margin-top: .2rem;
      }
    }
  }
}
.enterprise-title {
  font-size: ~`px2rem(28) `;
  color: #9da3b4;
  padding: ~`px2rem(30) `;
  border-bottom: ~`px2rem(1) ` solid #363645;
}
.addBank {
  width: 100%;
  height: ~`px2rem(100) `;
  line-height: ~`px2rem(100) `;
  text-align: center;
  color: #fff;
  font-size: ~`px2rem(36) `;
  background: linear-gradient(-135deg, #2cbb86 0%, #2cbb55 100%);
  position: fixed;
  bottom: 0;
  left: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.mark {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.8;
  background: #1d1d28;
  z-index: 1;
}
.popupbox {
  width: 100%;
  text-align: center;
  padding: 0;
  color: blue;
  background: transparent;
  position: fixed;
  bottom: 0;
  z-index: 22;
  .top {
    background: #fff;
    h6 {
      color: #999;
      background: #f6f6f6;
      height: ~`px2rem(90) `;
      line-height: ~`px2rem(90) `;
      font-size: 15px;
    }
    p {
      color: #363645;
      height: ~`px2rem(90) `;
      line-height: ~`px2rem(90) `;
      font-size: 15px;
    }
    p:nth-of-type(1) {
      border-top: 1px solid #dfdfdf;
      border-bottom: 1px solid #dfdfdf;
    }
  }
  button {
    width: 100%;
    border-top: 1px solid #dfdfdf;
    background: #fff;
    font-size: 15px;
    color: #9da3b4;
    line-height: ~`px2rem(90) `;
    margin-top: ~`px2rem(10) `;
  }
}
</style>




