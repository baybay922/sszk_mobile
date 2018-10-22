<template>
    <div class="PurchaseBox">
      <ul>
        <li>
          <img src="../../images/activity/SaleKin/1.png">
        </li>
        <li>
          <img src="../../images/activity/SaleKin/2.png">
        </li>
        <li class="saleKinBox">
          <img src="../../images/activity/SaleKin/3.png">
           <div class="saleKin" style="display:none;">
            {{currentReturn}}人已完成{{orderYearSale}}销售额
          </div>
        </li>
       
        <li>
          <img src="../../images/activity/SaleKin/4.png">
        </li>
      </ul>
    </div>
</template>

<script>
import {loginService} from "../../services/login"
import $ from 'jquery'
export default {
  name: 'Purchase',
  data () {
    return {
      currentReturn:"",
      orderYearSale:""
    }
  },
  methods: {
    
  },
  mounted(){
    loginService.getyearsale().then(r =>{
      if(r.flag == 20000){
        this.currentReturn = r.data.currentReturn;
        this.orderYearSale = r.data.orderYearSale;
      }
    })
    
  } 
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../less/functions";
.PurchaseBox{
  width: 100%;
  height: auto;
  ul{
    width: 100%;
    height: auto;
    li{
      width: 100%;
      height: auto;
      font-size: 0;
      img{
        width: 100%;
        height: auto;
      }
    }
  }
}
.saleKinBox{
  position: relative;
}
.saleKin{
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: 16px!important;
  color: #F5A623;
  text-align: center;
  position: absolute;
  bottom: -.7rem;
  left: 0;
}
</style>
