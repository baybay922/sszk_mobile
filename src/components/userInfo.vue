<template>
  <div class="userInfo">
        <div class="name-container entryBox">
            <p>称呼</p>
            <input class="rightInfo" type="text" placeholder="请输入客户姓氏" v-model="username" />
        </div>
        <div class="sex-container ">
            <div class="man selectSex" @click="selectSex(1,$event)">男</div>
            <div class="gril" @click="selectSex(0,$event)">女</div>
        </div>
        <div class="old-container" @click="getOldPicker">
            <p>年龄</p>
            <p class="rightInfo">{{ old }}</p>
        </div>
        <div class="aera-container" @click="getAreaPicker">
            <p>所在区域</p>
            <p class="rightInfo">{{myAddressProvince}}-{{myAddressCity}}-{{myAddresscounty}}</p>
        </div>
        <div class="income-container" @click="getInComePicker">
            <p>收入水平</p>
            <p class="rightInfo">{{ inCome }}</p>
        </div>
        <div class="consumption entryBox">
            <p>本次预计消费</p>
            <input class="rightInfo" type="tel" placeholder="填写预计消费" v-model="consumption" maxlength="8" />
        </div>
        <div class="describe-container">
            <h2>咨询问题描述</h2>           
        </div>
         <textarea cols="49" rows="10" class="remarks" placeholder="填写客户需求及辅助升单备注" v-model="describe"></textarea>
        <div class="upload-container">
            <h2>上传照片（<span>{{curNumber2}}</span>/5）<p @click="showExample">查看示例照片</p></h2>
            <div class="loadImg">
                <div id="img-group">
                    <div class="img-item" v-for="(item,index) in inspect2" :key="index" >
                        <img :src="item" alt="" @click="preview($event)">
                        <p class="closeImg" ref="closeImg2" @click="delectImg2(index)"></p>
                    </div>
                </div>
                <div class="add-pic" v-show="picFlag2">
                    <input name="files2"  @click="addPic2()" id="uploaderInput2" type="file" accept="image/*"/>
                </div>
            </div>
        </div>
        <div class="upload-container uploadPhoto">
            <h2>上传检查单据照片（<span>{{curNumber}}</span>/9）<img src="../images/Calculator/Profit2.png" class="ddicon" @click="popupVisible = !popupVisible"></h2>
            <div class="loadImg">
                
                <div id="img-group">
                    <div class="img-item" v-for="(item,index) in inspect" :key="index">
                        <img :src="item" alt="" @click="preview($event)">
                        <p class="closeImg" ref="closeImg" @click="delectImg(index)"></p>
                    </div>
                </div>
                <div class="add-pic" v-show="picFlag">
                    <input name="files" id="uploaderInput" @click="addPic()" type="file" accept="image/*"/>
                </div>
            </div>
        </div>        
        <div class="btn-container">            
            <button class="Later" @click="laterAdd">跳过此步</button>
            <button class="Preservation" @click="Preservation">保存并完成</button>
        </div>
        <!-- 年龄轴 -->
        <div class="oldSlots" v-if="oldPicker">
            <div class="pickerBtn">
                <div class="closeBtn" @click="closePicker">取消</div>
                <div class="sureBtn" @click="getOld">确定</div>
            </div>
            <mt-picker ref="old" :slots="oldSlots"></mt-picker>
        </div>
        <!-- 地区轴 -->
        <div class="areaSlots" v-if="areaPicker">
            <div class="pickerBtn">
                <div class="closeBtn" @click="closePicker">取消</div>
                <div class="sureBtn" @click="getArea">确定</div>
            </div>
            <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
        </div>
        <!-- 收入轴 -->
        <div class="InComeSlots" v-if="incomePicker">
            <div class="pickerBtn">
                <div class="closeBtn" @click="closePicker">取消</div>
                <div class="sureBtn" @click="getInCome">确定</div>
            </div>
            <mt-picker ref="inCome" :slots="inComeSlots"></mt-picker>
        </div>
        <div class="exampleMack" v-if="showExampleImg">
            <div class="example">
                <h2>正面及侧面照</h2>
                <div class="exampleImg">
                    <img src="../images/addInfo/example.png" alt="">
                </div>
                <button class="downBtn" @click="hideExample">知道了</button>
            </div>
        </div> 
        <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade" class="popup">
        <span style="visibility:hidden">多加</span>单据照片请提供3个月内血常规、心电图、X光片、凝血功能四项、传染病五项
        <button class="closeBtn" @click="closeProfit"> 我知道了</button>
        </mt-popup>
        <Loader v-if="loader"></Loader>      
        <div class="imgMark" v-if="mark" @click="markHide()">
            <img :src="imgUrl" alt="">
        </div>
  </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast, MessageBox, Indicator} from 'mint-ui'
import $ from 'jquery'
import myaddress from '../assets/areAbroad.json'
import Loader from './loading';
export default {
    data(){
        return{
            imgUrl:"",
            mark:false,
            loader:true,
            showExampleImg:false,
            curNumber:0,
            curNumber2:0,
            inspect: [],//检查照片
            inspect2: [],//检查照片
            username:"",
            consumption:"",
            old:"请选择客户年龄段",
            myAddressProvince:'省',
            myAddressCity:'市',
            myAddresscounty:'区/县',
            inCome:"请选择客户收入水平",
            oldPicker: false,
            areaPicker: false,
            incomePicker: false,
            productId:this.$route.query.productId,
            describe: "",
            orgId: this.$route.query.orgId,
            imgLength:"0",
            sex:"1",
            isClient:this.$route.query.isClient,
            orderNo: "",
            oldSlots:[
                {
                    values: ['不了解','20岁以下', '20至30岁', '30至40岁', '40至50岁', '50至60岁', '60至70岁', '70岁以上'],
                }
            ],
            inComeSlots:[
                {
                    values: ['不了解','年收入8至15万元', '年收入15至30万元', '年收入30至100万元', '年收入100至300万元', '年收入300至1000万元', '年收入1000至5000万元', '年收入5000万元以上'],
                }
            ],
            myAddressSlots: [
                {
                    flex: 1,
                    defaultIndex: 1,    
                    values: Object.keys(myaddress),  //省份数组
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: ["请选择"],
                    className: 'slot3',
                    textAlign: 'center'
                },
                {
                    divider: true,
                    content: '-',
                    className: 'slot4'
                },
                {
                    flex: 1,
                    values: ["请选择"],
                    className: 'slot5',
                    textAlign: 'center'
                }
            ],
            imgArr: [],
            picFlag: true,
            picFlag2: true,
            clientImgVOS:[],
            clientInspectionImgVOS:[],
            popupVisible: false
        }
  },
  methods:{
        preview(e){
            this.mark = true;
            let url = $(e.target).attr('src');
            this.imgUrl = url;
        },
        markHide(){
            this.mark = false;
        },
        closeProfit(){
            this.popupVisible = false;
        },
        hideExample(){
            this.showExampleImg = false;
        },
        showExample(){
            this.showExampleImg = true;
        },
        selectSex(sex,e){
            $(e.target).addClass("selectSex").siblings().removeClass("selectSex")
            this.sex = sex;
        },
        RemoveValByIndex(arr, index) {
              arr.splice(index, 1);
        },
        delectImg(ind){
            this.RemoveValByIndex(this.inspect,ind)
            this.curNumber = this.inspect.length
            if(this.inspect.length < 9){
                this.picFlag = true
            }
        },
        addPic(){
            var vm = this;
            var input = $("#uploaderInput");
            input.unbind('change').on('change', function (e) {
                var files = input[0].files;
                if(files.length > 0 ){
                    vm.loader = true;
                    if (files.length == 9) vm.picFlag = false;
                    for (var i = 0; i < files.length; i++) {
                        vm.ImgToBase64(files[i], 720, function(base64) {
                            //预览页面上预留一个img元素，载入base64
                            vm.curNumber = vm.inspect.length + 1;
                            if (vm.inspect.length < 9) {
                                vm.inspect.push(base64);
                                vm.loader = false;
                            }
                            if (vm.inspect.length == 9) vm.picFlag = false;
                        });
                    }
                }
                
            });
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
        Preservation(){//检验填写用户信息并跳转
                Indicator.open();
                this.clientImgVOS = this.inspect2;
                this.clientInspectionImgVOS = this.inspect;
                if(this.username == "" || this.old =="" || this.myAddressProvince =="" || this.inCome =="" || this.consumption == ""){
                    Toast('请完善您的信息')
                }

                if(this.isClient == 1){        
                    loginService.modifyInfo(this.$route.query.orderNo,this.username,this.sex,this.old,this.myAddressProvince,this.myAddressCity,this.myAddresscounty,this.orgId,this.inCome,this.consumption,this.describe,this.clientImgVOS,this.clientInspectionImgVOS).then(r => {
                        if (r.flag == 20000) {
                            Indicator.close();                                  
                            let path = {path: './agentorderinfo',query:{ orderNo:this.orderNo}}
                            this.$router.push(path)
                        }
                    }).catch(e => {
                        Toast(r.msg)
                    })
                }else if(this.isClient == "2"){
                       loginService.holeInfo(this.$route.query.orderNo,this.username,this.sex,this.old,this.myAddressProvince,this.myAddressCity,this.myAddresscounty,this.orgId,this.inCome,this.consumption,this.describe,this.clientImgVOS,this.clientInspectionImgVOS).then(r => {
                            if (r.flag == 20000) { 
                                Indicator.close();              
                                let path = {path: './agentorderinfo',query:{ orderNo:this.$route.query.orderNo}}
                                this.$router.push(path)
                            }
                        }).catch(e => {
                            console.log(e)
                        })
                }else{
                    
                    loginService.holeInfo(this.$route.query.orderNo,this.username,this.sex,this.old,this.myAddressProvince,this.myAddressCity,this.myAddresscounty,this.orgId,this.inCome,this.consumption,this.describe,this.clientImgVOS,this.clientInspectionImgVOS).then(r => {
                           if (r.flag == 20000) {                 
                                let path = {path: './contract',query:{ orderNo:this.$route.query.orderNo,type:1, productId:this.productId, id:r.data.id}}
                                this.$router.push(path)
                            }
                        }).catch(e => {
                            console.log(e)
                        })
                    
                }
        },
        laterAdd(){//不填写信息
            
            MessageBox.confirm('', { 
                message: '填写顾客需求有助于您更流畅地升单，也方便医院更好地服务客户', 
                title: '提示', 
                confirmButtonText: '继续填写', 
                cancelButtonText: '知道了' 
                }).then(action => { 
                if (action == 'confirm') {     //确认的回调
                    console.log("确定"); 
                }
                }).catch(err => { 
                if (err == 'cancel') {     //取消的回调
                    let path = {path: './contract',query:{orderNo:this.$route.query.orderNo,type:0,productId:this.productId }}
                    this.$router.push(path)
                } 
            });
           
        },
        getOldPicker(){//显示年龄
            this.oldPicker = true;
            this.$nextTick(function () {
                $(".picker-slot").css({
                    "width":"100%"
                })
            })
        },
        getAreaPicker(){//显示地区
            this.areaPicker = true
        },
        getInComePicker(){//显示收入
            this.incomePicker = true;
            this.$nextTick(function () {
                $(".picker-slot").css({
                    "width":"100%"
                })
            })
        },
        closePicker(){//关闭时间轴
            this.oldPicker = false;
            this.areaPicker = false;
            this.incomePicker = false;
            this.$nextTick(function () {
                $(".picker-slot").css({
                    "width":"auto"
                })
            })
        },
        getOld(){
            var oldVal = this.$refs.old.getValues();
            this.old = oldVal[0];
            this.oldPicker = false;
        },
        getInCome(){
            var inComeVal = this.$refs.inCome.getValues();
            this.inCome = inComeVal[0];
            this.incomePicker = false;
        },
        getArea(){
            this.areaPicker = false;
        },
        onMyAddressChange(picker, values) {
            if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
                picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
                this.myAddressProvince = values[0];
                this.myAddressCity = values[1];
                this.myAddresscounty = values[2];            
            }
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
      this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex = 0    
        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
      });
      $("body").css({
          "overflow-x":"hidden",
          "overflow-y":"auto"
      })
        $(".mint-msgbox-message").css({
            "line-height":"1.6"
        })
      //判断是否填写信息
      let orderNo = this.$route.query.orderNo,
          isClient = this.$route.query.isClient;
      if(orderNo == undefined || isClient == undefined){
            return;
      }else if(this.$route.query.isClient == "1"){
            $(".Later").hide()
            this.orderNo = this.$route.query.orderNo,
            this.isClient = this.$route.query.isClient;
            loginService.clientInfo(orderNo, this.orgId, isClient).then(r =>{
                console.log(r)
                if(r.flag == 20000){
                    this.username = r.data.clientName;
                    if(r.data.clientSex == "1"){ 
                        this.sex = "1"                       
                        $(".man").addClass("selectSex").siblings().removeClass("selectSex")
                    }else{
                         this.sex = "0"
                        $(".gril").addClass("selectSex").siblings().removeClass("selectSex")
                    }
                    //<p class="rightInfo">{{myAddressProvince}}-{{myAddressCity}}-{{myAddresscounty}}</p>              
                    this.consumption = r.data.consumption;
                    this.old = r.data.clientAge;
                    if(r.data.clientProvince == "请选择"){
                        this.myAddressProvince = "省"
                    }else{
                        this.myAddressProvince = r.data.clientProvince;
                    }
                    if(r.data.clientArea == "请选择"){
                        this.myAddressCity = "市"
                    }else{
                        this.myAddressCity = r.data.clientCity;
                    }
                    if(r.data.clientArea == "请选择"){
                        this.myAddresscounty = "区/县"
                    }else{
                        this.myAddresscounty = r.data.clientCity;
                    }
                    //this.myAddressProvince = r.data.clientProvince;
                    //this.myAddressCity = r.data.clientCity;
                    //this.myAddresscounty = r.data.clientArea;
                    this.inCome = r.data.incomeLevel;
                    this.describe = r.data.describeHealth;
                    if(r.data.clientImgDos1 !== null){
                       this.curNumber2 = r.data.clientImgDos1.length;
                       this.inspect2 = r.data.clientImgDos1;
                       if(r.data.clientImgDos1.length < 5){
                            this.picFlag2 = true
                        }else{
                            this.picFlag2 = false
                        }
                    }else{
                        this.curNumber2 = r.data.clientImgDos1.length;
                        this.inspect2 = []
                    }
                    
                    if(r.data.clientInspectionImgDos1 !== null){
                        this.curNumber = r.data.clientInspectionImgDos1.length;
                        this.inspect = r.data.clientInspectionImgDos1;
                        if(r.data.clientInspectionImgDos1.length < 9){
                            this.picFlag = true
                        }else{
                            this.picFlag = false
                        }
                    }else{
                        this.curNumber = r.data.clientInspectionImgDos1.length;
                        this.inspect = []
                    }
                    //this.inspect2 = r.data.clientImgDos1;
                    //this.inspect = r.data.clientInspectionImgDos1;
                    console.log(r.data.clientInspectionImgDos1)
                }else{      
                    Toast(r.msg)
                }
            })
      }else if(this.$route.query.isClient == "2"){
           $(".Later").hide()
      }
    $(".picker-slot").css({
        "width":"auto"
    })
    },
    components:{
        Loader
    }
}
</script>
<style lang="less" scoped>
@import '../less/functions';
.remarks{
    width: 88%;
    height: ~`px2rem(450)`;
    margin: 0rem auto ~`px2rem(60)`;
    display:block;
    border-radius: 10px;
    background:  #272734;
    border:none;
    outline: none;
    padding: 2%;
    font-size:14px;
    color: #fff;
}
.popup{
  width: 70%;
  padding: .5rem 0rem 0 0rem;
  border-radius: 4px;
  font-size: 14px;
  padding: .5rem .5rem 0 .5rem;
  line-height: 1.8;
  button{
    width: 100%;
    background: none;
    border-top: 1px solid #DFDFDF;
    color:#2CBB55;
    padding: .3rem 0;
    margin: .2rem 0 0;

  }
}
.ddicon{
    width: ~`px2rem(24)`;
    height: ~`px2rem(24)`;
    margin-left: ~`px2rem(10)`;
    position: absolute;
    top: .35rem;
}
.gril{
    margin-right: .4rem!important;
}
.entryBox{
    background: none!important;
    input{
        margin-right: .5rem!important;
    }
}
.uploadPhoto{
    margin:0 auto 55px!important;
}
.exampleMack{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.8);
    position: fixed;
    top: 0;
    left: 0;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}
.example{
    width: 75%;
    height: auto;
    background: #fff;
    border-radius: 10px;
    h2{
        width: 100%;
        padding: .5rem 0 0;
        text-align: center;
        font-size: 17px;
        color: #4A4A4A;
        font-weight: bold;
    }
    .exampleImg{
        width: 80%;
        height: auto;
        margin: 0 auto;
        padding: 20px 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .downBtn{
        width: 100%;
        padding: .3rem 0;
        border-top: 1px solid #DFDFDF;
        background: none;
        color: #2CBB55;
        font-size: 15px;
    }
}
.userInfo{
    width:100%;
    height: 100%;
    overflow-y: auto;
    background:#1d1d28;
}
.name-container,.old-container,.aera-container,.income-container,.consumption,.sex-container{
    width: 95%;
    margin-left: 5%;
    font-size: 16px;
    color:#fff;
    display: -webkit-flex;
    justify-content: space-between;
    border-bottom:~`px2rem(1)` solid  #363645;
    padding: .3rem 0;
    background: url(../images/index/bottom_arrow.png) no-repeat 95% center;
    background-size: auto .16rem;
    input{
        border:none;
        text-align: right;
        background: none;
    }
    .rightInfo{
        margin-right: 1rem;
        font-size: 14px;
        color:#9DA3B4;
    }
}
.consumption{
    width:100%;
    margin: 0 auto;
    text-indent: 5%;
}
.describe-container{
    width: 91%;
    margin: 0 auto;
    h2{
        font-weight: normal;
        font-size: 14px;
        color:#9DA3B4;
        padding: .3rem 0;
    }
    
}
.Prompt{
    width: 100%;
    text-align: center;
    color:#9DA3B4;
    font-size: 12px;
    padding: .3rem 0 1.5rem 0;
}
.btn-container{
    width: 100%;
    display: -webkit-flex;
    justify-content: space-between;
    position: fixed;
    bottom:0;
    left: 0;
    button{
        flex: auto;
        padding: .3rem 0;
        display: block;
        text-align: center;
        font-size: 16px;
    }
    .Later{
        background: #272734;
        color:#9DA3B4;
    }
    .Preservation{
        background:linear-gradient(-135deg, #2CBB86 0%, #2CBB55 100%);
        color:#fff;
    }
}
.oldSlots,.areaSlots,.InComeSlots{
    position: absolute;
    width: 100%;
    background: #fff;
    bottom: 0;
    left: 0;
}
.pickerBtn{
    width: 100%;
    display: -webkit-flex;
    justify-content: space-between;
    border-bottom:1px solid #eaeaea;
    div{
        width: 50%;
        text-align: center;
        padding: .3rem 0;
        font-size: 16px;
    }
    .closeBtn{
        color:#9DA3B4
    }
    .sureBtn{
        color: #2CBB55;
    }
}
.upload-container{
    width: 95%;
    height: auto;
    margin: 0 auto;
    h2{
        width: 100%;
        padding: .3rem 0;
        color:#787993;
        display: -webkit-box;
        text-indent: 8px;
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
        margin: 0 auto;
        .img-item {
            width: 30%;
            height: 2rem;
            position: relative;
            margin: .2rem .15rem;
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
        a{
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    .add-pic input {
        opacity: 0;
    }
.sex-container{
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
    background: none;
    div{
        padding: .1rem .5rem;
        border-radius: 4px;
        border:1px solid #363645;
        margin: 0 .2rem;   
    }
    .selectSex{
        border: 1px solid #2CBB55!important;
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


