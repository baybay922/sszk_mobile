<template>
  <div class="indexpagestica">
    <!-- {{totalOrderSubsidy}}++++++++{{totalUnOrderSubsidy}}+++++++{{orderSubsidyCount}} -->
    <ul>
      <li>
        <img src="../../images/activity/heavyAllowance/1.png">
      </li>
      <li>
        <img src="../../images/activity/heavyAllowance/2.png">
      </li>
      <li class="Prompt">
        <p class="subsidy">您有<span>￥{{totalOrderSubsidy}}</span>奖金正在路上</p>
        <img src="../../images/activity/heavyAllowance/3.png">
      </li>
    </ul>
  </div>
</template>

<script>
import {loginService} from "../../services/login"
import { Toast, Lazyload } from 'mint-ui'
export default {
  name: 'indexpagestica',
  data () {
    return {
      totalOrderSubsidy: '',
      totalUnOrderSubsidy: '',
      orderSubsidyCount: ''
    }
  },
  methods: {
    getdetail(){
      loginService.getsubsidy().then(r => {
        if(r.flag == 20000) {
          this.totalOrderSubsidy = r.data.totalOrderSubsidy
          this.totalUnOrderSubsidy = r.data.totalUnOrderSubsidy
          this.orderSubsidyCount = r.data.orderSubsidyCount
        }
      });
    }
  },
  mounted(){
    this.getdetail();
  } 
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../less/functions";
.indexpagestica{
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
.Prompt{
  position: relative;
}
.subsidy{
  width: 100%;
  height: 1rem;
  font-size: 16px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  span{
    color: #ffd700;
  }
}
</style>
