<template>
  <div class="addBg">
     <div class="bankInfo">
         <p class="examine" v-if="step==2?true:false">您的资料没有通过审核，请重新提交正确有效的资料。</p>
         <div class="reasonbox" v-if="reason==''?false:true">
             <p><span>拒绝原因：</span>{{reason}}</p>
         </div>
        <mt-field class="inputVal name" label="企业名称" placeholder="请输入企业名称" v-model="companyName" @blur.native.capture="saveName"></mt-field>
        <mt-field class="inputVal" label="企业对公账户" placeholder="请输入企业对公账户" v-model="accountNo"   @blur.native.capture="accountTest"></mt-field>
        <div class="inputVal openBank">
            <h3>开户银行</h3>
            <div class="bank-info"  @click="goBankList">
                <span class="bankLogo" v-if='bankImg'>
                    <img :src="bankImg" alt="">
                </span>
                <span class="bankName" style="margin-top:0.1rem;">{{parentBankName}}</span>
            </div>
        </div>
       <div v-if="elseBank" class="inputVal bankcity">
           <h3>开户行支行名</h3>
           <input type="text" placeholder="请输入开户行支行名称" v-model="bankName">
       </div>
         <div v-if="elseBank" class="inputVal bankcity">
           <h3>支付行号</h3>
           <input type="text" placeholder="请输入支付行号" v-model="unionBank">
       </div>
         <div  v-if="elseBank" class="inputVal citybox">
            <h3>开户行所在省市</h3>
             <p @click="getAreaPicker" class="choose-city">{{province}}{{city?'-'+city:'请选择地区'}}</p>
        </div>

        <mt-field class="inputVal" label="法人姓名" placeholder="请输入法人姓名" v-model="legalName"></mt-field>
        <mt-field class="inputVal" label="法人身份证" placeholder="请输入法人身份证号" v-model="legalIds" @blur.native.capture="testId"></mt-field>
        <mt-field class="inputVal" label="法人手机号" placeholder="请输入法人手机号" type="tel" v-model="legalPhone" @blur.native.capture="testPhone"></mt-field>
        <div class="inputVal pay" style="">
            <h3>设为默认收款</h3>
           <div class="switch-btn ischecked"><button class="btn" :disabled="payChoose" @click="chooseDefault()"><span></span></button></div>
        </div>
        <div id="radiobox">
            <h3>认证类型</h3>
           <div class="choosebox">
                <label for="one" style="margin-right:0.78rem;">
                    <span class="choose-btn ischecked"></span>
                    <input type="radio" id="one" @click="chooseType('2')" name="choose">三证合一
                </label>
                <label for="three">
                    <span class="choose-btn"></span>
                    <input type="radio" id="three" @click="chooseType('1')" name="choose">独立三证
                </label>
           </div>
        </div>
        
        <div class="inputVal diploma" v-if="diploma" ><input type="text" placeholder="请输入营业执照号" v-model="businessLicense"></div>
        <div class="inputVal diploma" v-if="diploma" ><input type="text" placeholder="请输入组织机构代码" v-model="organizationCode"></div>
        <div class="inputVal diploma" v-if="diploma" ><input type="text" placeholder="请输入税务登记号" v-model="taxRegister"></div>

        <div class="inputVal credit" v-else ><input type="text" placeholder="请输入统一社会信用代码" v-model="uniCredit"></div>
        
        <div class="upload-container permit" style="position:relative">
            <h2>上传开户许可证</h2>
            <p class="closeImg" @click="delectImg('50',$event)" v-if="licenseImgUrl[0]" ></p>
            <label class="add-pic Single" for="uploadImg" @click="upLoadPic" style="display:inline-block"></label>  
            <img id="seeimg" :src="licenseImgUrl[0]" alt="" @click="preview($event)" v-if="licenseImgUrl[0]">
            <input id="uploadImg" type="file" accept="image/*"/>
        </div>
        <div class="upload-container" style="padding-bottom:1rem;">
            <h2>上传法人身份证正反面扫描件（<span>{{curNumber2}}</span>/2）</h2>
            <div class="loadImg">
                <div id="img-group">
                    <div class="img-item" v-for="(item,index) in idCardImgUrls" :key="index">
                        <img :src="item" alt="" @click="preview($event)" v-if="item">
                        <p class="closeImg" ref="closeImg2" @click="delectImg(index,$event)"></p>
                    </div>
                </div>
                <div class="add-pic" @click="addPic2()" v-show="picFlag">
                    <input name="files2" id="uploaderInput2" type="file" accept="image/*" />
                </div>
            </div>
        </div>
        
     </div>
      <Loader v-if="loader"></Loader>
      <button class="sureBtn" @click="sureSubmit">{{step==2?'提交资料':'确认添加'}}</button>
      <div class="imgMark" @click="markHide()" v-if="mark">
        <img :src="imgUrl" alt="">
      </div>
        <!-- 地区轴 -->
        <div class="areaSlots" v-if="areaPicker">
            <div class="pickerBtn">
                <div class="closeBtn" @click="closePicker">取消</div>
                <div class="trueBtn" @click="getArea">确定</div>
            </div>
            <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
        </div>
  </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast, Switch } from 'mint-ui'
import Loader from './loading';
import myaddress from '../assets/bankAbroad.json'
import storage from '../storage.js'
import $ from 'jquery'
export default {
    name: 'addbank',
    data(){
        return{
            reason:'',//拒绝原因
            step:this.$route.query.step || '',
            companyName: '', //企业名称
            accountNo:"", //账户
            authType:'2',//开户类型
            parentBankName:this.$route.query.bankName? this.$route.query.bankName:"请选择开户银行", //开户银行
            bankImg:this.$route.query.imgUrl? this.$route.query.imgUrl:"",
            legalName:"", //法人姓名
            legalIds:"", //法人身份证
            legalPhone:"",  //法人手机号
            diploma:false,  //认证类型显示
            businessLicense:"", //营业执照
            taxRegister:"",//税务登记
            organizationCode:"",//组织机构代码
            uniCredit:"",//社会信用
            bankName:"",//开户行支行
            identityType:"1",//法人证件类型  1-身份证  2-护照  3-军官证,
            unionBank:"", //支付行号
            picFlag:true,
            mark:false,
            loader:true,
            idCardImgUrls: [],//法人身份证
            curNumber2:0,
            licenseImgUrl:[],//开户许可证
            elseBank:false,
            province:"",
            city:"",
            areaPicker:false,
            status:"1",
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
                }
            ],
            cardNo:this.$route.query.code || "",
            payChoose:false
        }
    },
    methods:{
        accountTest(){
            let reg = /[^\a-\z\A-\Z0-9]/g;
            if(reg.test(this.accountNo)){
                Toast('请输入正确的企业对公账号！');
            }
        },
        testId(){
            if(this.legalIds.length < 18 ){
                Toast('法人身份证格式不正确！')
            }
        },
        saveName(){
            var reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g;       
            if(reg.test(this.companyName)){
                Toast('请输入正确的企业名称');
                return;
            }
        },
        testPhone(){
            var telReg = /^[1]\d{10}$/;
            if(!telReg.test(this.legalPhone)){
                Toast('请输入正确的手机号码');
                return;
            }
        },
        closePicker(){//关闭时间轴
            this.areaPicker = false;
            this.$nextTick(function () {
                $(".picker-slot").css({
                    "width":"auto"
                })
            })
        },
        getAreaPicker(){//显示地区
            this.areaPicker = true
        },
        getArea(){
            this.areaPicker = false;
        },
        onMyAddressChange(picker, values) {
            if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
                picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
                this.province = values[0];
                this.city = values[1];       
            }
        },
        sureSubmit(){
            if(this.authType == 1){
                if(this.businessLicense == ""){
                    Toast('请输入营业执照号');
                    return;
                }
                if(this.organizationCode == ""){
                    Toast('请输入组织机构代码');
                    return;
                }
                if(this.taxRegister == ""){
                    Toast('请输入税务登记号');
                    return;
                }
            }else{
                if(this.uniCredit == ""){
                    Toast('请输入统一社会信用代码');
                    return;
                }
            }
            if(this.legalIds ==""){
                Toast('请输入法人身份证');
                return;
            }
            if(this.legalPhone == ""){
                Toast('请输入法人手机号码')
            }
            if(this.accountNo == ""){
                Toast('请输入企业对公账户');
                return;
            }
            if(this.legalName == ""){
                Toast('请输入法人姓名');
                return;
            }
            if(this.parentBankName == ""){
                Toast('请选择开户银行');
                return;
            }
            if(this.parentBankName == '其他银行'){
                if(this.bankName==""){
                    Toast('请输入开户行支行名称');
                    return;
                }
                if(this.unionBank == ""){
                    Toast('请输入支付行号')
                }
                if(this.province == "" || this.city == ""){
                    Toast('请选择地区')
                }
            }
            if(this.licenseImgUrl.length == 0){
                Toast('请上传开户许可证');
                return;
            }
            if(this.idCardImgUrls.length < 1){
                Toast('请上传法人身份证正反面');
                return;
            }
            if(this.companyName == ""){
                Toast('请输入企业名称');
                return;
            }
            
            loginService.bankMessage(this.companyName,this.authType,this.uniCredit,this.businessLicense,this.organizationCode,this.identityType,this.taxRegister,this.expLicense,this.legalName,this.legalIds,this.legalPhone,this.accountNo,this.parentBankName,this.bankCityNo,this.bankName,this.unionBank,this.province,this.city,this.licenseImgUrl,this.idCardImgUrls,this.status).then(r => {
               if(r.flag == 20000){
                    Toast('添加对公账户成功');
                   this.$router.push('/banklist');
                    let that = this;
                    storage.setSession('companyName','');
                    storage.setSession('accountNo','');
                }else{
                    Toast(r.msg)
                }
            })   
        },
        chooseDefault(){
            console.log(1111111111111111111111111)
            $('.switch-btn').toggleClass('ischecked');
            if($('.switch-btn').hasClass('ischecked')){
                this.status = 1;
            }else{
                this.status = 0;
            }
        },
        //选择认证类型
        chooseType(ind){
            $('.choosebox span').toggleClass('ischecked');
            if(ind==1){
                this.diploma = true;
                this.authType = '1';
            }else if(ind==2){
                this.diploma = false;
                this.authType = '2';
            }
        },
        //预览图片
        preview(e){
            this.mark = true;
            let url = $(e.target).attr('src');
            this.imgUrl = url;
        },
        markHide(){
            this.mark = false;
        },
        RemoveValByIndex2(arr, index) {//上传照片
            arr.splice(index, 1);
        },
        //删除图片
        delectImg(ind,e){
            e.stopPropagation();
            if(ind == 50){
                this.licenseImgUrl = [];
                return;
            }
            this.RemoveValByIndex2(this.idCardImgUrls,ind)
            this.curNumber2 = this.idCardImgUrls.length;
            if(this.idCardImgUrls.length < 2){
                this.picFlag = true
            }
        },
        addPic2(){  
            var vm = this;
            var input = $("#uploaderInput2");
            input.unbind('change').on('change', function (e) {               
                var files = input[0].files;
                if(files.length > 0 ){
                    vm.loader = true
                    if (files.length == 2) vm.picFlag = false;
                    for (var i = 0; i < files.length; i++) {
                        vm.ImgToBase64(files[i], 720, function(base64) {
                            //预览页面上预留一个img元素，载入base64
                            vm.curNumber2 = vm.idCardImgUrls.length + 1;
                            if (vm.idCardImgUrls.length < 2) {
                                vm.idCardImgUrls.push(base64);
                                vm.loader = false;
                            }
                            if (vm.idCardImgUrls.length == 2) vm.picFlag= false;
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
        upLoadPic() {
            this.licenseImgUrl = [];
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
                _this.licenseImgUrl.push(base64);
                _this.loader = false;
                });
            });
            console.log(this.licenseImgUrl)
        },
        //获取开户银行
        goBankList(){
            let that = this;
            storage.setSession('companyName',that.companyName);
            storage.setSession('accountNo',that.accountNo);
            this.$router.push({path:'/getBankList',query:{step:this.step}})
        },
        //获取银行卡信息
        getBankInfo(){
            loginService.businessBankInfo(this.cardNo || this.accountNo ).then( r =>{
                if(r.flag === 20000){
                    this.reason = r.data.reason;
                    this.companyName = r.data.companyName;
                    this.authType = r.data.authType;
                    this.uniCredit = r.data.uniCredit;
                    this.businessLicense = r.data.businessLicense;
                    this.organizationCode = r.data.organizationCode;
                    this.identityType = r.data.identityType;
                    this.taxRegister = r.data.taxRegister;
                    this.expLicense = r.data.expLicense;
                    this.legalName = r.data.legalName;
                    this.legalIds = r.data.legalIds;
                    this.legalPhone = r.data.legalPhone;
                    this.accountNo = r.data.accountNo;
                    if(this.cardNo){
                        this.parentBankName = r.data.parentBankName;
                        this.bankImg = r.data.bankLogo;
                    }  
                    r.data.city==''?this.city = "" :this.city = r.data.city;
                    r.data.province==''?this.province = "" :this.province = r.data.province;
                    r.data.bankName==''?this.bankName = "" :this.bankName = r.data.bankName;
                    r.data.unionBank==''?this.unionBank = "" :this.unionBank = r.data.unionBank;
                    this.city = r.data.city;
                    this.licenseImgUrl = r.data.licenseImgUrlList;
                    this.idCardImgUrls = r.data.idCardImgUrlsList;
                    this.curNumber2 = this.idCardImgUrls.length;
                    if(this.curNumber2==2){
                        this.picFlag = false;
                    }
                    this.status = r.data.status;
                    if(this.status == 0){
                        $('.switch-btn').removeClass('ischecked')
                    }else{
                        $('.switch-btn').addClass('ischecked')
                    }
                    if(this.authType == 1){
                        this.diploma = true;        
                        this.$nextTick(()=>{
                            $('.choose-btn').eq(0).removeClass('ischecked');
                            $('.choose-btn').eq(1).addClass('ischecked');
                        })
                    }else{
                        this.diploma = false;    
                        this.$nextTick(()=>{
                            $('.choose-btn').eq(1).removeClass('ischecked')
                            $('.choose-btn').eq(0).addClass('ischecked');
                        })
                    }
                   
                }else{
                    Toast(r.msg)
                }
            })
        }
    },
    created () {
      let companyName = storage.getSession('companyName');
      let accountNo = storage.getSession('accountNo');
      if(companyName == '' || companyName == null){
          this.companyName = ""
      }else{
          this.companyName = companyName;
      }
      if(accountNo == "" || accountNo == null){
          this.accountNo = ""
      }else{
          this.accountNo =accountNo;
      }
    },
    mounted(){    
        this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
            this.myAddressSlots[0].defaultIndex = 0    
            // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
            //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
        });
        loginService.getUserInfo().then(r => {
            if(r.flag === 20000){
                if(r.data.baseInfoid != 0){
                    if(r.data.baseInfoStatus == 1 || r.data.baseInfoStatus == 3){
                        this.$router.push('/mine')
                    }else if (r.data.baseInfoStatus == 2 || r.data.baseInfoStatus == 5){
                       this.step = 2;
                       this.accountNo = r.data.accountNo;
                    }
                }
            }
        })

        loginService.banklist(1,10).then(r => {//判断是否有银行卡
            console.log(r,'是否有银行卡')
            if(r.flag == 20000){
                this.bankInfos = r.data.list[0].bankInfos;
                if(r.data.list[0].bankInfos.length == 0 && r.data.list[0].bankInfoList.length == 0){
                    this.status = 1;
                    this.payChoose = true;
                }else{
                    console.log('else------------')
                    this.payChoose = false;
                }
            }
        });    
        if(this.step == 2){
            this.getBankInfo();   
        }    
       
        this.loader = false;
        $(".mint-field-core").css({
            "text-align":"right",
            "margin-right":"15px",
            "font-size":'0.38rem'
        })
        $('.credit .mint-field-core').css({
            "text-align":"left"
        })
        $(".mint-cell-text").css({
            "margin":"0",
            "font-size":'0.38rem'
        })
        $('.bankcity .mint-cell-wrapper').css({
            'justify-content':'space-between!important'
        })
        if(this.parentBankName == '其他银行'){
            this.elseBank = true;
        }
    },
    components:{
        Loader
    }
}
</script>
<style lang="less" scoped>
@import url(../less/functions);
.bankInfo{
    //border-bottom: ~`px2rem(1)` solid #363645;
    padding-bottom: ~`px2rem(30)`;
}
.oldSlots,.areaSlots,.InComeSlots{
    position: fixed;
    width: 100%;
    background: #fff;
    bottom: 0;
    left: 0;
    z-index:333333;
}
.name{
    border-top:0.01rem solid #363645;
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
    .trueBtn{
        color: #2CBB55;
    }
}
.addBg{
    width:100%;
    height:100%;
    position: relative;
    background: #1d1d28;
    .inputVal{
        width:95%;
        height:1.2rem;
        color:#fff;
        border-bottom:1px solid #363645;
        margin-left: 5%;
        font-size:0.38rem;
    }
    .Prompt{
        width: 100%;
        height: 1rem;
        color:#9DA3B4;
        font-size: 12px;
        text-align: center;
        padding: ~`px2rem(30)` 0;
    }
    .sureBtn{
        width:100%;
        height: 1.2rem;
        background: linear-gradient(-135deg, #2CBB86 0%, #2CBB55 100%);
        position: fixed;
        bottom:0;
        left:0;
        font-size: 18px;
        color:#fff;
        z-index: 5555;
    }
}
.mint-switch{
    width:95%;
    height:1.2rem;
    color:#fff;
    border-bottom:1px solid #363645;
}
.mint-switch span.mint-switch-core {
    border-color: #2CBB55!important;
    background-color: #2CBB55!important;
}
.switch-btn{
    height:100%;
    display:flex;
    align-items: center;
}
.switch-btn .btn{
    width:1.36rem;
    height:65%;
    background: #fff;
    border-radius: 0.38rem;
    overflow: hidden;
}

.switch-btn span{
    display: block;
    width:0.68rem;
    height:100%;
    background: #fff;
    border-radius: 50%; 
    transform: translateX(0);
    -webkit-transform: translateX(0);
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    -o-transform: translateX(0);
    transition: 0.5s;
    border: 0.02rem solid #d9d9d9;
}
.switch-btn.ischecked{
    span{
         transform: translateX(0.68rem);
         -webkit-transform: translateX(0.68rem);
         -moz-transform: translateX(0.68rem);
         -ms-transform: translateX(0.68rem);
         -o-transform: translateX(0.68rem);
    }
    button{
        background:#2CBB55 ;
    }
}
#radiobox{
    margin-left:5%;
    width: 95%;
    height: 2.2rem;
    color: #fff;
    border-bottom: 1px solid #363645;
    .choosebox{
        width:100%;
        display:flex;
        justify-content: center;
    }
    h3{
        font-size:0.38rem;
        color:#fff;
        padding:~`px2rem(20)` 0 ~`px2rem(30)`;
    }
    label{
        position: relative;
        display:inline-block;
        width:2.3rem;
        font-size:0.38rem;
        text-align: right;
        span{
            position: absolute;
            display: inline-block;
            width:~`px2rem(40)`;
            height:~`px2rem(40)`;
            background: url('../images/check.png') no-repeat;
            background-size: 100% 100%;
           z-index:1;
            left:0;
        }
        span.ischecked{
            background: url('../images/checked.png') no-repeat;
            background-size: 100% 100%;
        }
        input{
            position: absolute;
            width:~`px2rem(40)`;
            height:~`px2rem(40)`;
            left:0;
            opacity: 0;
        }
    }
}
.upload-container{
    width: 95%;
    height: auto;
    margin-left:5%;
    h2{
        width: 100%;
        padding: .3rem 0;
        color:#787993;
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
          width: 23%;
          height: 2rem;
          position: relative;
          margin-bottom: 0.2rem;
          margin-right: 0.25rem;
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
    z-index:55555;
    img{
    max-width:100%;
    }
}
#seeimg{
    width: 2rem;
    max-height: 2rem;
    position: absolute;
    left: 0;
}
#uploadImg{
    position: absolute;
    left:0;
    opacity: 0;
}
.permit .closeImg {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  left: 16%;
    top: 0.95rem;
  z-index:222;
  background: url(../images/addInfo/deleteImg.png) no-repeat center;
  background-size: contain;
}
.bank-info{
    display: -webkit-flex;
    margin-right: ~`px2rem(30)`;
    margin-right: ~`px2rem(30)`;
    padding-right: ~`px2rem(30)`;
    color: #9DA3B4;
    background: url("../images/moreinfo.png") no-repeat right center;
    background-size: .2rem auto;
}
.bankLogo{
    width: ~`px2rem(48)`;
    height: ~`px2rem(48)`;
    display: block;
    border-radius: 100%;
    overflow: hidden;
    margin-right: ~`px2rem(24)`;
    img{
        width: 100%;
        height: 100%;
    }
}
.citybox{
    display:flex;
    justify-content: space-between;
    align-items: center; 
    h3{
        font-size:0.38rem;
    }
}
.bankcity{
    display:flex;
    justify-content: space-between;
    align-items: center;
    h3{
        font-size:0.38rem;
        color:#fff;
    }
    input{
        flex:1;
        background: transparent;
        outline: none;
        border:none;
        text-align: right;
        font-size:0.38rem;
        margin-right:0.4rem;
        color: rgb(157, 163, 180);
    }
    input:-webkit-input-placeholder{
        color: rgb(157, 163, 180);
    }
    input::-webkit-input-placeholder{
        color: rgb(157, 163, 180);
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color: rgb(157, 163, 180);
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color: rgb(157, 163, 180);
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
        color: rgb(157, 163, 180);
    }
}
.examine{
    font-size: 12px;
    color: #F5A623;
    padding:0.5rem 0 0.3rem;
    margin-left:5%;
}
.reasonbox{
    background: #272734;
    border-radius: 6px;
    width: 80%;
    margin: 0 auto;
    height: auto;
    padding:0.3rem 5%;
    margin-bottom:0.5rem;
    p{
        color:#fff;
    }
    span{
        color:#9DA3B4;
    }
    
}
.credit input,.diploma input{
    width:100%;
    height:100%;
    background: transparent;
    font-size:0.38rem;
    outline: none;
    border:none;
    color:#fff;
}
.openBank{
    font-size:0.38rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.pay{
    box-sizing:border-box;
    padding-right:4%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.choose-city{
    margin-right:0.6rem;
    font-size:0.38rem;
    color:#9DA3B4;
    position: relative;

    &:after{
        position: absolute;
        right: -0.3rem;
        top: 0.08rem;
        content:"";
        width:0.2rem;
        height: 0.35rem;
        display:block;
        background: url('../images/moreinfo.png') no-repeat center right;
        background-size: auto 0.35rem;
    }
}

</style>


