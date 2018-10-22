<template>
  <div class="evaluation">
    <p class="title mt30" v-if="orgType">请对此订单供应商的服务满意度进行评价</p>
    <p class="title mt30" v-else>请对此订单渠道商的满意度进行评价</p>
    <div class="pointbox">
      <span @click="sendevaluation.oppScore = 1"><img v-if="sendevaluation.oppScore >= 1" src="../images/startdone.png"><img v-if="sendevaluation.oppScore < 1" src="../images/startnone.png"></span>
      <span @click="sendevaluation.oppScore = 2"><img v-if="sendevaluation.oppScore >= 2" src="../images/startdone.png"><img v-if="sendevaluation.oppScore < 2" src="../images/startnone.png"></span>
      <span @click="sendevaluation.oppScore = 3"><img v-if="sendevaluation.oppScore >= 3" src="../images/startdone.png"><img v-if="sendevaluation.oppScore < 3" src="../images/startnone.png"></span>
      <span @click="sendevaluation.oppScore = 4"><img v-if="sendevaluation.oppScore >= 4" src="../images/startdone.png"><img v-if="sendevaluation.oppScore < 4" src="../images/startnone.png"></span>
      <span @click="sendevaluation.oppScore = 5"><img v-if="sendevaluation.oppScore >= 5" src="../images/startdone.png"><img v-if="sendevaluation.oppScore < 5" src="../images/startnone.png"></span>
    </div>
    <p class="title mt30">请对此订单产品质量进行评价</p>
    <div class="pointbox">
      <span @click="sendevaluation.orderScore = 1"><img v-if="sendevaluation.orderScore >= 1" src="../images/startdone.png"><img v-if="sendevaluation.orderScore < 1" src="../images/startnone.png"></span>
      <span @click="sendevaluation.orderScore = 2"><img v-if="sendevaluation.orderScore >= 2" src="../images/startdone.png"><img v-if="sendevaluation.orderScore < 2" src="../images/startnone.png"></span>
      <span @click="sendevaluation.orderScore = 3"><img v-if="sendevaluation.orderScore >= 3" src="../images/startdone.png"><img v-if="sendevaluation.orderScore < 3" src="../images/startnone.png"></span>
      <span @click="sendevaluation.orderScore = 4"><img v-if="sendevaluation.orderScore >= 4" src="../images/startdone.png"><img v-if="sendevaluation.orderScore < 4" src="../images/startnone.png"></span>
      <span @click="sendevaluation.orderScore = 5"><img v-if="sendevaluation.orderScore >= 5" src="../images/startdone.png"><img v-if="sendevaluation.orderScore < 5" src="../images/startnone.png"></span>
    </div>
    <p class="title mt30">请对平台的服务满意度进行评价</p>
    <div class="pointbox">
      <span @click="sendevaluation.platformScore = 1"><img v-if="sendevaluation.platformScore >= 1" src="../images/startdone.png"><img v-if="sendevaluation.platformScore < 1" src="../images/startnone.png"></span>
      <span @click="sendevaluation.platformScore = 2"><img v-if="sendevaluation.platformScore >= 2" src="../images/startdone.png"><img v-if="sendevaluation.platformScore < 2" src="../images/startnone.png"></span>
      <span @click="sendevaluation.platformScore = 3"><img v-if="sendevaluation.platformScore >= 3" src="../images/startdone.png"><img v-if="sendevaluation.platformScore < 3" src="../images/startnone.png"></span>
      <span @click="sendevaluation.platformScore = 4"><img v-if="sendevaluation.platformScore >= 4" src="../images/startdone.png"><img v-if="sendevaluation.platformScore < 4" src="../images/startnone.png"></span>
      <span @click="sendevaluation.platformScore = 5"><img v-if="sendevaluation.platformScore >= 5" src="../images/startdone.png"><img v-if="sendevaluation.platformScore < 5" src="../images/startnone.png"></span>
    </div>
    <div class="evaNotes">
      <textarea cols="49" rows="10" placeholder="请告诉我们关次订单您想向我们表达的内容，非常感谢" v-model="sendevaluation.evaNotes"></textarea>
    </div>

  <!-- 上传图片 -->
    <div class="upload-container">
        <h2>上传照片（<span>{{curNumber2}}</span>/5）</h2>
        <div class="loadImg">
            <div id="img-group">
                <div class="img-item" v-for="(item,index) in inspect2" :key="index">
                    <img :src="item" alt="" @click="preview($event)">
                    <p class="closeImg" ref="closeImg2" @click="delectImg2(index)"></p>
                </div>
            </div>
            <div class="add-pic" @click="addPic2()" v-show="picFlag2">
                <input name="files2" id="uploaderInput2" type="file" accept="image/*" />
            </div>
        </div>
    </div>
    
    <div class="radioBox">
       <label for="choose" class="choose bg"><span>您的评论将会被匿名</span></label>
       <input type="checkbox" id="choose" :checked="checkVal" @click="checkedFn($event)">
    </div>
    <div class="talignc">
      <mt-button type="primary" class="loginbutton mt30" @click="submit">提交评价</mt-button>
    </div>
    <Loader v-if="loader"></Loader> 
    <div class="imgMark" @click="markHide()" v-if="mark">
        <img :src="imgUrl" alt="">
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {loginService} from "../services/login"
import {Toast} from 'mint-ui';
import Loader from './loading';
export default {
  name: 'evaluation',
  data () {
    return {
      loader:true,
      orderNo: this.$route.query.orderNo,
      curNumber2:0,
      checkVal:true,
      showExampleImg:false,
      picFlag2:true,
      inspect2: [],
      sendevaluation: {
        oppScore: 1,
        evaNotes: '',
        orderScore: 1,
        platformScore: 1,
        evaType: 0
      },
      orgType:true,
      evaluationImgs:[],
      anonymity:'0',
      mark:false,
      imgUrl:""
    }
  },
  methods: {
    preview(e){
      this.mark = true;
      let url = $(e.target).attr('src');
      this.imgUrl = url;
    },
    markHide(){
      this.mark = false;
    },
    submit() {
      this.evaluationImgs = this.inspect2;
      loginService.evaluationAdd(this.orderNo, this.sendevaluation.evaNotes, this.sendevaluation.orderScore, this.sendevaluation.platformScore, this.sendevaluation.oppScore, this.sendevaluation.evaType,this.evaluationImgs,this.anonymity).then(r => {
        if (r.flag == 20000) {
          loginService.myInfo().then(r => {
          if (r.flag == 20000) {
            if(r.data.orgType == "P"){//判断是不是供应商
              Toast("评价成功")
              let path = {path: '/suporderinfo', query:{orderNo: this.orderNo}}
              this.$router.push(path)
            }else{
              Toast("评价成功")
              let path = {path: '/agentorderinfo', query:{orderNo: this.orderNo}}
              this.$router.push(path)
            }
          } else {
             Toast(r.msg)
          }
          })     
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    showExample(){
        this.showExampleImg = true;
    },
    RemoveValByIndex2(arr, index) {//上传照片
        arr.splice(index, 1);
    },
    delectImg2(ind){
        this.RemoveValByIndex2(this.inspect2,ind)
        this.curNumber2 = this.inspect2.length
        if(this.inspect2.length < 5){
            this.picFlag2 = true
        }
    },
    checkedFn(e){
      if(e.target.checked){
        this.anonymity = "0"
        $('.choose').addClass('bg')
      }else{
        this.checkVal = false;
        this.anonymity = "1";
        $('.choose').removeClass('bg')
      }
    },
    addPic2(){
        var vm = this;
            var input = $("#uploaderInput2");
            input.unbind('change').on('change', function (e) {               
                var files = input[0].files;
                 if(files.length > 0 ){
                   vm.loader = true
                   if (files.length == 5) vm.picFlag2 = false;
                  for (var i = 0; i < files.length; i++) {
                      vm.ImgToBase64(files[i], 720, function(base64) {
                          //预览页面上预留一个img元素，载入base64
                          vm.curNumber2 = vm.inspect2.length + 1;
                          if (vm.inspect2.length < 5) {
                              vm.inspect2.push(base64);
                              vm.loader = false;
                          }
                          if (vm.inspect2.length == 5) vm.picFlag2 = false;
                      });
                  }
                 }
                
            });
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
  },
  mounted(){
    this.loader = false;
    loginService.myInfo().then(r => {
      if (r.flag == 20000) {
        if(r.data.orgType == "P"){//判断是不是供应商
          this.orgType = false;
          this.sendevaluation.evaType = "1";
        }else{
          this.orgType = true;
          this.sendevaluation.evaType = "0";
        }
      }
      })
  },
  components:{
    Loader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.evaluation{
  padding: ~`px2rem(30)`;
  .title{
    color: #fff;
    font-size: ~`px2rem(30)`;
  }
  .pointbox{
    margin: ~`px2rem(20)` ~`px2rem(0)`;
    span{
      margin-right: ~`px2rem(20)`;
      img{
        width: ~`px2rem(38)`;
        height: ~`px2rem(38)`;
      }
    }
  }
  .evaNotes{
    width:100%;
    border-radius: 10px;
    overflow: hidden;
    margin-top: ~`px2rem(40)`;
    background: #272734;
    textarea{
      width: 100%;
      height: 100%;
      line-height: ~`px2rem(42)`;
      color: #fff;
      text-indent: .4rem;
       background: #272734;
       outline: none;
       border: none;
       padding: .2rem 0;
    }
  }
}
.talignc{
  width: 100%;
  height: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 22;
  button{
    width: 100%;
    border:none;
    background: linear-gradient(-135deg, #2CBB86 0%, #2CBB55 100%);
    border-radius: 0;
  }
}
.upload-container{
    width: 95%;
    height: auto;
    h2{
        width: 100%;
        padding: .3rem 0;
        color:#fff;
        display: flex;
        font-size: 12px;
        position: relative;
        p{
            color: #F5A623;
        }
    }
}
#img-group{
      width: 95%;
      height: auto;
      display: -webkit-flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      // margin: 0 auto;
      .img-item {
          width: 30%;
          height: 2rem;
          position: relative;
          margin-bottom: 0.2rem;
          margin-right: 0.15rem;
          position: relative;
          border-radius: 5px;
          overflow: hidden;
          .closeImg{
              width: .5rem;
              height: .5rem;
              position: absolute;
              right: 0;
              top: 0;
              background:url(../images/addInfo/deleteImg.png) no-repeat center;
              background-size: contain
          }
      }
  }
  .img-item img {
      width: 100%;
      height: auto;
  }
  .add-pic {
      background: url(../images/addInfo/addImg.png) no-repeat 8px center;
      background-size: contain;
      width: 30%;
      height: 2rem;
      text-align: center;
      font-size: 2rem;
      line-height: 3.5rem;
      color: #979797;
      position: relative;
      overflow: hidden;
      margin-left:~`px2rem(-16)`;
      a{
          display: block;
          width: 100%;
          height: 100%;
      }
  }

  .add-pic input {
      opacity: 0;
  }
  .radioBox{
    margin-top:~`px2rem(25)`;
    position: relative;
    display:flex;
    padding-bottom: 1rem;
   label{
      display: inline-block;
      width:18px;
      height:18px;
      border-radius: 50%;
      background: url('../images/check.png') center center;
      background-size: 100% 100%;
      border-color:#2CBB86;
      margin-right:0.2rem;
    }
    label.bg{
      background: url('../images/checked2.png') center center;
      background-size: 100% 100%;
      z-index: 1;
    }
    input#choose{
      position: absolute;
      left: 0.1rem;
      top: 0.1rem;
      display:none;
    }
    span{
      font-size:12px;
      color: #9DA3B4;
      position: absolute;
      left: 0.7rem;
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
</style>
