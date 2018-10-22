<template>
    <div class="insti-container">
        <div v-if="mediciner" class="upload-container" style="position:relative">
            <h2>营业执照(加盖公章)<span class="doubtBtn" @click="showChangeMask"></span></h2>
             <p class="closeImg" @click="delectImg('50')" v-if="infoFromP.imageUrl[0]"></p>
            <label class="add-pic Single" for="uploadImg" @click="upLoadPic"></label>  
            <img id="seeimg" :src="infoFromP.imageUrl[0]" alt="" @click="preview($event)">
            <input id="uploadImg" type="file" accept="image/*"/>
        </div>
        <h2>上传医疗机构执业许可证<span class="doubtBtn" @click="showHomeMask"></span></h2>
        <div class="loadImg">
            <div id="img-group">
                <div class="img-item" v-for="(item,index) in infoFromP.orgImgUrls" :key="index">
                   <img :src="item" alt="" @click="preview($event)">  
                    <p class="closeImg" ref="closeImg" @click="delectImg(index)"></p>
                </div>
            </div>
            <div class="add-pic" @click="addPic()" v-show="picFlag">
                <input name="files" id="uploaderInput" type="file" accept="image/*"/>
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
            <img src="../images/Licence.png" alt="">
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
  data() {
    return {
      infoFromP:{
         orgImgUrls: [], //检查照片
         imageUrl: [], //营业执照
      },
      loader:true,
      curNumber: 0,
      picFlag: true,
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
    getinfo() {
      loginService.getagentinfo().then(r => {
         if(r.flag ==20000 ){
          this.infoFromP = r.data
        }
      })
    },
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
    upLoadPic() {
      this.infoFromP.imageUrl = [];
      var _this = this;
      $("#uploadImg").change(function() {
          _this.loader = true;
        $(this).focus(); //注意：某些浏览器，比如Android4.2版本的Webview，必须先focus file控件，不然无法弹出文件选择器！！
        $(this).click();
        $(this).hide();
        var file = $(this)[0].files[0]; //获取input file控件选择的文件
        console.log(file);
        _this.ImgToBase64(file, 720, function(base64) {
          
          //预览页面上预留一个img元素，载入base64
          _this.infoFromP.imageUrl.push(base64);
          _this.loader = false;
        });
      });
    },
    Submission() {
      //提交
      if (this.type == "P") {
        //判断是企业还是医生
      let _imgSrc = $("#seeimg").attr("src");
      this.infoFromP.imageUrl.push(_imgSrc);
        if (_imgSrc == "") {
          Toast("您尚未上传营业执照");
        } else {
          loginService.supplierAddImg(this.infoFromP.imageUrl, this.infoFromP.orgImgUrls).then(r => {
            if (r.flag == 20000) {
              // let path = { path: "/accountReceivable", query: { type: "P" } };
              // this.$router.push(path);
              let path = {path: '/registsuc', query: {type: this.type}}
                  this.$router.push(path)
            } else {
              Toast(r.msg);
            }
          });
        }
      } else {
        loginService.supplierDoctorPhotos(this.infoFromP.orgImgUrls).then(r => {
          if (r.flag == 20000) {
            // let path = { path: "/accountReceivable", query: { type: "D" } };
            // this.$router.push(path);
            let path = {path: '/registsuc', query: {type: this.type}}
                this.$router.push(path)
          } else {
            Toast(r.msg);
          }
        });
      }
    },
    delectImg(ind) {
      if(ind == 50){
        this.infoFromP.imageUrl = [];
      }
      this.infoFromP.orgImgUrls.splice(ind, 1);
      this.curNumber = this.infoFromP.orgImgUrls.length;
      if (this.infoFromP.orgImgUrls.length < 9) {
        this.picFlag = true;
      }
    },
    addPic() {
      var vm = this;
      var input = $("#uploaderInput");
      input.unbind("change").on("change", function(e) {
        var files = input[0].files; 
        if(files.length > 0){
          vm.loader = true;
          if (files.length == 9) vm.picFlag = false;
          for (var i = 0; i < files.length; i++) {
              vm.ImgToBase64(files[i], 720, function(base64) {
                  //预览页面上预留一个img元素，载入base64
                  vm.curNumber = vm.infoFromP.orgImgUrls.length + 1;
                  if (vm.infoFromP.orgImgUrls.length < 1) {
                      vm.infoFromP.orgImgUrls.push(base64);
                      vm.loader = false;
                  }
                  if (vm.infoFromP.orgImgUrls.length == 1) vm.picFlag = false;
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
      this.getinfo()
    if (this.type == "P") {
      //判断是企业还是医生
      this.mediciner = true;
    } else {
      this.mediciner = false;
    }
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
      width: 30%;
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

