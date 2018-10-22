<template>
  <div class="regist2b mt30 talignc">
      <div class="talignc">
        <div class="load-img">
          <img id="seeimg" name="seeimg" :src="imgUrl[0]" @click="preview()">          
        </div>
      </div>
       <div id="ossfile">          
          <div id="container" class="loadBtn">
            <label for="uploadImg" class='btn'>
             上传营业执照
            </label>
          </div>           
      </div>
      <mt-field placeholder="请输入企业名称" v-model="infoFormB.orgName" class="mt30 info-box getComppenterName" @blur.native.capture="getOrgNameVal"></mt-field>
      <mt-field placeholder="请输入负责人姓名" v-model="infoFormB.leaderName" class="mt30 info-box getResponsible" @blur.native.capture="getleaderNameVal"></mt-field>
      <mt-field placeholder="请输入负责人身份证号" v-model="infoFormB.idCardNo" class="mt30 info-box lieaderId"></mt-field>
      <mt-field placeholder="请输入联系邮箱" type="email" v-model="infoFormB.email" class="mt30 info-box"></mt-field>
      <mt-button type="primary" class="loginbutton" @click="submitinfo">下一步</mt-button>
      <Loader v-if="loader"></Loader>
      <input type="file" id="uploadImg" @change="upLoadPic" accept="image/*">
        <div class="imgMark" @click="markHide()" v-if="mark">
        <img :src="imgUrl" alt="">
      </div>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import '../../libs/uptooss/style.css'
import $ from 'jquery'
import Loader from './loading';

export default {
  name: 'regist2b',
  data () {
    return {
      orgType: 'B',
      infoFormB: {
        orgName: '',        
        leaderName: '',
        idCardNo:'',
        email: ''
      },
      loader:true,
      imgUrl: [],
      mark:false,
      orgNameStutas:false
    }
  },
  methods: {
    getOrgNameVal(){
      var reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g;
      if(reg.test(this.infoFormB.orgName)){
        Toast("请输入正确的企业名称");
        this.orgNameStutas = false;
        return;
      }else{
        this.orgNameStutas = true;
      }
    },
    getleaderNameVal(){
      var reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g;
      if(reg.test(this.infoFormB.leaderName)){
        Toast("请输入正确的负责人姓名");
        return;
      }
    },
    preview(){
      this.mark = true;
    },
    markHide(){
      this.mark = false
    },
    upLoadPic(){
      this.imgUrl = [];
      var _this = this;
          _this.loader = true;
          $("#uploadImg").focus();//注意：某些浏览器，比如Android4.2版本的Webview，必须先focus file控件，不然无法弹出文件选择器！！
          $("#uploadImg").click();
          $("#uploadImg").hide();
          var file =$("#uploadImg")[0].files[0];//获取input file控件选择的文件
          _this.ImgToBase64(file, 720, function (base64) {
              //预览页面上预留一个img元素，载入base64
               _this.imgUrl.push(base64);
               _this.loader = false;

          });
    },
    ImgToBase64(file, maxLen, callBack){
      var _this = this;     
      var img = new Image();
      var reader = new FileReader();//读取客户端上的文件
      reader.onload = function () {
          var url = reader.result;//读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
          img.src = url;//reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
      };
      img.onload = function () {
          //生成比例
          var width = img.width, height = img.height;
          //计算缩放比例
          var rate = 1;
          if (width >= height) {
              if (width > maxLen) {
                  rate = maxLen / width;
              }
          } else {
              if (height > maxLen) {
                  rate = maxLen / height;
              }
          };
          img.width = width * rate;
          img.height = height * rate;
          //生成canvas
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          var base64 = canvas.toDataURL('image/jpeg', 0.9);
          callBack(base64);
         $("#uploadImg").show();
      };
      reader.readAsDataURL(file);      
      
    },
    getinfo() {
      loginService.getagentinfo().then(r => {
        this.infoFormB = r.data ;
        this.imgUrl.push(r.data.imgUrl[0])      
      })
    },
    
    submitinfo() {      
       var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(this.imgUrl.length == 0){
          Toast("请上传图片"); 
          return;
        }
        if(this.infoFormB.orgName == "" && !this.orgNameStutas){
          Toast("请输入正确的企业名称")
        }
        if( this.infoFormB.leaderName == ""){
          Toast("请输入正确的负责人姓名")
        }
        if(this.infoFormB.idCardNo == ""){
          Toast("请输入正确的身份证号")
        }
        if( this.infoFormB.email == "" ){
          Toast("请输入邮箱地址")
        }
        if( this.infoFormB.email && !myreg.test(this.infoFormB.email) ){
          Toast("请输入正确的邮箱地址")
        }else{
          if(this.orgNameStutas){
            loginService.subinfoB(this.infoFormB.orgName, this.imgUrl, this.infoFormB.leaderName, this.infoFormB.idCardNo, this.infoFormB.email).then(r => {
              console.log(r)
              if (r.flag == 20000) {
                let path = {path: '/registsuc', query: {type: this.type}}
                    this.$router.push(path)
              }else if(r.flag == 40001) {
                let obj = $.parseJSON(r.data)
                let arr = []
                if(obj !== {}){
                  for(var i in obj) {
                    if(i == 'orgName'){
                      Toast(obj[i])
                      return
                    }else if(i == 'imgUrl'){
                      Toast(obj[i])
                      return
                    }else if(i == 'leaderName'){
                      Toast( obj[i])
                      return
                    }else if(i == 'email'){
                      Toast(obj[i])
                      return
                    }
                  }
                }
              }else {
                Toast(r.msg)
              }
            }).catch(e => {
              console.log(e)
            });
          }else{
            Toast("请输入正确的企业名称")
          }
          
        }
        
      
    }
  },
  mounted(){
    $("#uploadImg").show();
    $("body").css({
      "overflow":"hidden"
    })
    this.getinfo();
    this.loader = false;
    $(".getComppenterName").find("input").attr({maxlength:"20"})
    $(".getResponsible").find("input").attr({maxlength:"5"});
    $(".lieaderId").find("input").attr({maxlength:"18"})
    this.getOrgNameVal();
    this.getleaderNameVal();
  },
  components:{
    Loader
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.talignc{
  margin: 0!important;
  background: #1d1d28;
}
.loadBtn{
  width:65%;
  position: absolute!important;
  right: 0;
  top: 10%;
  form{
    opacity: 0;
    position: fixed;
    top: -999px;
    left: -999px;
  }
}
.load-img{
  width:80%;
  height: 100%;
  height: 133px;
  min-height: 133px;
  background: #F6F6F6 url(../images/Group.png) no-repeat 10% center ;
  border-radius: 10px;
  margin: .4rem auto;
  padding: 5%;
  overflow: hidden;
  position: relative;
}
.load-img img{
  width:45%;
  height: 100%;
  float: left;
}
.info-box{
  width:90%;
  margin: .4rem auto;
  border-bottom: 1px solid #363645;
  color: #9DA3B4;
}
// .regist2b{
//   padding-top: ~`px2rem(20)`;
// }
.info{
  width: ~`px2rem(580)`;
  margin: ~`px2rem(20)` ~`px2rem(80)`;
  color: #9DA3B4;
  text-align: left;
  font-size: 14px;
}
.btn{
  width: ~`px2rem(280)`;
  height: ~`px2rem(50)`;
  border-radius: ~`px2rem(100)`;
  line-height: ~`px2rem(50)`;
  font-size: ~`px2rem(30)`;
  background: none;
  color: #C6B076;
  border: ~`px2rem(2)` solid #C6B076;
  margin-top: ~`px2rem(30)`;
  padding:6px 0!important;
}
.loginbutton{
  width:80%;
  background:-webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
  margin-top:~`px2rem(30)`!important;
}
#uploadImg{
  width: 50%;
  height: 133px;
  position: absolute;
  top: 5%;
  right: 0;
  opacity: 0;

}
.imgMark{
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  background: rgba(0,0,0,.7);
  display:flex;
  align-items: center;
  justify-content: center;
  img{
    max-width:100%;
  }
}
</style>
