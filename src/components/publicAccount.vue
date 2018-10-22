<template>
    <div class="info-container">
      <ul class="info-list">
          <li>
              <p>企业对公账户</p>
              <p>{{presonlBankInfo.accountNo}}</p>
          </li>
          <li>
                <p>开户银行</p>
                <p style="display:-webkit-box;">
                    <span class="bankimg">
                        <img :src="presonlBankInfo.bankLogo" alt="">
                    </span>
                    <span class="bankName">{{presonlBankInfo.parentBankName}}</span>
                </p>
          </li>
          <li>
              <p>法人姓名</p>
              <p>{{presonlBankInfo.legalName}}</p>
          </li>
          <li>
              <p>法人身份证</p>
              <p>{{presonlBankInfo.legalIds}}</p>
          </li>
          <li>
              <p>法人手机号</p>
              <p>{{presonlBankInfo.legalPhone}}</p>
          </li>
           <li class="pay" style="padding:0">
                <h3>设为默认收款</h3>
            <div class="switch-btn ischecked"><button class="btn" @click="chooseDefault()"><span></span></button></div>
          </li>
          <!-- <li class="defaultBtn">
                <p>设为默认收款</p>
                <div class="switch-btn ischecked">
                    <button class="btn" @click="chooseDefault()"><span></span></button>
                </div>
          </li> -->
      </ul>
      <div class="licence-wrapper">
          <div class="licence-title">上传开户许可证扫描件</div>
          <div class="licence-list">
              <div class="licence-img">
                  <img :src="presonlBankInfo.licenseImgUrl" alt="">
              </div>
          </div>
      </div>
      <div class="licence-wrapper">
          <div class="licence-title">上传法人身份证正反面扫描件</div>
          <div class="licence-list">
              <div class="licence-img">
                  <img :src="presonlBankInfo.idCardImgUrls0" alt="">
              </div>
              <div class="licence-img">
                  <img :src="presonlBankInfo.idCardImgUrls1" alt="">
              </div>
          </div>
      </div>
    </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
    data(){
        return{
            presonlBankInfo: {
                accountNo:"",
                parentBankName:"",
                legalName:"",
                legalIds:"",
                legalPhone:"",
                bankLogo:"",
                licenseImgUrl:"",
                idCardImgUrls0:'',
                idCardImgUrls1:""
                //银行卡信息里的status
            },
            code: this.$route.query.code,
            status:"1"
        }
    },
    methods: {
        getBusinessBankInfo(){
            loginService.businessBankInfo(this.code).then(r=>{
                if(r.flag == 20000){
                    console.log(r,'xiangxi--------------')
                    this.presonlBankInfo = r.data;
                    //去银行卡信息里的status，不是取getBusinessBankInfo里的ststus
                    this.presonlBankInfo.licenseImgUrl = r.data.licenseImgUrlList;
                    this.presonlBankInfo.idCardImgUrls = r.data.idCardImgUrlsList;
                    console.log( this.presonlBankInfo.licenseImgUrl,this.presonlBankInfo.idCardImgUrls)
                    // if(this.status == 1){
                    //     $('.switch-btn').addClass('ischecked')
                    // }else{
                    //     $('.switch-btn').removeClass('ischecked')
                    // }
                }else{
                    Toast(r.msg)
                }
            })
        },
        chooseDefault(){
            if(this.status == 1){
                Toast('不能取消当前默认收款的账户')
            }else{
                loginService.checkedBank(this.presonlBankInfo.accountNo).then(r=>{
                    if(r.flag === 20000){
                        $('.switch-btn').addClass('ischecked');
                        this.status = 1;
                    }else{
                        Toast(r.msg)
                    }
                }) 
            }  
        },
         getPresonBankInfo(){//获取银行卡信息
            loginService.presonlBankInfo(this.code).then(r=>{
                if(r.flag == 20000){
                    this.status = r.data.status;
                    if(this.status == 1){
                        $('.switch-btn').addClass('ischecked');
                    }else{
                        $('.switch-btn').removeClass('ischecked');
                    }
                }else{
                    Toast(r.msg)
                }
            })
        },
    },
    mounted() {
        this.getBusinessBankInfo();
        //查询银行卡信息  将status赋值。
        this.getPresonBankInfo()

    }
}
</script>
<style lang="less" scoped>
@import '../less/functions';
.info-container{
    width: 100%;
    height: auto;
    background: #1d1d28;
    overflow-y: auto;
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
                color: #8A8A8A;               
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
    width: 100%;
    position: fixed;
    bottom: ~`px2rem(130)`;
    left: 0;
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
.licence-wrapper{
    width: ~`px2rem(690)`;
    margin: 0 auto;
    .licence-title{
        width: 100%;
        color: #787993;
        font-size: ~`px2rem(24)`;
        padding: ~`px2rem(30)` 0;
    }
    .licence-list{
        width: 100%;
        height: auto;
        display: -webkit-box;
        .licence-img{
            width: 33%;
            height: ~`px2rem(160)`;
            border-radius: 5px;
            overflow: hidden;
            margin-right: ~`px2rem(30)`;
        }
    }
}
.bankimg{
    width: ~`px2rem(48)`;
    height: ~`px2rem(48)`;
    border-radius: 100%;
    overflow: hidden;
    display: block;
    margin-right: ~`px2rem(20)`;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>

