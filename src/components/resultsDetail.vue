<template>
    <div class="detail-container">
        <div class="Commission">
            <h3>佣金提现</h3>
            <div class="detail-wrapper result-wrapper">
                <div class="detail-title">
                    <div class="detail-icon"></div>
                    <div>提现申请已提交，等待银行处理</div>
                </div>
                <p>{{bankName}}（{{bankCode}}）</p>
                <p>{{moneyVal}}元</p>
            </div>
            <div class="detail-wrapper fastLine">
                <div class="detail-title">
                    <div class="detail-icon result-icon"></div>
                    <div>预计2小时内到账</div>
                </div>
            </div>
        </div>
        <div class="reward">
            <h3>奖励提现</h3>
            <div class="detail-wrapper result-wrapper">
                <div class="detail-title">
                    <div class="detail-icon"></div>
                    <div>提现申请已提交，等待多加审核</div>
                </div>
                <p>{{bankName}}（{{bankCode}}）</p>
                <p>{{presented}}元</p>
            </div>
            <div class="detail-wrapper fastLine">
                <div class="detail-title">
                    <div class="detail-icon result-icon"></div>
                    <div>预计3天内到账</div>
                </div>
            </div>
        </div>
        <button class="goBankHome" @click="goBankHome">回到首页</button>
    </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast, MessageBox} from 'mint-ui'
import $ from 'jquery'
export default {
  name:'resultsDetail',
  data(){ 
    return{
        bankName:this.$route.query.bankName,
        bankCode:this.$route.query.bankCode,
        moneyVal:this.$route.query.moneyVal,
        presented: this.$route.query.presented
    }
  },
  methods:{
      goBankHome(){//返回首页
        this.$router.push('/indexpage')
      }
  },
  mounted(){
      if(this.moneyVal == 0){
          $(".Commission").hide()
      }else if(this.presented == 0){
          $(".reward").hide()
      }
  }
}
</script>
<style scoped lang="less">
@import "../less/functions";
.detail-container{
    width: 100%;
    height: 100%;
    h3{
        width: 100%;
        height: auto;
        font-size: ~`px2rem(28)`;
        color: #fff;
        text-indent: ~`px2rem(30)`;
        margin: ~`px2rem(20)` 0;
    }
    .detail-wrapper{
        width: ~`px2rem(690)`;
        height: auto;
        margin: 0 auto;
        color: #fff;
        position: relative;
        padding:0 0 ~`px2rem(30)` 0;
        
        .detail-title{
            width: 100%;
            display: -webkit-box;
            font-size: ~`px2rem(28)`;
            margin-bottom: ~`px2rem(16)`;
            .detail-icon{
                width: ~`px2rem(22)`;
                height: ~`px2rem(22)`;
                border-radius: 100%;
                background:  url(../images/statenow.png) no-repeat;
                background-size: contain;
                margin-top: ~`px2rem(10)`;
                margin-right: ~`px2rem(30)`;
                
            }
            .result-icon{
                background:  url(../images/nochecked.png) no-repeat;
                background-size: contain;
            }
        }
        p{
            color: #9DA3B4;
            margin-left: ~`px2rem(52)`;
            font-size: ~`px2rem(24)`;
        }
    }
    .goBankHome{
        width: ~`px2rem(408)`;
        height: ~`px2rem(88)`;
        background: none;
        outline: none;
        border-radius: 100px;
        display: block;
        text-align: center;
        font-size: ~`px2rem(32)`;
        border:~`px2rem(1)` solid #2CBB55;
        color: #2CBB55;
        margin: ~`px2rem(80)` auto 0;
    }
}
.result-wrapper{
    position: relative;
    :after{
        content: "";
        width: 1px;
        height: ~`px2rem(162)`;
        background: #363645;
        display: block;
        position: absolute;
        left: ~`px2rem(10)`;
        top: ~`px2rem(62)`;
        
    }
}
.fastLine{
    //border-bottom: ~`px2rem(1)` solid #363645;
}
</style>


