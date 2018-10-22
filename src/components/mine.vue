<template>
  <div class="mine">
    <div class="myinfo">
      <img v-bind:src="this.myinfo.imgUrl" v-if="this.myinfo.imgUrl" class="userimg">
      <img src="../images/deuserimg.png" v-if="!this.myinfo.imgUrl" class="userimg">
      <p class="infoa">{{ myinfo.name }}<span class="fr fontcolorb" style="color:#fbc700;"><img src="../images/zan.png">{{ myinfo.creditRate }}</span></p>
      <p class="infob fontcolora">有 <span class="red">{{ myinfo.orderingCount }}</span> 个正在处理的订单<span class="fr fontcolorb" @click="Credit">关于信用分</span></p>
    </div>
    <div class="myaccount" @click="myselllist">
      我的账户
    </div>
    <div class="moneybox" @click="myselllist">
      <div class="moneyleft">
        <p class="title totalmon">账户资金(元)</p>
        <p class="moneynum totalmon">{{ myinfo.totalAssets }}</p>
        <ul>
          <li><div class="colora"></div>已到账<span>{{ myinfo.accBal }}</span></li>
          <li><div class="colorb"></div>未到账<span>{{ myinfo.dueBal }}</span></li>
          <li><div class="colorc"></div>冻<i style="visibility:hidden;">多</i>结<span>{{ myinfo.frzBal }}</span></li>
        </ul>
      </div>
      <div class="moneyright">
        <canvas id="myChart"></canvas>
      </div>
    </div>
    <div class="cells">     
      <ul class="set-container" v-if="orgType == 'B'">
        <li @click="toMyorder" class="EnterpriseOrder">
          <p>
            企业订单
          </p>
           <p class="single"><span>{{this.myinfo.orderCount}}</span> 单</p>
        </li>
        <li @click="tomygroup" class="business">
          <p>
            我的企业
          </p>
        </li>
        <li class="contrat_duojia">
          <a href="tel:4001116369">联系客服</a>
        </li>
        <li @click="goSet" class="setting">
          <p>
            设置
          </p>
        </li>
        <!-- <li @click="testCall()" class="setting">
          <p>
            测试拨号
          </p>
        </li> -->
      </ul>
      <ul class="set-container" v-else-if="orgType == 'C'">
        <li @click="goOrder" class="myOrder">
          <p>
            我的订单
          </p>
           <p class="single"><span>{{this.myinfo.orderCount}}</span> 单</p>
        </li>
        <li class="contrat_duojia">
          <a href="tel:4001116369">联系客服</a>
        </li>
        <li @click="goSet"  class="setting">
          <p>
            设置
          </p>
        </li>
      </ul>

      <ul class="set-container" v-else-if="orgType == 'D' || orgType == 'P'">
        <li @click="toMyCash" class="cash">
          <p>
            我的POS机
          </p>
          <p class="single"><span v-html="getStatus(status)">未申请</span></p>
        </li>
        <li class="contrat_duojia">
          <a href="tel:4001116369">联系客服</a>
        </li>
        <li @click="goSet" class="setting">
          <p>
            设置
          </p>
        </li>
      </ul>
    </div>
    <mt-tabbar v-model="selected" fixed v-if="start">
      <mt-tab-item id="index">
        <span><img slot="icon" src="../images/productoffimg.png" class="tabbaricon">首页</span>
      </mt-tab-item>
      <mt-tab-item id="mine">
        <span><img slot="icon" src="../images/mineonimg.png" class="tabbaricon">我的</span>
      </mt-tab-item>
    </mt-tabbar>
    <mt-tabbar v-model="selected" fixed v-else>
          <mt-tab-item id="order" class="navFont">
              <span><img slot="icon" src="../images/supplier/createtask_black.png" class="tabbaricon">订单</span>
          </mt-tab-item>
          <mt-tab-item id="product" class="navFont">
              <span><img slot="icon" src="../images/supplier/manage_black.png" class="tabbaricon">产品</span>
          </mt-tab-item>
          <mt-tab-item id="mine" class="navFont">
              <span><img slot="icon" src="../images/mineonimg.png" class="tabbaricon">我的</span>
          </mt-tab-item>
      </mt-tabbar>   
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
import {Doughnut} from '../components/chart/Chart.Doughnut.js'
export default {
  name: 'mine',
  data () {
    return {
     selected: 'mine',
     incomeInfo: {},
     incomeDetailInfos: [],
     myinfo: {},
     start:false,
     enterprise:true,
     myCompany:true,
     orgType:"",
     orgId:"",
     status:"",
     calledPhone:"13231466657",
     isSafetyCode:''
    }
  },
  watch: {
    selected(data) {
      if(data == 'mine') {
        let path = {path: '/mine', query:{}}
        this.$router.push(path)
      } else if(data == 'index') {
        let path = {path: '/indexpage', query:{}}
        this.$router.push(path)
      } else if(data == 'order') {
        let path = {path: '/supplierOrder', query:{}}
        this.$router.push(path)
      } else if(data == 'product') {
        let path = {path: '/supplierProduct', query:{}}
        this.$router.push(path)
      }
    }
  },
  methods: {
    toMyCash(){
      let path = {path:'./cashStart',query:{orgId: this.orgId}}
      this.$router.push(path)
    },
    Credit(){
      loginService.myInfo().then(r => {
      if (r.flag == 20000) {
       
        if(r.data.orgType == "P"  || r.data.orgType == "D"){//判断是不是供应商
          let path = {path:'./creditSupplier',query:{}}
          this.$router.push(path)
        }else{
          let path = {path:'./creditScore',query:{}}
          this.$router.push(path)
        }
      }
      })
    },
    toMyorder(){
      let path = {path: '/myorder', query: {}}
      this.$router.push(path)
    },
    goSet(){
      let path = {path: '/setting', query: {}}
      this.$router.push(path)
    },
    testCall(){
      loginService.testCall(this.calledPhone).then(r => {
       
      })
    },
    Prompt(){
      Toast("敬请期待")
    },
    goOrder(){
      let path = {path: '/myorder', query: {}}
      this.$router.push(path)
    },
    myselllist() {
      let path = {path: '/myselllist', query: {}}
      this.$router.push(path)
    },
    tomygroup() {
      let path = {path: '/mygroup', query: {optNum: this.myinfo.optNum}}
      this.$router.push(path)
    },
    logout() {
      loginService.logout().then(r => {
        if (r.flag == 20000) {
          Toast(r.msg)
          let path = {path: '/login', query:{}}
          this.$router.push(path)
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getMyinfo() {
     
      loginService.myInfo().then(r => {
        if (r.flag == 20000) {

           console.log(r)
          this.orgId = r.data.orgId;
          this.orgType = r.data.orgType;

          loginService.startPOS(r.data.orgId).then(r =>{//获取POS当前状态
            if(r.flag == 20000){
                this.status = r.data.status;
            }else{
                Toast(r.msg)
            }
        })

          if(r.data.orgType == "P" || r.data.orgType == "D"){//判断是不是供应商，显示不同的导航
            this.start  = false;
          }else{
            this.start =true
          }
         
          this.myinfo = r.data;
          if((parseFloat(r.data.accBal) + parseFloat(r.data.dueBal) + parseFloat(r.data.frzBal)) == 0) {
            var data = {
              datasets:[{
                data: [1],
                backgroundColor: ['#E5E5E5']
              }]
            }
          }else{
            var data = {
                datasets:[{
                  data: [parseFloat(r.data.accBal),parseFloat(r.data.dueBal),parseFloat(r.data.frzBal)],
                  backgroundColor: ['#FBC700','#E5E5E5','#E5322E']
                }]
              }
          }
          var ctx = $("#myChart");
          var myChart = new Chart(ctx, {
            type: "doughnut",
            data: data,
            options: {
              fill: true,
              spanGaps: false,
              responsive: true,
              maintainAspectRatio: false
            }
          });
          this.$nextTick(function() {
            if(this.myinfo.orgType == 'C' || (this.myinfo.orgType == 'B' && this.myinfo.userType == 1 ) || this.myinfo.orgType == 'P') {
             $('.moneybox').show()
             // $('.mint-cell-wrapper').css('padding','0 0.5rem').css('border-bottom','1px solid #E5E5E5')
            }else{
              $('.moneybox').hide()
            }
            $('.mint-cell-wrapper').css('padding','0 0.5rem')
          })
          this.incomeInfo = r.data.incomeInfo
          this.incomeDetailInfos = r.data.incomeInfo.incomeDetailInfos
          //this.data = [{name: '账户余额', value: parseFloat(r.data.accBal)}, {name: '未到账 ', value: parseFloat(r.data.dueBal)}, {name: '冻结', value: parseFloat(r.data.frzBal)}]
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
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
    }
  },
  mounted(){
    this.getMyinfo();  
    $('.icons').css('width','0.64rem').css('height','0.64rem')
    $('.mint-cell-text').css('font-size','0.4rem')
    $('.mint-cell-value').css('background-color','#fff')
    $('.mint-cell-wrapper').css('padding','0 0.5rem')
    $('.mint-tabbar').find('a').css('color','#aaa')
    $('.mint-cell').css('padding','10px 0px').css('border-bottom','1px solid #e5e5e5')
    $('.mint-cell-allow-right').css('display','none')
    $('.is-link').css('margin-right','0')
    $('.is-selected').css({
      'color':'#2CBB55'
    })
    $(".mint-tab-item").css({
      "color":"#363645"
    })
    $(".mint-tab-item-label span").css({
      "font-size":"15px"
    })
  },
  components:{
      Doughnut
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.single{
  span{
    font-size: 16px!important;
    color: #F5A623;
  }
}
.set-container{
  width:~`px2rem(690)`;
  height: auto;
  margin: 0 auto;
  padding-bottom: 1.3rem;
  li{
    border-bottom:~`px2rem(1)` solid #363645;
    padding: 15px 0;
    display: -webkit-flex;
    justify-content: space-between;
    color:#fff;
    font-size:16px;
    align-items: center;
    text-indent: 30px;
    span{
      font-size: 12px;
    }
  }
}
.myOrder{
    background: url(../images/mine/order.png) no-repeat left center;
    background-size: .5rem .5rem;
}
.business{   
    background: url(../images/mine/business.png) no-repeat left center;
    background-size: .5rem .5rem;
}
.EnterpriseOrder{
    background: url(../images/mine/EnterpriseOrder.png) no-repeat left center;
    background-size: .5rem .5rem;
}
.setting{
  background: url(../images/mine/SetUp.png) no-repeat left center;
  background-size: .5rem .5rem;
}
.cash{
  background: url(../images/mine/cash.png) no-repeat left center;
  background-size: .5rem .5rem;
}
.icons{
  width: 0.64rem;
  height: 0.64rem;
}
.fontcolora{
  color: #9DA3B4;
}
.fontcolorb{
  color: #F5A623;
}
.red{
  color: #FBC700;
}
.mine{
  background:#1d1d28;
   .tabbaricon{
    width: ~`px2rem(40)`;
    height: ~`px2rem(40)`;
    position: relative;
    top: ~`px2rem(10)`;
    left: -.3rem;
  }
  .myinfo{
    width: ~`px2rem(690)`;
    height: ~`px2rem(100)`;
    padding: ~`px2rem(30)`  ~`px2rem(30)`;
    .userimg{
      width: ~`px2rem(90)`;
      height: ~`px2rem(90)`;
      float: left;
      margin-right: ~`px2rem(20)`;
      margin-top: ~`px2rem(5)`;
    }
    .infoa{
      color: #fff;
      height: ~`px2rem(48)`;
      line-height: ~`px2rem(48)`;
      font-size: ~`px2rem(34)`;
      margin-top: 0.1rem;
      img{
        width: auto;
        height: ~`px2rem(24)`;
        margin: 0 ~`px2rem(20)`;
      }
    }
    .infob{
      font-size: ~`px2rem(24)`;
    }
  }
  .moneybox{
    width: ~`px2rem(690)`;
    height: ~`px2rem(300)`;
    overflow: hidden;
    //padding: ~`px2rem(40)` ~`px2rem(50)`;
    background-color: #fff;
    margin: ~`px2rem(0)` auto;
    border-radius: ~`px2rem(15)`;
    .moneyright{
      width: 50%;
      height: 80%;
      float: right;
      margin-top: 3%;
    }
    .moneyleft{
      width: 50%;
      float: left;
      height: 100%;
      .title{
        padding-left: ~`px2rem(30)`;
        margin-top: ~`px2rem(30)`;
        font-size: ~`px2rem(24)`;
        color: #9DA3B4;
        line-height: ~`px2rem(30)`;
      }
      .moneynum{
        padding-left: ~`px2rem(30)`;
        font-size: ~`px2rem(50)`;
        color: #F5A623;
        line-height: ~`px2rem(80)`;
        font-weight: bold;
      }
      ul{
        line-height: ~`px2rem(40)`;
        margin-top: ~`px2rem(20)`;
        color: #8A8A8A;
        font-size: ~`px2rem(24)`;
        padding-left: ~`px2rem(30)`;
        
        li{
          color: #9DA3B4;
          img{
            margin-right: ~`px2rem(15)`;
          }
          span{
            margin-left: ~`px2rem(15)`;
            color: #3A3A3A;
            margin-right: ~`px2rem(20)`
          }
          div{
            width: ~`px2rem(20)`;
            height: ~`px2rem(20)`;
            float: left;
            margin-top: ~`px2rem(10)`;
            //margin-right: ~`px2rem(20)`;
          }
          .colora{
            background-color: #FBC700;
            margin-right: ~`px2rem(20)`;
            border-radius: 100%;
          }
          .colorb{
            background-color: #E5E5E5;
            margin-right: ~`px2rem(20)`;
            border-radius: 100%;
          }
          .colorc{
            background-color: #E5322E;
            margin-right: ~`px2rem(20)`;
            border-radius: 100%;
          }
        }
      }
    }
  }
  .cells{
    height: ~`px2rem(470)`;
    .mygroup{
      border-bottom: 1px solid #e5e5e5;
      padding: ~`px2rem(20)` 0;
    }
  }
  .incomeinfo{
    background-color: #272734;
    border-radius: ~`px2rem(15)` ~`px2rem(15)` 0 0;
    .incometitle{
      padding: ~`px2rem(0)` ~`px2rem(30)` ~`px2rem(30)`;
      color: #fff;
      background-color: #1D1D28;
      font-size: ~`px2rem(28)`;
      border-radius: ~`px2rem(15)` ~`px2rem(15)` 0 0;
      span{
        float: right;
        color:#F5A623;
        font-size: ~`px2rem(48)`;
        font-weight: bold;
      }
    }
    .incomelist{
      padding: ~`px2rem(20)` ~`px2rem(30)`;
      color: #9DA3B4;     
      li{
        font-size: ~`px2rem(24)`;
        color: #9DA3B4;
        line-height: ~`px2rem(50)`;
        list-style: none;
        font-weight: normal;
        display: -webkit-flex;
        justify-content: space-between;
        line-height: 26px;
      }
    }
  }
}
.contrat_duojia{
  background: url(../images/audiusPhone.png) no-repeat left center;
  background-size: .5rem .5rem;
  a{
    width:100%;
    display: block;
    color: #fff;
  }
}
.myaccount{
  width: ~`px2rem(690)`;
  margin:~`px2rem(0)` auto ~`px2rem(20)`;
  font-size: ~`px2rem(24)`;
  color: #fff;
  background: url("../images/moreinfo.png") no-repeat right center;
   background-size: auto 0.35rem;
}
</style>
