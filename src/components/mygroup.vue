<template>
  <div class="mygroup">
    <div class="cells">
      <mt-cell title="管理业务员"
      :value="optNum+'人'"
      is-link
      to="/sellers">
      <img slot="icon" src="../images/seller.png" class="icons">
      </mt-cell>
    </div>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'mygroup',
  data () {
    return {
      optNum: this.$route.query.optNum
    }
  },
  methods: {

  },
  mounted(){
    if(this.optNum == 'undefined'){
      this.optNum ="0"
    }else{
      this.optNum = this.$route.query.optNum
    }
    $('.icons').css('width','0.64rem').css('height','auto')
    $('.mint-cell-text').css('font-size','0.4rem')
    $('.mint-cell-value').css('background-color','rgba(0,0,0,0)')
    $(".mint-cell-allow-right").hide()
    $(".mint-cell-wrapper").css({
      "height":"100%"
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.mygroup{
  height: 100%;
  background: #1d1d28;
  .tabbaricon{
    width: ~`px2rem(36)`;
    height: ~`px2rem(36)`;
    margin-right: ~`px2rem(20)`;
  }
  .cells{
    height: ~`px2rem(88)`;
    line-height: ~`px2rem(88)`;
    width: ~`px2rem(690)`;
    border-bottom: ~`px2rem(1)` solid #363645;
    padding: 0 5%;
    background: url(../images/moreinfo.png) no-repeat 93% center;
    background-size: 0.2rem auto;
    a{
      height: 100%;
      line-height: ~`px2rem(88)`;
      color:#fff!important;
    }
  }
}
</style>
