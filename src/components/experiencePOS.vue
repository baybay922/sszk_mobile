<template>
  <div class="course-wrapper" v-if="status == 0">
      <div class="course-promit">
        <a style="visibility:hidden;">多加</a>为了方便您更全面地了解POS机刷卡与分账的流程，您将体验整个交易过程，并了解资金的流向，其中顾客刷卡环节需要您模拟顾客身份刷卡，款项最终将回到您自己的账户。
      </div>
      <div class="course-title">
          交易体验过程
      </div>
      <ul class="course-container">
          <li>
            <div class="course-img"></div>
            <div class="course-explain">
                <p class="state-title">顾客付款</p>
                <p class="state-content">需要您自己刷POS机，所付款项最终将回到您自己的账户</p>
            </div>
          </li>
          <li>
            <div class="course-img"></div>
            <div class="course-explain">
                <p class="state-title">供应商收款</p>
                <p class="state-content">刷卡后您的账户将收到50%的订单分成</p>
            </div>
          </li>
          <li>
            <div class="course-img"></div>
            <div class="course-explain">
                <p class="state-title">供应商确认分账</p>
                <p class="state-content">支持输入手术成本，手术成本不计入分成金额</p>
            </div>
          </li>
          <li>
            <div class="course-img"></div>
            <div class="course-explain">
                <p class="state-title">渠道商收款</p>
                <p class="state-content">渠道商将收到50%的分成</p>
            </div>
          </li>
          <li>
            <div class="course-img last"></div>
            <div class="course-explain">
                <p class="state-title">体验结束</p>
            </div>
          </li>
      </ul>
      <button class="begin-btn" @click="beginexpreience">开始体验</button>
  </div>
  <div class="payment-wrapper" v-else-if="status == 2">
      <dl class="product-wrapper">
          <dt>
              <img src="../images/exprience.png" alt="">
              <img class="Recommend" src="../images/index/Recommend.png" alt="">
          </dt>
          <dd>
              <p>多加体验产品</p>
              <p>渠道商分成: 50%</p>
              <p>订单号:{{orderNo}}</p>
          </dd>
      </dl>
    <div class="wait-wrapper">
        <img src="../images/waitimg.png" alt="">
        <p class="wait-title">等待顾客付款</p>
        <p class="wait-content">所付款项最终将回到您自己的账户</p>
    </div>
    <div class="megBox">
        <p>
            <span>
                您尚未支付</br>请使用POS机支付体验订单
            </span>
        </p>
    </div>
    <div class="wait-footer">
        <p>我们已经为您创建一份虚拟订单，请您<span>使用POS机</span>体验顾客刷卡流程，体验刷卡过程中将扣除渠道商<span>0.6%</span>的手续费，正式交易中不会扣手续费</p>
        <button class="alreadyBtn" @click="alreadyPaid">我已付款</button>
        <button class="abandonBtn" @click="abandonexpreience">放弃体验</button>
    </div>
  </div>
  <div class="division-wrapper" v-else-if="status == 3 || status == 4">
       <div class="wait-wrapper">
            <img src="../images/already.png" alt="">
            <p class="wait-title">顾客已付款，请您及时确认分账</p>
            <p class="wait-content">您的订单分成将在1个工作日后到达您的银行卡</p>
        </div>
        <div class="wait-footer">
            <p>确认分账后，渠道商将收到分成（体验过程中渠道商为模拟账号，款项将回到您自己的账户）</p>
            <button class="alreadyBtn" @click="directAccountsDivision">直接分账</button>
            <button class="reduceCost" @click="reduceCostDivision">减去成本后分账</button>
            <button class="abandonBtn" @click="abandonexpreience">放弃体验</button>
        </div>
  </div>
  <div class="payee-wrapper" v-else-if="status == 5">
      <div class="wait-wrapper">
            <img src="../images/waitimg.png" alt="">
            <p class="wait-title">渠道商等待收款</p>
            <p class="wait-content">订单分成将在1个工作日后到达您的银行卡</p>
        </div>
        <div class="wait-footer">
            <button class="alreadyBtn" @click="experienceSummary">本次体验总结</button>
        </div>
  </div>
  <div class="reach-wrapper" v-else-if="status == 6">
      <div class="reach-title">
          测试金额将在<span>1个工作日后</span>到达您的银行卡
      </div>
      <div class="stream-content">
          <div class="stream-title">订单流水</div>
          <ul>
              <li>
                  <p>顾客付款总金额</p>
                  <p>￥{{totalprice}}</p>
              </li>
              <li>
                  <p>顾客付款后您收到的分成金额</p>
                  <p>￥{{returnPrice}}</p>
              </li>
              <li>
                  <p>不参与分账的金额</p>
                  <p>￥{{costPrice}}</p>
              </li>
              <li>
                  <p>确认分账后补收差额</p>
                  <p>￥{{difference}}</p>
              </li>
              <li>
                  <p>渠道商收到的分成金额</p>
                  <p>￥{{agentPrice}}</p>
              </li>
              <li>
                  <p>刷卡手续费</p>
                  <p>{{poundage}}</p>
              </li>
          </ul>
      </div>
      <div class="stream-content" style="border:none;">
          <div class="stream-title">订单收益汇总</div>
          <ul>
              <li>
                  <p>供应商订单总收益</p>
                  <p>￥{{supplierTotalPrice}}</p>
              </li>
              <li>
                  <p>渠道商订单总收益</p>
                  <p>￥{{agentTotalPrice}}</p>
              </li>
          </ul>
      </div>
      <div class="wait-footer">
            <button class="alreadyBtn" @click="abandonexpreience">体验完毕</button>
        </div>
  </div>
</template>
<script>
import {loginService} from "../services/login";
import {Toast, MessageBox} from 'mint-ui';
import $ from 'jquery'
export default {
  name: 'getmoney',
  data () {
    return {
        status: '',
        orderNo:'',
        totalprice:0,
        returnPrice:0,
        costPrice:0,
        difference:0,
        agentPrice:0,
        supplierTotalPrice:0,
        agentTotalPrice:0,
        poundage:0,
    }
  },
  methods: {
    changTitle(){//根绝当前状态，改变title
        if(this.status == 0){
           document.title = "交易过程体验" 
        }else if(this.status ==2){
            document.title = "等待顾客付款" 
        }else if(this.status ==3 || this.status ==4){
            document.title = "确认分账" 
        }else if(this.status ==5){
            document.title = "渠道商等待收款" 
        }else if(this.status ==6){
            document.title = "体验总结" 
        }
    },
    beginexpreience(){//开始体验
        loginService.fictitiouscreate().then((r)=>{
            console.log(r)
            if(r.flag == 20000){
                location.reload();
            }else{
                Toast(r.msg)
            }
        })
    },
    alreadyPaid(){//我已付款按钮接口
        loginService.fictitiouspay().then((r)=>{
            if(r.flag == 20000){
                location.reload();
            }else if(r.flag == 50000){
                $(".megBox").animate({
                    "opacity":1,
                    "z-index":99
                },300)
                setTimeout(()=>{
                    $(".megBox").animate({
                        "opacity":0,
                        "z-index":-99
                    },300)
                },3000)
            }else{
                Toast(r.msg)
            }
        })
    },
    directAccountsDivision(){//直接分账按钮接口
        loginService.fictitiousdivision(this.orderNo, 0).then((r)=>{
            if(r.flag == 20000){
                location.reload();
            }else{
                Toast(r.msg)
            }
        })
    },
    reduceCostDivision(){//减去成本分账按钮接口
        let path = {path:"/divisionAccounts",query:{orderNo:this.orderNo,type:'e'}}
            this.$router.push(path)
    },
    experienceSummary(){//体验总结
        loginService.fictitiousend().then((r)=>{
            if(r.flag == 20000){
                location.reload();
            }else{
                Toast(r.msg)
            }
        })
    },
    abandonexpreience(){//体验完毕、放弃体验
        loginService.fictitious().then((r)=>{
            let path = {path:"/mine",query:{}}
                this.$router.push(path)
        })
    }
  },
  mounted(){
    
    loginService.fictitiousquery().then((r)=>{
        if(r.flag == 20000){
            console.log(r)
            this.status = r.data.status;
            this.orderNo = r.data.orderNo;
            this.totalprice = r.data.totalPrice
            this.returnPrice = r.data.rerurnPrice
            this.costPrice = r.data.costPrice
            this.difference = r.data.difference
            this.agentPrice = r.data.agentPrice
            this.supplierTotalPrice = r.data.supplierTotalPrice
            this.agentTotalPrice = r.data.agentTotalPrice
            this.poundage = r.data.poundage
            this.changTitle();
        }
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
body,html,#app{
    overflow-x: hidden!important;
}
.course-wrapper{
    width: 100%;
    height: 100%;
    background: #1d1d28;
    overflow-y: auto;
    .course-promit{
        width: ~`px2rem(690)`;
        padding:~`px2rem(30)`;
        background: #272734;
        margin: 0 auto;
        color: #9DA3B4;
        font-size: ~`px2rem(30)`;
    }
    .course-title{
        width: 100%;
        height: ~`px2rem(104)`;
        line-height: ~`px2rem(104)`;
        font-size: ~`px2rem(26)`;
        color: #fff;
        background: url("../images/transaction.png") no-repeat ~`px2rem(30)`center;
        background-size: ~`px2rem(24)`;
        text-indent: ~`px2rem(60)`;
        border-bottom: ~`px2rem(1)` solid #363645;
    }
    .course-container{
        width: ~`px2rem(690)`;
        height: auto;
        margin: 0 auto;
        color: #fff;
        margin-top: ~`px2rem(30)`;
        
        li{
            width: 100%;
            height: auto;
            display: -webkit-box;
            padding-bottom: ~`px2rem(30)`;
        }
    }
    .course-img{
        width: ~`px2rem(22)`;
        height: ~`px2rem(22)`;
        background: #9DA3B4;
        position: relative;
        border-radius: 100%;
        margin-top: 5px;
    }
    .course-img::after{
        content: "";
        width: 4px;
        height: 4px;
        display:block;
        background: #1D1D28;
        position: absolute;
        top:  3.5px;
        left:  3.5px;
        border-radius: 100%;
    }
    .course-img::before{
        content: "";
        width: ~`px2rem(1)`;
        height: ~`px2rem(100)`;
        display:block;
        background: #363645;
        position: absolute;
        top: ~`px2rem(22)`;
        left: 5px;
    }
}
.course-explain{
    margin-left: ~`px2rem(30)`;
}
.state-title{
    font-size: ~`px2rem(24)`;
    color: #fff;
    margin-bottom: 5px;
}
.state-content{
    color: #9DA3B4;
    font-size: ~`px2rem(24)`;
}
.last:before{
    width: 0!important;
    height: 0!important;
}
.begin-btn{
    width: 100%;
    height: ~`px2rem(100)`;
    line-height: ~`px2rem(100)`;
    text-align: center;
    color: #fff;
    font-size: ~`px2rem(34)`;
    position: absolute;
    bottom: 0;
    left: 0;
    outline: none;
    border: none;
    background: -webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
}
.payment-wrapper{
    width: 100%;
    height:100%;
    overflow-x: hidden;
}
.product-wrapper{
    width: ~`px2rem(690)`;
    display: -webkit-box;
    padding: ~`px2rem(30)`;
    border-bottom: ~`px2rem(1)` solid #363645;
    dt{
        width: ~`px2rem(160)`;
        height: ~`px2rem(160)`;
        border-radius: 10px;
        overflow: hidden;
        margin-right: ~`px2rem(30)`;
        position: relative;
        img{
            width: 100%;
            height: auto;
        }
        .Recommend{
            width: ~`px2rem(128)`;
            height: ~`px2rem(42)`;
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
    dd{
        width: 100%;
        margin-top: 5px;
        p{
            color: #9DA3B4;
            font-size: ~`px2rem(26)`;
            margin-bottom: ~`px2rem(14)`;
        }
    }
}
.wait-wrapper{
    width: 100%;
    height: auto;
    overflow-y: hidden;
    img{
        width: ~`px2rem(160)`;
        height: ~`px2rem(160)`;
        display: block;
        margin: ~`px2rem(120)` auto 0;
    }
    .wait-title{
        text-align: center;
        color: #fff;
        font-size: ~`px2rem(30)`;
        margin: ~`px2rem(34)` 0 0 ~`px2rem(16)`;
    }
    .wait-content{
        text-align: center;
        color: #9DA3B4;
        font-size: ~`px2rem(26)`;
    }
}
.wait-footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    p{
        width: ~`px2rem(690)`;
        margin: 0 auto ~`px2rem(30)`;
        color: #9DA3B4;
        font-size: ~`px2rem(24)`;
        span{
            color: #FBC700;
        }
    }
    .alreadyBtn{
        width: 100%;
        height: ~`px2rem(100)`;
        line-height: ~`px2rem(100)`;
        text-align: center;
        color: #fff;
        font-size: ~`px2rem(34)`;
        outline: none;
        border: none;
        background: -webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
    }
    .reduceCost{
        width: 100%;
        height: ~`px2rem(100)`;
        line-height: ~`px2rem(100)`;
        text-align: center;
        color: #2CBB55;
        font-size: ~`px2rem(34)`;
        background:#272734;
        border-bottom:~`px2rem(1)` solid #363645;
    }
    .abandonBtn{
        width: 100%;
        height: ~`px2rem(100)`;
        line-height: ~`px2rem(100)`;
        text-align: center;
        color: #9DA3B4;
        font-size: ~`px2rem(34)`;
        background:#272734;
    }
}
.division-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.reach-wrapper{
    width: 100%;
    height: 100%;
    .reach-title{
        width: 100%;
        height: ~`px2rem(100)`;
        line-height: ~`px2rem(100)`;
        font-size: ~`px2rem(30)`;
        color: #9DA3B4;
        background: #272734;
        text-indent: ~`px2rem(30)`;
        span{
            color: #FBC700;
        }
    }
}
.stream-content{
    width: 100%;
    margin: 0 auto;
    border-bottom: ~`px2rem(1)` solid #363645;
    .stream-title{
        width: ~`px2rem(690)`;
        margin: 0 auto;
        height: ~`px2rem(100)`;
        line-height: ~`px2rem(100)`;
        color: #fff;
        font-size: ~`px2rem(26)`;
        text-indent: ~`px2rem(20)`;
        position: relative;
        border-bottom:~`px2rem(1)` solid #363645;
    }
    .stream-title:after{
        content:"";
        width: ~`px2rem(8)`;
        height: ~`px2rem(30)`;
        border-radius: 10px;
        background: #FBC700;
        display: block;
        position: absolute;
        top:50%;
        margin-top: ~`px2rem(-15)`;
    }
    ul{
        width: ~`px2rem(690)`;
        margin:0 auto;
        padding: ~`px2rem(20)` 0;
        li{
            display: -webkit-flex;
            justify-content: space-between;
            line-height: ~`px2rem(60)`;
            p{
                color: #9DA3B4;
                font-size: ~`px2rem(26)`;
            }
            :last-child{
                color: #fff;
            }
        }
    }
}
.megBox{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    position: fixed;
    top:0;
    left: 0;
    z-index: -99;
    opacity: 0;
    p{
        width: ~`px2rem(540)`;
        height: ~`px2rem(240)`;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: ~`px2rem(-120)`;;
        margin-left: ~`px2rem(-270)`;
        background: #fff;
        border-radius: 10px;
        span{
            display: block;
            margin: ~`px2rem(68)` auto 0;
            text-align: center;
            font-size: ~`px2rem(34)`;
            color: #030303;
        }
    }

}
</style>
