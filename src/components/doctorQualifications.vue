<template>
    <div class="insti-container">
        <h2>上传身份证照片</h2>
        <div class="idImg-container">
            <div class="loadImg">
              <div id="img-group">
                  <div class="img-item" v-for="(item,index) in infoFromP.positive" :key="index">
                    <img :src="item" alt="" @click="preview($event)">  
                    <p class="closeImg" ref="closeImg" @click="delectImg(index,infoFromP.positive,'positiveBtn')"></p>
                  </div>
              </div>
              <div class="add-pic" @click="addPic(infoFromP.positive,'positiveBtn',positiveFlag)" v-show="positiveFlag">
                  <input name="files" id="positiveBtn" type="file" accept="image/*"/>
              </div>
              <p class="posture">正面</p>
          </div>
        <div class="loadImg">
            <div id="img-group">
                <div class="img-item" v-for="(item,index) in infoFromP.opposite" :key="index">
                   <img :src="item" alt="" @click="preview($event)">  
                    <p class="closeImg" ref="closeImg" @click="delectImg(index,infoFromP.opposite,'oppositeBtn')"></p>
                </div>
            </div>
            <div class="add-pic" @click="addPic(infoFromP.opposite,'oppositeBtn',oppositeFlag)" v-show="oppositeFlag">
                <input name="files" id="oppositeBtn" type="file" accept="image/*"/>
            </div>
            <p class="posture">反面</p>
        </div>
        </div>
        <h2>上传医师资格证书<span class="doubtBtn" @click="showHomeMask()"></span></h2>
        <div class="loadImg">
          <div id="img-group">
              <div class="img-item" v-for="(item,index) in infoFromP.certificate" :key="index">
                <img :src="item" alt="" @click="preview($event)">  
                <p class="closeImg" ref="closeImg" @click="delectImg(index,infoFromP.certificate,'certificateBtn')"></p>
              </div>
          </div>
          <div class="add-pic" @click="addPic(infoFromP.certificate,'certificateBtn',certificateFlag)" v-show="certificateFlag">
              <input name="files" id="certificateBtn" type="file" accept="image/*"/>
          </div>
        </div>
        <h2>上传医师执业证书<span class="doubtBtn" @click="showChangeMask()"></span></h2>
        <div class="idImg-container">
            <div class="loadImg">
              <div id="img-group">
                  <div class="img-item" v-for="(item,index) in infoFromP.homepage" :key="index">
                    <img :src="item" alt="" @click="preview($event)">  
                      <p class="closeImg" ref="closeImg" @click="delectImg(index,infoFromP.homepage, 'homepageBtn')"></p>
                  </div>
              </div>
              <div class="add-pic" @click="addPic(infoFromP.homepage, 'homepageBtn',homepageFlag)" v-show="homepageFlag">
                  <input name="files" id="homepageBtn" type="file" accept="image/*"/>
              </div>
              <p class="posture">首页</p>
          </div>
          <div class="loadImg">
              <div id="img-group">
                  <div class="img-item" v-for="(item,index) in infoFromP.record" :key="index">
                    <img :src="item" alt="" @click="preview($event)">  
                      <p class="closeImg" ref="closeImg" @click="delectImg(index,infoFromP.record, 'recordBtn')"></p>
                  </div>
              </div>
              <div class="add-pic" @click="addPic(infoFromP.record, 'recordBtn',recordFlag)" v-show="recordFlag">
                  <input name="files" id="recordBtn" type="file" accept="image/*"/>
              </div>
              <p class="posture">变更注册记录页</p>
          </div>
        </div>
        <button class="Submission" @click="Submission">下一步</button>
        <p class="Prompt">我们承诺您的资质照将仅用于多加审核</p>
        <div>
      </div> 
      <Loader v-if="loader"></Loader>
      <div class="imgMark" @click="markHide()" v-if="mark">
        <img :src="imgUrl" alt="">
      </div>
      <div class="example-mask" v-if="changeMask">
         <div class="example-img">
            <p class="example-title">示例图</p>
            <img src="../images/change.png" alt="">
            <button class="hidemask" @click="hideExampleMak">知道了</button>
        </div>
      </div>
      <div class="example-mask" v-if="homeMask">
         <div class="example-img">
            <p class="example-title">示例图</p>
            <img src="../images/Qualifications.png" alt="">
            <button class="hidemask" @click="hideExampleMak">知道了</button>
        </div>
      </div>
    </div>
</template>
<script>
import { loginService } from "../services/login";
import { Toast } from "mint-ui";
import $ from "jquery";
import Loader from './loading';
export default {
  name:'doctorQualifications',
  data() {
    return {
      infoFromP:{
         positive: [],//正面照片
         opposite: [],//反面照片
         certificate: [],//上传医师资格证书
         homepage: [],//首页
         record: [],//更变纪录
      },
      loader:true,
      curNumber: 0,
      picFlag: true,
      certificateFlag:true,
      positiveFlag: true,
      oppositeFlag: true,
      homepageFlag: true,
      recordFlag: true,
      type: this.$route.query.type,
      mediciner: true,
      imgUrl:"",
      mark:false,
      tap:true,
      changeMask: false,
      homeMask:false
    };
  },
  methods: {
    ImgToBase64(file, maxLen, callBack) {
      var _this = this;
      var img = new Image();
      var reader = new FileReader(); //读取客户端上的文件
      reader.onload = function() {
        var url = reader.result; //读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
        img.src = url; //reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
      };
      img.onload = function() {
        //生成比例
        var width = img.width,
          height = img.height;
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
        }
        img.width = width * rate;
        img.height = height * rate;
        //生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var base64 = canvas.toDataURL("image/jpeg", 0.9);
        callBack(base64);
      };
      reader.readAsDataURL(file);
    },
    preview(e){
      this.mark = true;
      let url = $(e.target).attr('src');
      this.imgUrl = url;
    },
    markHide(){
      this.mark = false;
    },
    Submission() {//提交
      if(this.infoFromP.positive == ""){
        Toast("您尚未上传身份证正面照片");
        return;
      }
      if(this.infoFromP.opposite == ""){
        Toast("您尚未上传身份证反面照片");
        return;
      }
      if(this.infoFromP.certificate == ""){
        Toast("您尚未上传医师资格证书");
        return;
      }
      if(this.infoFromP.homepage == ""){
       Toast("您尚未上传医师执业证书的首页");
       return;
      }
      if(this.infoFromP.record == ""){
        Toast("您尚未上传医师执业证书的变更注册记录页") ;
        return;
      }else{
        loginService.setDoctorImgInfo(this.infoFromP.positive, this.infoFromP.opposite, this.infoFromP.certificate, this.infoFromP.homepage, this.infoFromP.record).then((r)=>{
          if(r.flag == 20000){
            let path = {path: '/registsuc', query: {type: this.type}}
                  this.$router.push(path)
          }else{
            Toast(r.msg)
          }
        })
      }
      
    },
    delectImg(ind,arrObject,btnElement) {
      arrObject.splice(ind, 1);
      if (arrObject.length < 1) {
        $("#"+btnElement+"").parent(".add-pic").show()
      }
    },
    addPic(arrObject,btnElement,eleFlag) {
      var vm = this;
      var input = $("#"+btnElement+"");
      input.unbind("change").on("change", function(e) {
        var files = input[0].files; 
        if(files.length > 0){
          vm.loader = true;
          if (files.length == 1) $(this).parent(".add-pic").hide();
          for (var i = 0; i < files.length; i++) {
              vm.ImgToBase64(files[i], 720, function(base64) {
                  //预览页面上预留一个img元素，载入base64
                  //vm.curNumber = arrObject.length + 1;
                  if (arrObject.length < 1) {
                      arrObject.push(base64);
                      vm.loader = false;
                  }
                  if (arrObject.length == 1) $(this).parent(".add-pic").hide();
              });
          }
        }       
        
      });
    },
    showHomeMask(){//显示首页示例图
      this.homeMask = true
    },
    showChangeMask(){//显示更换纪录示例图
      this.changeMask = true
    },
    hideExampleMak(){
      this.homeMask = false
      this.changeMask = false
    }
  },
  mounted() {
    this.loader = false;
    loginService.getagentinfo().then((r)=>{
      console.log(r)
      if(r.flag == 20000){
        if(r.data.identityCard1 == "" || r.data.identityCard2 == "" || r.data.orgImgUrls == "" || r.data.homePage == "" || r.data.change == ""){ 
          this.certificateFlag = true
          this.positiveFlag = true
          this.oppositeFlag = true
          this.homepageFlag = true
          this.recordFlag = true
        }else{
          this.infoFromP.positive = r.data.identityCard1
          this.infoFromP.opposite = r.data.identityCard2
          this.infoFromP.certificate = r.data.orgImgUrls
          this.infoFromP.homepage = r.data.homePage
          this.infoFromP.record = r.data.change;

          this.certificateFlag = false
          this.positiveFlag = false
          this.oppositeFlag = false
          this.homepageFlag = false
          this.recordFlag = false
        }
      }else{
          Toast(r.msg)
      }
    })
  },
  components:{
      Loader
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.insti-container {
  width: 95%;
  height: 100%;
  background: #1d1d28;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 auto;
  h2 {
    font-weight: normal;
    color: #fff;
    font-size: 16px;
    padding: 0.5rem 0;
    text-indent: 0.5rem;
    display: -webkit-flex;
    align-items: center;
  }
  .Submission {
    width: 75%;
    background-image: linear-gradient(-135deg, #2cbb86 0%, #2cbb55 100%);
    border-radius: 50px;
    padding: 0.2rem 0;
    margin: 1rem auto 0;
    display: block;
    color: #fff;
    font-size: 16px;
  }
  .Prompt {
    width: 75%;
    color: #999;
    font-size: 12px;
    margin: 0.5rem auto;
    text-align: center;
  }
  #img-group {
    width: 95%;
    height: auto;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 auto;
    .img-item {
      width: 100%;
      height: 2rem;
      position: relative;
      margin: 0.2rem 0.15rem;
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      .closeImg {
        width: 0.5rem;
        height: 0.5rem;
        position: absolute;
        right: 0;
        top: 0;
        background: url(../images/addInfo/deleteImg.png) no-repeat center;
        background-size: contain;
      }
    }
  }
  .img-item img {
    width: 100%;
    height: auto;
  }
  .add-pic {
    background: url(../images/addInfo/addImg.png) no-repeat center;
    background-size: contain;
    width:2.4rem;
    height: 2.3rem;
    display: block;
    font-size: 2rem;
    color: #979797;
    position: relative;
    overflow: hidden;
    margin-left: 5%;
    border-radius: 5px;
    margin-right: ~`px2rem(30)`;
    img {
      width: 100%;
      height: auto;
    }
  }

  .add-pic input {
    opacity: 0;
  }
}
.insti-container::-webkit-scrollbar {
  display: none;
}
.loadImg {
  width:33%;
  position: relative;
}
.upload-container {
  input {
    visibility: hidden;
    position: fixed;
    top: -999;
  }
  .closeImg {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  left: 2.45rem;
  top:1.45rem;
  z-index:222;
  background: url(../images/addInfo/deleteImg.png) no-repeat center;
  background-size: contain;
}
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
#seeimg{
    max-width: 2.4rem;
    height: 2.3rem;
    position: absolute;
    top: 1.5rem;
    left: 0.5rem;
}
.idImg-container{
    width: ~`px2rem(690)`;
    margin: 0 auto;
    display: -webkit-flex;
    justify-content: flex-start;
}
.posture{
    width: 100%;
    color: #999;
    font-size: ~`px2rem(24)`;
    text-align: center;
    margin-top: ~`px2rem(20)`;
}
.doubtBtn{
  width: ~`px2rem(24)`;
  height: ~`px2rem(24)`;
  display: block;
  background: url("../images/doubt.png") no-repeat center;
  background-size: contain;
  margin-left: ~`px2rem(20)`;
}
.example-mask{
  width:100%;
  height: 100%;
  background: rgba(0,0,0,.8);
  position: fixed;
  top: 0;
  left: 0;
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
.example-img{
  width: ~`px2rem(576)`;
  height: ~`px2rem(576)`;
  background: #fff;
  position: relative;
  top: 50%;
  left: 50%;
  margin:~`px2rem(-288)`;
  border-radius: 12px;
  text-align: center;
  img{
    width: ~`px2rem(450)`;
    height: ~`px2rem(300)`;
  }
  p{
    width: 100%;
    color: #4A4A4A;
    font-size: ~`px2rem(34)`;
    padding: ~`px2rem(40)` 0;
  }
  button{
    width:100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: transparent;
    color: #2CBB55;
    border-top: ~`px2rem(1)` solid #e5e5e5;
    font-size: ~`px2rem(30)`;
    padding: ~`px2rem(30)` 0;
  }
}
</style>

