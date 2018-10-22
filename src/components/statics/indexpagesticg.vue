<template>
    <div class="PurchaseBox">
      <ul>
        <li>
          <img src="../../images/activity/offerReward/1.png">
        </li>
        <li>
          <img src="../../images/activity/offerReward/2.png">
        </li>
        <li class="shareBtnBox">
          <button class="shareBtn" @click="showShare">立即邀请领奖金</button>
        </li>
        <li>
          <img src="../../images/activity/offerReward/3.png">
        </li>
      </ul>
      <div class="shareMask" v-if="shareMask" @click="hideMask">
        <img src="../../images/activity/shareBg.png" alt="">
      </div>
    </div>
</template>
<script>
import {loginService} from "../../services/login"
import {Toast} from 'mint-ui'
import wx from 'weixin-js-sdk'
export default {
  name: 'indexpagesticg',
  data () {
    return {
      shareMask:false
    }
  },
  methods: {
    hideMask(){
      this.shareMask = false;
    },
    showShare(){
      this.shareMask = true;
    },
    share(){//分享
      let url = window.location.href;
      loginService.share(url).then(r =>{
        if(r.flag == 20000){
          wx.config({ //微信分享
            debug: false,//开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。 
            appId: 'wx251310eab1c28f68', // 必填，公众号的唯一标识 
            timestamp: r.data.timestamp, // 必填，生成签名的时间戳 
            nonceStr: r.data.nonceStr, //必填， 生成签名的随机串 
            signature: r.data.signature, //必填，签名 
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'] //必填， JS接口列表，这里只填写了分享需要的接口 
          });
        wx.ready(function () { 
          wx_share('多加网-高端医美大健康平台','https://m.dogotsn.com/Invitation/supplier/supplierInv.html','https://m.dogotsn.com/dist/shareHead.png','让高端客户找到与之需求及消费能力匹配的真正好产品！'); 
        }); 
        
        function wx_share(title, link, imgurl, desc) { 
          //朋友圈 
          wx.onMenuShareTimeline({ 
            title: title, // 分享标题 
            link: link, // 分享链接 
            imgUrl: imgurl, // 分享图标 
            success: function() {
            // 用户确认分享后执行的回调函数 
            Toast("分享成功")
            },
            cancel: function() {
            // 用户取消分享后执行的回调函数 
            } 
          }); 
          //微信好友 
          wx.onMenuShareAppMessage({ 
            title: title, // 分享标题 
            desc: desc, // 分享描述 
            link: link, // 分享链接 
            imgUrl: imgurl, // 分享图标 
            type: 'link', // 分享类型,music、video或link，不填默认为link 
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空 
            success: function() {
              // 用户确认分享后执行的回调函数 
              Toast("分享成功")
            }, 
            cancel: function() {
              // 用户取消分享后执行的回调函数 
              }
            });
          //qq 
          wx.onMenuShareQQ({
            title: title, // 分享标题 
            desc: desc, // 分享描述 
            link: link, // 分享链接 
            imgUrl: imgurl, // 分享图标 
            success: function() { 
              // 用户确认分享后执行的回调函数 
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数 
              }
            }); 
          // qq空间 
          wx.onMenuShareQZone({ 
            title: title, // 分享标题 
            desc: desc, // 分享描述 
            link: link, // 分享链接 
            imgUrl: imgurl, // 分享图标 
            success: function() {
              // 用户确认分享后执行的回调函数 
              },
            cancel: function() {
              // 用户取消分享后执行的回调函数 
              }
            });
          }
       }else{
         Toast(r.msg)
       }
      });
    }
  },
  mounted(){
    this.share();
  } 
  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
@import "../../less/functions";
.shareBtnBox{
  padding-top:.2rem;
}
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
      background: #000;
      img{
        width: 100%;
        height: auto;
      }
    }
  }
}
.shareBtn{
  border: none;
  outline: none;
  width: 50%;
  height: 1rem;
  border-radius: 25px;
  background: #2CBB55;
  font-size: 16px;
  color: #fff;
  margin: 0 auto;
  display: block;
}
.shareMask{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.8);
  img{
    width: 70%;
    height: auto;
    margin-top: .5rem;
    float:right;
    margin-right: .5rem;
  }
}

</style>
