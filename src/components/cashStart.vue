<template>
    <div class="cash-container">
        <dl class="header">
            <dd>
                <p>POS机型号：<span>{{ res.posVendor }}</span></p>
                <p>目前状态：<span v-html="getStatus(res.status)">未申请</span></p>
                <p>押金数额：<span>{{res.price}}元</span></p>
                <p>押金状态：<span>{{getPayStatu}}</span></p>
            </dd>
            <dt>
                <img src="../images/headerLogo.png" alt="">
            </dt>
        </dl>
        <div class="distribution-info" v-if="status == 0"><!-- 未申请  -->
            <div class="useIng" @click="onlineReceive">
                在线申请
            </div>
            <div class="useIng" @click="unlineReceive">
                线下领取
            </div>
        </div>
        <div class="distribution-info" v-if="status == 1"> <!-- 等待配送  -->
            <h2 class="title">等待配送</h2>
            <ul>
                <li>
                    <p>收货人</p>
                    <p>{{res.express.orgName}}</p>
                </li>
                <li>
                    <p>收货电话</p>
                    <p>{{res.express.orgPhone}}</p>
                </li>
                <li>
                    <p>收货地址</p>
                    <p>{{res.express.address}}</p>
                </li>
            </ul>
        </div>
        <div class="distribution-info" v-else-if="status == 2"> <!-- 配送中  -->
            <h2 class="title">配送信息</h2>
            <ul>
                <li>
                    <p>快递公司</p>
                    <p>{{res.express.express}}</p>
                </li>
                <li>
                    <p>快递单号</p>
                    <p>{{res.express.courierNumber}}</p>
                </li>
                <li>
                    <p>收货人</p>
                    <p>{{res.express.orgName}}</p>
                </li>
                <li>
                    <p>收货电话</p>
                    <p>{{res.express.orgPhone}}</p>
                </li>
                 <li>
                    <p>收货地址</p>
                    <p>{{res.express.address}}</p>
                </li>
            </ul>
            <p class="promptInfo">*请收到POS机并<span>确认无损坏</span>后再确认收货</p>
            <button class="receiveBtn" @click="sureCollect">
                确认收货
            </button>
        </div>
        <div class="useingBox" v-else-if="status == 3">
            <div class="useIng"  @click="returnIng"> <!-- 使用中  -->
                申请返修/退还            
            </div>
            <div class="useIng"  @click="experience"> <!-- 交易体验  -->
                交易过程体验         
            </div>
            <p class="Agreement" @click="CheckAgreement"><span>POS机</span>使用协议</p>
        </div>
        
        <div class="giveBack" v-else-if="status == 4">
            <p>*退还后此POS机的押金将<span>自动退回</span>到您的账户，请注意查收，若在退还中申请新的POS机需另外缴纳押金</p>
            <button class="newpos" @click="againPos">
                申请新的POS机
            </button>
        </div>
        <div class="giveBack" v-else-if="status == 5">
            <p>*退还后此POS机的押金将<span>自动退回</span>到您的账户，请注意查收，若在退还后申请新的POS机需另外缴纳押金</p>
            <button class="newpos" @click="againPos">
                申请新的POS机
            </button>
        </div>
       <div class="distribution-info" v-if="again"><!-- 重新申请  -->
            <div class="useIng" @click="onlineReceive">
                在线申请
            </div>
            <div class="useIng" @click="unlineReceive">
                线下领取
            </div>
        </div>
    </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast, MessageBox} from 'mint-ui'
import $ from 'jquery'
// import Store from '../store/index'
export default {
    data(){
        return{
            orgId: this.$route.query.orgId,
            checkVal: true,
            anonymity: '0',
            number: "",
            reason: " 申请返修",
            resonPicker: false,
            ResonSlots:[
                {
                    values: [' 申请返修','POS机丢失', '暂无使用需求', '其他'],
                }
            ],
            reasonInfo:"",
            other: false,
            res:[],
            getPayStatu:"",
            status:"",
            again:false
        }
    },
    methods:{
        experience(){
            loginService.fictitiousquery().then((r)=>{
                if(r.flag == 20000){
                    let path = {path:"/experiencePOS",query:{}}
                    this.$router.push(path)
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
            // let path = {path:"/experiencePOS",query:{}}
            // this.$router.push(path)
        },
        againPos(){
            $(".giveBack").hide()
            this.again = true;
        },
        sureCollect(){
            MessageBox.confirm('', { 
                message: '您确定收到的POS机完好无损吗？', 
                title: '提示', 
                confirmButtonText: '确定', 
                cancelButtonText: '取消' 
                }).then(action => { 
                if (action == 'confirm') {     //确认的回调
                   loginService.applyonline(this.res.express.orderNo).then(r =>{
                        if(r.flag == 20000){
                            location.reload()
                        }else{
                            Toast(r.msg)
                        }
                    })
                }
            })           
            
        },
        returnIng(){
            let path = {path:'./returning',query:{
                    model:this.res.posVendor,
                    status:this.res.status,
                    money: this.res.price,
                    deposit: this.getPayStatu,
                    orgId: this.orgId
            }};
            this.$router.push(path)
        },
        onlineReceive(){
            let path = {path:'./onlineReceive',query:{
                    model:this.res.posVendor,
                    status:this.res.status,
                    money: this.res.price,
                    deposit: this.getPayStatu,
                    orgId: this.orgId
            }};
            this.$router.push(path)
        },
        unlineReceive(){
            let path = {path:'./unlineReceive',query:{
                    model:this.res.posVendor,
                    status:this.res.status,
                    money: this.res.price,
                    deposit: this.getPayStatu,
                    orgId: this.orgId
            }};
            this.$router.push(path)
        },
        
        checkedFn(e){
            if(e.target.checked){
                this.anonymity = "0"
                $('.choose').addClass('bg')
            }else{
                this.checkVal = false;
                this.anonymity = "1";
                $('.choose').removeClass('bg')
            }
        },
        CheckAgreement(){
            let path = {path: '/checkAgreement', query:{}}
            this.$router.push(path)
        },
        getPOSstatus(){
            loginService.startPOS(this.orgId).then(r =>{//获取POS当前状态
                if(r.flag == 20000){
                    console.log(r)
                    this.res = r.data;
                    this.status = r.data.status;
                    r.data.payStatus == 0?this.getPayStatu = "未支付":this.getPayStatu = "已支付";
                }else{
                    Toast(r.msg)
                }
            })
        },
        getStatus(ind){
            switch(ind){
                case "0":
                return '<span style="color:#E5322E">未申请</span>';
                break;
                case "1":
                return '<span style="color:#f5a623">等待配送</span>';
                break;
                case "2":
                return '<span style="color:#f5a623">配送中</span>';
                break;
                case "3":
                return '<span style="color:#2CBB55">使用中</span>';
                break;
                case "4":
                return '<span style="color:#f5a623">退还中</span>';
                break;
                case "5":
                return '<span style="color:#f5a623">已退还</span>';
                break;
            }
        },
         CheckAgreement(){
            var vm = this;
            let path = {path: '/checkAgreement', query:{orderNo: vm.orderNo}}
            vm.$router.push(path)
        },
    },
    mounted(){
        this.getPOSstatus();
    }
}
</script>
<style scoped lang="less">
@import "../less/functions";
.cash-container{
    width: 100%;
    height: auto;
    position: relative;
    padding-bottom: ~`px2rem(30)`;
}
.header{
    width: 100%;
    height: auto;
    background: #272734;
    display: -webkit-flex;
    justify-content: space-between;
    dd{
        width: 50%;
        padding: 15px;
        padding-right:0;
        color: #9DA3B4;
        font-size: ~`px2rem(32)`;
        line-height: 2;
        span{
            color: #fff;
        }
    }
    dt{
        width: 50%;
        padding: 15px;
        padding-left: 0;
        text-align: right;
        position: relative;
        img{
            width: 55%;
            position: absolute;
            bottom: 0;
            right: 15px;
            margin-left: -33%;
            height: auto;
        }
    }
}
.distribution-info{
    width: 100%;
    .title{
        padding: ~`px2rem(30)` 0;
        color: #9DA3B4;
        font-size: ~`px2rem(28)`;
        border-bottom:~`px2rem(1)` solid #363645;
        text-indent: 25px;
        position: relative;
    }
    .title::after{
        content: "";
        width: 4px;
        height:30%;
        background: #FBC700;
        border-radius: 1px;
        display: block;
        position: absolute;
        left: 15px;
        top: 17.5px;   
    }
    ul{
        width: ~`px2rem(690)`;
        margin: 0 auto;
        li{
            display: -webkit-flex;
            justify-content: space-between;
            padding: 8px 0;
            color: #fff;
            font-size: ~`px2rem(32)`;
            p:nth-child(1){
                font-size: ~`px2rem(32)`;
            }
            p:nth-child(2){
                font-size: ~`px2rem(28)`;
            }
            input{
                color: #9DA3B4;
                font-size:  ~`px2rem(28)`;
                border:none;
                background: none;
                outline: none;
                text-align: right;
            }
            textarea{
                display: block;
                text-indent: ~`px2rem(24)`;
                background: #272734;
                width: ~`px2rem(690)`;
                border-radius: 10px;
                margin: 0 auto;
                border:none;
                padding-top: ~`px2rem(24)`;
                color: #fff;
                font-size: ~`px2rem(24)`;
            } 
        }
    }
}
.useIng{
    width: 100%;
    padding: ~`px2rem(30)` 0;
    text-indent: 15px;
    color: #9DA3B4;
    font-size: ~`px2rem(32)`;
    border-bottom: ~`px2rem(1)` solid #363645;
    background: url("../images/moreinfo.png") no-repeat 95% center;
    background-size: .2rem auto;
}
.promptInfo{
    width: 100%;
    border-top: ~`px2rem(1)` solid #363645;
    padding:~`px2rem(30)` 0;
    text-indent: 15px;
    color: #9DA3B4;
    font-size: 12px;
    span{
         color:#f5a623;
    }
}
.reason{
    padding-right: ~`px2rem(70)`!important;
    text-align: left;
    background: url("../images/moreinfo.png") no-repeat 80% center;
    background-size: .2rem auto;
}
.oldSlots{
    position: fixed;
    width: 100%;
    background: #fff;
    bottom: 0;
    left: 0;
}
.pickerBtn{
    width: 100%;
    display: -webkit-flex;
    justify-content: space-between;
    border-bottom:1px solid #eaeaea;
    div{
        width: 50%;
        text-align: center;
        padding: .3rem 0;
        font-size: 16px;
    }
    .closeBtn{
        color:#9DA3B4
    }
    .sureBtn{
        color: #2CBB55;
    }
}
.reason-container{
    width: 100%; 
    ul{
        width: 100%!important;
        border-bottom: ~`px2rem(1)` solid #363645;
        li{
            width: 95%;
            padding: ~`px2rem(25)` 0;
            margin-left:  ~`px2rem(30)`;
            border-bottom: ~`px2rem(1)` solid #363645;
            input,p{
                padding-right: ~`px2rem(30)`;
            }
        }
    }
}
.receiveBtn{
    width: 100%;
    padding: ~`px2rem(30)` 0;
    position: fixed;
    bottom: 0;
    left: 0;
    background: -webkit-gradient(linear,0 0,100% 0,from(#2cbb55),to(#2cbb86));
    font-size: ~`px2rem(36)`;
    color: #fff;
}
 .radioBox{
    margin-top:~`px2rem(25)`;
    position: relative;
    display:flex;
    padding-bottom: 1rem;
    position: absolute;
    width: 55%;
    bottom: 1rem;
    left: 50%;
    margin-left: -30%;
   label{
      display: inline-block;
      width:18px;
      height:18px;
      border-radius: 50%;
      background: url('../images/check.png') center center;
      background-size: 100% 100%;
      border-color:#2CBB86;
      margin-right:0.2rem;
    }
    label.bg{
      background: url('../images/checked2.png') center center;
      background-size: 100% 100%;
      z-index: 1;
    }
    input#choose{
      position: absolute;
      left: 0.1rem;
      top: 0.1rem;
      display:none;
    }
    span{
      font-size:12px;
      color: #9DA3B4;
      position: absolute;
      left: 0.7rem;
      i{
        font-style:normal;
        color:#f5a623;

      }
    }
  }
  .giveBack{
      width: ~`px2rem(690)`;
      margin: ~`px2rem(30)` auto 0;
      color: #9DA3B4;
      font-size:  ~`px2rem(28)`;
      span{
          color:#f5a623;
      }
  }
.newpos{
    width: 70%;
    padding: ~`px2rem(20)` 0;
    border-radius: 100px;
    margin: 0 auto;
    color: #2CBB55;
    border: 1px solid #2CBB55;
    display: block;
    background: none;
    margin-top: ~`px2rem(30)`;
    font-size: ~`px2rem(32)`;
}
.Agreement{
    width: 50%;
    position: fixed;
    text-align: center;
    bottom: ~`px2rem(30)`;
    left: 50%;
    margin-left: -25%;
    color: #f5a623;
    span{
        color: #9DA3B4;
    }
}
.useingBox{
    width: 100%;
}
</style>


