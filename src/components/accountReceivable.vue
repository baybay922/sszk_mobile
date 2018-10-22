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
                <div class="bank-info" v-if="haveBank" @click="goSupportList">
                    <span class="bankLogo">
                        <img :src="banklogoUrl" alt="">
                    </span>
                    <span class="bankName">{{bankName}}</span>
                </div>
                <div class="support" v-else @click="goSupportList">暂时不支持您的银行卡</div>
          </li>
          <li>
              <p>持卡人姓名</p>
              <p>
                  <input type="text" placeholder="请输入持卡人姓名" v-model="infoFromP.cardName" />
              </p>
          </li>
          <li>
              <p>身份证</p>
              <p>
                  <input type="text" placeholder="请输入身份证号码" v-model="infoFromP.personCardId" />
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
              <button v-bind:disabled="this.msgdisabled" @click="getSmsCode" v-if="isSupport">{{ msgtitle }}</button>
              <button @click="titleIsSupport" v-else>{{ msgtitle }}</button>
          </li>
      </ul>
      <button class="Submission" @click="Submission">提交资料</button>
    </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
    data(){
        return{
            infoFromP:{
                cardId:"",
                cardName:"",
                cardPhone:"",
                personCardId:"",
                verificationCode: '',
                infoFromPverificationCode:""
            },
            type: this.$route.query.type,
            msgdisabled:false,
            msgtitle: '发送验证码',
            haveBank: false,
            banklogoUrl:"",
            bankName:"",
            isSupport:false
        }
    },
    methods: {
        titleIsSupport(){
            Toast("对不起，暂不支持您的银行卡类型");
        },
        goSupportList(){
            let path = {path: '/supportBankList', query: {}}
                this.$router.push(path)
        },
        getBankInfo(){
            var bankLen = this.infoFromP.cardId.length;
            if(bankLen >= 15){
                loginService.checkBank(this.infoFromP.cardId).then(r=>{
                    if(r.flag == 20000){
                        this.haveBank = true;
                        this.banklogoUrl = r.data.bankLogo;
                        this.bankName = r.data.bankName;
                        this.isSupport = true;
                    }else{
                        this.haveBank = false;
                        this.isSupport = false;
                    }
                })
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
            num--;
            self.msgtitle = '重新获取(' + num + ')'
            if (num == 0) {
                self.msgtitle = '获取短信验证码'
                self.msgdisabled = false
                window.clearInterval(interval)
            }
            }, 1000)
        },            
        getinfo() {
            loginService.getagentinfo().then(r => {
                if(r.flag ==20000 ){
                    this.infoFromP = r.data;
                    if(this.infoFromP.cardId){
                        this.getBankInfo()
                    }
                }
            })
        },
        Submission(){
            var myreg = /^[1]\d{10}$/;
            if(this.infoFromP.cardId == "" || this.infoFromP.cardName == "" || this.infoFromP.cardPhone == "" || this.infoFromP.personCardId == "" || this.infoFromP.verificationCode == ""){
                Toast("请完善您的信息")
            }else{
                if(!myreg.test(this.infoFromP.cardPhone) || this.infoFromP.cardPhone == "" || this.infoFromP.cardPhone.length < 11){
                    Toast("请输入正确的手机号")
                }else{
                    loginService.supplierBankInfo(this.infoFromP.cardId,this.infoFromP.cardName,this.infoFromP.cardPhone,this.infoFromP.personCardId,this.infoFromP.verificationCode).then(r =>{
                    if(r.flag == 20000){
                        let path = {path: '/registsuc', query: {type: this.type}}
                        this.$router.push(path)
                    }else{
                        Toast(r.msg)
                    }
                })
                }
                 
            }
        }
    },
    mounted() {
        this.getinfo();
        //this.msgdisabled = true;
  }
}
</script>
<style lang="less" scoped>
@import '../less/functions';
// 
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
        width: 75%;
        background-image: linear-gradient(-135deg, #2CBB86 0%, #2CBB55 100%);
        border-radius: 50px;
        padding: .2rem 0;
        margin: 1rem auto 0;
        display: block;
        color: #fff;
        font-size: 16px;
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
</style>

