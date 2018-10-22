<template>
  <div class="sellers" >
    <div class="cells" @click="addseller">
      添加新业务员
    </div>
    <div class="sellerstitle">现有业务员</div>
    <div class="newCell" v-for="(item,index) in sellers" :key="index" @click="tochange(item.userNo, item.lockFlag)">
      <p class="cellName">{{ item.name }}<span class="total">（总{{ item.orderCount }}单，销售额{{ item.sale }}万元）</span></p>
      <p class="handle">有{{ item.orderingCount }}单正在处理中</p>
    </div>
    <mt-actionsheet
      :actions="actions1"
      v-model="sheetVisible"
      v-if="stop">
    </mt-actionsheet>
    <mt-actionsheet
      :actions="action2"
      v-model="sheetVisible"
      v-else>
    </mt-actionsheet>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'

export default {
  name: 'sellers',
  data () {
    return {
      sellers: [],
      actions1:[{
        name: '查看业绩',
        method: this.resetPwd
      },{
          name: '重置登录密码',
          method: this.resetPwd
        }, {
          name: '停用账号',
          method: this.Discontinuation
        }],
      action2:[{
        name: '查看业绩',
        method: this.resetPwd
      },{
        name: '充值登陆密码',
        method: this.resetPwd
      }, {
        name: '启用账号',
        method: this.Enable
      }],
      sheetVisible:false,
      stop:true,
      userNo:"",
      lockFlag:""
    }
  },
  methods: {
    tochange(userNo, lockFlag) {
      this.sheetVisible =true;
      this.userNo = userNo;
    },
    getSellers() {//获取业务员ID
      loginService.getSellers().then(r => {
        console.log(r)
        if (r.flag == 20000) {
          this.sellers = r.data
        } else {
          
        }
      }).catch(e => {
        console.log(e)
      })
    },
    addseller(){
      let path = {path: '/addseller', query: {}}
      this.$router.push(path)
    },
    resetPwd() {//重置
      loginService.resetPwd(this.userNo).then(r => {
        if (r.flag == 20000) {         
          Toast("修改成功")
          let path = {path: '/sellers', query: {}}
          this.$router.push(path)
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    Discontinuation() {//停用
      loginService.sellermana(this.userNo,1).then(r => {
        if (r.flag == 20000) {
          Toast(r.msg)
          let path = {path: '/sellers', query: {}}
          this.$router.push(path)
          this.stop = false
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    Enable(){//启用
     loginService.sellermana(this.userNo,0).then(r => {
        if (r.flag == 20000) {
          Toast(r.msg)
          let path = {path: '/sellers', query: {}}
          this.$router.push(path)
          this.stop = true
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    }
  },
  mounted(){
    this.getSellers()
    $('.icons').css('width','0.64rem').css('height','0.64rem')
    $('.mint-cell-text').css('font-size','0.4rem').css('margin-left','0')
    $('.mint-cell-value').css('background-color','#fff').css('display','block');
    $(".mint-cell-allow-right").hide()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.sellers{
  width: 100%;
  background-color: #1d1d28;
  height: 100%;
  .tabbaricon{
    width: ~`px2rem(36)`;
    height: ~`px2rem(36)`;
    margin-right: ~`px2rem(20)`;
    text-indent: .5rem;
  }
  .cells{
    height: 1rem;
    line-height: 1rem;
    font-size: 16px;
    color:#fff;
    text-indent: .4rem;
    background: url(../images/moreinfo.png) no-repeat 95% center;
    background-size: 0.2rem auto;
    .cellinfoa{
      color: #FF483A;
      line-height: ~`px2rem(45)`;
    }
    .cellinfob{
      color: #8A8A8A;
    }
  }
  .sellerstitle{
      width: 100%;
      font-size: ~`px2rem(24)`;
      background: #272734;
      height: 1rem;
      line-height: 1rem;
      color: #8A8A8A;
      text-indent: .4rem;
    }
}
.newCell{
  width: 90%;
  padding: 0.3rem 5%;
  border-bottom: ~`px2rem(1)` solid #363645;
  color:#fff;
  font-size: 14px;
  background: url(../images/index/right_arrow.png) no-repeat 95% center;
  background-size: 0.22rem auto;
}
.total{
  color: #FBC700;
  font-size: 12px;
}
.cellName{
  font-size: 14px;
}
.handle{
  margin-top: .2rem;
  font-size: 12px;
  color:#9DA3B4;
}
</style>
