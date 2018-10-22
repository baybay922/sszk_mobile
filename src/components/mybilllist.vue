<template>
  <div class="mybilllist">
    <div class="billlist" v-for="item in orderlist" :key="(index, item)">
      <div class="billbox" >
        <p class="billtitle">{{ item.tradeName }}</p>
        <p class="bill-data">{{ item.tradeDate }}  {{ item.tradeDesc }}</p>
      </div>
      <div class="billinfo">
        <span class="plus" v-if="item.tradeFlag == 1">+{{ item.tradeAmt }}</span>
        <span class="minus" v-if="item.tradeFlag == 0">-{{ item.tradeAmt }}</span>
      </div>
    </div>
    <div class="productemt talignc" v-if="orderlist.length == 0">
        <img src="../images/nodata.png">
        <p class="productemtinfo">当前列表还没有产品</p>
      </div>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
export default {
  name: 'mybilllist',
  data () {
    return {
      orderlist: [],
      pageNo: 1,
      pageSize: 100,
      month: ""
    }
  },
  methods: {
    getbilllist() {
      loginService.getBills(this.pageNo, this.pageSize, this.month).then(r => {
        if (r.flag == 20000) {
          this.orderlist = r.data.list
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    }
  },
  mounted(){
    this.getbilllist()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.mybilllist{
    width:100%;   
    color:#fff; 
    overflow-y: auto;
    background: #1D1D28;
    color:#fff;
  .billlist{
    width:92%;
    padding: .4rem 4%;
    border-bottom: 1px solid #363645;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    .billbox{
      width:50%;
      .billtitle{
        width:100%;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;      
      }
    }
    
    .bill-data{
      color: #9DA3B4;
      font-size: 12px;
      margin-top: .2rem;
    }
  }
  .plus{
    color: #F5A623;
    font-size: 16px;
  }
  .minus{
    color:#8989A1;
    font-size: 16px;
  }
}
.productemt{
  width: 90%;
  height: auto;
  margin: 35% auto;
  img{
    width: 30%;
    height: auto;
  }
  p{
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    color:#fff;
    font-size: 14px;
    text-align: center;
  }
}
</style>
