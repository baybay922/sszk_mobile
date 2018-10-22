<template>
    <div class="info-container">
      <ul class="info-list">
          <li>
              <p>卡号</p>
              <p>
                  <input type="tel" placeholder="请输入用于收账的银行卡" maxlength="19" v-model="infoFromP.cardId" @input="getBankInfo"/>
              </p>
          </li>
          <li>
                <p>银行卡</p>
                <div class="bank-info" v-if="flagVal == 20000" @click="goSupportList">
                    <span class="bankLogo">
                        <img :src="banklogoUrl" alt="">
                    </span>
                    <span class="bankName">{{bankName}}</span>
                </div>
                <div class="support" v-else-if="flagVal == 80001" @click="goSupportList">仅支持储蓄卡类型的银行卡</div>
                <div class="support" v-else @click="goSupportList">输入卡号自动识别</div>
          </li>
          <li>
              <p>持卡人姓名</p>
              <p>
                  <input type="text" placeholder="请输入持卡人姓名" v-model="infoFromP.cardName" :disabled="disabled"/>
              </p>
          </li>
          <li>
              <p>身份证</p>
              <p>
                  <input type="text" placeholder="请输入身份证号码" v-model="infoFromP.personCardId" :disabled="disabled"/>
              </p>
          </li>
          <li>
              <p>预留手机号</p>
              <p>
                  <input type="tel" placeholder="请输入银行预留的手机号" v-model="infoFromP.cardPhone" maxlength="11" />
              </p>
          </li>
          <li>
              <P>验证码</P>
              <input type="tel" placeholder="请输入短信验证码" v-model="infoFromP.verificationCode" maxlength="6">
              <button v-bind:disabled="this.msgdisabled" @click="getSmsCode">{{ msgtitle }}</button>
          </li>
          <li class="pay" style="padding:0">
            <h3>设为默认收款</h3>
           <div class="switch-btn ischecked"><button class="btn" :disabled="payChoose" @click="chooseDefault()"><span></span></button></div>
          </li>
      </ul>      
        <p class="prompt-title" v-if="bankPromit">只能添加本人的银行卡</p>
        <p class="prompt-title" v-else>您仅能绑定同一持卡人的银行卡</br>持卡人一经绑定不可更改</p>
        <button class="Submission" @click="Submission">确认提交</button>
    </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast, MessageBox} from 'mint-ui'
import $ from 'jquery'
import storage from '../storage.js'
export default {
    data(){
        return{
            infoFromP:{
                cardId:"",
                cardName:"",
                cardPhone:"",
                personCardId:"",
                verificationCode: '',
                infoFromPverificationCode:"",
                defaultBankCard:"1"
            },
            type: this.$route.query.type,
            msgdisabled:false,
            msgtitle: '发送验证码',
            haveBank: false,
            banklogoUrl:"",
            bankName:"",
            disabled:false,
            bankPromit:false,
            payChoose:false,
            flagVal: 0
        }
    },
    methods: {
        goSupportList(){
            storage.setSession('bankcard',this.infoFromP.cardId);
            let path = {path: '/supportBankList', query: {}}
                this.$router.push(path)
        },
        chooseDefault(){
            $('.switch-btn').toggleClass('ischecked');
            if($('.switch-btn').hasClass('ischecked')){
                this.infoFromP.defaultBankCard = 1;
            }else{
                this.infoFromP.defaultBankCard = 0;
            }
        },
        getBankInfo(){
            var bankLen = this.infoFromP.cardId.length,
                vm = this;
            if(bankLen >= 15){
                loginService.checkBank(this.infoFromP.cardId).then(r=>{
                    if(r.flag == 20000){
                        vm.flagVal = r.flag;
                        vm.bankName = r.data.bankName;
                        vm.banklogoUrl = r.data.bankLogo;
                    }else if(r.flag == 80001){
                        vm.flagVal = r.flag;
                    }else{
                        vm.flagVal = r.flag;
                    }
                })
            }else if(bankLen == 0){
                vm.flagVal = 0;
            }
        },
        getSmsCode() {
            var myreg = /^[1]\d{10}$/;
            if(!this.infoFromP.cardId || !this.infoFromP.cardName || !this.infoFromP.cardPhone || !this.infoFromP.personCardId){
                Toast('请完善您的信息!')
            }else{
               if(!myreg.test(this.infoFromP.cardPhone) || this.infoFromP.cardPhone == "" || this.infoFromP.cardPhone.length < 11){
                    Toast("请输入正确的手机号")
                }else{
                    loginService.certificationBindingbank(this.infoFromP.cardId,this.infoFromP.cardName,this.infoFromP.cardPhone,this.infoFromP.personCardId,this.infoFromP.verificationCode).then((r) =>{
                        if(r.flag == 20000){
                            Toast('短信已发送，请注意查收！')
                            this.msgdisabled = true
                            this.makenum()
                        }else{
                            Toast(r.msg)
                        }
                    })
                }
                
            }            
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
        // getinfo() {
        //     loginService.getagentinfo().then(r => {
        //         if(r.flag ==20000 ){
                    
        //             this.infoFromP.cardName = r.data.leaderName;
        //             this.infoFromP.personCardId = r.data.idCardNo;
                    
        //         }
        //     })
        // },
        Submission(){
            var myreg = /^[1]\d{10}$/;
            if(this.infoFromP.cardId == "" || this.infoFromP.cardName == "" || this.infoFromP.phoneNumber == "" || this.infoFromP.idNumber == ""){
                Toast("请完善您的信息")
            }else if(this.infoFromP.verificationCode == undefined){
                Toast('请输入验证码')
            }else{
                if(!myreg.test(this.infoFromP.cardPhone) || this.infoFromP.cardPhone == "" || this.infoFromP.cardPhone.length < 11){
                    Toast("请输入正确的手机号") 
                }else{
                    loginService.companyBank(this.infoFromP.cardId,this.infoFromP.cardName,this.infoFromP.cardPhone,this.infoFromP.personCardId,this.infoFromP.verificationCode,this.infoFromP.defaultBankCard).then(r =>{
                       
                       if(r.flag == 20000){
                            Toast('添加个人账户成功');
                            setTimeout(()=>{
                                loginService.havebank().then(r=>{
                                    if(r.flag == 20000){
                                        let path = { path: "/banklist", query: { } };
                                        this.$router.push(path);
                                    }else if(r.flag == 50006){//未签订个人合同
                                    MessageBox.confirm('', { 
                                            message: '在下单之前，您需要签订资金安全协议，是否立即签订？', 
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
                                                let path = { path: "/banklist", query: { } };
                                                this.$router.push(path);
                                            } 
                                        });
                                    }else if(r.flag == 50007){//未签订企业合同
                                    MessageBox.confirm('', { 
                                            message: '在下单之前，您需要签订资金安全协议，是否立即签订？', 
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
                                                let path = { path: "/banklist", query: { } };
                                                this.$router.push(path);
                                            } 
                                        });
                                    }else if(r.flag == 40000){//未绑定银行卡
                                    MessageBox.confirm('', { 
                                            message: '在下单之前，您需要添加收款银行卡，是否立即添加？', 
                                            title: '提示', 
                                            confirmButtonText: '立即添加', 
                                            cancelButtonText: '暂时不了' 
                                            }).then(action => { 
                                            if (action == 'confirm') {     //确认的回调
                                            let path = {path: '/banklist', query:{}}
                                                this.$router.push(path)
                                            }
                                            }).catch(err => { 
                                            if (err == 'cancel') {     //取消的回调
                                                let path = { path: "/banklist", query: { } };
                                                this.$router.push(path);
                                            } 
                                        });
                                    }
                                })
                            },3000)
                        }else{
                            Toast(r.msg)
                        }
                    }) 
                }
               
            }
        },
        getUser(){
            loginService.getUserInfo().then(r=>{
                if(r.flag=== 20000){                    
                    if(r.data.orgType == 'B' || r.data.orgType == 'P'){
                        this.bankPromit = false
                    }else{
                        this.bankPromit = true
                    }
                    if(r.data.certification == 1 ){
                        loginService.certitication().then(r=>{
                            if(r.flag == 20000){
                                 this.infoFromP.cardName = r.data.leaderName;
                                this.infoFromP.personCardId = r.data.orgIdentityNo;
                                this.disabled = true;
                            }else{
                                Toast(r.msg)
                            }
                        })
                       
                    }else{
                        this.disabled = false;
                    }                    
                    storage.setSession('name',this.infoFromP.cardName)
                    storage.setSession('idCard',this.infoFromP.personCardId)
                }
            })
        }
    },

    created(){
        let name = storage.getSession('name');
        let idCard =  storage.getSession('idCard');
        let bankcard =  storage.getSession('bankcard');
        if(name =="" || name == null){
            this.infoFromP.cardName = ""
        }else{
            this.infoFromP.cardName = name;
        }

        if(idCard == "" || idCard == null){
            this.infoFromP.personCardId = '';
        }else{
            this.infoFromP.personCardId = idCard;
        }
        if(bankcard == "" || bankcard == null){
            this.infoFromP.cardId = ""
        }else{
            this.infoFromP.cardId = bankcard
        }
    },
    mounted() {
        this.getUser()
        this.getBankInfo()
       // this.getinfo();
        loginService.banklist(1,10).then(r => {//判断是否有银行卡
            if(r.flag == 20000){
                this.bankInfos = r.data.list[0].bankInfos;
                if(r.data.list[0].bankInfos.length == 0 && r.data.list[0].bankInfoList.length == 0){
                    this.status = 1;
                    this.payChoose = true;
                }else{
                    this.payChoose = false;
                }
            }
        });  
  }
}
</script>
<style lang="less" scoped>
@import '../less/functions';
.info-container{
    width: 100%;
    height: 100%;
    background: #1d1d28;
    overflow: hidden;
    ul{
        width: 100%;
        border-bottom: ~`px2rem(1)` solid #363645;    
        li{
            width: 95%;
            padding: .4rem 0;
            border-bottom: ~`px2rem(1)` solid #363645;
            -ms-flex-item-align: end;
            color:#fff;
            font-size: 16px;
            display: -webkit-flex;
            justify-content: space-between;
            margin-left: 5%;
            p{
                -webkit-box-flex: auto;
                input{
                    border:none;
                    background: none;
                    outline: none;
                    text-align: right;
                    color: #fff;
                }
            }
            p:last-child{                
                margin-right: 5%;
            }
            .arrow-right{
                padding: 0 .4rem 0;
                background: url(../images/moreinfo.png) no-repeat center right;
                background-size: auto 0.35rem;
            }
            input{
                border:none;
                outline: none;
                background: none;
                color: #fff;
                text-align: right;
            }
            button{
                margin-right: ~`px2rem(30)`;
                background: none;
                color: #2cbb55;
                font-size: ~`px2rem(28)`;
            }
        }
        li:last-child{
            border:none;
        }
    }
    .remarks{
        width: 88%;
        height: 4rem;
        margin: .5rem auto 1rem;
        display:block;
        border-radius: 10px;
        background:  #272734;
        border:none;
        outline: none;
        padding: 2%;
        font-size: 14px;
        color: #fff;
    }
    .Submission{
        width: 100%;
        height: ~`px2rem(100)`;
        line-height: ~`px2rem(100)`;
        background-image: linear-gradient(-135deg, #2CBB86 0%, #2CBB55 100%);
        display: block;
        color: #fff;
        font-size: 16px;
        position: fixed;
        bottom: 0;
        left: 0;
    }
}
.bank-info{
    display: -webkit-flex;
    margin-right: ~`px2rem(30)`;
    margin-right: ~`px2rem(30)`;
    padding-right: ~`px2rem(30)`;
    color: #9DA3B4;
    background: url("../images/moreinfo.png") no-repeat right center;
    background-size: .2rem auto;
}
.bankLogo{
    width: ~`px2rem(48)`;
    height: ~`px2rem(48)`;
    display: block;
    border-radius: 100%;
    overflow: hidden;
    margin-right: ~`px2rem(24)`;
    img{
        width: 100%;
        height: 100%;
    }
}
.support{
    margin-right: ~`px2rem(30)`;
    padding-right: ~`px2rem(30)`;
    color: #9DA3B4;
    background: url("../images/moreinfo.png") no-repeat right center;
    background-size: .2rem auto;
}
.prompt-title{
    width: 80%;
    position: absolute;
    bottom: ~`px2rem(130)`;
    left:50%;
    margin-left: -40%;
    text-align: center;
    color: #9DA3B4;
    font-size: ~`px2rem(24)`;
}
.switch-btn{
    height:100%;
    display:flex;
    align-items: center;
}
.switch-btn .btn{
    width:1.36rem;
    height:65%;
    background: #fff;
    border-radius: 0.38rem;
    overflow: hidden;
}

.switch-btn span{
    display: block;
    width:0.68rem;
    height:100%;
    background: #fff;
    border-radius: 50%; 
    transform: translateX(0);
    -webkit-transform: translateX(0);
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    -o-transform: translateX(0);
    transition: 0.5s;
    border: 0.02rem solid #d9d9d9;
}
.switch-btn.ischecked{
    span{
         transform: translateX(0.68rem);
         -webkit-transform: translateX(0.68rem);
         -moz-transform: translateX(0.68rem);
         -ms-transform: translateX(0.68rem);
         -o-transform: translateX(0.68rem);
    }
    button{
        background:#2CBB55 ;
    }
}
.pay{
    width:95%;
    height:1.2rem;
    color:#fff;
    border-bottom:1px solid #363645;
    margin-left: 5%;
    font-size:0.38rem;
    box-sizing:border-box;
    padding:0;
    padding-right:4%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>

