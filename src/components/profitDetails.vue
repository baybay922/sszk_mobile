<template>
    <div class="detail-container">
        <ul>
            <li v-for="(item, index) in datalist" :key="index">
                <p>
                    <span>您完成了一笔￥{{item.orderAmount}}的订单</span>
                    <span>收益{{item.money}}元</span>
                </p>
                <p>{{item.productName}}</p>
                <p>
                    <span>{{item.time}}</span>
                    <span class="notMost" v-if="item.day > 0">还差{{item.day}}天可提</span>
                    <span class="Sure" v-else-if="item.day <= 0">可以提现</span>
                </p>
            </li>
        </ul>
    </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name:'profitDetails',
  data(){ 
    return{
        pageIndex:'0',
        pageSize:'10',
        ok:false,
        datalist:[]
    }
  },
  methods:{
      getProfitDetails(){//获取订单奖励金
        loginService.profitDetails(this.pageIndex, this.pageSize).then((r)=>{
            if(r.flag == 20000){
                console.log(r)
                this.datalist = r.data
            }else{
                Toast(r.msg)
            }
        })
      }
  },
  mounted(){
      this.getProfitDetails()
  }
}
</script>
<style scoped lang="less">
@import "../less/functions";
.detail-container{
    width: 100%;
    height: auto;
    overflow-y: auto;
    ul{
        width:100%;
        li{
            border-bottom:~`px2rem(1)` solid #363645;
            padding: ~`px2rem(30)` 0 ~`px2rem(20)`;
            p{
                width: ~`px2rem(690)`;
                margin: 0 auto;
                color: #9DA3B4;
                font-size: ~`px2rem(24)`;
                margin-bottom:~`px2rem(12)`;
            }
            p:nth-child(1){
                color: #fff;
                font-size: ~`px2rem(30)`;
                display: -webkit-flex;
                justify-content: space-between;
                margin-bottom: ~`px2rem(24)`;
            }
            p:nth-child(3){
                font-size: ~`px2rem(30)`;
                display: -webkit-flex;
                justify-content: space-between;
                margin-bottom: ~`px2rem(24)`;
            }
        }
    }
}
.notMost{
    color: #E5322E;
}
.Sure{
    color: #2CBB55;
}
</style>


