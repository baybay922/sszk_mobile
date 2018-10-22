<template>
  <div class="info-container">
      <ul class="info-list">
          <li v-if="mediciner">
              <p>医院 / 机构名称</p>
              <p>
                  <input type="text" placeholder=" 请输入医院 / 机构名称" v-model="infoFromP.companyName"  @blur.native.capture="getOrgNameVal"/>
              </p>
          </li>
          <li>
              <p>{{mediciner?'联系人姓名':'姓名'}}</p>
              <p>
                  <input type="text" placeholder=" 请输入联系人姓名" v-model="infoFromP.leaderName" @blur.native.capture="getleaderNameVal"/>
              </p>
          </li>
          <li>
              <p>{{mediciner?'负责人身份证号':'身份证号'}}</p>
              <p>
                  <input type="text" placeholder=" 请输入负责人身份证号" v-model="infoFromP.idCardNo"/>
              </p>
          </li>
          <li class="aera-container" @click="getAreaPicker">
            <p>服务地区</p>
            <p class="rightInfo">{{infoFromP.province}}-{{infoFromP.city}}</p>
          </li>
          <li>
              <p>主营领域</p>
              <p class="arrow-right" @click="showMedical">
                  {{infoFromP.mainField}}
              </p>
          </li>
      </ul>
      <!-- 医美类型 -->
      <div class="medicalSlots" v-if="medical">
            <div class="pickerBtn">
                <div class="closeBtn" @click="closePicker">取消</div>
                <div class="sureBtn" @click="getMedicalType">确定</div>
            </div>
            <mt-picker ref="medical" :slots="medicalType"></mt-picker>
        </div>
      <p class="mainProducts">主营产品</p>
      <textarea cols="49" rows="10" name="remarks" id="remarks" class="remarks" placeholder="请填入您的明星产品或优势领域" v-model="infoFromP.mainProduct"></textarea>
      <button class="Submission" @click="Submission">下一步</button>
       <!-- 地区轴 -->
        <div class="areaSlots" v-if="areaPicker">
            <div class="pickerBtn">
                <div class="closeBtn" @click="closePicker">取消</div>
                <div class="sureBtn" @click="getArea">确定</div>
            </div>
            <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
        </div>
  </div>
</template>
<script>
import { loginService } from "../services/login";
import { Toast } from "mint-ui";
import $ from "jquery";
import myaddress from '../assets/areAbroad.json'
export default {
  data() {
    return {
      infoFromP:{
        companyName: "",
        leaderName: "",
        idCardNo:'',
        province:'省',
        city:'市',
        mainField: "大健康类产品",
        mainProduct: "",
        
      },
      medical: false,
      medicalType: [
        {
          values: [
            "大健康类产品",
            "整形类产品",
            "皮肤类产品",
            "其他（请在备注里说明）"
          ]
        }
      ],
      type: this.$route.query.type,
      mediciner: true,
      myAddresscounty:'区/县',
      areaPicker: false,
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
      supplierType:""
    };
  },
  methods: {
    getOrgNameVal(){
      var reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g;
      if(reg.test(this.infoFromP.companyName)){
        Toast("请输入正确的企业名称");
        this.orgNameStutas = false;
        return;
      }else{
        this.orgNameStutas = true;
      }
    },
    getleaderNameVal(){
      var reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g;
      if(reg.test(this.infoFromP.leaderName)){
        Toast("请输入正确的姓名");  
        return;
      }
    },
    getinfo() {
      loginService.getagentinfo().then(r => {
        if(r.flag ==20000 ){
          console.log(r)
          this.infoFromP = r.data
        }
      })
    },
    getArea(){
        this.areaPicker = false;
    },
    getAreaPicker(){//显示地区
        this.areaPicker = true;
        $(".slot5").css({
            "width":"0",
            "flex":"none!important"
        })
    },
     closePicker(){//关闭时间轴
        
        this.medical = false;
    },
    showMedical() {
      //显示列表
      this.medical = true;
      this.$nextTick(function () {
          $(".picker-slot").css({
              "width":"100%"
          })
      })
    },
    closePicker() {
      //隐藏列表
      this.medical = false;
      this.areaPicker = false;
      this.$nextTick(function () {
          $(".picker-slot").css({
              "width":"auto"
          })
      })
    },
    getMedicalType() {
      //点击确定后获取列表所选中的值
      this.infoFromP.mainField = this.$refs.medical.getValues()[0];
      this.closePicker();
    
    },
    Submission() {
      //点击提交后判断是否正确
      if (this.type == "P") {
        if (
          this.infoFromP.companyName == "" ||
          this.infoFromP.leaderName == "" ||
          this.infoFromP.idCardNo == "" ||
          this.infoFromP.province == "省" || this.infoFromP.province == "请选择"||
          (this.infoFromP.mainField == "其他（请在备注里说明）" && this.infoFromP.mainProduct == "")
        ) {
          Toast("请完善您的资料");
        } else {
          loginService
            .supplierReg(this.infoFromP.companyName, this.infoFromP.leaderName, this.infoFromP.idCardNo, this.infoFromP.mainField, this.infoFromP.mainProduct,this.infoFromP.province,this.infoFromP.city)
            .then(r => {
              if (r.flag == 20000) {
                let path = {
                  path: "/institutionalInfo",
                  query: { orgType: "P", type: this.type }
                };
                this.$router.push(path);
              }else{
                if(r.flag == 50000){
                  Toast("医院机构名称不能含有特殊字符")
                }else{
                  Toast(r.msg)
                }
                
              }
            });
        }
      } else {
        if (
          this.infoFromP.leaderName == "" ||
          this.infoFromP.province == "省" || this.infoFromP.province == "请选择"||
          (this.infoFromP.mainField == "其他（请在备注里说明）" && this.infoFromP.mainProduct == "")
        ) {
          Toast("请完善您的资料");
        } else {
          loginService
            .supplierDoctorInfo(this.infoFromP.leaderName, this.infoFromP.idCardNo, this.infoFromP.mainField, this.infoFromP.mainProduct,this.infoFromP.province,this.infoFromP.city)
            .then(r => {
              if (r.flag == 20000) {
                if(this.type == 'D'){
                  let path = {
                    path: "/doctorQualifications",
                    query: { orgType: "P", type: this.type }
                  };
                  this.$router.push(path);
                }else{
                  let path = {
                    path: "/institutionalInfo",
                    query: { orgType: "P", type: this.type }
                  };
                  this.$router.push(path);
                }
                
              }else{
                Toast(r.msg)
              }
            });
        }
      }
    },
    onMyAddressChange(picker, values) {
        if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
            picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
            //picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
            console.log(values[0])
            this.infoFromP.province = values[0];
            this.infoFromP.city = values[1];
            //this.myAddresscounty = values[2];            
        }
    }
  },
  mounted() {
    this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex = 0    
        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
    console.log(this.type)
    if (this.type == "P") {
      this.mediciner = true;
    } else {
      this.mediciner = false;
    }
    this.getinfo()

    $("#app").css({
      "overflow-y":"auto"
    })
    this.getOrgNameVal();
    this.getleaderNameVal();
  }
};
</script>
<style lang="less" scoped>
@import "../less/functions";
.info-container {
  width: 100%;
  height: auto;
  background: #1d1d28;
  overflow: hidden;
  padding-bottom: ~`px2rem(30)`;
  ul {
    width: 100%;
    border-bottom: ~`px2rem(1) ` solid #363645;
    li {
      width: 95%;
      padding: 0.4rem 0;
      border-bottom: ~`px2rem(1) ` solid #363645;
      -ms-flex-item-align: end;
      color: #fff;
      font-size: 16px;
      display: -webkit-flex;
      justify-content: space-between;
      margin-left: 5%;
      p {
        -webkit-box-flex: auto;
        input {
          border: none;
          background: none;
          outline: none;
          text-align: right;
          color: #fff;
        }
      }
      p:last-child {
        margin-right: 5%;
      }
      .arrow-right {
        padding: 0 0.4rem 0;
        background: url(../images/moreinfo.png) no-repeat center right;
        background-size: auto 0.35rem;
      }
    }
    li:last-child {
      border: none;
    }
  }
  .remarks {
    width: 88%;
    height: ~`px2rem(450) `;
    margin: 0.5rem auto ~`px2rem(60) `;
    display: block;
    border-radius: 10px;
    background: #272734;
    border: none;
    outline: none;
    padding: 2%;
    font-size: 14px;
    color: #fff;
  }
  .Submission {
    width: 75%;
    background-image: linear-gradient(-135deg, #2cbb86 0%, #2cbb55 100%);
    border-radius: 50px;
    padding: 0.2rem 0;
    margin: 0 auto;
    display: block;
    color: #fff;
    font-size: 16px;
  }
}
.medicalSlots {
  position: absolute;
  width: 100%;
  background: #fff;
  bottom: 0;
  left: 0;
  z-index: 9999;
  .pickerBtn {
    width: 100%;
    display: -webkit-flex;
    justify-content: space-between;
    border-bottom: 1px solid #eaeaea;
    div {
      width: 50%;
      text-align: center;
      padding: 0.3rem 0;
      font-size: 16px;
    }
    .closeBtn {
      color: #9da3b4;
    }
    .sureBtn {
      color: #2cbb55;
    }
  }
}
.Prompt {
  width: 75%;
  color: #999;
  font-size: 12px;
  margin: 0.5rem auto;
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
.mainProducts{
  margin-left: 5%;
  padding: 0.2rem 0;
  color: #fff;
  font-size: 16px;
}
</style>


