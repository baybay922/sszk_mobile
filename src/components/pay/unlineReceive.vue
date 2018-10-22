<template>
    <div class="cash-container">
        <dl class="header">
            <dd>
                <p>POS机型号：<span>{{model}}</span></p>
                <p>目前状态：<span v-html="getStatus(status)">未申请</span></p>
                <p>押金数额：<span>{{money}}元</span></p>
                <p>押金状态：<span>{{deposit}}</span></p>
            </dd>
            <dt>
                <img src="../../images/headerLogo.png" alt="">
            </dt>
        </dl>
        <div class="distribution-info">
            <h2 class="title">线下领取</h2>
            <div class="Tips">
                多加市场经理为您配送POS机之后,请在这填写POS机编号并确认领取,领取后可以即正常使。
            </div>
            <div class="identifier">
                <p>POS机编号</p>
                <input type="text" v-model="number" placeholder="请输入您的POS机编号" maxlength="4">
            </div>
            <div class="radioBox">
                <label for="choose" class="choose bg"><span>我同意遵守<i @click="CheckAgreement">《POS机使用协议》</i></span></label>
                <input type="checkbox" id="choose" :checked="checkVal" @click="checkedFn($event)">
            </div>
            <button class="receiveBtn" @click="getPosEngine">领取POS机</button>          
        </div>
    </div>
</template>
<script>
import {loginService} from "../../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
import wx from 'weixin-js-sdk';
import storage from '../../storage'//引入storage,点击协议记录当前用户信息
export default {
    data(){
        return{
            checkVal:true,
            anonymity:'0',
            number:"",
            model:this.$route.query.model,
            status:this.$route.query.status,
            money:this.$route.query.money,
            deposit:this.$route.query.deposit,
            orgId:this.$route.query.orgId,
            openidVal:"",
            openidData:""
        }
    },
    methods:{
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
        getPosEngine(){
            loginService.startPOS(this.orgId).then(r =>{
                 if(r.flag == 20000){
                     if(r.data.status == "1" || r.data.status == "2" || r.data.status == "3"){
                         Toast("您已经申请了POS机，请不要重复申请")
                     }else{
                         if(this.number == "" || this.anonymity == "1"){
                            Toast("请输入您的POS机编号并同意协议")
                        }else{
                            loginService.querycode(this.number).then(r =>{
                                if(r.flag == 20000){
                                    var d = new Date(); var ts  = d.getTime();//生成一个时间戳
                                    var orderid  = 'live_'+ts;  
                                    var  vm = this;   
                                    //vm.money = 0.01;
                                    loginService.weixinPay(vm.money,  vm.openidData || vm.openidVal, orderid).then(r =>{
                                        function onBridgeReady(){
                                            WeixinJSBridge.invoke(
                                                'getBrandWCPayRequest', {
                                                    "appId" : r.appId,     //公众号名称，由商户传入    
                                                    "timeStamp":r.timeStamp,         //时间戳，自1970年以来的秒数    
                                                    "nonceStr" : r.nonceStr, //随机串    
                                                    "package" : r.package,     //统一订单号
                                                    "signType" : r.signType,         //微信签名方式：    
                                                    "paySign" : r.finalSign //支付签名
                                                },                            
                                                function(res){
                                                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                                        loginService.underline(vm.number,orderid).then(r =>{
                                                            if(r.flag == 20000){
                                                            let path = { path:"/cashStart",query:{orgId:vm.orgId}}
                                                                vm.$router.push(path)
                                                            }else{
                                                                Toast(r.msg)
                                                            }
                                                        })
                                                    }else{
                                                        Toast("支付失败")
                                                    }
                                                }
                                            );
                                        }
                                        if (typeof WeixinJSBridge == "undefined"){
                                            if( document.addEventListener ){
                                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                            }else if (document.attachEvent){
                                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                            }
                                        }else{
                                            onBridgeReady();
                                        }
                                    }) 
                                }else{
                                    Toast(r.msg)
                                }
                            })
                                                
                        }  
                     }
                 }
            })
            
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
            var vm = this;
            storage.setSession('number',vm.number);
            storage.setSession('openidVal',vm.openidVal || vm.openidData)
            storage.setSession('money',vm.money)
            let path = {path: '/checkAgreement', query:{orderNo: vm.orderNo}}
            vm.$router.push(path)
        },
        getUrlParam(name){//name为url路径
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
            if (r != null) {
                return unescape(r[2]);  //返回参数值 
            } else {
                return null; 
            }
        }
        
    },
    mounted(){
       let lacaUrl = encodeURIComponent(location.href);
         loginService.getAppId().then(r =>{
            this.appId = r.appId
            let code = this.getUrlParam("code")
            if(code !== null){                
                loginService.getOpenId(code).then(r=>{
                    this.openidVal = r.openid;
                })
            }else{
                location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+r.appId+"&redirect_uri="+lacaUrl+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
            }       
         })
    },
    created(){
        let number = storage.getSession('number'),
            openidVal = storage.getSession('openidVal' || 'openidData'),
            moneyVal = storage.getSession('money')
        if(number !== null){
            this.number = number;            
            this.sureReceive = true;
        }
        if(openidVal !== null || openidVal !== '' || openidVal !== 'undefined'){
           this.openidData = openidVal;
        }

    }
}
</script>
<style scoped lang="less">
@import "../../less/functions";
.cash-container{
    background: #1d1d28;
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
            color: #9DA3B4;
            font-size: ~`px2rem(32)`;
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
    background: url("../../images/moreinfo.png") no-repeat 95% center;
    background-size: .2rem auto;
}
.identifier{
    width: 100%;
    display: -webkit-flex;
    justify-content: space-between;
    border-bottom:~`px2rem(1)` solid #363645;
    padding: ~`px2rem(30)` 0;
    p{
        margin-left: 15px;
        color: #fff;
        font-size: ~`px2rem(32)`;
    }
    input{
        margin-right: 15px;
        color: #fff;
        font-size: ~`px2rem(28)`;
        border:none;
        background: none;
        outline: none;
        text-align: right;
    } 
    textarea{
        font-size: ~`px2rem(28)`;
    }
}
.receiveBtn{
    width: 100%;
    padding: ~`px2rem(30)` 0;
    position: absolute;
    bottom: 0;
    left: 0;
    background: -webkit-gradient(linear,0 0,100% 0,from(#2cbb55),to(#2cbb86));
    font-size: ~`px2rem(32)`;
    color: #fff;
}
  .radioBox{
    margin: ~`px2rem(25)` auto 0;
    position: relative;
    display:flex;
    padding-bottom: 1rem;
    width: 60%;
    text-align: center;
   label{
      display: inline-block;
      width:18px;
      height:18px;
      border-radius: 50%;
      background: url('../../images/check.png') center center;
      background-size: 100% 100%;
      border-color:#2CBB86;
      margin-right:0.2rem;
    }
    label.bg{
      background: url('../../images/checked2.png') center center;
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
.Tips{
    width: ~`px2rem(690)`;
    margin: ~`px2rem(30)` auto 0;
    font-size: ~`px2rem(28)`;
    color: #9DA3B4;
}
@media screen and (max-width: 414px) {
    .radioBox{
        width: 50%;
    }
}
@media screen and (max-width: 375px) {
    .radioBox{
        width: 55%;
    }
}
@media screen and (max-width: 320px) {
    .radioBox{
        width: 60%;
    }
}
</style>


