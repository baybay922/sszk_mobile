<template>
    <div class="audits-wrapper">
        <div class="audits-info">
          <img src="../images/audits.png" alt="">
        </div>
        <div class="audits-title">
          企业资料审核中，请耐心等待...</br>
          审核结果预计将在3个工作日内通知您，</br>
          如有问题，请拨打客服电话</br>
        </div>
        <div class="phoneBox">
          <a href="tel:4001116369">111-6369</a>
        </div>
    </div>
</template>
<script>
import { loginService } from "../services/login";
import { Toast } from "mint-ui";
import $ from "jquery";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
@import "../less/functions";
.audits-wrapper{
    width: 100%;
    height: 100%;
    background: #1d1d28;
    overflow: hidden;
}
.audits-info{
  width: 25%;
  margin: ~`px2rem(300)` auto 0;
  img{
    width: 100%;
    height: 100%;
  }
}
.audits-title{
  width: 75%;
  text-align: center;  
  color: #9DA3B4;
  font-size: ~`px2rem(28)`;
  margin:~`px2rem(40)` auto;
}
.phoneBox{
  width: 100%;
  text-align: center;  
  font-size:~`px2rem(35)`;
  a{
    color: #F5A623;
    text-decoration:underline;
    padding: 0 0 0 ~`px2rem(60)`;
    background: url("../images/audiusPhone.png") no-repeat left center;
    background-size: ~`px2rem(40)`;
  }
}
</style>

