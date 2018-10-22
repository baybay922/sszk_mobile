<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
@import "../less/functions";
.returnRate{
    position: absolute;
    right: 5%;
    top: 12px;
    color: #E5322E;
    font-size: 13px;
    .fontpoint{
      font-size: 36px;
    }
  }
.popup{
  width: 70%;
  padding: .5rem 0rem 0 0rem;
  border-radius: 4px;
  font-size: 14px;
  padding: .5rem .5rem 0 .5rem;
  line-height: 1.8;
  button{
    width: 100%;
    background: none;
    border-top: 1px solid #DFDFDF;
    color:#2CBB55;
    padding: .2rem 0;
    margin: .2rem 0 0;

  }
}
.conputerBox{
  display: -webkit-box;
  height:100%;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
}
.contact{
  color: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.bottomNav{
  background: #272734;
}
.jssy{
  flex: 0.4;
}
.call{
  background: #F5A623;
  color: #fff;
}
.mkobtn{
  background: -webkit-gradient(linear, 0 0, 100% 0, from(#2CBB55), to(#2CBB86))
}
.productinfo{
  padding-bottom: ~`px2rem(75)`;
  .jsimg{
    width: ~`px2rem(36)`;
    height: ~`px2rem(36)`;
  }
  .infoswipe{
    height: ~`px2rem(469)`;
    width: ~`px2rem(750)`;
    
    img{
      width: 100%;
      height: auto;
    }
  }
  .infobox{
    background-color: #1D1D28;
    position: relative;
    top: ~`px2rem(-20)`;
    border-radius: 15px 15px 0 0;
    .proinfo{
      overflow: hidden;
      position: relative;
      .proname{
        width: 70%;
        font-size: 18px;
        height: auto;
        max-height: ~`px2rem(100)`;
        padding: 0 ~`px2rem(30)`;
        margin:.4rem 0 .4rem 0;
        color:#fff;
        overflow: hidden;
 }
      .slogan{
        font-size: ~`px2rem(24)`;
        padding: 0 ~`px2rem(30)`;
        color: #9DA3B4;
      }
      .productDescInfo{
        
        //background-color: #fff;
       // margin-top: ~`px2rem(20)`;
        .productDescInfoBox{
          //margin-bottom: ~`px2rem(25)`;
          //border-top:~`px2rem(1)` solid #363645;
        }
        .productDescInfotitle{
          margin: ~`px2rem(30)` 0;
          line-height: ~`px2rem(33)`;
          font-size: ~`px2rem(24)`;
          padding-left: ~`px2rem(25)`;
          border-left: 3px solid #FBC700;
          color:#fff;
          font-size: 16px;
        }
        .procont{
          margin: 0 auto;
          color:#9DA3B4;
        }
        // .procont img{
        //   padding: 0 ~`px2rem(25)`;
        // }
      }
      .returnmy{
        width: ~`px2rem(130)`;
        height: 20px;
        border-radius: ~`px2rem(100)`;
        background-color: #fff;
        line-height:20px;
        color:#E5322E;
        text-align: center;
        position: absolute;
        right: 0;
        top: 60px;
        margin-right: ~`px2rem(30)`;
        font-size: ~`px2rem(20)`;
      }
      .label{
        //margin: ~`px2rem(20)` 0;
        padding: ~`px2rem(0)` ~`px2rem(30)` ~`px2rem(0)`;
        word-break: break-all;
        .prolabel{
          // width: ~`px2rem(140)`;
          // height: ~`px2rem(44)`;
          color: #9DA3B4;
          padding: ~`px2rem(.5)` ~`px2rem(20)`;
          border: 1px solid #484855;
          border-radius: ~`px2rem(25)`;
          text-align: center;
          line-height:~`px2rem(44)`;
          margin-right: ~`px2rem(20)`;
          display: inline-block;
        }
      }
      .addinfo{
        height: ~`px2rem(30)`;
        padding: ~`px2rem(0)` ~`px2rem(40)` ~`px2rem(35)` ~`px2rem(30)`;
        color: #9DA3B4;
        margin-top: ~`px2rem(20)`;
      }
      .manageinfo{
        height: ~`px2rem(160)`;
        padding: 0 ~`px2rem(30)`;
        clear: both;
        border-top:1px solid #272734;
        border-bottom:1px solid #272734;;
        padding-top: ~`px2rem(15)`;
        margin-bottom: ~`px2rem(20)`;
        color: #9DA3B4;
        .orglogo{
          width: ~`px2rem(98)`;
          height: ~`px2rem(98)`;
          margin: ~`px2rem(25)` ~`px2rem(20)` ~`px2rem(20)` 0;
        }
        .orgname{
          height: ~`px2rem(70)`;
          font-size: ~`px2rem(28)`;
          line-height: ~`px2rem(55)`;
          color:#fff;
          font-weight: bold;
          margin-top:13px; 
        }
        .orgnum{
          height: ~`px2rem(40)`;
          line-height: ~`px2rem(40)`;
          font-size: ~`px2rem(24)`;
          span{
            color: #FBC700;
          }
        }
        .seemore{
          width: 90px;
          height: 29px;
          line-height: 29px;
          color: #2CBB55;
          border: ~`px2rem(1)` solid #2CBB55;
          border-radius: ~`px2rem(30)`;
          text-align: center;
          margin-top: ~`px2rem(50)`;
        }
      }
      .rate{
        color:#9DA3B4;
        .ddicon{
          width: ~`px2rem(24)`;
          height: ~`px2rem(24)`;
          position: absolute;
          left: 30%;
          top: 1px;
         
        }
        .ratetitle{
          margin: ~`px2rem(30)` 0;
          line-height: ~`px2rem(40)`;
          font-size: ~`px2rem(24)`;
          color: #fff;
          text-indent:~`px2rem(65)`;
          background: url(../images/Calculator/Profit.png) no-repeat 15px center;
          background-size: 0.3rem auto;
          position: relative;
          img{
            margin-right: ~`px2rem(20)`;
            margin-top: 3px;
            width: ~`px2rem(24)`;
            height: ~`px2rem(24)`;
          }
        }
        .ratetable{
          width: ~`px2rem(740)`;
          line-height: ~`px2rem(65)`;
          margin: ~`px2rem(20)` auto 0;
          thead{
            background-color: #272734;
            color: #fff;
          }
          tbody{
            color: #9DA3B4;
          }
          th, td{
            text-indent:~`px2rem(25)`;
          }
          .rightBox{
            padding-right:~`px2rem(25)`;
            text-align:right;
          }
        }
      }
      .colorjin{
        width: 53.3%;
        height: 40px;
        line-height: 40px;
        margin: 15px auto 15px;
        font-size: 14px;
        color: #F5A623;
        border-radius: 100px;
        background-color: #272734;
      }
    }
  }
  // .infobox::after{
  //   content: "";
  //   width: 100%;
  //   height: 166px;
  //   background: -webkit-gradient(linear,0% 100%, 0% 0%,from(rgba(0,0,0,.5)), to(rgba(255,255,255,0)));
  //   position: absolute;
  //   top: -166px;
  //   left: 0;
  // }
  .tabbaricon{
    width: ~`px2rem(36)`;
    height: ~`px2rem(36)`;
    margin-right: ~`px2rem(20)`;
    margin-top: .1rem;
  }
  .mkobtn{
    background-color: #D7000F;
    color: #fff!important;
    font-weight: normal;
  }
}
.Calculator{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  z-index: 999999;
}
.evaluate{
  .evaluate-top{
    display:flex;
    align-items: center;
    justify-content: space-between;
    border-top:~`px2rem(1)` solid #363645;
    p{
      font-size: 12px;
      color: #9DA3B4;
      display: flex;
      align-items: center;
      margin-right: 0.4rem;
      span{
        color: #F5A623;
      }
      img{
        width:0.2rem;
      }
    }
    .ratetitle{
      margin: ~`px2rem(30)` 0;
      line-height: ~`px2rem(40)`;
      font-size: ~`px2rem(24)`;
      color: #fff;
      text-indent:~`px2rem(65)`;
      background: url(../images/Calculator/Profit.png) no-repeat 15px center;
      background-size: 0.3rem auto;
      position: relative;    
    }

  }  
  .evaluate-box{
    height:~`px2rem(220)`;
    display:flex;
    align-items: center;
    justify-content: center;
    background: #272734;
    span{
      font-size: 14px;
      color: #9DA3B4;
      margin-left:~`px2rem(20)`;
    }
  }
  .h-evaluate{
    box-sizing: border-box;
    padding:~`px2rem(30)`;
    display:block;
    height:auto;
    .evaluate-box-title{
      display:flex;
      align-items: center;
      justify-content: space-between;
      dl{
        dt{
          margin-right:~`px2rem(20)`;
          float: left;
          img{
            width:~`px2rem(60)`;
            margin-top: .05rem;
          }
        }
        dd{
          float:right;
          font-size: 15px;
          color: #FFFFFF;
          line-height: ~`px2rem(60)`;
        }
      }
      span{
        font-size: 12px;
        color: #9DA3B4;
      }
    }
    p{
      font-size: 12px;
      color: #9DA3B4;
      margin-top:~`px2rem(20)`;
    }
    .imgbox{
      margin-top: ~`px2rem(30)`;
      display:flex;
      flex-wrap: wrap;
    //   justify-content: space-between;
      div{
         width: 23%;
         margin: 0 ~`px2rem(10)` 0.3rem;
         height: 2rem;   
         display: flex;
         align-items: center;
         overflow: hidden;
         border-radius: ~`px2rem(20)`;
         img{
          max-height: 100%;
          margin-left: 50%;
          transform: translateX(-50%);
        }
      }
    } 
  }
}
.popupbox{
  width:100%;
  text-align: center;
  padding:0;
  color:blue;
  background: transparent;
  position: fixed;
  bottom:0;
  z-index: 22;
  .top{
    background: #fff;
    h6{
      color:#999;
      background: #f6f6f6;
      height: ~`px2rem(90)`;
      line-height: ~`px2rem(90)`;
      font-size:15px;
    }
    p{
      color: #363645;
      height: ~`px2rem(90)`;
      line-height: ~`px2rem(90)`;
      font-size:15px;
      a{
        display: block;
        text-align: center;
        width: 100%;
        height: 100%;
        color: #363645;
      }
    }
    
  }
  button{
    width: 100%;
    border-top: 1px solid #DFDFDF;
    background: #fff;
    font-size: 15px;
    color: #9DA3B4;
    line-height:  ~`px2rem(90)`;
    margin-top:~`px2rem(10)`;
  }
  
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.mark{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left:0;
  opacity: 0.8;
  background: #1D1D28;
  z-index: 1;
}
#name{
  line-height:1.3;
  overflow: hidden;
  text-overflow:ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
<template>
  <div class="productinfo">
    <div class="infoswipe">
      <mt-swipe :auto="0" :defaultIndex="defaultIndex">
        <mt-swipe-item v-for="(item,index) in productinfo.resources" v-if="item.url !== ''" :key="index">
          <video
          width="100%"
          height="100%"
          v-bind:src="item.url"
          controls="controls"
          playsinline="true"
          x-webkit-airplay="allow"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          style="object-fit:fill"
          v-if="item.resourceType == 2">
          您的浏览器不支持 video 标签。
          </video>
          <img v-bind:src="item.url" width="100%" height="100%" v-if="item.resourceType == 1">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="infobox">
      <div class="proinfo">
        <div class="proname" id="proname">{{ productinfo.productName }}</div>
        <span class="returnRate" v-if="typeObject"><span class="fontpoint">{{parseInt(returnRateNum.split('%',1)[0]) + parseInt(groupBuyingRate.split('%',1)[0]) }}</span>%</span>
        <span class="returnRate" v-else><span class="fontpoint">{{parseInt(100) - parseInt(returnRateNum.split('%',1)[0])}}</span>%</span>
        <div class="returnmy">分成收益</div><div class="slogan">{{ productinfo.slogan }}</div>
        <div class="label">
          <span v-for="(item,index) in productinfo.labelList" class="prolabel" @click="toproductlist(item)" :key="index">{{ item }}</span>
        </div>
        <div class="addinfo">
          <span class="fl">
            <span v-if="productinfo.productPlace == 'null' "></span>
            <span v-else>机构：{{ productinfo.productPlace }}</span>
            <span style="margin-left:15px;" v-if="productinfo.productDoctor == 'null' "></span>
            <span style="margin-left:15px;" v-else>专家：{{ productinfo.productDoctor }}</span>

          </span>
        </div>
        <div class="manageinfo">
          <img v-bind:src="productinfo.orgLogo" class="orglogo fl">
          <span class="seemore fr" @click="tominfo">了解更多</span>
          <!-- <span class="seemore fr" v-else>了解更多</span> -->
          
          <p class="orgname" id="name">{{ productinfo.orgName}}</p>
          <p class="orgnum">信用分 <span>{{ productinfo.creditRate }}</span> | 月售 <span>{{ productinfo.sellNum }}</span> 单</p>
        </div>
        <div class="rate">
           <p class="ratetitle">
            订单收益详情
            <img src="../images/Calculator/Profit2.png" class="ddicon" @click="popupVisible = !popupVisible">
          </p>
          <table class="ratetable">
            <thead>
              <tr>
                <th>收益名称</th>
                <th class="rightBox">收益明细</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>佣金收益</td>
                <td class="rightBox">{{ productinfo.returnRate }}</td>
              </tr>
              <tr>
                <td>成单领奖励活动</td>
                <td class="rightBox">{{ productinfo.groupBuyingRate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="talignc colorjin" @click="togetmoney(productinfo.returnRate, productinfo.marginReturnRate, productinfo.groupBuyingRate)">点此输入预售金额计算收益</p>
        <div class="evaluate">
          <div class="evaluate-top">
            <p class="ratetitle">
              评价
            </p>
            <p @click="goEvaluateList()">
              全部评价（<span>{{evaluationNum}}</span>）
              <img src="../images/moreinfo.png" alt="">
            </p>
          </div>
          <div class="evaluate-box" v-if="show">
            <img src="../images/nothing.png" alt="">
            <span>暂无评价</span>
          </div>
          <div class="evaluate-box h-evaluate" v-else>
            <div class="evaluate-box-title">
              <dl>
                <dt><img src="../images/linkimgc.png" alt=""></dt>
                <dd>{{anonymity == "0" ? "匿名用户" :evaUserName}}</dd>
              </dl>
              <span>{{timeDate}}</span>
            </div>
            <p v-if="evaNotes">{{evaNotes}}</p>
            <div class="imgbox"> 
              <div v-for="item in imgUrl" :key="item">
                <img :src="item" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="productDescInfo">
          <div v-for="(item,index) in productinfo.productDescInfo" class="productDescInfoBox" :key="index">
            <p class="productDescInfotitle">{{ item.title }}</p>
            <div v-html="item.content" class="procont"></div>
          </div>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade" class="popup">
      <span style="visibility:hidden">多加</span>  顾客付款完毕后，平台将根据订单总利润（订单总金额减去供应商成本）和收益百分比计算您的收益，并按照账期时间（T+10）打到您的平台账户。T为供应商确认分账的日期，T后面的数字即为到账天数。T+10指的是供应商确认分账当日起10天后到账。
      <button class="closeBtn" @click="closeProfit"> 我知道了</button>
    </mt-popup>
   <div @click="hideCalcuator">
      <Calculator class="Calculator" :returnRate="returnRate" :marginReturnRate="marginReturnRate" :groupBuyingRate="groupBuyingRate"></Calculator>
    </div>
    <mt-tabbar class="bottomNav" fixed v-model="selected" v-if="typeObject">
      <mt-tab-item id="jssy" class="jssy">
        <span class="conputerBox"><img slot="icon" class="jsimg" src="../images/computer.png" @click="togetmoney(productinfo.returnRate, productinfo.marginReturnRate, productinfo.groupBuyingRate)"></span>
      </mt-tab-item>
      <mt-tab-item id="call" class="call">
        <span style="width:100%;height:100%;display:block;" @click="callkf" class="contact">立即咨询</span>
      </mt-tab-item>
      <mt-tab-item id="order" class="mkobtn">
        <span style="width:100%;height:100%;display:block;" @click="mkorder">创建订单</span>
      </mt-tab-item>
    </mt-tabbar>


    <!-- <mt-popup
      v-model="DivVisible"  
      position="bottom"
      popup-transition="popup-fade" class="popup">
      <div class="top">
        <h6>请选择咨询方…</h6>
        <p @click="toSevice()">平台客服</p>
        <p v-if="supplierType == 'P'"  @click="contactD()">医院/机构</p>
        <p v-else @click="contactD()">医生</p>
      </div>-->
    <transition name="fade">
      <div class="popupbox"  v-if="markShow"  >
        <div class="top">
          <h6>请选择咨询方式</h6>
          <p style="online">
            <a href="tel:4001116369">客服电话</a>
          </p>
          <p @click="toSevice()">线上客服</p>
          <p v-if="supplierType == 'P'"  @click="contactD()" class="contactBox">医院/机构</p>
          <p v-else @click="contactD()" class="contactBox">医生</p>
        </div>
        <button @click="markShow = false">取消</button>
      </div>
    </transition>
    <div class="mark" v-if="markShow" @click="markShow = false"></div>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast,MessageBox} from 'mint-ui'
import $ from 'jquery'
import Calculator from './getmoney'
export default {
  name: 'productinfo',
  data () {
    return {
      defaultIndex:0,
      typeObject:true,
      popupVisible: false,
      searchwords: '',
      selected: '',
      productid: this.$route.query.productId,
      productinfo: {},
      returnRateNum: '',
      groupBuyingRate: '',
      userinfo: {},
      type:this.$route.query.type,
      returnRate:"",
      marginReturnRate:"",
      groupBuyingRate:"",
      show:true,
      evaluationNum:0,
      imgUrl:[],
      evaluatData:[],
      timeDate:"",
      anonymity:"",
      evaNotes:"",
      evaUserName:"",
      stop:true,
      calledPhone:"",
      hrefUrl:"",
      supplierType:"",
      markShow:false,
      confirmPhone:"0",
      loginName:"",
      orgType:"",
      name:''
    }
  },
  filters: {
  },
  methods: {
    toSevice(){
      $.ajax({
        url:'https://activity.dogotsn.com/pay/sendTemMsg.php',
        headers: {
            Accept: "Access-Control-Allow-Origin"
        },
        type:'post',
        dataType: "json",
        data:{
          "name": this.name,
          "tel": this.loginName
        },
        success:function(res){
          console.log(res);
          window.NTKF.im_openInPageChat();
        },
        error:function(res){
          console.log(res+"----");
          window.NTKF.im_openInPageChat();
        }
      })
      window.NTKF.im_openInPageChat();
    },
    hideCalcuator(){      
      $(".Calculator").hide();
    },
    closeProfit(){
      this.popupVisible = false;
    },
    getUserInfo() {
      loginService.getUserInfo().then(r => {
        if (r.flag == 20000) {
          this.userinfo = r.data; 
          this.loginName = r.data.loginName;
          this.name = r.data.name;
          this.XnInfo();     
          this.orgType = r.data.orgType;
        } else if(r.flag !== 50001) {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    goEvaluateList(){
     if(this.evaluationNum != 0){
        this.$router.push({
          name:"evaluateList",
          params:{
            data:this.evaluatData
          }
        })
      }     
    },
    XnInfo() {
      window.NTKF_PARAM = {
        siteid:"kf_10138",//企业ID，为固定值，【必填 】。–此id在开站完毕后，小能实施人员给贵公司发送的邮件中获取–
        settingid:"kf_10138_1517562477133",//接待组id(客服组id)【必填】–此id在开站完毕后，登陆贵公司的小能客户端，进入设置界面-配置管理-接待组中即可获取–
        uid:this.userinfo.loginName,//用户Id，未登录可以为空，但是不能给null。–此参数来自贵公司传递给小能的参数值–
        uname:this.userinfo.name,//用户名，未登录可以为空，但是不能给null，uname赋予的值显示到小能客户端。–此参数来自用户传递给小能的参数值–
    
        isvip:"0",//是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端上
        userlevel:"0",//站自定义会员级别，1-N，可根据选择判断，取值显示到小能客户端
        erpparam:"",//erpparam为erp功能的扩展字段，可选，购买erp功能后
        itemid:this.productid,//商品ID，商品详情页面用于展示商品的调用参数。
        itemparam:'userNo:'+ this.userinfo.userNo,//商品详情页面的拓展参数，一般用于区分不同设备的拓展参数
      }
    },
    callkf() {
      this.markShow = true;
    },
    toproductlist(label) {
      this.$router.push({path: '/productlist', query: {label: label}})
    },
    tominfo() {
      let path = {path: '/minfo', query:{orgId: this.productinfo.orgId,type:this.type}}
      this.$router.push(path)
    },
    mkorder() {
      loginService.havebank().then(r=>{
        if(r.flag == 20000){
          loginService.createOrderNo(this.productid).then(r=>{
            if(r.flag == 20000){
              let path = {path: '/userInfo',query:{productId: this.productinfo.productId,orgId: this.productinfo.orgId,orderNo:r.data}}
              this.$router.push(path)
            }
          })
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
                  if(this.orgType == 'C' || this.supplierType == "D"){
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
        }
      })
      
      
    },
    togetmoney(returnRate, marginReturnRate, groupBuyingRate) {
      $(".Calculator").show();
      $("#computing").focus()
      this.returnRate = returnRate;
      this.marginReturnRate = marginReturnRate;
      this.groupBuyingRate = groupBuyingRate;
    },
    formatDate(timestamp){
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '年';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
        let D = (date.getDate() < 10 ? "0" + date.getDate() + "日": date.getDate() + '日');
        return Y+M+D;
    },
    getDetail() {
      loginService.getProductInfo(this.productid,this.type).then(r => {
        if (r.flag == 20000) {
          this.productinfo = r.data
          this.calledPhone = r.data.phone;
          //this.supplierType = r.date.supplierType;
          this.returnRateNum = this.productinfo.returnRate
          this.groupBuyingRate = this.productinfo.groupBuyingRate;
          this.supplierType = r.data.supplierType;
          console.log(this.supplierType,'医生或机构--------')
          this.$nextTick(function() {
            $('.procont').find('h2').css({
              'font-size':'12px',
              'width':'95%',
              'display':'block',
              'margin':'0 auto 15px'
            })
          $(".procont p").css({
            'width':"95%",
            "margin":"0 auto"
          })

          $(".procont p").find('img').css({
            "width":"105%",
            'height':'auto',
            "display":"block",
            "margin-left":"-2.5%",
          })
            var imgsObj = $('.infoswipe').find('img');
            var imgs = new Array();  
            for(var i = 0; i < imgsObj.length; i++){  
                imgs.push(imgsObj.eq(i).attr('src'));  
            }  
              imgsObj.on('click',function(){  
                  WeixinJSBridge.invoke('imagePreview', {  
                  'current': $(this).attr('src'),  
                  'urls': imgs  
              });  
            }); 
          })
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })

      //获取评价列表数据
      loginService.getEvaluate(this.productid).then( r =>{
          if(r.data.length>0){
            this.evaluatData = r.data;
            this.evaluationNum = r.data.length;
            this.imgUrl = r.data[0].imgs
            this.anonymity = r.data[0].anonymity
            this.show = false;
            this.evaNotes = r.data[0].evaNotes;
            this.evaUserName = r.data[0].evaUserName
            this.timeDate = this.formatDate(r.data[0].createtime)
          }else{
            this.evaluationNum = 0;
            this.show = true;
          }
      })
    },
    getCall(value){
      if(value){
        this.confirmPhone = value
      }
      loginService.toCall(this.calledPhone,this.confirmPhone).then( res => {
        if(res.flag == 20000){
          this.hrefUrl = 'tel:' + res.data;
          let DomA=document.createElement('a');
          DomA.setAttribute('href',this.hrefUrl);
          DomA.click()
          let parentBox  = document.getElementsByClassName('contactBox')[0];
          parentBox.appendChild(DomA);
          this.markShow = false;
        }else{
          Toast(res.msg)
        }
      })
    },
    contactD(){
      MessageBox.confirm("",{
        message:"请确认您的手机号码<br/><span style='color: #2CBB55;'>" + this.loginName + "</span><br/><small>该号码将被加密保护</small>",
        cancelButtonText:"修改手机号",
        confirmButtonText:"确认并呼叫"
      }).then(action => {
        if(action == 'confirm'){
          this.getCall()
        }
      }).catch( err => {
        if(err == 'cancel'){
          MessageBox.prompt("",{
            title:"请输入您的手机号",
            message:"我们将对此号码加密保护"
          }).then(({ value, action }) => {
            if(action=='confirm'){
              this.getCall(value);
            }
          }).catch( err => {
            if(err == 'cancel'){
              this.markShow = false;
            }
          });
        }
      });    
    }
  },
  watch: {

  },
  mounted(){
    this.getDetail()
    this.getUserInfo()
    $("call a").css({
      "color": "#fff"
    })
    if(this.type == "m"){
      this.typeObject = true;
      $(".bottomNav").show();
      $(".rate").show();
      $(".talignc").show();
      $(".evaluate-top").css({
        "border-top":"none"
      })
    }else{
      $(".bottomNav").hide();
      $(".rate").hide();
      $(".talignc").hide();
      this.typeObject = false;
      $(".productinfo").css({
        "padding-bottom":"0"
      })
    }

    this.$nextTick(function() {
      var imgsObj = $('.imgbox').find('img');
      var imgs = new Array();  
      for(var i = 0; i < imgsObj.length; i++){  
          imgs.push(imgsObj.eq(i).attr('src'));  
      }  
        imgsObj.on('click',function(){  
            WeixinJSBridge.invoke('imagePreview', {  
            'current': $(this).attr('src'),  
            'urls': imgs  
        });  
      }); 
    })
  },
  components:{
    Calculator
  }
  
}
</script>