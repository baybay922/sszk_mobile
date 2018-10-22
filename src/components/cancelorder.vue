<template>
  <div class="cancelorder">
    <div class="checkbox">
      <mt-radio
        align="right"
        v-model="value"
        :options="options">
      </mt-radio>
    </div>
    <div class="inputbox">
      <textarea cols="49" rows="10" maxlength="200" placeholder="请告诉我们订单取消的具体原因" v-model="reason"></textarea>
    </div>
    <div class="talignc">
      <mt-button type="primary" class="loginbutton mt30" @click="submit">确认取消订单</mt-button>
    </div>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import {MessageBox} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'cancelorder',
  data () {
    return {
    orderNo: this.$route.query.orderNo,
    options: [{
      label: '顾客原因(意向变化、行程变更、身体原因)',
      value: '1'
    }, {
      label: '服务机构原因(服务、接待无法满足需求)',
      value: '2'
    }, {
      label: '供应商原因(时间安排、行程冲突)',
      value: '3'
    }, {
      label: '其他原因',
      value: '4'
    }],
    value: '1',
    reason: ''
    }
  },
  methods: {
    sub() {
      var self = this;
      MessageBox.confirm('确定取消订单吗?').then(action => {
        self.submit()
      });
    },
    submit() {
      if(this.value == "4" && this.reason == ""){        
        Toast("请输入取消原因")
      }else{
        var self = this;
        MessageBox.confirm('确定取消订单吗?').then(action => {
          loginService.cancelOrder(this.orderNo, this.value, this.reason).then(r => {
          if (r.flag == 20000) {
            loginService.myInfo().then(r => {
              if (r.flag == 20000) {
                if(r.data.orgType == "P"){//判断是不是供应商
                   if(this.value == "4"){
                    let path = {path: '/suporderinfo', query:{orderNo: this.orderNo,reasonType:this.reason}}
                    this.$router.push(path)
                  }else{
                    let path = {path: '/suporderinfo', query:{orderNo: this.orderNo,reasonType:this.value}}
                    this.$router.push(path)
                  }
                }else{
                  if(this.value == "4"){
                    let path = {path: '/agentorderinfo', query:{orderNo: this.orderNo,reasonType:this.reason}}
                    this.$router.push(path)
                  }else{
                    let path = {path: '/agentorderinfo', query:{orderNo: this.orderNo,reasonType:this.value}}
                    this.$router.push(path)
                  }
                }
              }
              })
            
          } else {         
              Toast(r.msg)       
          }
        }).catch(e => {
          console.log(e)
        })
        });
      }        
      }
  },
  mounted(){
    $('.mint-cell-wrapper').css('padding','0')
    $(".mint-cell").css({
      "border-bottom":".5px solid #363645",
      "padding":"5px 0"
      })
    $(".mint-radio-label").css({"font-size":"14px"})
    $(".mint-radiolist-label").css({"padding":"0 10px 0 0 "})
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.mint-cell-wrapper{
  padding: none;
}
.cancelorder{
  padding: ~`px2rem(30)`;
  background:#1D1D28;
  .checkbox{
    color:#fff;
    font-size: 16px;
  }
  .inputbox{
    width:100%;
    border-radius: 10px;
    overflow: hidden;
    margin-top: ~`px2rem(40)`;
    background: #272734;
    textarea{
     width: 88%;
      height: ~`px2rem(450)`;
      margin: 0rem auto ~`px2rem(60)`;
      display:block;
      border-radius: 10px;
      background:  #272734;
      border:none;
      outline: none;
      padding: 2%;
      font-size: 12px;
      color: #fff;
    }
  }
}
.loginbutton{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: -webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
  border-radius: 0;
}
</style>
