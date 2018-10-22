<template>
  <div class="myorder">
    <div class="searchtype" v-if="typeOrg">
      <filter-bar
        top="0"
        :bar-menus="barMenus" 
        @showDialog="handleShowDialog" 
        @closeDialog="handleCloseDialog" 
        @changeTab="handleChangeTab"
        @changeMainItem="handleChangeMainItem" 
        @changeSelect="changeData" style="background:#272734;">
      </filter-bar>
    </div>
     <div class="searchtype" v-else>
      <filter-bar
        top="0"
        :bar-menus="barMenus2" 
        @showDialog="handleShowDialog" 
        @closeDialog="handleCloseDialog" 
        @changeTab="handleChangeTab"
        @changeMainItem="handleChangeMainItem" 
        @changeSelect="changeData" style="background:#272734;">
      </filter-bar>
    </div>
    <div class="orderlist">
      <div class="orderbox" v-for="(item, index) in orderlist" :key="index">
        <dl @click="toorderinfo(item.orderNo)">
          <dt>
            <img v-bind:src="item.showUrl" alt="">
          </dt>
          <dd v-if="typeInfo"> <!-- 渠道商   -->
              <h3 @click="toorderinfo(item.orderNo)">{{ item.orderName }}</h3>
              <div>{{item.createtime}}</div>
               <div>订单总金额：￥{{item.totalPrice}}</div>
              <div class="startBox">
                <div class="orderStart" v-if="item.frzStatus == 1" style="color:#E5322E;">冻结</div>
                <div v-else>
                  <div class="orderStart" v-html="ordstatus(item.agentBusiStatus)" v-if="item.agentBusiStatus==2 || item.agentBusiStatus==3 || item.agentBusiStatus==4" style="color:#E5322E;">{{item.agentBusiStatus}}</div>
                  <div class="orderStart" v-html="ordstatus(item.agentBusiStatus)" v-else>{{item.agentBusiStatus}}</div>
                </div>
              </div>
          </dd>
          <dd v-else> <!-- 供应商   -->
            <h3 @click="toorderinfo(item.orderNo)">{{ item.orderName }}</h3>
            <div>{{item.createtime}}</div>
            <div>利润的<span>{{item.returnRate}} </span>将支付给{{item.agentOrgName}}</div>
            <div>已收款 {{item.totalPrice}}</div>
            <div class="startBox">
              <div class="orderStart" v-if="item.frzStatus == 1" style="color:#E5322E;">冻结</div>
              <div v-else>
                <div class="orderStart" v-html="ordstatus(item.supplierBusiStatus)" v-if="item.supplierBusiStatus==2 || item.supplierBusiStatus==3 || item.supplierBusiStatus==4 || item.supplierBusiStatus==5" style="color:#E5322E;">{{item.supplierBusiStatus}}</div>
                <div class="orderStart" v-html="ordstatus(item.supplierBusiStatus)" v-else>{{item.supplierBusiStatus}}</div>
              </div>
            </div>
          </dd>
          
        </dl>
      </div>
      <div class="productemt talignc" v-if="orderlist.length == 0">
        <img class="nodata" src="../images/supplier/nodata.png">
        <p class="productemtinfo">暂无订单</p>
      </div>
    </div>
  </div>
</template>

<script>
import {loginService} from "../services/login";
import {Toast} from 'mint-ui';
import FilterBar from './filter/FilterBar'
export default {
  name: 'myorder',
  data () {
    return {
       typeOrg:true,
       searchlist: {
       productType: '',//1-大健康；2-整形；3-皮肤
       orderField: 1,//0-最近收益；1-最近订单；2-收益最高
       agentBusiStatus: '',//0-初始;2-预定产品;3-待录入总金额;4-待确认总金额;5-计算收益中;6-待评价;9-取消;1-完成
       orgId: '',
       pageNo: 1,
       pageSize: 50,
       orgType:"",
       supplierBusiStatus:'',
     },
      typeInfo:true,
     orderlist: [],
     barMenus: [{
              name: '全部分类',
              icon: '',
              value: '',
              showTabHeader: false,
              defaultIcon: '',
              selectIcon: '',
              selectIndex: 0,
              tabs: [{
                      icon: '',
                      selectIndex: 0,
                      detailList: [{
                        name: '全部',
                        icon: '',
                        value: '',
                        selectIndex: 0
                      }, {
                        name: '医美',
                        icon: '',
                        value: '1',
                        selectIndex: 1
                      }, {
                          name: '大健康',
                          icon: '',
                          value: '2',
                          selectIndex: 0
                      }, {
                          name: '皮肤',
                          icon: '',
                          value: '3',
                          selectIndex: 2
                      }]
                    }]
                  }, {
                    name: '全部状态',
                    icon: '',
                    value: '',
                    showTabHeader: false,
                    defaultIcon: '',
                    selectIcon: '',
                    selectIndex: 0,
                    tabs: [{
                        icon: '',
                        name: '',
                        selectIndex: 0,
                        detailList: [{
                            name: '全部',
                            icon: '',
                            value: '',
                            selectIndex: 0
                        }, {
                            name: '预定产品',
                            icon: '',
                            value: '2',
                            selectIndex: 2
                        }, {
                            name: '顾客付款',
                            icon: '',
                            value: '3',
                            selectIndex: 2
                        }, {
                            name: '确认分账',
                            icon: '',
                            value: '4',
                            selectIndex: 2
                        }, {
                            name: '收款',
                            icon: '',
                            value: '5',
                            selectIndex: 2
                        }, {
                            name: '评价',
                            icon: '',
                            value: '6',
                            selectIndex: 2
                        }, {
                            name: '取消',
                            icon: '',
                            value: '9',
                            selectIndex: 2
                        }, {
                            name: '完成',
                            icon: '',
                            value: '1',
                            selectIndex: 2
                        }]
                    }]
                 },{
                    name: '最近订单',
                    icon: '',
                    value: 1,
                    showTabHeader: false,
                    defaultIcon: '',
                    selectIcon: '',
                    selectIndex: 0,
                    tabs: [{
                        icon: '',
                        name: '',
                        selectIndex: 0,
                        detailList: [{
                            name: '最近收益',
                            icon: '',
                            value: 0,
                            selectIndex: 1
                        }, {
                            name: '最近订单',
                            icon: '',
                            value: 1,
                            selectIndex: 2
                        }, {
                            name: '收益最高',
                            icon: '',
                            value: 2,
                            selectIndex: 2
                        }]
                    }]
                 }],
            barMenus2: [{
              name: '全部',
              icon: '',
              value: '',
              showTabHeader: false,
              defaultIcon: '',
              selectIcon: '',
              selectIndex: 0,
              tabs: [{
                      icon: '',
                      selectIndex: 0,
                      detailList: [{
                        name: '全部',
                        icon: '',
                        value: '',
                        selectIndex: 0
                      }, {
                        name: '大健康',
                        icon: '',
                        value: '1',
                        selectIndex: 0
                      }, {
                          name: '医美',
                          icon: '',
                          value: '2',
                          selectIndex: 1
                      }, {
                          name: '皮肤',
                          icon: '',
                          value: '3',
                          selectIndex: 2
                      }]
                    }]
                  }, {
                    name: '全部',
                    icon: '',
                    value: '',
                    showTabHeader: false,
                    defaultIcon: '',
                    selectIcon: '',
                    selectIndex: 0,
                    tabs: [{
                        icon: '',
                        name: '',
                        selectIndex: 0,
                        detailList: [{
                            name: '全部',
                            icon: '',
                            value: '',
                            selectIndex: 0
                        }, {
                            name: '预定产品',
                            icon: '',
                            value: '2',
                            selectIndex: 2
                        }, {
                            name: '顾客付款',
                            icon: '',
                            value: '3',
                            selectIndex: 2
                        }, {
                            name: '收款',
                            icon: '',
                            value: '4',
                            selectIndex: 2
                        }, {
                            name: '确认分账',
                            icon: '',
                            value: '5',
                            selectIndex: 2
                        }, {
                            name: '渠道商已收款',
                            icon: '',
                            value: '6',
                            selectIndex: 2
                        }, {
                            name: '评价',
                            icon: '',
                            value: '7',
                            selectIndex: 2
                        }, {
                            name: '取消',
                            icon: '',
                            value: '9',
                            selectIndex: 2
                        }, {
                            name: '完成',
                            icon: '',
                            value: '1',
                            selectIndex: 2
                        }]
                    }]
                 },{
                    name: '最近订单',
                    icon: '',
                    value: 1,
                    showTabHeader: false,
                    defaultIcon: '',
                    selectIcon: '',
                    selectIndex: 0,
                    tabs: [{
                        icon: '',
                        name: '',
                        selectIndex: 0,
                        detailList: [{
                            name: '最近收益',
                            icon: '',
                            value: 0,
                            selectIndex: 1
                        }, {
                            name: '最近订单',
                            icon: '',
                            value: 1,
                            selectIndex: 2
                        }, {
                            name: '收益最高',
                            icon: '',
                            value: 2,
                            selectIndex: 2
                        }]
                    }]
                 }]
    }
  },
  methods: {
   orderFrzStatus(status){
    if(status == 1){
      return '冻结'
    }
   },
   ordstatus(status) {
       if(this.searchlist.orgType == "B" || this.searchlist.orgType == "C"){
        if(status == 0) {
          return '初始'
        }else if(status == 2) {
          return '创建订单'
        }else if(status == 3) {
          return '顾客已付款'
        }else if(status == 4) {
          return '确认分账'
        }else if(status == 5) {
          return '收益已到账'
        }else if(status == 6) {
          return '已评价'
        }else if(status == 9) {
          return '取消'
        }else if(status == 1) {
          return '完成'
        }
     }else{
        if(status == 0) {
          return '初始'
        }else if(status == 2) {
          return '创建订单'
        }else if(status == 3) {
          return '顾客已付款'
        }else if(status == 4) {
          return '已收款'
        }else if(status == 5) {
          return '确认分账'
        }else if(status == 6) {
          return '渠道商已收款'
        }else if(status == 7) {
          return '已评价'
        }else if(status == 9) {
          return '取消'
        }else if(status == 1) {
          return '完成'
        }
     }

   },
   getOrders(agentBusiStatus, supplierBusiStatus) {
     loginService.agentOrders(this.searchlist.productType, this.searchlist.orderField, agentBusiStatus, this.searchlist.orgId, supplierBusiStatus, this.searchlist.pageNo, this.searchlist.pageSize).then(r => {
        if (r.flag == 20000) {
          this.orderlist = r.data.list;
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
   },
   toorderinfo(orderNo) {
      loginService.myInfo().then(r => {
        if (r.flag == 20000) {
          if(r.data.orgType == "P"){//判断是不是供应商
           let path = {path: '/suporderinfo', query:{orderNo: orderNo}}
            this.$router.push(path)
          }else{
             let path = {path: '/agentorderinfo', query:{orderNo: orderNo}}
            this.$router.push(path)
          }
        }
      })
      
   },
   togetmoney(returnRate, marginReturnRate, groupBuyingRate) {
      let path = {path: '/getmoney', query:{returnRate: returnRate, marginReturnRate: marginReturnRate, groupBuyingRate: groupBuyingRate}}
      this.$router.push(path)
    },
   handleShowDialog(v) {
      // console.log(v);
    },
    handleCloseDialog(v) {
      // console.log(v);
    },
    handleChangeTab(v) {
      // console.log(v);
    },
    handleChangeMainItem(v) {
      // console.log(v)
    },
    changeData(v) {
      loginService.myInfo().then(r => {
        if (r.flag == 20000) {         
          if(r.data.orgType == "P"){//判断是不是供应商
            //this.searchlist.supplierBusiStatus = v[1].value
            this.getOrders("",v[1].value)
          }else{           
             //this.searchlist.agentBusiStatus = v[1].value
             this.getOrders(v[1].value,"")
          }
        }
      })
      
      this.searchlist.productType = v[0].value      
      this.searchlist.orderField = v[2].value
      //console.log(this.searchlist.productType+'-'+this.searchlist.agentBusiStatus+'-'+this.searchlist.orderField)
      //this.getOrders()
    }
  },
  mounted() {    
    loginService.myInfo().then(r => {
        if (r.flag == 20000) {
           this.searchlist.orgType = r.data.orgType;
          if(r.data.orgType == "P"){//判断是不是供应商
               this.typeInfo = false;
               this.typeOrg = false;
               this.getOrders();
          }else{
              this.typeInfo = true;
              this.typeOrg = true;
              this.getOrders();
          }
        }
    })
    
  },
  components: {
    'filter-bar': FilterBar
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.myorder{
  background-color: #1d1d28;
  height:100%;
  .orderlist{
      padding-top: ~`px2rem(75)`;
    .productemt{
      height: 100%;
      padding: ~`px2rem(200)`;
      // padding-bottom: ~`px2rem(750)`;
      background-attachment: #1d1d28;
      img{
        width: 50%;
      }
      .productemtinfo{
        color: #8A8A8A;
        font-size: ~`px2rem(30)`;
        padding-top: ~`px2rem(30)`;
      }
    }
  }
}
.orderbox{
  width:100%;
  height: auto;
  background:#1d1d28;
  margin-top: 10px;
  dl{
    width:100%;
    height:auto;
    border-bottom:1px solid #363645;
    display: -webkit-flex;
    justify-content: space-between;   
    background: #1d1d28;  
    dt{
      width:30%;
      height:auto;
      max-height: 2.8rem;
      overflow: hidden;
      border-radius: 15px;
      margin: .4rem;
      img{
        width:100%;
        height:auto;
      }
    }
    dd{
      width:60%;
      margin-right: 5%;
      color: #9DA3B4;
      h3{
        width:100%;
        font-weight: normal;
        font-size: 16px;
        margin: .4rem 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
      }
      p{
        font-size: 12px;
        color:#9DA3B4;
        margin-top:.2rem;
      }
      div{
        margin-top: .1rem;        
      }
      .orderStart{
          text-align: right;
        }
      span{
        color:#FBC700;
      }
    }
  }
}
.nodata{
  width: 50%;
}
</style>
