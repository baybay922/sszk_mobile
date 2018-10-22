<template>
    <div class="cash-container">
        <dl class="header">
            <dd>
                <p>POS机型号：<span>{{model}}</span></p>
                <p>目前状态：<span v-html="getStatus(status)">未申请</span></p>
                <p>押金数额：<span>{{money}}</span></p>
                <p>押金状态：<span>{{deposit}}</span></p>
            </dd>
            <dt>
                <img src="../../images/headerLogo.png" alt="">
            </dt>
        </dl>
        <div class="distribution-info"> <!-- 在线申请  -->
            <h2 class="title">在线申请</h2>
            <div class="identifier">
                <p>收货人</p>
                <input type="text" v-model="collectName" placeholder="请输入收货人姓名">
            </div>
            <div class="identifier">
                <p>收货电话</p>
                <input type="tel" v-model="collectPhone" placeholder="请输入收货人电话" maxlength="11">
            </div>
            <div class="address">
                <p>收货地址</p>
                <textarea cols="49" rows="6" placeholder="请输入详细收货地址" v-model="addressInfo"></textarea>
            </div>
            <div class="radioBox">
                <label for="choose" class="choose bg"><span>我同意遵守<i @click="CheckAgreement($event)">《POS机使用协议》</i></span></label>
                <input type="checkbox" id="choose" :checked="checkVal" @click="checkedFn($event)">
            </div>            
        </div>
        <button class="receiveBtn" @click="getPosEngine">申请POS机</button>
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
            addressInfo:"",
            collectName:"",
            collectPhone:"",
            model:this.$route.query.model,
            status:this.$route.query.status,
            money:this.$route.query.money,
            deposit:this.$route.query.deposit,
            orgId:this.$route.query.orgId,
            openIdUrl:"",
            appId:"",
            openidVal:"",
            openidData:""
        }
    },
    methods:{
        getPosEngine(){//判断是否为空，不为空首先进行微信支付，然后生成订单
             loginService.startPOS(this.orgId).then(r =>{
                 if(r.flag == 20000){
                     console.log(r)
                     if(r.data.status == "1" || r.data.status == "2" || r.data.status == "3"){
                         Toast("您已经申请了POS机，请不要重复申请")
                     }else{
                         if(this.collectName == "" || this.collectPhone == "" || this.addressInfo == "" || this.anonymity == "1"){
                            Toast("请完善您的信息并同意协议")
                        }else{
                            var newcollectName = this.collectName;
                            var newcollectPhone = this.collectPhone;
                            var newaddressInfo = this.addressInfo;
                            var neworgId = this.orgId;
                            var d = new Date();
                            var ts  = d.getTime();//生成一个时间戳
                            var orderid  = 'live_'+ts;
                            var posCode = '';               
                            var newOrgId = this.orgId;
                            var vm = this;
                            loginService.weixinPay(parseInt(this.money), this.openidData || this.openidVal, orderid).then(r =>{
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
                                                if(res.err_msg == "get_brand_wcpay_request:ok" ) {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                                    loginService.applypos(newcollectName, newcollectPhone, newaddressInfo,orderid).then(r =>{//生成订单
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
                        }
                    }
                 }else{
                     Toast(r.msg)
                 }
             })
            
            
        },
        getStatus(ind){//根据当前ind改变当前订单状态
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
        checkedFn(e){//单选框
            if(e.target.checked){
                this.anonymity = "0"
                $('.choose').addClass('bg')
            }else{
                this.checkVal = false;
                this.anonymity = "1";
                $('.choose').removeClass('bg')
            }
        },
        CheckAgreement(el){//根据当前用户信息，用storage保存本地
            var vm = this;
            storage.setSession('collectName',vm.collectName)
            storage.setSession('collectPhone',vm.collectPhone)
            storage.setSession('addressInfo',vm.addressInfo)
            storage.setSession('openidVal',vm.openidVal || vm.openidData)
            let path = {path: './checkAgreement', query:{orderNo: vm.orderNo}}
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
    mounted(){//页面初始化，根据微信支付把当前地址重定向，获取重定向地址返回的code值
        let lacaUrl = encodeURIComponent(location.href);
        loginService.getAppId().then(r =>{
            this.appId = r.appId
            let code = this.getUrlParam("code");
            if(code !== null){             
                loginService.getOpenId(code).then(r=>{//根据code值传给后台，获取openid
                    this.openidVal = r.openid;
                })
            }else{
              location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+r.appId+"&redirect_uri="+lacaUrl+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
            }            
         })       
    },
    created(){

        let collectName = storage.getSession('collectName'),
            collectPhone = storage.getSession('collectPhone'),
            addressInfo = storage.getSession('addressInfo'),
            openidVal = storage.getSession('openidVal' || 'openidData');
        if(collectName !== null){
            this.collectName = collectName;
        }else{
            this.collectName = "";
        }
        if(collectPhone !== null){
            this.collectPhone = collectPhone;
        }else{
            this.collectPhone = "";
        }
        if(addressInfo !== null){
            this.addressInfo = addressInfo;
        }else{
            this.addressInfo = "";
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
    position: relative;
    background: #1d1d28;
    padding-bottom: ~`px2rem(200)`;
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
    position: fixed;
    bottom: 0;
    left: 0;
    background: -webkit-gradient(linear,0 0,100% 0,from(#2cbb55),to(#2cbb86));
    font-size: ~`px2rem(32)`;
    color: #fff;
    z-index: 99;
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
      width:~`px2rem(32)`;
      height:~`px2rem(32)`;
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
      font-size:~`px2rem(14)`;
      color: #9DA3B4;
      position: absolute;
      left: ~`px2rem(40)`;
      i{
        font-style:normal;
        color:#f5a623;

      }
    }
  }
   .evaNotes{
    width:100%;
    border-radius: 10px;
    overflow: hidden;
    margin-top: ~`px2rem(40)`;
    background: #272734;
    textarea{
      width: 100%;
      height: 100%;
      line-height: ~`px2rem(42)`;
      color: #fff;
      text-indent: .4rem;
       background: #272734;
       outline: none;
       border: none;
       padding: .2rem 0;
    }
  }
  .address{
      width: 100%;
      p{
        margin-left: 15px;
        color: #fff;
        font-size: ~`px2rem(32)`;
        padding: ~`px2rem(30)` 0;
      }      
      textarea{
          display: block;
          background: #272734;
          width:88%;
          padding: 0 2%;
          border-radius: 10px;
          margin: 0 auto;
          border:none;
          padding-top: ~`px2rem(24)`;
          color: #fff;
          font-size: ~`px2rem(24)`;
    }
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


