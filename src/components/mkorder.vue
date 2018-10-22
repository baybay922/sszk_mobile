<template>
  <div class="mkorder talignc">
    <div v-if="this.status == 'suc'" style="height:98%;">
       <div class="regbox mt30">
        <img src="../images/sucimg.png" class="sucimg">
        <h1>产品已经下单成功</h1>
        <p>温馨提示：在带领顾客交费之后，可前往『我的订单』页面录入金额，并实时跟踪订单状态。</p>
        <p>祝您生活愉快！</p>
        <mt-button type="default" class="getback" @click="toorders">查看订单</mt-button>
        <mt-button type="default" class="getback backHome" @click="backHome">返回首页</mt-button>
      </div>
    </div>
    <div v-if="this.status == 'fail'"  style="height:98%;">
      <div class="regbox mt30">
        <img src="../images/noactiveimg.png" class="sucimg">
        <h1>产品已经下单失败</h1>
        <p>您的本产品下单没有成功 您可以稍后再试或者联系客服人员</p>
        <p>祝您生活愉快！</p>
        <mt-button type="default" class="getback" @click="callkf">联系客服</mt-button>
        <mt-button type="default" class="getback backHome" @click="backHome">返回首页</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'mkorder',
  data () {
    return {
     status: this.$route.query.status,
     orderNo: this.$route.query.orderNo
      //newUser: true, //用户是否存在
    }
  },
  methods: {
    backHome(){
      let path = {path: '/indexpage', query:{orderNo: this.orderNo}}
      this.$router.push(path)
    },
    toorders() {
      let path = {path: '/agentorderinfo', query:{orderNo: this.orderNo}}
      this.$router.push(path)
    },
    getUserInfo() {
      loginService.getUserInfo().then(r => {
        if (r.flag == 20000) {

          this.userinfo = r.data
          this.XnInfo();
        } else if(r.flag !== 50001) {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    XnInfo() {
      window.NTKF_PARAM = {
        siteid:"kf_10138",//企业ID，为固定值，【必填 】。–此id在开站完毕后，小能实施人员给贵公司发送的邮件中获取–
        settingid:"kf_10138_1517562477133",//接待组id(客服组id)【必填】–此id在开站完毕后，登陆贵公司的小能客户端，进入设置界面-配置管理-接待组中即可获取–
        uid:this.userinfo.loginName,//用户Id，未登录可以为空，但是不能给null。–此参数来自贵公司传递给小能的参数值–
        uname:this.userinfo.name,//用户名，未登录可以为空，但是不能给null，uname赋予的值显示到小能客户端。–此参数来自用户传递给小能的参数值–
    
        isvip:"0",//是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端上
        userlevel:"0",//站自定义会员级别，1-N，可根据选择判断，取值显示到小能客户端
        erpparam:"",//erpparam为erp功能的扩展字段，可选，购买erp功能后
        itemid:"",//商品ID，商品详情页面用于展示商品的调用参数。
        itemparam:'userNo:'+ this.userinfo.userNo,//商品详情页面的拓展参数，一般用于区分不同设备的拓展参数
      }
    },
    callkf() {
       window.NTKF.im_openInPageChat();
    }
  },
  mounted(){
    this.getUserInfo()
    if(this.status == "suc"){
      document.title='下单成功'
    }else{
      document.title='下单失败'
    }  
  } 
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.backHome{
  background: #2CBB55;
  color: #fff!important;
  margin-top: ~`px2rem(60)`!important;
}
.mkorder{
 padding-top: ~`px2rem(30)`;
 height: auto;
}
.regbox{
  width: ~`px2rem(690)`;
  height: 100%;
  margin-left: ~`px2rem(20)`;
  background-color: #fff;
  border-radius: ~`px2rem(25)`;
  margin: 0 auto!important;
  position: relative;
  padding-bottom: ~`px2rem(60)`;
}
.sucimg{
  width: 70%;
  height: auto;
  margin-top: ~`px2rem(50)`;
}
h1{
  font-size: ~`px2rem(36)`;
  margin: ~`px2rem(50)` 0
}
p{
  width: 80%;
  margin: 0 auto;
  font-size: 14px;
  color: #9da3b4;
}
.getback{
  width: 60%;
  border: ~`px2rem(2)` solid #2CBB55;
  margin: ~`px2rem(0)` auto ~`px2rem(40)`;
  color: #2CBB55;
  display: block;
  margin-top: ~`px2rem(90)`;
}
</style>
