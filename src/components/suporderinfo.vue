<template>
  <div class="agentorderinfo">
    <div class="manageinfo mt30" @click="toproduct">
      <dl>
        <dd>
          <img v-bind:src="orderinfo.showUrl" />
        </dd>
        <dt>
          <h3>{{ orderinfo.orderName }}</h3>
          <p>
            <span v-if="orderinfo.productPlace == 'null'"></span><span v-else> {{orderinfo.productPlace}}</span>
            <span v-if="orderinfo.productDoctor == 'null' "></span><span v-else> {{ orderinfo.productDoctor }}专家</span>
          </p>
        </dt>
      </dl>
    </div>
    <div class="orderInfo-container">
      <h2 class="order-title">订单信息</h2>
      <ul class="order-content">
        <li>
          <p>订单号<span>多</span></p>
          <!-- <p v-if="this.orderinfo.isContract == 1">合同签订后显示</p> -->
          <p>{{ orderinfo.orderNo }}</p>
        </li>
        <li>
          <p>总金额<span>多</span></p>
          <p>¥ {{ orderinfo.totalPrice }}</p>
        </li>
        <li>
          <p>订单分成</p>
          <p>{{orderinfo.returnRate}}</p>
        </li>
        <li>
          <p>收益到账</p>
          <p>T+0</p>
        </li>
      </ul>
    </div>
    <div class="statesbox">
      <!-- 已完成进度 -->
      <div class="state" v-for="(item,index) in orderinfo.orderLogInfoList">
        <div class="time" v-bind:class="{ now: ((item.afterSupplierStatus == orderinfo.supplierBusiStatus && item.displayMark == 1) || (item.afterSupplierStatus == orderinfo.supplierBusiStatus && orderinfo.supplierBusiStatus !== 7 && orderinfo.agentBusiStatus == 6 )) && orderinfo.frzStatus !== 1}"  v-if="item.afterStatus!== 9">{{ item.createMDtime }}<br>{{ item.createHMtime }}</div>
        <div class="time" style="color:#E5322E" v-bind:class="{ now: item.afterStatus == orderinfo.supplierBusiStatus && orderinfo.frzStatus !== 1}" v-else>{{ item.createMDtime }}<br>{{ item.createHMtime }}</div>

        <div class="stateicon" v-bind:class="{statenone: ((item.afterSupplierStatus == orderinfo.supplierBusiStatus && item.displayMark == 1) || (item.afterSupplierStatus == orderinfo.supplierBusiStatus && orderinfo.supplierBusiStatus !== 7 && orderinfo.agentBusiStatus == 6 )) && orderinfo.frzStatus !== 1 && item.afterSupplierStatus!== 7 && item.afterSupplierStatus !== 9}" v-if="((item.afterSupplierStatus == orderinfo.supplierBusiStatus && item.displayMark == 1) || (item.afterSupplierStatus == orderinfo.supplierBusiStatus && orderinfo.supplierBusiStatus !== 7 && orderinfo.agentBusiStatus == 6 )) && orderinfo.frzStatus !== 1 && item.afterSupplierStatus !== 9" ><img src="../images/statenow.png"></div>
        <div class="stateicon" v-else-if="item.afterSupplierStatus == 9"><img src="../images/frzicon.png"></div>
        <div class="stateicon statedone" v-else><img src="../images/statedone.png"></div>

        <div class="stateinfo" v-bind:class="{ now: ((item.afterSupplierStatus == orderinfo.supplierBusiStatus && item.displayMark == 1) || (item.afterSupplierStatus == orderinfo.supplierBusiStatus && orderinfo.supplierBusiStatus !== 7 && orderinfo.agentBusiStatus == 6 )) && orderinfo.frzStatus !== 1}" v-html="getstatemsg(item.afterSupplierStatus)">创建订单</div>
      </div>
      <!-- 已完成进度end -->
      <!-- 冻结 -->
      <div class="state" v-if="orderinfo.frzStatus == 1" style="margin-left:16px;">
        <div class="frztime">{{ orderinfo.frzMDtime }}<br>{{ orderinfo.frzYHtime }}</div>
        <div class="stateicon statenone"><img src="../images/frzicon.png"></div>
        <div class="stateinfo">
          <li class="lifrz">冻结</li>
          <li class="lifrz">如对订单有疑问，请致电客服</li>
        </div>
      </div>
      <!-- 冻结end -->
      <!-- 未完成进度 -->
      <div class="state" v-if="this.orderinfo.supplierBusiStatus <= 2 && this.orderinfo.supplierBusiStatus !== 1">
        <div class="time"></div>
        <div class="stateicon statenone"><img src="../images/statenone.png"></div>
        <div class="stateinfo">
          <li class="linone">顾客付款</li>
          <li class="linone">请在POS机中根据订单号选择订单，在修改金额后让顾客付款</li>
        </div>
      </div> <!-- ['0-初始;2-预定产品;3-顾客付款;4-收款;5-确认分账;6-渠道商收款;7-评价;9-取消;1-完成'] -->
       <div class="state" v-if="this.orderinfo.supplierBusiStatus <= 3 && this.orderinfo.supplierBusiStatus !== 1">
        <div class="time"></div>
        <div class="stateicon statenone"><img src="../images/statenone.png"></div>
        <div class="stateinfo">
          <li class="linone">收款</li>
          <li class="linone">平台确认收款之后会在24小时内为您打款，请您耐心等待</li>
        </div>
      </div>
      <div class="state" v-if="this.orderinfo.supplierBusiStatus <= 4 && this.orderinfo.supplierBusiStatus !== 1">
        <div class="time"></div>
        <div class="stateicon statenone"><img src="../images/statenone.png"></div>
        <div class="stateinfo">
          <li class="linone">确认分账</li>
          <li class="linone">早一些确认分账吧，您的渠道商还在苦苦等待着</li>
        </div>
      </div>
     <div class="state" v-if="this.orderinfo.supplierBusiStatus <= 5 && this.orderinfo.supplierBusiStatus !== 1">
        <div class="time"></div>
        <div class="stateicon statenone"><img src="../images/statenone.png"></div>
        <div class="stateinfo">
          <li class="linone">渠道商已收款</li>
          <li class="linone">您的渠道商将会在您确认分账10天后收到分成款项</li>
        </div>
      </div>
      <div class="state" v-if="this.orderinfo.supplierBusiStatus <= 6 && this.orderinfo.supplierBusiStatus !== 1">
        <div class="time"></div>
        <div class="stateicon"><img src="../images/statenone.png"></div>
        <div class="stateinfo">
          <li class="linone">评价</li>
          <li class="linone">请您对本次订单给予评价，对您的配合我们非常感谢</li>
        </div>
      </div>
      <!-- 未完成进度end -->
    </div>
    <!-- <div class="rate mt30 Profit">
      <p class="ratetitle"><img src="../images/Calculator/Profit.png">订单收益<img src="../images/Calculator/Profit2.png" class="ddicon" @click="popupVisible = !popupVisible"></p>
      <table class="ratetable">
        <thead>
          <tr>
            <th>收益名称</th>
            <th>收益明细</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>订单分成收益</td>
            <td>{{ orderinfo.returnPrice !== '0.00' ? "￥"+orderinfo.returnPrice : orderinfo.returnRate }}</td>
          </tr>
          <tr>
            <td>成单领补贴活动</td>
            <td>{{ orderinfo.groupBuyingPrice !== '0.00' ? "￥"+orderinfo.groupBuyingPrice : orderinfo.groupBuyingRate }}</td>
          </tr>
        </tbody>
      </table>
      <p class="talignc colorjin">总收益：¥{{ parseFloat(orderinfo.returnPrice)+parseFloat(orderinfo.groupBuyingPrice) }}</p>
    </div> -->
    <div class="channelInfo">
      <h2 class="channelInfo-title">渠道商信息</h2>
      <dl>
        <dd>
          <img src="../images/supplier/channe-head.png" alt="">
        </dd>
        <dt>
          <div class="userInfo">
            <div class="channe-name">{{orderinfo.agentOrgName}}</div>
            <div class="channe-cat"><a href="tel:4001116369">联系渠道商</a></div>
          </div>
          <div class="FabulousBox">
            {{orderinfo.agentCreditRate}}
          </div>
        </dt>
      </dl>
    </div>
    <div class="CustomerInfo" v-if="isContract == 1 && this.orgType == 'P'" @click="getOrderNum">
      <h2 class="customer-title preview">电子合同（未签订）</h2>
      <dl class="preview-container">
        <dt>
          <img src="../images/preview.png" alt="">
        </dt>
        <dd>
          请您及时签订合同
        </dd>
      </dl>
    </div>
    <div class="CustomerInfo" v-else-if="isContract == 2">
      <h2 class="customer-title preview">电子合同（双方已签订）</h2>
      <dl class="preview-container">
        <dt>
          <img src="../images/preview.png" alt="">
        </dt>
        <dd @click="checkContract">
          点击查看
        </dd>
      </dl>
    </div>
    <div class="CustomerInfo">
      <h2 class="customer-title">升单辅助信息</h2>
      <div class="nofill" v-if="fill">
        <p>您的渠道商还没有填写升单辅助信息</p>
      </div>
      <div class="fillBox" v-else>
        <p>{{this.uersname}}{{this.old}}{{this.sex}}现所在{{this.clientProvince}}{{this.clientCity}}{{this.clientArea}}，{{this.incomeLevel}}{{this.consumption}}</p>
        <p v-if="describeHealthHide">需求描述：{{this.describeHealth}}</p>
        <ul class="imgList">
          <li v-for="(item, index) in clientImgDos" :key="index">
            <img :src="item.imgUrl" alt="">
          </li>
        </ul>
        <ul class="imgList">
          <li v-for="(item, index) in clientInspectionImgDos" :key="index">
            <img :src="item.imgUrl" alt="">
          </li>
        </ul>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade" class="popup">
      <span style="visibility:hidden">多加</span>  订单收益百分比是指完成该订单后，按照订单总金额计算您所收到的款项比例，顾客付款完毕之后，平台会将属于您的报酬按照账期时间打到您的平台账户。T即为供应商确认分账的日期，T后面的数字即为天数。例如T+10指的是供应商确认分账当日起10天后到账。
      <button class="closeBtn" @click="closeProfit"> 我知道了</button>
    </mt-popup>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="backorder" v-if="this.orderinfo.supplierBusiStatus == 2" class="close" style="flex:auto">
        <span @click="cancelorder"  style="width:100%;height:100%;display:block">取消</span>
      </mt-tab-item>
      <mt-tab-item id="call" style="flex:auto" class="phoneicon">
        <a @click="callkf"  style="width:100%;height:100%;display:block">联系客服</a>
      </mt-tab-item>
      <mt-tab-item v-if="this.orderinfo.isContract == 1" class="red" style="flex:auto">
        <span @click="getOrderNum"  style="width:100%;height:100%;display:block">签订合同</span>
      </mt-tab-item>
      <mt-tab-item id="inputmoney" v-if="this.orderinfo.supplierBusiStatus == 6" class="red" style="flex:auto">
        <span @click="evaluation" style="width:100%;height:100%;display:block">评价渠道商</span>
      </mt-tab-item>
       <mt-tab-item v-if="this.orderinfo.supplierBusiStatus == 4" class="red" style="flex:auto">
        <span style="width:100%;height:100%;display:block">
          <button class="sureBtn" @click="Division" v-bind:disabled="sureStuat">确认分账</button>
        </span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import {MessageBox} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'agentorderinfo',
  data () {
    return {
    describeHealthHide:false,
     popupVisible: false,
     orderNo: this.$route.query.orderNo,
     orderinfo: {},//['0-初始;2-预定产品;3-录入总金额;4-确认总金额;5-开始计算收益;6-评价;9-取消;1-完成'].
     selected: '',
     userinfo: {},
     customer: true,
     isClient:"",
     fill:true,
     old:"",
     sex: "",
     consumption:"",
     incomeLevel: "",
     describeHealth: "",
     reason:this.$route.query.reasonType,
     clientAge:"",
     clientProvince:"",
     clientCity:"",
     clientArea:"",
     isContract:1,
     orgType:"P",
     contractShowUrl:"",
     sureStuat:false,
     supplierBusiStatus:""
    }
  },
  methods: {
    checkContract(){//查看合同
      window.location.href = ""+this.contractShowUrl+""
    },
    getOrderNum(){//获取订单号
      let path = {path:'/contract',query:{orderNo:this.orderNo}}
      this.$router.push(path)
    },
    closeProfit(){
      this.popupVisible = false;
      this.Visible = false;
    },
    Division(){
      //  MessageBox.confirm('您的渠道商会在分账之后收到款项，确定要进行分账吗？?').then(action => {
      //     loginService.confirmprice(this.orderNo).then(r =>{
      //       if(r.flag == 20000){
      //         location.reload()
      //       }else{
      //         Toast(r.msg)
      //       }
      //   });
      //  })
      let path = {path:'/divisionAccounts',query:{orderNo:this.orderNo}}
      this.$router.push(path)

    },
    getUserInfo() {
      loginService.getUserInfo().then(r => {
        if (r.flag == 20000) {
          this.userinfo = r.data;
          this.orgType = r.data.orgType;
          this.XnInfo();
        } else if(r.flag !== 50001) {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
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
        itemid:"",//商品ID，商品详情页面用于展示商品的调用参数。
        itemparam:"",//商品详情页面的拓展参数，一般用于区分不同设备的拓展参数
      }
    },
    callkf() {
       window.NTKF.im_openInPageChat();
    },
    toproduct() {
      let path = {path: '/productinfo', query:{productId: this.orderinfo.productId, type:"o"}}
      this.$router.push(path)
    },
    cancelorder() {
      let path = {path: '/cancelorder', query:{orderNo: this.orderNo}}
      this.$router.push(path)
    },
    getstatemsg(index) {//<!-- ['0-初始;2-预定产品;3-顾客付款;4-收款;5-确认分账;6-渠道商收款;7-评价;9-取消;1-完成'] -->
      switch(index) {
        case 1:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-size:14px;font-weight: bold;">完成</b></li><li class="lidone" style="list-style:none;">订单已完成</li>';
        break;
        case 2:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-size:14px;font-weight: bold;">创建订单</b></li><li class="lidone" style="list-style:none;">订单已生成，请与您的渠道商保持联系，促成交易。</li>';
        break;
        case 3:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-size:14px;font-weight: bold;">顾客已付款</b></li><li class="lidone" style="list-style:none;">客户已付款，请保持沟通确保服务体验顺利进行。</li>';
        break;
        case 4:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-size:14px;font-weight: bold;">已收款</b></li><li class="lidone" style="list-style:none;">收益已到账，请确认查收。</li>';
        break;
        case 5:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-size:14px;font-weight: bold;">确认分账</b></li><li class="lidone" style="list-style:none;">早一些确认分账吧，您的渠道商还在苦苦等待着</li>';
        break;
        case 6:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-size:14px;font-weight: bold;">渠道商已收款</b></li><li class="lidone" style="list-style:none;">您的渠道商将会在您确认分账10天后收到分成款项</li>';
        break;
        case 7:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-size:14px;font-weight: bold;">已评价</b></li><li class="lidone" style="list-style:none;">请您对于本次订单给予评价，对您的配合我们非常感谢</li>';
        break;
        case 9:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-size:14px;font-weight: bold;color:#E5322E;">订单取消</b></li><li class="lidone" style="list-style:none;color:#E5322E;">'+this.reason+'</li>';
        break;
      }
    },
    getOrderInfo() {
      loginService.agentOrderInfo(this.orderNo).then(r => { 
        if (r.flag == 20000) {
          console.log(r.data)
          this.orderinfo = r.data;     
          this.isContract = r.data.isContract;
          this.contractShowUrl = r.data.contractShowUrl;
          this.supplierBusiStatus = r.data.supplierBusiStatus;
          if(this.supplierBusiStatus == 5){
            this.sureStuat = true
          }else{
            this.sureStuat = false
          }

          if( r.data.clientDo == null){
            this.fill = true;
          }else{
            this.clientImgDos = r.data.clientDo.clientImgDos;
            this.clientInspectionImgDos = r.data.clientDo.clientInspectionImgDos;
            this.$nextTick(function() {
              var imgsObj = $('.imgList').find('img');
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



            this.fill = false;            
            this.clientProvince = r.data.clientDo.clientProvince;
            this.clientCity = r.data.clientDo.clientCity;
            this.clientArea = r.data.clientDo.clientArea;
            if( r.data.isClient == undefined){
              this.customer = true;
              this.isClient = r.data.isClient            
            }else{
              this.customer = false;
              this.isClient = ""
            }
            if(r.data.clientDo.clientProvince = "省"){
              this.havaInfo = false
            }else{
              this.havaInfo = true
            }
            if(r.data.clientDo.clientAge == "不了解" || r.data.clientDo.clientAge == "" || r.data.clientDo.clientAge == "请选择客户年龄段"){//年龄
              this.old = ""
            }else{
              this.old = r.data.clientDo.clientAge+" ";
            }
            if(r.data.clientDo.describeHealth == ""){
              this.describeHealth = ""
              this.describeHealth = false;
            }else{
              this.describeHealth = true;
              this.describeHealth = "需求描述："+r.data.clientDo.describeHealth;//健康描述
            }

            if(r.data.clientDo.consumption == "不了解" || r.data.clientDo.consumption == ""){
              this.consumption = ""
            }else{
              this.consumption = "预计消费"+r.data.clientDo.consumption+"元 ";//消费
            }
            if(r.data.clientDo.clientName ==""){
              this.uersname = ""
            }else{
              if(r.data.clientDo.clientSex == "1"){//性别
                this.uersname = r.data.clientDo.clientName+"先生 ";
              }else{
                this.uersname = r.data.clientDo.clientName+"女士 ";
              }
            }
            if(r.data.clientDo.incomeLevel == "不了解" || r.data.clientDo.incomeLevel == "请选择客户收入水平"){
              this.incomeLevel = ""
            }else{
              this.incomeLevel = "收入水平"+r.data.clientDo.incomeLevel;//收入
            }
          }
        
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    togetmoney(returnRate, marginReturnRate, groupBuyingRate) {
      let path = {path: '/getmoney', query:{returnRate: returnRate, marginReturnRate: marginReturnRate, groupBuyingRate: groupBuyingRate}}
      this.$router.push(path)
    },
    inputmoney() {
      MessageBox.prompt('请输入销售总金额').then(({ value, action }) => {
        if(value == '') {
          Toast('请输入销售总金额')
        }else{
          loginService.markPrice(this.orderNo, value).then(r => {
            if (r.flag == 20000) {
              Toast(r.msg)
              this.getOrderInfo()
            } else {
              Toast(r.msg)
            }
          }).catch(e => {
            console.log(e)
          })
        }
      });
    },
    evaluation() {
      let path = {path: '/evaluation', query:{orderNo: this.orderNo}}
      this.$router.push(path)
    }
  },
  mounted(){
    this.getOrderInfo();
    this.getUserInfo();
    // $("body").css({
    //   "overflow-y":"auto"
    // })

    if(this.reason == undefined){
       loginService.agentOrderInfo(this.orderNo).then(r => {
        if (r.flag == 20000) {
          this.reason = r.data.cancelType
          if(this.reason == "1"){
            this.reason = "顾客原因(意向变化、行程变更、身体原因)"
          }else if(this.reason == "2"){
            this.reason = "服务机构原因(服务、接待无法满足需求)"
          }else if(this.reason == "3"){
            this.reason = "供应商原因(时间安排、行程冲突)"
          }else{
            this.reason = r.data.reason
          }
        }
    })
    }else{
        if(this.reason == "1"){
          this.reason = "顾客原因(意向变化、行程变更、身体原因)"
        }else if(this.reason == "2"){
          this.reason = "服务机构原因(服务、接待无法满足需求)"
        }else if(this.reason == "3"){
          this.reason = "供应商原因(时间安排、行程冲突)"
        }
    }
    $(".mint-tab-item-label span").css({
      "width":"100%",
      "height":"100%",
      "display":"block"
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.preview-container{
  width: 100%;
  height: auto;
  margin: .3rem auto;
  dt{
    width: 10%;
    height: auto;
    margin: 0 auto;
    img{
      width: 100%;
      height: auto;
    }    
  }
  dd{
      font-size: 14px;
      color: #fff;
      margin: .3rem auto 0;
      text-align: center;
    }
}
.userInfo{
  margin-top: -10px;
}
.imgList{
  width: 100%;
  display: -webkit-flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: start;
  justify-content: flex-start;
  margin: 0 auto;
  li{
    width: 30%;
    height: 2rem;
    margin: .2rem .15rem;
    border-radius: 5px;
    overflow: hidden;
    img{
      width: 100%;
      height: auto;
    }
  }
}
.channelInfo{
  width: 100%;
  height: auto;
  border-bottom:1px solid #353645;
  .channelInfo-title{
    width: 93%;
    margin: 0 auto;
    padding: .2rem 0;
    color: #fff;
    font-size: 12px;
    text-indent: .6rem;
    background: url(../images/channelInfo.png) no-repeat left center;
    background-size: 0.32rem 0.32rem;
  }
  dl{
    width: 93%;
    height: auto;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: .4rem 0;
    dd{
      width: 10%;
      img{
        width: 100%;
        height: auto;
      }
    }
    dt{
      width: 85%;
      display: -webkit-flex;
      justify-content: space-between;
      margin: 0 auto;
      color:#fff;
      .channe-name{
        font-size: 16px;
      }
      .channe-cat{
        font-size: 12px;
        color: #9DA3B4;
        a{
          color: #fff;
        }
      }
      .FabulousBox{
        padding: 0 0 0 .5rem;
        color: #FBC700;
        display: -webkit-flex;
        align-items: center;
        background: url(../images/zan.png) no-repeat left center;
        background-size: 0.32rem 0.32rem;
      }
    }
  }
}
.CustomerInfo{
  width:100%;
  border-bottom: 1px solid #363645;
  h2{
    width: 93%;
    padding: .2rem 0;
    margin: 0 auto;
    color: #fff;
    font-size: 12px;
    text-indent: .6rem;
    background: url(../images/CustomerInfo.png) no-repeat left center;
    background-size: 0.32rem 0.32rem;
  }
  .nofill{
    width: 100%;
    margin: 0 auto;
    color:#fff;
    font-size: 12px;
    padding: .5rem 0 .5rem 0;
    background: #272734;
    p{
      width: 93%;
      margin: 0 auto;
      letter-spacing: 1px
    }
    .fillBnt{
      width: 100%;
      button{
        border:none;
        outline: none;
        width: 55%;
        margin: 0 auto;
        color: #2CBB55;
        padding: 0.26666666666666666rem;
        background: #363645;
        border-radius: 20px;
        margin: 0 auto;
        display: block;
      }
    }
  }
  .fillBox{
    width: 93%;
    margin:0 auto;
    padding: .3rem 0;
    color:#fff;
    line-height: 1.6;
    p{
      margin: .2rem 0 0;
    }
  }
}
.manageinfo{
  width:100%;
  height:auto;
  padding-bottom: 15px;
  border-bottom:~`px2rem(1)` solid #363645;
  dl{
    width:~`px2rem(690)`;
    height:auto;
    margin: 0 auto;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    dd{
      width:30%;
      height:auto;
      max-height:2.5rem;
      overflow: hidden;
      border-radius: 5px;
      img{
        width:100%;
        height:auto;
      }
    }
    dt{
      width:70%;
      margin-left: .4rem;
      h3{
        font-weight: normal;
        color: #fff;
        font-size: 14px;
        padding: .2rem 0;
      }
      p{
        font-size: 12px;
        color: #9DA3B4;
      }
    }
  }
}
.Profit{
  border-bottom:1px solid #363645;
  padding-bottom: .4rem;
}
.phoneicon{
  color:#fff;
  background:#F5A623;
  //url(../images/phone.png) no-repeat 10% center
  background-size: .5rem auto;
  padding: 0 .4rem;
  a{
    color: #fff;
  }
}
.red{
  background:  linear-gradient(-135deg, #2CBB86 0%, #2CBB55 100%);
  color: #fff;
}
.close{
  width:10%;
  background: #272734;
  color:#9DA3B4;
}
.agentorderinfo{
  background-color: #1D1D28;
  padding-bottom: ~`px2rem(75)`;
  .infotitle{
    height: ~`px2rem(66)`;
    padding: ~`px2rem(23)`;
    background-color: #272734;
    color: #9DA3B4;
    font-size: ~`px2rem(24)`;
    line-height: ~`px2rem(66)`;
    font-weight: bold;
    .ordicon{
      width: ~`px2rem(24)`;
      height: ~`px2rem(24)`;
      margin: ~`px2rem(20)`;
      float: left;
    }
  }
  .statesbox{
    background-color: #1D1D28;
    padding: ~`px2rem(40)` 0 0;
    color:#9DA3B4;
    border-bottom: ~`px2rem(1)` solid #363645;
    .state{
      width: 100%;
      height: ~`px2rem(130)`;
      .frztime{
        width: ~`px2rem(100)`;
        height: 100%;
        float: left;
        margin-right: ~`px2rem(10)`;
        color: #D7000F;
      }
      .now{
        color: #FBC700;
      }
      .time{
        width: ~`px2rem(130)`;
        height: 100%;
        float: left;
        margin-right: ~`px2rem(10)`;
        text-align: right;
      }
      .stateicon{
        float: left;
        height: 100%;
        width: ~`px2rem(35)`;
        img{
          float: left;
          width: ~`px2rem(22)`;
          height: ~`px2rem(22)`;
        }
      }
      .stateinfo{
        width: ~`px2rem(550)`;
        float: left;
        height: 100%;
        .lidone{
          font-size: ~`px2rem(24)`;
          color: #585858;
          list-style: none;
        }
        .linone{
          font-size: ~`px2rem(24)`;
          color: #484855;
          list-style: none;
        }
        .lifrz{
          font-size: ~`px2rem(24)`;
          color: #D7000F;
          list-style: none;
        }
      }
      .statenone{
        background-image: url('../images/statelinenone.png');
        background-repeat: no-repeat;
        background-position-x: 32%;
        background-size: 10% 100%;
      }
      .statedone{
        background-image: url('../images/statelinedone.png');
        background-repeat: no-repeat;
        background-position-x: 32%;
        background-size: 10% 100%;
      }
    }
  }
  .rate{
    color:#9DA3B4;
    .ddicon{
          width: ~`px2rem(24)`;
          height: ~`px2rem(24)`;
          margin-left: ~`px2rem(20)`;
        }
    .ratetitle{
      margin: ~`px2rem(30)` 0;
      line-height: ~`px2rem(33)`;
      font-size: ~`px2rem(24)`;
      padding-left: ~`px2rem(25)`;
      //border-left: ~`px2rem(4)` solid #fc5b51;
      img{
        margin-right: ~`px2rem(20)`;
        width: ~`px2rem(24)`;
        height: ~`px2rem(24)`;
      }
    }
    .colorjin{
      width:50%;
      margin:0 auto;
      color: #C7AF76;
      padding: ~`px2rem(20)`;
      background: #272734;
      border-radius:20px;
    }
    .ratetable{
      width: 100%;
      line-height: ~`px2rem(75)`;
      margin-top: ~`px2rem(20)`;
      thead{
        background-color: #272734;
        color: #fff;
      }
      tbody{
        color: #9DA3B4;
      }
      th, td{
        text-align: center;
      }
    }
  }
  .manageinfo{
    .orglogo{
      width: ~`px2rem(100)`;
      height: ~`px2rem(100)`;
      margin: ~`px2rem(25)` ~`px2rem(20)` ~`px2rem(20)` ~`px2rem(20)`;
      border: ~`px2rem(1)` solid #E5E5E5;
    }
    .orgname{
      height: ~`px2rem(75)`;
      font-size: ~`px2rem(28)`;
      line-height: ~`px2rem(75)`;
    }
    .orgnum{
      height: ~`px2rem(50)`;
      line-height: ~`px2rem(55)`;
      font-size: ~`px2rem(24)`;
      span{
        color: #585858;
      }
    }
    .seemore{
      color: #8A8A8A;
      padding: ~`px2rem(5)` ~`px2rem(10)`;
      border: ~`px2rem(1)` solid #8A8A8A;
      border-radius: ~`px2rem(25)`;
      text-align: center;
      line-height:~`px2rem(44)`;
      margin-right: ~`px2rem(20)`;
      margin-top: ~`px2rem(50)`;
    }
  }
}
@import url(../less/functions);
.orderInfo-container{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #1d1d28;
  .order-title{
    width: ~`px2rem(690)`;
    margin: 0 auto;
    font-size: 14px;
    background: url(../images/Calculator/state.png) no-repeat left center;
    background-size: 14px 14px;
    text-indent: .8rem;
    padding: .3rem 0;
    color:#fff;
  }
  .order-content{
    width: 100%;
    height: auto;
    background: #272734;
    li{
      width:~`px2rem(690)`;
      margin:0 auto;
      color:#fff;
      font-size: 12px;
      display: -webkit-box;
      padding: .2rem 0;
      p:nth-child(1){
        margin-right: 15px;
        span{
          visibility: hidden;
        }
      }
    }
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
    padding: .3rem 0;
    margin: .2rem 0 0;

  }
}
.sureBtn{
  width:100%;
  height: 100%;
  background: none;
  font-size: 0.4rem;
  color: #fff;
}
</style>
