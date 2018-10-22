<template>
  <div class="getmoney">
    <div class="computer-box">
      <p class="slo">您可以输入不参与分成的金额，我们将帮您计算出分账后的到账金额</p>
        <div class="computerBox" @click="inputmoney">
          <input id="computing" type="tel" class="mt30 talignc" v-model="inputnum" v-on:input="inputmoney" maxlength="9" autofocus="autofocus" placeholder="请输入不参与分账的金额">
        </div>
      <p class="reratingtitle"><span class="fl">到账款项</span><span class="fl">到账金额</span></p>
      <ul class="rerating">
        <li><span class="fl">顾客付款总金额</span><span class="fr">￥{{totalPrice}}</span></li>
        <li><span class="fl">已收款总金额</span><span class="fr">￥{{returnPrice}}</span></li>
        <li><span class="fl">订单应收总金额</span><span class="fr">￥{{orderTotalPrice}}</span></li>
      </ul>
      <div class="ratingnum">
        <p>确认分账后收款金额</p>
        <p>¥ <span>{{ ratingnum }}</span></p>
      </div>
    </div>
    <button class="sureDivision" @click="sureDivision">确认分账</button>
    <div class="code-msgbox" v-if="msgbox">
      <div class="code-msgbox-header">
          请输入安全码
      </div>
      <div class="code-msgbox-input">
        <input type="password" v-model="securityCode" maxlength="6" autofocus="autofocus" />
      </div>
      <div class="code-msgbox-forget" @click="forgetPwd">忘记安全码？</div>
      <div class="code-msgbox-btns">
        <button class="code-msgbox-btn code-msgbox-cancel" @click="cancelgetSecurityCode">取消</button>
        <button class="code-msgbox-btn code-msgbox-confirm" @click="getSecurityCode">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import {loginService} from "../services/login";
import {Toast,MessageBox} from 'mint-ui';
import $ from 'jquery'
export default {
  name: 'getmoney',
  data () {
    return {
      inputnum: "",
      ratingnum: '0',
      returnRateUrl: this.$route.query.returnRate,
      marginReturnRateUrl: this.$route.query.marginReturnRate,
      groupBuyingRateUrl: this.$route.query.groupBuyingRate,
      orderNo:this.$route.query.orderNo,
      totalPrice:"0",
      returnPrice:"0",
      orderTotalPrice:"0",
      pDivide:"0",
      type: this.$route.query.type,
      msgbox:false,
      securityCode:'',
    }
  },
  methods: {
    forgetPwd(){
      loginService.getSecurityCode().then((r)=>{
          if(r.flag == 20000){
            let path = {path:'/setSafetyCode',query:{isSafetyCode:1,safetyType:2,orderNo:this.orderNo}}
          this.$router.push(path)
          }else{
            Toast(r.msg)
          }
      })
    },
    getSecurityCode(){
      if(this.securityCode.length < 6){
        Toast("请输入正确的安全码")
      }else{
        loginService.safetycodeCheck(this.securityCode).then((r)=>{
          if(r.flag == 20000){         
                  var orderNo = parseInt(this.orderNo),
                    costPrice = parseInt(this.inputnum);
                  if(this.type){
                    if(isNaN(costPrice) || costPrice == "0" || costPrice == ""){
                        costPrice = parseInt("0");
                          MessageBox.confirm('您的渠道商会在分账之后收到款项，确定要进行分账吗？?').then(action => {
                            loginService.fictitiousdivision(orderNo, costPrice).then(r=>{
                            if(r.flag == 20000){
                              let path = {path:'/experiencePOS',query:{orderNo:this.orderNo}}
                              this.$router.push(path)
                            }else{
                              Toast(r.msg)
                            }
                        })
                      })
                    }else{
                      MessageBox.confirm('您的渠道商会在分账之后收到款项，确定要进行分账吗？?').then(action => {
                        loginService.fictitiousdivision(orderNo, parseInt(this.inputnum)).then(r=>{
                        if(r.flag == 20000){
                          let path = {path:'/experiencePOS',query:{orderNo:this.orderNo}}
                          this.$router.push(path)
                        }else{
                          Toast(r.msg)
                        }
                      })
                      })
                    }
                  }else{
                    if(isNaN(costPrice) || costPrice == "0" || costPrice == ""){
                        costPrice = parseInt("0");
                          MessageBox.confirm('您的渠道商会在分账之后收到款项，确定要进行分账吗？?').then(action => {
                            loginService.confirmpriceTotal(orderNo, costPrice).then(r=>{
                            if(r.flag == 20000){
                              console.log('成本')
                              let path = {path:'/suporderinfo',query:{orderNo:this.orderNo}}
                              this.$router.push(path)
                            }else{
                              Toast(r.msg)
                            }
                        })
                      })
                    }else{
                      MessageBox.confirm('您的渠道商会在分账之后收到款项，确定要进行分账吗？?').then(action => {
                        loginService.confirmpriceTotal(orderNo, parseInt(this.inputnum)).then(r=>{
                        if(r.flag == 20000){
                          let path = {path:'/suporderinfo',query:{orderNo:this.orderNo}}
                          this.$router.push(path)
                        }else{
                          Toast(r.msg)
                        }
                      })
                      })
                    }
                  }
          }else{
            Toast(r.msg)
          }
        })
      }
    },
    cancelgetSecurityCode(){//取消
      this.msgbox = false
    },
    sureDivision(){//确认分账
    this.msgbox = true
    loginService.getSecurityCode().then((r)=>{
          if(r.flag == 20000){
            if(r.data.isSafetyCode == 1){
              MessageBox.confirm('', { 
                  message: '您还未设置安全码，请先设置安全码', 
                  title: '提示', 
                  confirmButtonText: '立即设置', 
                  cancelButtonText: '取消' 
                  }).then(action => { 
                  if (action == 'confirm') {     //确认的回调
                    let path = {path:'/setSafetyCode',query:{isSafetyCode:r.data.isSafetyCode,type:'d',orderNo:this.orderNo}}
                    this.$router.push(path)
                  }
                  }).catch(err => { 
                   
              });
            }else{ 
            }
          }else{
            Toast(r.msg)
          }
        })
       
    },
    getConfirmpriceInfo(){//获取金额数目
      loginService.confirmpriceInfo(this.orderNo).then(r=>{
        if(r.flag == 20000){
          this.totalPrice = r.data.totalPrice
          this.returnPrice = r.data.returnPrice
          this.pDivide = r.data.pDivide
        }else{
          Toast(r.msg)
        }
      })
    },
    inputmoney(e) {//获取输入金额计算
      e.stopPropagation();
      var orderNo = parseInt(this.orderNo),
          costPrice = parseInt(this.inputnum),
          reg = /^[0-9]*$/;
        if(!reg.test(parseInt(costPrice))){
          Toast("请输入纯数字")
        }else{
          if(this.inputnum > this.totalPrice){
            this.inputnum = this.totalPrice;            
          }else{
            this.orderTotalPrice = ((parseInt(this.totalPrice)-parseInt(this.inputnum))*this.pDivide)+parseInt(this.inputnum);
            setTimeout(()=>{
              this.getComputer()
            },100)
          }
        }
    },
    getComputer(){
      this.ratingnum = (parseInt(this.orderTotalPrice)-parseInt(this.returnPrice))
    }
  },
  mounted(){
    this.getConfirmpriceInfo()
    //$('#sfds').focus();
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
  height: auto;
  background: #1d1d28;
  border-radius: 12px 12px 0 0;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.getmoney{
  height: 100%;
  background: #1d1d28;
  .slo{
    padding: ~`px2rem(30)`;
    font-size: ~`px2rem(28)`;
    color: #fff;
    text-align: left;
    line-height: 22px;
  }
  .reratingtitle{
    width:90%;
    margin: 0 auto;
    padding:~`px2rem(10)`;
    font-weight: bold;
    color:#363645;
    display: -webkit-flex;
    justify-content: space-between;
    .fl{     
      font-size: 12px;
      color: #fff;
    }
  }
  .rerating{
    width: 90%;
    margin:0 auto;
    font-size: ~`px2rem(24)`;
    color: #9DA3B4;
    border-top: ~`px2rem(1)` solid #363645;
    border-bottom: ~`px2rem(1)` solid #363645;
    padding: ~`px2rem(20)` 0;
    li{
      //width: 100%;
      height: ~`px2rem(37)`;
      // line-height: ~`px2rem(37)`;
      clear: both;
      padding-top: ~`px2rem(20)`;
      &:nth-child(1){
        padding:0;
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
      color: #fff;
      text-align: left;
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
    background:#272734;
    border: none;
    outline: none;
    color: #fff;
    font-size: 16px;
  }

}
.fr{
  color: #9DA3B4;
}
.sureDivision{
  width: 100%;
  height: 1.3066666666666666rem;
  line-height: 1.3066666666666666rem;
  display: block;
  position: fixed;
  bottom: 0;
  left:0;
  background-image: linear-gradient(-135deg, #2CBB86 0%, #2CBB55 100%);
  color: #fff;
  font-size: ~`px2rem(32)`;
}
.code-msgbox{
  width: ~`px2rem(666)`;
  height: ~`px2rem(330)`;
  border-radius: 15px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin:  ~`px2rem(-175)` ~`px2rem(-333)`;
  overflow: hidden;
  .code-msgbox-header{
    width: 100%;
    height: auto;
    color: #4A4A4A;
    font-size: ~`px2rem(30)`;
    text-align: center;
    padding: ~`px2rem(20)`;
  }
  
}
.code-msgbox-input{
  width: 80%;
  height: ~`px2rem(48)`;
  margin: 0 auto;
  position: relative;
  input{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border:~`px2rem(1)` solid #dedede;
    outline: none;
    display: block;
    color: #9DA3B4;
    font-size: ~`px2rem(28)`;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
  }
}
.code-msgbox-btns{
  width:100%;
  height: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  display: -webkit-flex;
  justify-content: space-between;
  border-top: ~`px2rem(1)` solid #dedede;
  button{
    width:50%;
    height: ~`px2rem(80)`;
    line-height: ~`px2rem(80)`;
    font-size: ~`px2rem(30)`;
    background: transparent;
    color: #2CBB55;
  }
  :nth-child(1){
    border-right: ~`px2rem(1)` solid #dedede;
    color: #9da3b4;
  }
}
.code-msgbox-forget{
  width:80%;
  text-align: right;
  padding: ~`px2rem(10)` 0;
  margin: 0 auto;
  color: #9da3b4;
}
</style>
