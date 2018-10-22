<template>
  <div class="getmoney">
    <div class="computer-box">
      <p class="slo">你可以输入本次产品的预测销售金额，我们将帮您计算出此单的收益</p>
        <div class="computerBox" @click="inputmoney">
          <input id="computing" type="tel" class="mt30 talignc" v-model="inputnum" v-on:input="inputmoney" maxlength="9" autofocus="autofocus" placeholder="请输入预测销售金额" @focus="clearInputVal">
        </div>
      <p class="reratingtitle"><span class="fl">收益清单</span></p>
      <ul class="rerating">
        <li><span class="fl">佣金收益</span><span class="fr">{{ returnRate || returnRateUrl}}</span></li>
        <!-- <li><span class="fl">T+7收益(基础分成收益的{{ marginReturnRate }})</span><span class="fr">{{ marginReturnRate }}</span></li> -->
        <li><span class="fl">成单奖励活动</span><span class="fr">{{ groupBuyingRate || groupBuyingRateUrl }}</span></li>
      </ul>
      <div class="ratingnum">
        <p>预计总收益</p>
        <p>¥ <span>{{ ratingnum }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import {loginService} from "../services/login";
import {Toast} from 'mint-ui';
import $ from 'jquery'
export default {
  name: 'getmoney',
  data () {
    return {
      inputnum: '',
      ratingnum: '0',
      returnRateUrl: this.$route.query.returnRate,
      marginReturnRateUrl: this.$route.query.marginReturnRate,
      groupBuyingRateUrl: this.$route.query.groupBuyingRate
    }
  },
  methods: {
    clearInputVal(){
      this.inputnum = "";
      this.ratingnum = "0"
    },
    // changeCount(){
    //   this.inputnum = "",
    //   this.ratingnum = "0"
    // },
    inputmoney(e) {
      e.stopPropagation();
      loginService.rateCount(this.returnRate, this.marginReturnRate, this.groupBuyingRate, this.inputnum).then(r => {
        this.ratingnum = r.data.totalReturn
      }).catch(e => {
        console.log(e)
      });
    }
  },
  mounted(){
    this.inputnum = ""
    $('#sfds').focus();
    this.$nextTick(function(){
      $('.mint-field-core').attr('autofocus','autofocus');
      $('#sfds').focus();
    })
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    if (isAndroid) {
        $(".computer-box").css({
          "padding-bottom":"150px"
        })
    }
  },
  props:["returnRate", "marginReturnRate", "groupBuyingRate"]
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.computer-box{
  width: 100%;
  height: 50%;
  background: #fff;
  border-radius: 12px 12px 0 0;
  position: fixed;
  bottom: 0;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.getmoney{
  height: 100%;
  background: rgba(0,0,0,.6);
  .slo{
    padding: ~`px2rem(30)`;
    font-size: ~`px2rem(28)`;
    color: #9DA3B4;
    text-align: left;
    line-height: 22px;
  }
  .reratingtitle{
    width:90%;
    margin: 0 auto;
    padding:~`px2rem(24)`;
    font-weight: bold;
     color:#363645;
    .fl{     
      font-size: 12px;
    }
  }
  .rerating{
    width: 90%;
    margin:0 auto;
    font-size: ~`px2rem(24)`;
    color: #9DA3B4;
    margin-top: ~`px2rem(20)`;
    border-top: ~`px2rem(1)` solid #E0E1E5;
    border-bottom: ~`px2rem(1)` solid #E0E1E5;
    li{
      //width: 100%;
      height: ~`px2rem(37)`;
      // line-height: ~`px2rem(37)`;
      clear: both;
      padding-top: ~`px2rem(20)`;
      &:nth-child(2){
        padding-bottom: ~`px2rem(20)`;
      }
    }
  }
  .ratingnum{
    width:90%;
    margin: 0 auto;
    height: 1rem;
    line-height: 1rem;
    display: -webkit-flex;
    justify-content: space-around;
    p:nth-child(1){
      color: #363645;
      text-align: left;
      width:20%;
      font-size: 12px;
    }
    p:nth-child(2){
      color: #F5A623;
      flex: 1;
      text-align: right;
      line-height: 1.6;
      span{
        font-size: 32px;
      }
    }
  }
}
.computerBox{
  width: ~`px2rem(690)`;
  height: auto;
  margin: 0 auto;
  .talignc{
    width: 100%;
    padding: .4rem 0;
    margin: 0 auto;
    display: block;
    border-radius: 50px;
    background:#F6F6F6;
    border: none;
    outline: none;
    color: #363645;
    font-size: 16px;
  }

}
.fr{
  color: #363645;
}
</style>
