<template>
    <div class="PurchaseBox">
      <ul>
        <li>
          <img src="../../images/activity/Collection/1.png">
        </li>
        <li class="Purchase">
          <img src="../../images/activity/Collection/2.png">
          <div class="progressBox">
            <h2 v-if="hidePromit">{{ money }} <span class="housand">万</span> </h2>
            <h2 v-else>恭喜您已经成为金牌渠道商</h2>
            <div class="progressContainer">  
                <div class="progress" :style="{width:this.progreess+'%'}"></div>  
            </div>
          </div>
        </li>
        <li>
          <img src="../../images/activity/Collection/3.png">
        </li>
      </ul>
    </div>
</template>

<script>
import {loginService} from "../../services/login"
import {Range} from "mint-ui"
import $ from 'jquery'
export default {
  name: 'Purchase',
  data () {
    return {
      money:0,
      progreess:0,
      hidePromit:true
    }
  },
  methods: {
    
  },
  mounted(){
    loginService.purchase().then(r =>{
      if(r.flag == 20000){
        this.money = r.data.differ
        this.progreess = r.data.percentage
        if(this.progreess = 0){
          this.hidePromit = false
        }else{
          this.hidePromit = true
        }
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
.Purchase{
  position: relative;
}
.housand{
  font-size: 16px;
}
.progressBox{
  width: 90%;
  height: auto;
  position: absolute;
  bottom: 16%;
  left: 50%;
  margin-left: -45%;
  font-size: 16px!important;
  color: #F5A623;
  h2{
    width: 100%;
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    margin: .2rem 0;
  }
}
div.progressContainer{  
  height: 20px;  
  width: 96%;  
  border-radius: 10px;  
  background-color: #333;  
  margin-left: 2%;  
}  
div.progress{  
  background-color: #F5A623;  
  border-radius: 10px;  
  height:20px;  
  line-height: 20px;  
}  
</style>
