<template>
    <div class="banklist">
        <div class="enterprise-wrapper">
            <div class="enterprise-title">
                企业对公账户
            </div>
            <div class="cash-bank" v-for="(item, index) in bankInfos" :key="index" v-if="item.gstype ==2" @click="goPublicAccountInfo(item.cardId, item.step ,item.gstype)">
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
                <span v-html="getHtml()"></span>
                <div class="right-arrow">
                    <img src="../images/moreinfo.png" alt="">
                </div>
            </div>
        </div>
        <div class="presonl-wrapper">
            <div class="enterprise-title">
                个人银行卡
            </div>
            <div class="cash-bank" v-for="(item, index) in bankInfoList" :key="index" v-if="item.gstype ==1"  @click="goPresonlBankInfo(item.cardId,$event,item.gstype)">
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
                <p @click="toEnterpriseBank()" class="contactBox" v-if="company">企业对公账户</p>
                </div>
                <button @click="cancel()">取消</button>
            </div>
        </transition>
        <div class="mark" v-if="markShow" @click="markShow = false"></div>
  </div>
  
</template>
<script>
import { loginService } from "../services/login";
import { Toast } from "mint-ui";
import $ from "jquery";
export default {
  data() {
    return {
      checked: true,
      list: [],
      markShow: false,
      step:"",
      bankInfoList:[],
      bankInfos:[],
      orgType:"",
      supplierType:"",
      company:true
    };
  },
  methods: {
    getHtml(){
      switch(this.step){
        case '1':
          return '<a style="color:#F5A623;">待审核</a>';
        case '2':
          return '<a style="color:#E5322E;">审核拒绝</a>';
        default:
          return ""
      }
    },
    //个人绑卡页面
    toPresonlBank() {
      let path = { path: "/companyAddBank", query: {} };
      this.$router.push(path);
    },
    //企业绑卡页面
    toEnterpriseBank() {
      if(this.bankInfos.length > 0){
        Toast('已存在企业对公账户！');
        this.markShow = false;
      }else{
        let path = { path: "/addBank", query: {} };
        this.$router.push(path);
      }
      
    },
    //取消咨询
    cancel() {
      this.markShow = false;
    },
    ischecked() {
      this.checked = false;
    },
    addBank() {
      this.markShow = true;
    },
    //跳转对公账号详情
    //1待审核2审核拒绝3审核通过
    goPublicAccountInfo(code, gstype, step) {
      if(gstype == '1' && step == '2'){
        let path = { path: "/AccountAudits", query: { code: code } };
            this.$router.push(path);
      }else if(gstype == '2' && step == '2'){
        let path = { path: "/addBank", query: { code: code , step: step} };
            this.$router.push(path);
      }else if(gstype == '3' && step == '2'){
        let path = { path: "/publicAccount", query: { code: code } };
            this.$router.push(path);
      }
      
    },
    //跳转个人账号详情
    goPresonlBankInfo(code, event) {
      let path = { path: "/presonAccount", query: { code: code } };
      this.$router.push(path);
    }
  },
  mounted() {
    loginService.getUserInfo().then(r=>{
      console.log(r,'shenden')
      if(r.flag === 20000){
        this.orgType = r.data.orgType;
        this.supplierType = r.data.supplierType;
        if(this.orgType == "C" || this.supplierType == "D"){
          this.company = false
        }
      }
    })
    loginService.banklist(1, 10).then(r => {
      //console.log(r,'银行卡列表')
      //获取银行卡列表
      if (r.flag == 20000) {
        if(r.data.list[0].bankInfoList == ""){
          $(".presonl-wrapper").hide()
        }else{
          this.bankInfoList = r.data.list[0].bankInfoList;
        }
        if(r.data.list[0].bankInfos == ""){
          $(".enterprise-wrapper").hide()
        }else{
           this.bankInfos = r.data.list[0].bankInfos
           r.data.list[0].bankInfos[0].step?this.step = r.data.list[0].bankInfos[0].step:this.step = '';
        }
      } else {
        Toast(r.msg);
      }
    });
  }
};
</script>
<style scoped lang="less">
@import url(../less/functions);
.presonl-wrapper,.enterprise-wrapper{
    width: 100%;
    height: auto;
}
.default {
  font-size: ~`px2rem(20) `;
  color: #2cbb55;
  border-radius: 2px;
  border: ~`px2rem(1) ` solid #2cbb55;
  padding: ~`px2rem(3) ` ~`px2rem(12) `;
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
.banklist {
  width: 100%;
  height: 100%;
  background: #1d1d28;
  .cash-bank {
    padding: 0.3rem 4%;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #363645;
    position: relative;
    .bank-logo {
      width: ~`px2rem(48) `;
      height: ~`px2rem(48) `;
      overflow: hidden;
      border-radius: 100%;
      img {
        width: 100%;
        height: auto;
      }
    }
    &>span{
      position: absolute;
      top:50%;
      right:10%;
      color:red;
      font-size: 12px;
      margin-top: -6px;
    }
    .bank-info {
      width: 85%;
      .bank-name {
        color: #fff;
        font-size: 16px;
      }
      .bank-number {
        color: #8a8a8a;
        font-size: 12px;
        margin-top: 0.2rem;
      }
    }
    .right-arrow {
      width: ~`px2rem(12) `;
      height: ~`px2rem(20) `;
      text-align: right;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
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


