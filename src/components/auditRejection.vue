<template>
  <div class="audit-container">
      <div class="audit">
          <div class="img_box">
              <img src="../images/res_failBox.png" alt="">
          </div>
          <h2>对不起，您未能通过审核</h2>
          <article>{{msg}}</article>
          <div class="btn-container">
              <button class="modifyBtn" @click="modify">修改注册资料</button>
              <button class="contactBtn" onclick="NTKF.im_openInPageChat()">联系客服</button>
          </div>
      </div>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'mine',
  data () {
    return {
        orgType:this.$route.query.orgType,
        msg:this.$route.query.msg,
        type:this.$route.query.type
    }
  },
  methods: {
    modify(){
         if(this.orgType == 'C') {
            let path = {path: '/regist2c', query: {}}
            this.$router.push(path)
        } else if (this.orgType == 'B') {
            let path = {path: '/regist2b', query: {}}
            this.$router.push(path)
        }else if(this.orgType == 'P'){
            let path = {path: '/perfectInfo', query: {orgType: 'P',type: this.type}}
            this.$router.push(path)
        }
    }
  },
  mounted(){
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.audit-container{
    width: 100%;
    height: 100%;
    background: #1d1d28;
    overflow: hidden;
    .audit{
        width: ~`px2rem(690)`;
        height: 95%;
        background: #fff;
        border-radius: 10px;
        margin: ~`px2rem(30)` auto;
        overflow: hidden;
        h2{
            width: 100%;
            font-size: ~`px2rem(36)`;
            color:#333333;
            text-align: center;
        }
        article{
            width: 75%;
            text-align: center;
            color: #9DA3B4;
            font-size: ~`px2rem(28)`;
            margin: ~`px2rem(30)` auto;
        }
    }
}
.img_box{
    width: 70%;
    margin: ~`px2rem(60)` auto;
    img{
        width: 100%;
        height: auto;
    }
}
.btn-container{
    width: 100%;
    height: auto;
    margin-top: ~`px2rem(60)`;
    button{
        width:55%;
        height: 1.0933333333333333rem;
        line-height: 1.0933333333333333rem;
        text-align: center;
        margin: ~`px2rem(30)` auto;
        display: block;
    }
    .modifyBtn{
        background: linear-gradient(-135deg, #2CBB86 0%, #2CBB55 100%);
        border-radius: 100px;
        color: #fff;
        font-size: ~`px2rem(36)`;
    }
    .contactBtn{
        background: #fff;
        border-radius: 100px;
        color: #2CBB55;
        font-size: ~`px2rem(36)`;
        border:1px solid #2CBB55;
    }
}
</style>
