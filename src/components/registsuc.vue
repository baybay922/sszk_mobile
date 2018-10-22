<template>
  <div class="registsuc talignc">
    <div class="regbox mt30">
      <div class="img-box">
        <img src="../images/res_success.png" class="sucimg">
      </div>
      <h1>我们已经收到您的注册资料</h1>
      <p>1个工作日内，我们将电话联系您核实资料，届时将为您开通使用权限。</p>
      <mt-button type="default" class="getback" @click="getback">我知道了</mt-button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'registsuc',
  data () {
    return {
      orgType:this.$route.query.type
    }
  },
  methods: {
   getback() {
     console.log(this.orgType)
     if(this.orgType == "P" || this.orgType == "D"){
       let path = {path: '/supplierLogin',query: {}};
        this.$router.push(path);
     }else{
       let path = {path: '/login',query: {}};
      this.$router.push(path);
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
.img-box{
  width:70%;
  height: auto;
  margin: 40px auto;
}
.img-box img{
  height: auto;
  width:100%;
}

.registsuc{
  width: 94%;
    height: 95%;
    overflow: hidden;
    border-radius: 15px;
    background-color: #fff;
    margin: .4rem auto;
}
.regbox{
  width:95%;
  height: 100%;  
  margin: .4rem auto 0!important;
}

h1{
  font-size:18px;
  margin:2rem auto .5rem;
  color:#333;
}
.regbox p{
  color: #9da3b4;
  width:70%;
  margin: 0 auto;
  font-size: 14px;
}
.getback{
  width:60%;
  height: 1rem;
  color:#2CBB55;
  border: 1px solid #2CBB55;
  position: absolute;
  bottom: 48px;
  left: 50%;
  margin-left: -30%;
}
</style>
