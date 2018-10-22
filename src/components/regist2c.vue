<template>
  <div class="regist2c mt30">
    <div class="talignc">
      <mt-field placeholder="请输入姓名" v-model="infoFormC.name" class="mt30 info-box" @blur.native.capture="getOrgNameVal"></mt-field>
      <mt-field placeholder="请输入身份证号" v-model="infoFormC.idCardNo" class="mt30 info-box"></mt-field>
      <mt-field placeholder="请输入电子邮箱" type="email" v-model="infoFormC.email" class="mt30 info-box"></mt-field>
      <!-- <mt-field placeholder="请输入推荐人的手机号(选填)" type="tel" v-model="infoFormC.inviterPhone" class="mt30 info-box"></mt-field> -->
      <mt-button type="primary" class="loginbutton mt30 submitBtn" @click="submitinfo">提交资料</mt-button>
      <p class="info">提交资料之后，我们会于1个工作日内电话联系您核实资料，届时将为您开通使用权限</p>
    </div>    
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'regist2c',
  data () {
    return {
      orgType: 'C',//注册类型  B-企业，C-个人
      infoFormC: {
        name: '',
        idCardNo: '',
        email: '',
      },
      orgNameStutas:false
    }
  },
  methods: {
    getOrgNameVal(){
      var reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g;
      if(reg.test(this.infoFormC.name)){
        Toast("请输入正确的企业名称");
        this.orgNameStutas = false;
        return;
      }else{
        this.orgNameStutas = true;
      }
    },
    getinfo() {
      loginService.getagentinfo().then(r => {
        this.infoFormC = r.data
      })
    },
    submitinfo() {
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      console.log(this.infoFormC.name)
         if((this.infoFormC.name === "" || this.infoFormC.name == undefined) && !this.orgNameStutas){
          Toast("请输入正确的企业名称")
          }else{
            if(!myreg.test(this.infoFormC.email) || this.infoFormC.email == ""){
          Toast("请输入正确的邮箱地址")
        }else{
          loginService.subinfoC(this.infoFormC.name, this.infoFormC.idCardNo, this.infoFormC.email).then(r => {
            if (r.flag == 20000) {
              let path = {path: '/registsuc',query:{}}
              this.$router.push(path)
              return
            }else if(r.flag == 40001) {
              let obj = $.parseJSON(r.data)
              let arr = []
              if(obj !== {}){
                for(var i in obj) {
                  if(i == 'name'){
                    Toast(obj[i])
                    return
                  }else if(i == 'idCardNo'){
                    Toast( obj[i])
                    return
                  }else if(i == 'email'){
                    Toast(obj[i])
                    return
                  }
                }
              }
            } else {
              Toast(r.msg)
            }
          }).catch(e => {
            console.log(e)
          });
        }
        
          }
        
        
    }
  },
  mounted() {
    //this.imports()
  },
  created() {
    this.getinfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.mt30{
  margin: 0rem auto!important;
}
.submitBtn{
  width:80%;
  background:-webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
  margin-top: .8rem!important;
  font-size: 18px;
}
.info-box{
  width:80%;
  margin: 0rem auto;
  border-bottom:1px solid #484855;
  padding-top: .4rem;
}

.regist2c{
  padding-top: ~`px2rem(20)`;
}
.dn{
  display: none;
}
.info{
  width:80%;
  margin: .4rem auto;
  color: #9DA3B4;
  text-align: left;
  font-size: 14px;

}

</style>
