<template>
  <div class="cash-container" >
     <div class="addBank" @click="addBank" v-if="hasBank">
        <p class="addImg">
            <img src="../images/bankLogo/addBank.png" alt="">
        </p>
        <p class="add-title">添加银行卡</p>
    </div>
    <div class="cash-bank" @click="goBanklist" v-else>
      <div class="bank-logo">
        <img :src="imgSrc" alt="">
      </div>
      <div class="bank-info">
        <p class="bank-name">{{ bankName }}<span>默认</span></p>
        <p class="bank-number">尾号{{ code }} 快捷(含卡通)</p>
      </div>
      <div class="right-arrow">
       <img data-v-487182ed="" src="../images/moreinfo.png" alt="">
      </div>
    </div>
    <div class="cash-content">
      <div class="cash-title">
        订单佣金提现
      </div>
      <mt-field placeholder="请输入提现金额" type="tel" class="moneyBox" v-model="(moneyVal)"  v-on:input="inputmoney"></mt-field>
      <div class="balance-content">
        <p class="balance">可用余额 ￥{{money}}元</p>
        <p class="balanceBtn" @click="balance(money)">全部提现</p>
      </div>
    </div>
    <div class="activity-container">
      <div class="subsidy-container">
        <h2 class="acity-title">所有活动提现</h2>
          <dl class="subsidy-wrapper">
            <dd>
              <h2>成单领补贴活动</h2>
              <p>可提现金额：<i>￥</i><span>{{presented}}</span></p>
              <p>活动总收益：￥{{TotalPresented}}</p>
              <p>不可提现金额：￥{{unPresented}}</p>
            </dd>
            <dt>
              <div class="selectedBtn-wrapper">
                <input type="radio" name="subsidy" class="subsidy" id="subsidy" checked="">
                <label @click="changeSelect" for="subsidy" class="subsidyLabel"></label>
              </div>
            </dt>
        </dl>
        <p class="checkReason" @click="checkReason">查看明细</p>
      </div>
      <div class="totleMoney" v-if="subsidyStatus">您本次提现的总金额：<span>{{parseInt(moneyVal)+parseInt(presented)}}</span>元</div>
      <div class="totleMoney" v-else>您本次提现的总金额：<span v-if="moneyVal==''">0</span><span v-else>{{moneyVal}}</span>元</div>
    </div>
    <!-- <div class="depositBtn" @click="Verification" v-if="deposit">确定提现</div>
    <div class="depositBtn NodepositBtn" v-else>满200万可提</div> -->
    <div class="depositBtn" @click="Verification">立即到账，确认提现</div>
    <div class="code-msgbox" v-if="msgbox">
      <div class="code-msgbox-header">
          请输入安全码
      </div>
      <div class="code-msgbox-input">
        <input type="password" v-model="securityCode" maxlength="6" autofocus="autofocus" />
      </div>
      <div class="code-msgbox-forget" @click="forgetPwd">忘记安全码？</div>
      <div class="code-msgbox-btns">
        <button class="code-msgbox-btn code-msgbox-cancel" @click="cancelgetSecurityCode">取消</button>
        <button class="code-msgbox-btn code-msgbox-confirm" @click="getSecurityCode">确定</button>
      </div>
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
import {Toast, MessageBox} from 'mint-ui'
import $ from 'jquery'
export default {
  data(){
    return{
      money: '',
      moneyVal:'',
      bankName:"",
      code:"",
      Cost:0,
      imgSrc:null,
      deposit:false,
      enterpriseB:true,
      enterpriseC:true,
      supplier:true,
      hasBank:false,
      markShow: false,
      orgType:'',
      supplierType:"",
      bankInfos:[],
      presented:0,
      TotalPresented:0,
      unPresented:0,
      entryMoney:0,
      subsidyStatus:false,
      securityCode:'',
      msgbox:false,
    }
  },
  methods:{
    forgetPwd(){
      loginService.getSecurityCode().then((r)=>{
          if(r.flag == 20000){
            let path = {path:'/setSafetyCode',query:{isSafetyCode:1,safetyType:1}}
            this.$router.push(path)
          }else{
            Toast(r.msg)
          }
      })
    },
    checkReason(){//查看详情
      this.$router.push('/profitDetails')
    },
    changeSelect(){//选择活动提现金额
      $(".subsidyLabel").toggleClass('checkLabel');
      if($(".subsidyLabel").hasClass('checkLabel')){
        this.subsidyStatus = true;
        if(this.moneyVal == 0){
          this.moneyVal = 0
        }else{
          this.moneyVal = this.moneyVal
        }
      }else{
        
        this.subsidyStatus = false;
        if(this.moneyVal == 0){
          this.moneyVal = ''
        }else{
          this.moneyVal = this.moneyVal
        }
      }
    },
    addBank(){//跳转邦卡
      if(this.orgType == 'C' || this.supplierType == 'D'){
        this.$router.push('/companyAddBank')
      }else{
        //this.markShow = true;
        this.$router.push('/banklist')
      }
      
    },
    inputmoney(){    
      if(this.moneyVal == 0){
        this.moneyVal = '0';
      }
    },
    goBanklist(){//条状银行列表
      let path = {path: '/banklist', query:{}}
      this.$router.push(path)
    },
    balance(money){//全部提现
      if(this.money < money){
        Toast('可用余额不足')
      }else{
        this.moneyVal = money;
      }
    },
    cancelgetSecurityCode(){//取消
      this.msgbox = false;
      this.securityCode = ''
    },
    getSecurityCode(){//获取安全码
      loginService.getSecurityCode().then((r)=>{
          if(r.flag == 20000){
            if(r.data.isSafetyCode == 1){
              MessageBox.confirm('', { 
                  message: '您还未设置安全码，请先设置安全码', 
                  title: '提示', 
                  confirmButtonText: '立即设置', 
                  cancelButtonText: '取消' 
                  }).then(action => { 
                  if (action == 'confirm') {     //确认的回调
                    let path = {path:'/setSafetyCode',query:{isSafetyCode:r.data.isSafetyCode,safetyType:1}}
                    this.$router.push(path)
                  }
                  }).catch(err => { 
                   
              });
            }else{
              if(this.securityCode.length < 6){
                Toast("请输入正确的安全码")
              }else{
                loginService.safetycodeCheck(this.securityCode).then((r)=>{
                  if(r.flag == 20000){
                    let moneyVal = this.moneyVal,
                      balance = this.money;
                      if(!moneyVal){
                        Toast("请输入提现金额");
                      }else if(moneyVal > balance){
                        Toast("请输入正确的提现金额");
                        this.moneyVal=""
                      }else{//跳转第三方
                          let para = {
                              amount:parseInt(this.moneyVal)+parseInt(this.presented),//本次提现总额
                              orderMoney:this.moneyVal,//佣金
                              oneAvailable:this.presented,//成单领补贴可提现金额
                            }
                          loginService.cashOrderMoney(para.amount, para.orderMoney, para.oneAvailable).then((r)=>{
                            if(r.flag == 20000){
                              let path = {path:"/resultsDetail",query:{
                                bankName:this.bankName,
                                bankCode:this.code,
                                moneyVal:parseInt(this.moneyVal),
                                presented:parseInt(this.presented)
                              }}
                              this.$router.push(path)
                            }else{
                              Toast(r.msg)
                            }
                          })
                      }
                  }else{
                    Toast(r.msg)
                  }
                })
              } 
            }
          }else{
            Toast(r.msg)
          }
        })
    },
    Verification(){//提现
        loginService.fictitiousquery().then((r)=>{
          if(r.flag == 20000){
            this.msgbox = true
          }else if(r.flag == 40000){//当前用户没有绑定银行卡
              MessageBox.confirm('', { 
                  message: '在体验之前，您需要添加收款银行卡，是否立即添加？', 
                  title: '提示', 
                  confirmButtonText: '立即添加', 
                  cancelButtonText: '暂时不了' 
                  }).then(action => { 
                  if (action == 'confirm') {     //确认的回调
                  if(this.orgType == "C" || this.supplierType == "D"){
                      this.$router.push('/companyAddBank')
                  }else{
                      let path = {path: '/banklist', query:{}}
                      this.$router.push(path)
                  }  
                      }
                  }).catch(err => { 
                  if (err == 'cancel') {     //取消的回调
                  } 
              });
          }else if(r.flag == 50006){//未绑定云商通个人合同
              MessageBox.confirm('', { 
                  message: '在体验之前，您需要签订资金安全协议，是否立即签订？', 
                  title: '提示', 
                  confirmButtonText: '立即签订', 
                  cancelButtonText: '暂时不了' 
                  }).then(action => { 
                  if (action == 'confirm') {     //确认的回调
                  loginService.getAddress().then(r =>{
                      if(r.flag == 20000){
                          location.href = r.data;
                      }else{
                          Toast(r.msg)
                      }
                  })
                  }
                  }).catch(err => { 
                  if (err == 'cancel') {     //取消的回调
                      
                  } 
              });
          }else if(r.flag == 50007){//未绑定云商通企业合同
              MessageBox.confirm('', { 
                  message: '在体验之前，您需要签订资金安全协议，是否立即签订？', 
                  title: '提示', 
                  confirmButtonText: '立即签订', 
                  cancelButtonText: '暂时不了' 
                  }).then(action => { 
                  if (action == 'confirm') {     //确认的回调
                      loginService.companyAddress().then(r =>{
                          if(r.flag == 20000){
                              location.href = r.data;
                          }else{
                              Toast(r.msg)
                          }
                      })
                  }
                  }).catch(err => { 
                  if (err == 'cancel') {     //取消的回调
                      
                  } 
              });
          }else{
              Toast(r.msg)
          }
      })
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
  mounted(){
    
     loginService.reBackMoney().then(r => {//银行卡信息
        if(r.flag == 20000){  
          this.money = r.data.money;
          this.bankName = r.data.simplify;
          this.code = r.data.code;
          this.imgSrc = r.data.bankLogo
        }else if(r.flag == 40000){
          this.hasBank = true;
        }else{
          Toast(r.msg)
        }
    }); 
    loginService.cashMoney().then((r)=>{
      if(r.flag == 20000){
        this.presented= r.data.oneAvailable
        this.TotalPresented= r.data.oneAll
        this.unPresented= r.data.oneUnavailable
      }else{
        Toast(r.msg)
      }
    })
    loginService.banklist(1,10).then(r => {//判断是否有银行卡
    //console.log(r,'是否有银行卡')
            if(r.flag == 20000){
                this.bankInfos = r.data.list[0].bankInfos;
            }
        });          
    $(".mint-field-core").css({
      "text-align": "center",
      "color": "#F5A623",
      "font-size": "16px"
    })
    $(".mint-field-clear").css({
      "margin-right":"15px"
    })
  }
}
</script>
<style scoped lang="less">
@import "../less/functions";
.addBank{
    width:92%;
    height:1.2rem;
    padding: .1rem 4%;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    background: url(../images/moreinfo.png) no-repeat 95% center;
  background-size: 0.25rem auto;
    .addImg{
        width:8%;
        height: auto;
        img{
            width:100%;
            height: 100%;
        }
    }
    .add-title{
        width:90%;
        text-align: left;
        margin-left: .4rem;
        color:#fff;
        font-size: 16px;
    }
}
.cash-container{
  width:100%;
  height:100%;
  background: #1D1D28;
  color:#fff;
  .cash-bank{
    padding:.3rem 4%;    
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bank-logo{
      width: ~`px2rem(48)`;
      height: ~`px2rem(48)`;
      overflow: hidden;
      border-radius: 100%;
      img{
        width:100%;
        height:auto;
      }
    }
    .bank-info{
      width:70%;
      .bank-name{
        color:#fff;
        display: -webkit-flex;
        font-size: 16px;
        align-items: center;
        span{
          display: block;
          border:~`px2rem(1)` solid #2CBB55;
          color: #2CBB55 ;
          font-size: ~`px2rem(20)`;
          border-radius: 3px;
          height: ~`px2rem(30)`;
          padding: 0 ~`px2rem(5)`;
          margin-left: ~`px2rem(10)`;
        }
      }
      .bank-number{
        color:#8A8A8A;
        font-size: 12px;
        margin-top: .2rem;
      }
    }
    .right-arrow{
      width:10%;
      height: auto;
      text-align: right;
      img{
        width:25%;
        height:auto;
      }
    }
  }
}
.cash-content{
  width:92%;
  padding: .4rem 4%;
  border-bottom: 1px solid #363645;
  border-top: 1px solid #363645;
  .cash-title{
    width:100%;
    font-size:16px;
    color:#fff;
  }
  .moneyBox{
    height:1.2rem;
    border-radius: 100px;
    background: #272734;
    border:none;
    outline: none;
    margin-top: .4rem;
  }
  .balance-content{
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .4rem;
    color:#9DA3B4;
    font-size: 14px;
    .balanceBtn{      
      color:#FBC700;
    }
  }
}
.remind{
  width:92%;
  margin:.4rem auto;
  color:#9DA3B4;
    font-size: 14px;
}
.depositBtn{
  width:100%;
  height:1.2rem;
  background: linear-gradient(-135deg, #2CBB86 0%, #2CBB55 100%);
  text-align: center;
  line-height: 1.2rem;
  color:#fff;
  font-size: 18px;
  position: absolute;
  bottom:0;
  left:0;
}
.NodepositBtn{
  background: #363645;
  color:#9DA3B4;
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
.activity-container{
  width: 100%;
  height: auto;
  position: relative;
  .subsidy-container{
    width: 100%;
    padding: ~`px2rem(30)` 0;
    border-bottom: ~`px2rem(1)` solid #363645;
    position: relative;
  }
  .subsidy-wrapper{
    width: ~`px2rem(690)`;
    height: auto;
    margin: 0 auto;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    dd{
      flex: 1;
      h2{
        color: #fff;
        font-size: ~`px2rem(30)`;
      }
      p{
        color: #9DA3B4;
        font-size: ~`px2rem(24)`;
        margin-top: ~`px2rem(20)`;
        i{
          color: #FBC700;
          font-style: normal;
        }
        span{
          color: #FBC700;
          font-size: ~`px2rem(32)`;
        }
      }
    }
    dt{
      width: ~`px2rem(300)`;
      height: 100%;
      text-align: center;
      position: relative;
      input{
        opacity: 0;
        position: absolute;
        left: -9999;
      }
      label{
        display: block;
        width: ~`px2rem(40)`;
        height: ~`px2rem(40)`;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: ~`px2rem(-20)`;
        background: url(../images/check.png) no-repeat center;
        background-size: contain;
      }
      .checkLabel{
        background: url(../images/checked.png) no-repeat center;
        background-size: contain;
      }
    }
  }
}
.checkReason{
  width: ~`px2rem(690)`;
  font-size: ~`px2rem(24)`;
  position: absolute;
  bottom: ~`px2rem(30)`;
  left: 50%;
  margin-left: ~`px2rem(-345)`;
  text-align: right;
  color: #FBC700;
}
.totleMoney{
  width: 100%;
  margin: ~`px2rem(40)` auto;
  text-align: center;
  color: #9DA3B4 ;
  font-size: ~`px2rem(24)`;
  span{
    color:#F5A623!important;
  }
}
.code-msgbox{
  width: ~`px2rem(666)`;
  height: ~`px2rem(330)`;
  border-radius: 15px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin:  ~`px2rem(-175)` ~`px2rem(-333)`;
  overflow: hidden;
  .code-msgbox-header{
    width: 100%;
    height: auto;
    color: #4A4A4A;
    font-size: ~`px2rem(30)`;
    text-align: center;
    padding: ~`px2rem(20)`;
  }
  
}
.code-msgbox-input{
  width: 80%;
  height: ~`px2rem(48)`;
  margin: 0 auto;
  position: relative;
  input{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border:~`px2rem(1)` solid #dedede;
    outline: none;
    display: block;
    color: #9DA3B4;
    font-size: ~`px2rem(28)`;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
  }
}
.code-msgbox-btns{
  width:100%;
  height: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  display: -webkit-flex;
  justify-content: space-between;
  border-top: ~`px2rem(1)` solid #dedede;
  button{
    width:50%;
    height: ~`px2rem(80)`;
    line-height: ~`px2rem(80)`;
    font-size: ~`px2rem(30)`;
    background: transparent;
    color: #2CBB55;
  }
  :nth-child(1){
    border-right: ~`px2rem(1)` solid #dedede;
    color: #9da3b4;
  }
}
.code-msgbox-forget{
  width:80%;
  text-align: right;
  padding: ~`px2rem(10)` 0;
  margin: 0 auto;
  color: #9da3b4;
}
.acity-title{
  width:100%;
  padding: ~`px2rem(0)` 0 ~`px2rem(30)`;
  text-indent: ~`px2rem(30)`;
  color: #fff;
  font-weight: normal;
  font-size: ~`px2rem(28)`;
}
</style>


