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
            <span v-if="orderinfo.productPlace == 'null'"></span>
            <span v-else> {{orderinfo.productPlace}}</span>
            <span v-if="orderinfo.productDoctor == 'null' "></span>
            <span v-else> {{ orderinfo.productDoctor }}专家</span></p>
        </dt>
      </dl>
    </div>
    <!-- <p class="infotitle"><img src="../images/Calculator/state.png" class="ordicon">订单状态：  <span class="">{{ orderinfo.orderNo }}</span></p>
    <p class="infotitle"><img src="../images/Calculator/state.png" class="ordicon">订单金额：<span class="">¥{{ orderinfo.totalPrice }}</span></p> -->
    <div class="orderInfo-container">
      <h2 class="order-title">订单信息</h2>
      <ul class="order-content">
        <li>
          <p>订单号<span>多</span></p>
          <p>{{ orderinfo.orderNo }}</p>
        </li>
        <li>
          <p>总金额<span>多</span></p>
          <p v-if="orderinfo.totalPrice == 0">待支付确认</p>
          <p v-else>¥ {{ orderinfo.totalPrice }}</p>
        </li>
        <li>
          <p>订单分成</p>
          <p>{{orderinfo.returnRate}}</p>
        </li>
        <li>
          <p>到账账期</p>
          <p>T+10</p>
        </li>
      </ul>
    </div>
    <div class="statesbox">
      <!-- 已完成进度 -->
      <div class="state" v-for="(item,index) in orderinfo.orderLogInfoList" :key="index">
      <div class="time" v-bind:class="{ now: ((item.afterStatus == orderinfo.agentBusiStatus && item.displayMark == 1) || (item.afterStatus == orderinfo.agentBusiStatus && orderinfo.supplierBusiStatus == 7 && orderinfo.agentBusiStatus !== 6 )) && orderinfo.frzStatus !== 1}" v-if="item.afterStatus!== 9">{{ item.createMDtime }}<br>{{ item.createHMtime }}</div>
      <div class="time" style="color:#E5322E" v-bind:class="{ now:  ((item.afterStatus == orderinfo.agentBusiStatus && item.displayMark == 1) || (item.afterStatus == orderinfo.agentBusiStatus && orderinfo.supplierBusiStatus == 7 && orderinfo.agentBusiStatus !== 6 )) && orderinfo.frzStatus !== 1 }" v-else>{{ item.createMDtime }}<br>{{ item.createHMtime }}</div>

      <div class="stateicon" v-bind:class="{statenone: item.afterStatus == orderinfo.agentBusiStatus && orderinfo.frzStatus !== 1 && item.afterStatus!== 6 && item.afterStatus!== 9}" v-if="((item.afterStatus == orderinfo.agentBusiStatus && item.displayMark == 1) || (item.afterStatus == orderinfo.agentBusiStatus && orderinfo.supplierBusiStatus == 7 && orderinfo.agentBusiStatus !== 6 )) && orderinfo.frzStatus !== 1 && item.afterStatus != 9 "><img src="../images/statenow.png"></div>
      <div class="stateicon" v-else-if="item.afterStatus == 9"><img src="../images/frzicon.png"></div>
      <div class="stateicon statedone" v-else><img src="../images/statedone.png"></div>

      <div class="stateinfo" v-bind:class="{ now: ((item.afterStatus == orderinfo.agentBusiStatus && item.displayMark == 1) || (item.afterStatus == orderinfo.agentBusiStatus && orderinfo.supplierBusiStatus == 7 && orderinfo.agentBusiStatus !== 6 )) && orderinfo.frzStatus !== 1}" v-html="getstatemsg(item.afterStatus)">创建订单</div>
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
      <div class="state" v-if="this.orderinfo.agentBusiStatus <= 2 && this.orderinfo.agentBusiStatus !== 1">
        <div class="time"></div>
        <div class="stateicon statenone"><img src="../images/statenone.png"></div>
        <div class="stateinfo">
          <li class="linone">顾客付款</li>
          <li class="linone">客户已付款，请保持沟通，确保服务顺利进行。</li>
        </div>
      </div> <!-- ['0-初始;2-创建订单;3-顾客付款;4-确认分账;5-收款;6-评价;9-取消;1-完成'] -->
      <div class="state" v-if="this.orderinfo.agentBusiStatus <= 3 && this.orderinfo.agentBusiStatus !== 1">
        <div class="time"></div>
        <div class="stateicon statenone"><img src="../images/statenone.png"></div>
        <div class="stateinfo">
          <li class="linone">确认分账</li>
          <li class="linone">医院机构已确认分账，如对交易金额有异议，请联系客服</li>
        </div>
      </div>
      <div class="state" v-if="this.orderinfo.agentBusiStatus <= 4 && this.orderinfo.agentBusiStatus !== 1">
        <div class="time"></div>
        <div class="stateicon statenone"><img src="../images/statenone.png"></div>
        <div class="stateinfo">
          <li class="linone">收益到账</li>
          <li class="linone">收益已到账，请确认查收</li>
        </div>
      </div>


      <div class="state" v-if="this.orderinfo.agentBusiStatus <= 5 && this.orderinfo.agentBusiStatus !== 1">
        <div class="time"></div>
        <div class="stateicon"><img src="../images/statenone.png"></div>
        <div class="stateinfo">
          <li class="linone">评价</li>
          <li class="linone">请您对本次订单给予评价，对您的配合我们非常感谢</li>
        </div>
      </div>
      <!-- 未完成进度end -->
    </div>

    <div class="rate mt30 Profit">
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
            <td  class="rightBox">{{ orderinfo.returnPrice !== '0.00' ? "￥"+orderinfo.returnPrice : orderinfo.returnRate }}</td>
          </tr>
          <tr>
            <td>成单领奖励活动</td>
             <td  class="rightBox">{{ orderinfo.groupBuyingPrice !== '0.00' ? "￥"+orderinfo.groupBuyingPrice : orderinfo.groupBuyingRate }}</td>
          </tr>
        </tbody>
      </table>
      <p class="talignc colorjin" @click="togetmoney(orderinfo.returnRate, orderinfo.marginReturnRate, orderinfo.groupBuyingRate)" v-if="orderinfo.returnPrice == '0.00' && orderinfo.groupBuyingPrice == '0.00'">点此输入总金额计算收益</p>
      <p class="talignc colorjin" v-else>总收益：¥{{ parseFloat(orderinfo.returnPrice)+parseFloat(orderinfo.groupBuyingPrice) }}</p>
    </div>
    <div class="CustomerInfo" v-if="isContract == 1">
      <h2 class="customer-title preview">电子合同（对方未签订）</h2>
      <dl class="preview-container">
        <dt>
          <img src="../images/preview.png" alt="">
        </dt>
        <dd>
          等待对方签订
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
        <p>尚未上传升单辅助信息，请您尽快填写顾客的信息，或者委托他人协助填写。</p>
        <div class="fillBnt" >
          <button class="immediately" @click="writeUserInfo">马上去填写</button>
          <!-- <button class="HelpFill">请求朋友帮填</button> -->
        </div>
      </div>
      <div class="fillBox" v-else>
        <p>{{this.uersname}}{{this.old}}{{this.sex}} <span>现所在{{this.clientProvince}}{{this.clientCity}}{{this.clientArea}}，</span><span></span>{{this.incomeLevel}}{{this.consumption}}</p>
        <p v-if="describeHealthHide">{{this.describeHealth}}</p>
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
     <div @click="hideCalcuator">
      <Calculator class="Calculator" :returnRate="returnRate" :marginReturnRate="marginReturnRate" :groupBuyingRate="groupBuyingRate"></Calculator>
    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade" class="popup">
      <span style="visibility:hidden">多加</span>  顾客付款完毕后，平台将根据订单总利润（订单总金额减去供应商成本）和收益百分比计算您的收益，并按照账期时间（T+10）打到您的平台账户。<br/>T为供应商确认分账的日期，T后面的数字即为到账天数。T+10指的是供应商确认分账当日起10天后到账。
      <button class="closeBtn" @click="closeProfit"> 我知道了</button>
    </mt-popup>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="backorder" v-if="this.orderinfo.agentBusiStatus == 2" class="close" style="flex:auto">
        <span @click="cancelorder">取消</span>
      </mt-tab-item>
       <!-- <mt-tab-item id="backorder" v-if="this.orderinfo.agentBusiStatus == 4" class="close" style="flex:auto">
        <span @click="updatePrice">确认收款</span>
      </mt-tab-item> -->
      <mt-tab-item id="call" style="flex:auto" class="phoneicon">
        <span @click="callkf">立即咨询</span>
      </mt-tab-item>
      <mt-tab-item id="inputmoney" v-if="this.orderinfo.agentBusiStatus == 5" class="red" style="flex:auto">
        <span @click="evaluation">评价供应商</span>
      </mt-tab-item>
      <div v-if="this.orderinfo.agentBusiStatus < 5" style="flex:auto;">
        <mt-tab-item class="red" style="flex:auto" v-if="customer">
        <span @click="writeUserInfo">填写升单辅助信息</span>
      </mt-tab-item>
      <mt-tab-item class="red" style="flex:auto" v-else>
        <span @click="Modifying">修改升单辅助信息</span>
      </mt-tab-item>
      </div>
    </mt-tabbar>

    <transition name="fade">
      <div class="popupbox" v-if="markShow">
        <div class="top">
          <h6>请选择咨询方式</h6>
          <p style="online">
            <a href="tel:4001116369">客服电话</a>
          </p>
          <p @click="toSevice()">线上客服</p>
          <p v-if="supplierType == 'P'"  @click="contactD()" class="contactBox">医院/机构</p>
          <p v-else @click="contactD()" class="contactBox">医生</p>
        </div>
        <button @click="cancel()">取消</button>
      </div>
    </transition>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import {MessageBox} from 'mint-ui'
import $ from 'jquery'
import Calculator from './getmoney'
export default {
  name: 'agentorderinfo',
  data () {
    return {
      calledPhone:"",
      hrefUrl:"",
      supplierType:"",
      markShow:false,
      confirmPhone:"0",
      loginName:"",
      describeHealthHide:false,
      popupVisible: false,
      havaInfo: true,
      income: true,
      orderNo: this.$route.query.orderNo,
      orgId: "",
      orderinfo: {},//['0-初始;2-创建订单;3-顾客付款;4-确认分账;5-收款;6-评价;9-取消;1-完成']
      selected: '',
      userinfo: {},
      customer: true,
      isClient:this.$route.query.isClient,
      fill:true,
      uersname:"",
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
      clientImgDos:[],
      clientInspectionImgDos:[],
      returnRate:"",
      marginReturnRate:"",
      groupBuyingRate:"",
      isContract:1,
      contractShowUrl:""
    }
  },
  methods: {
    checkContract(){//查看合同
      window.location.href = ""+this.contractShowUrl+""
    },
    contactD(){//联系医生或机构
      MessageBox.confirm("",{
        message:"请确认您的手机号码<br/><span style='color: #2CBB55;'>" + this.loginName + "</span><br/><small>该号码将被加密保护</small>",
        cancelButtonText:"修改手机号",
        confirmButtonText:"确认并呼叫"
      }).then(action => {
        if(action == 'confirm'){
          this.getCall()
          $('.phoneicon').removeClass('is-selected')
        }
      }).catch( err => {
        if(err == 'cancel'){
          MessageBox.prompt("",{
            title:"请输入您的手机号",
            message:"我们将对此号码加密保护"
          }).then(({ value, action }) => {
            if(action=='confirm'){
              this.getCall(value);
              $('.phoneicon').removeClass('is-selected')
            }
          }).catch( err => {
            if(err == 'cancel'){
              this.markShow = false;
              $('.phoneicon').removeClass('is-selected')
            }
          });
        }
      });    
    },
    //拨打电话
    getCall(value){
      if(value){
        this.confirmPhone = value;
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
    //取消咨询
    cancel(){
      this.markShow = false;
      $('.phoneicon').removeClass('is-selected')
    },
    updatePrice(){//收款
      loginService.updatePrice(this.orderNo).then(r =>{
        if(r.flag == 20000){
          location.reload()
        }else{
          Toast(r.msg)
        }
      })
    },
    Modifying(){//修改客户信息
      let path = {path:'/userInfo',query:{orderNo: this.orderNo,orgId: this.orgId,isClient:1}}
      this.$router.push(path)
    },
    writeUserInfo(){//填写客户信息
      let path = {path:'/userInfo',query:{orderNo: this.orderNo,orgId: this.orgId,isClient:2}}
      this.$router.push(path)
    },
    closeProfit(){
      this.popupVisible = false;
    },
    getUserInfo() {
      loginService.getUserInfo().then(r => {
        if (r.flag == 20000) {
          this.userinfo = r.data
          this.orgId = r.data.orgId;
          this.loginName = r.data.loginName;
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
    //联系客服
    toSevice(){
      window.NTKF.im_openInPageChat();
    },
    callkf() {
       this.markShow = true;
    },
    toproduct() {   
      let path = {path: '/productinfo', query:{productId: this.orderinfo.productId, type: "m"}}
      this.$router.push(path)
    },
    cancelorder() {
      let path = {path: '/cancelorder', query:{orderNo: this.orderNo}}
      this.$router.push(path)
    },
    getstatemsg(index) {//['0-初始;2-创建订单;3-顾客付款;4-确认分账;5-收款;6-评价;9-取消;1-完成']
      switch(index) {
        case 1:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-weight: bold;">已完成</b></li><li class="lidone" style="list-style:none;">订单已完成</li>';
        break;
        case 2:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-weight: bold;">创建订单</b></li><li class="lidone" style="list-style:none;">订单已生成，请联络客户与医院机构促成交易。</li>';
        break;
        case 3:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-weight: bold;">顾客已付款</b></li><li class="lidone" style="list-style:none;">客户已付款，请保持沟通确保服务体验顺利进行。</li>';
        break;
        case 4:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-weight: bold;">确认分账</b></li><li class="lidone" style="list-style:none;">医院机构已确定分账，如对交易金额有异议请联系客服。</li>';
        break;
        case 5:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-weight: bold;">收益已到账</b></li><li class="lidone" style="list-style:none;">收益已到账，请确认查收。</li>';
        break;
        case 6:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-weight: bold;">已评价</b></li><li class="lidone" style="list-style:none;">请您对于本次服务给予评价，对您的配合我们非常感谢</li>';
        break;
        case 9:
        return '<li class="lidone" style="list-style:none;margin-bottom:2px;"><b style="font-weight: bold;color:#E5322E;">订单取消</b></li><li class="lidone" style="list-style:none;color:#E5322E;">'+ this.reason+'</li>';
        break;
      }
    },
    getOrderInfo() {
      loginService.agentOrderInfo(this.orderNo).then(r => {
        console.log(r,'dingdan----------')
        if (r.flag == 20000) {
          this.contractShowUrl = r.data.contractShowUrl;
          this.orderinfo = r.data;
          this.supplierType = r.data.supplierType;
          this.isContract = r.data.isContract;
          this.calledPhone = r.data.serviceCall;
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
              this.describeHealthHide = false;
            }else{
               this.describeHealthHide = true;
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
       $(".Calculator").show();
      $("#computing").focus()
      this.returnRate = returnRate;
      this.marginReturnRate = marginReturnRate;
      this.groupBuyingRate = groupBuyingRate;
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
    },
    hideCalcuator(){      
      $(".Calculator").hide();
    },
  },
  mounted(){
    this.getOrderInfo();
    this.getUserInfo();
    $("body").css({
      "overflow-y":"auto"
    })
    
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

  },
  components:{
    Calculator
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
.preview{
  width: 93%;
  padding: .3rem 0 0.2rem;
  margin: 0 auto;
  color: #fff;
  font-size: 14px;
  text-indent: .6rem;
  background: url(../images/preview-title.png) no-repeat left center!important;
  background-size: 0.32rem 0.32rem!important;
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
.sureBtn{
  width: 60%;
  padding: .2rem 0;
  background: #484855;
  color: #fff;
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
  margin: 0 auto;
}
.CustomerInfo{
  width:100%;
  border-bottom: 1px solid #363645;
  h2{
    width: 93%;
    padding: .3rem 0 0.2rem;
    margin: 0 auto;
    color: #fff;
    font-size: 14px;
    text-indent: .6rem;
    background: url(../images/CustomerInfo.png) no-repeat left center;
    background-size: 0.32rem 0.32rem;
  }
  .nofill{
    width: 100%;
    margin: 0 auto;
    color:#fff;
    font-size: 12px;
    padding: .5rem 0 .1rem 0;
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
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
        color: #2CBB55;
        background: #363645;
        border-radius: 20px;
        margin: 25px auto 20px;
        display: block;
        font-size: 12px;
      }
    }
  }
  .fillBox{
    width: 93%;
    margin:0 auto;
    padding: 0rem 0 0.3rem;
    color:#fff;
    line-height: 1.6;
  }
}
.closeBtn{
  width: 100%;
  padding: .1rem 0;
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
      width:26.6%;
    height: auto;
    max-height: 2.2rem;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
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
  width:5.5%;
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
        margin-right: ~`px2rem(15)`;
        text-align: right;
        margin-top: -5px;
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
        margin-top: -5px;
        margin-left: 2px;
        line-height: 1.5;
        .lidone{
          font-size: ~`px2rem(24)`;
          color: #585858;
          list-style: none;
          b{
            font-size:14px;
            font-weight: bold;
          }
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
            margin-top: 4px;
            width: ~`px2rem(24)`;
            height: ~`px2rem(24)`;
          }
        }
    .colorjin{
      width: 53.3%;
      height: 40px;
      line-height: 40px;
      margin: 5px auto 0;
      font-size: 12px;
      color: #F5A623;
      border-radius: 100px;
      background-color: #272734;
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
  .manageinfo{
    width: 100%;
    height: ~`px2rem(160)`;
    clear: both;
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
    width: 95%;
    margin: 0 auto;
    font-size: 14px;
    background: url(../images/Calculator/state.png) no-repeat 5px center;
    background-size: 12px 12px;
    text-indent: 25px;
    padding: .3rem 0;
    color:#fff;
  }
  .order-content{
    width: 100%;
    height: auto;
    background: #272734;
    padding: 10px 0;
    li{
      color:#fff;
      font-size: 12px;
      display: -webkit-box;
      margin-left: 15px;
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
@media screen and (min-width:415px){
  .state{
    font-size:0.32rem;
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

</style>
