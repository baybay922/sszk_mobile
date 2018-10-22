<template>  
    <div class="supplierOrder"><!--  签订合同   -->
        <div class="signed-container">
            <div class="signed-wrapper">
                <div class="signed-title">
                    您还有未签订的合同！
                </div>
                <ul class="signedList">
                    <li v-for="(item, index) in contractList" :key="(index)">
                        <dl>
                            <dd>
                                <div class="product-title">{{item.productName}}</div>
                                <div class="product-info">
                                    <p>渠道商<span style="visibility:hidden">加</span></p>
                                    <p>{{item.agentName}}</p>
                                </div>
                                <div class="product-info">
                                    <p>订单时间</p>
                                    <p>{{item.createTime}}</p>
                                </div>
                                <div class="product-info">
                                    <p>订单合同</p>
                                    <p class="contract" @click="checkIsContract(item.contractUrl)">查看合同</p>
                                </div>
                                <div class="product-info">
                                    <p>订单详情</p>
                                    <p class="contract" @click="toorderinfo(item.orderNo)">查看订单</p>
                                </div>
                            </dd>
                            <dt class="SignBtn" @click="confirmSigning(item.orderNo,$event)">
                                <button>签订合同</button>
                            </dt>
                            <!-- <dt class="" v-else>
                                <button>已签订</button>
                            </dt> -->
                        </dl>
                    </li>
                </ul>
                <div class="button-container">
                    <button class="closeBtn" @click="closeSign">关闭</button>
                    <button class="allSign" @click="AllconfirmSigning">全部签订</button>
                </div>
            </div>
        </div>
        <my-order></my-order>
       <!-- 底部导航 -->
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="order" class="navFont">
                <span><img slot="icon" src="../images/supplier/createtask_red.png" class="tabbaricon">订单</span>
            </mt-tab-item>
            <mt-tab-item id="product" class="navFont">
                <span><img slot="icon" src="../images/supplier/manage_black.png" class="tabbaricon">产品</span>
            </mt-tab-item>
            <mt-tab-item id="mine" class="navFont">
                <span><img slot="icon" src="../images/mineoff.png" class="tabbaricon">我的</span>
            </mt-tab-item>
        </mt-tabbar>    
    </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast, MessageBox} from 'mint-ui'
import $ from 'jquery'
import MyOrder from './myorder'
import storage from '../storage.js'
export default {
  data(){
      return{
          selected:"order",
          signedMask:true,
          isContract:1,
          pageNo:1,
          pageSize:10,
          contractList:[],
          orderField:"1",
          contractVOS:[],
          orderNo:[],
          contractUrl:"",
          alreadySign:true,
          supplierType:"",
          orgType:""
      }
  },
  methods:{
      haveBankInfo(){//判断是未签订合同还是未添加银行卡
        loginService.havebank().then(r=>{
            if(r.flag == 20000){
            }else if(r.flag == 50006){//未签订个人合同
                MessageBox.confirm('', { 
                    message: '在下单之前，您需要签订资金安全协议，是否立即签订？', 
                    title: '提示', 
                    confirmButtonText: '立即签订', 
                    cancelButtonText: '暂时不了' 
                }).then(action => { 
                if (action == 'confirm') {     //确认的回调
                loginService.getAddress().then(r =>{
                    if(r.flag == 20000){
                        location.href = r.data;
                    }else{
                        Toast(r.msg)
                    }
                })
                }
                }).catch(err => { 
                if (err == 'cancel') {     //取消的回调
                    
                } 
            });
            }else if(r.flag == 50007){//未签订企业合同
                MessageBox.confirm('', { 
                    message: '在下单之前，您需要签订资金安全协议，是否立即签订？', 
                    title: '提示', 
                    confirmButtonText: '立即签订', 
                    cancelButtonText: '暂时不了' 
                    }).then(action => { 
                    if (action == 'confirm') {     //确认的回调
                    loginService.companyAddress().then(r =>{
                        if(r.flag == 20000){
                            location.href = r.data;
                        }else{
                            Toast(r.msg)
                        }
                    })
                    }
                    }).catch(err => { 
                    if (err == 'cancel') {     //取消的回调
                        
                    } 
            });
            }else if(r.flag == 40000){//未绑定银行卡
                MessageBox.confirm('', { 
                    message: '在下单之前，您需要添加收款银行卡，是否立即添加？', 
                    title: '提示', 
                    confirmButtonText: '立即添加', 
                    cancelButtonText: '暂时不了' 
                    }).then(action => { 
                    if (action == 'confirm') {     //确认的回调
                        if(this.orgType == 'C' || this.supplierType == "D"){
                            this.$router.push('/companyAddBank')
                        }else{
                            let path = {path: '/banklist', query:{}}
                            this.$router.push(path)
                        }
                    }
                        
                    }).catch(err => { 
                    if (err == 'cancel') {     //取消的回调
                    } 
                });
            }
        })
      },
      getAlreadySign(){//获取当前所有没有签合同的orderNo
        var vm = this;
            vm.contractVOS = [];
            loginService.isContractStuta(vm.isContract,vm.pageNo, vm.pageSize).then(r =>{
                if(r.flag == 20000){
                    for(var i = 0; i < r.data.length; i++){        
                        var contractVO = {
                                orderNo:r.data[i].orderNo,
                                isContract:vm.isContract
                            }
                        vm.contractVOS.push(contractVO);   
                    }
                }
            })
        
      },
      checkIsContract(contractUrl){//产看合同
        location.href = ""+contractUrl+"";
      },
      toorderinfo(orderNo){//查看订单详情
        let path = {path: '/suporderinfo', query:{orderNo: orderNo}}
        this.$router.push(path)
      },
      AllconfirmSigning(){//一键签订合同
        var vm = this;
        this.getAlreadySign()
        setTimeout(()=>{
            loginService.confirmSigning(vm.contractVOS).then(r =>{
                if(r.flag == 20000){
                    Toast("全部签订成功");
                    //this.signedMask = false;
                    $(".signed-container").hide()
                }else{
                    Toast(r.msg)
                }
            })      
        },200) 
      },
      confirmSigning(orderNo, event){//单个签订合同
        var _this = event.target,
            vm = this;
        vm.contractVOS = [];
        let contractVO = {
                orderNo:orderNo,
                isContract:vm.isContract
            }
        vm.contractVOS.push(contractVO)
        loginService.confirmSigning(vm.contractVOS).then(r =>{
            if(r.flag == 20000){
                Toast("签订成功");
                $(_this).parent().addClass("alreadySign")
                $(_this).html("已签订"); 
                //this.getIsContractStuta();
            }else{
                Toast(r.msg)
            }
        })
      },
      closeSign(){//关闭合同
          //this.signedMask = false;
          $(".signed-container").hide()
      },
      getIsContractStuta(){//获取未签订合同信息
          loginService.isContractStuta(this.isContract,this.pageNo, this.pageSize).then(r =>{
              if(r.flag == 20000){
                  if(r.data.length !== 0){
                      //this.signedMask = true;
                      $(".signed-container").show()
                      this.contractList = r.data;
                  }else{
                      $(".signed-container").hide()
                      //this.signedMask = false
                  }
              }else{
                  Toast(r.msg)
              }
          })
      }
  },
  components: {
    'my-order': MyOrder
  },
  mounted () {
      this.getIsContractStuta()//初始化获取数据
      
      $(".is-selected").css({
          "color":"#2CBB55"
      })
      $(".orderlist").css({
          "padding-bottom":""
      })
      loginService.getUserInfo().then(r=>{
      if(r.flag == 20000){
          this.orgType = r.data.orgType;
          this.supplierType = r.data.supplierType;
        if(r.data.contactStatus !== 1){
          let path = {path: '/homepage', query:{}}
          this.$router.push(path);
        }
      }else{
        Toast(r.msg)
      }
    })
    storage.setCookie('ShavaBingBank','true')      
  },
  created() {
    var bankInfo = storage.getCookie('ShavaBingBank');
    if(!bankInfo){
       this.haveBankInfo();
    }
   
  },
  watch: {
    selected(data) {
      if(data == 'order') {
        let path = {path: '/supplierOrder', query:{}}
        this.$router.push(path)
      } else if(data == 'product') {
        let path = {path: '/supplierProduct', query:{}}
        this.$router.push(path)
      } else if(data == 'mine'){
          let path = {path: './mine', query:{}}
          this.$router.push(path)
      }
    }
  },
}
</script>
<style lang="less" scoped>
@import "../less/functions";
.signed-container{
    width:100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    display: none;
}
.supplierOrder{
    width: 100%;
    height: auto;
}

.tabbaricon{
    width: ~`px2rem(42)`;
    height: ~`px2rem(42)`;
    margin-right: ~`px2rem(20)`;
    position: relative;
    top: ~`px2rem(7)`;
  }
  .navFont{
      font-size: 16px;
  }
  .myorder{
      padding-bottom: 1.3rem;
  }
  .signed-wrapper{
      width: ~`px2rem(690)`;
      height: 90%;
      background: #fff;
      margin: ~`px2rem(30)` auto 0;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
  }
.signed-title{
    width: 100%;
    padding: ~`px2rem(30)` 0;
    background: #E0E3ED;
    border-radius: 10px 10px 0 0;
    font-size: ~`px2rem(36)`;
    text-align: center;
    color: #333;
    font-weight: bold;
}
.signedList{
    width: 100%;
    height: 80%;
    overflow-y: auto;
    li{
        width: 85%;
        margin: ~`px2rem(30)` auto 0;
        border-bottom: ~`px2rem(1)` solid #E0E3ED;
        padding-bottom: ~`px2rem(30)`;
        dl{
            width: 100%;
            display: -webkit-flex;
            justify-content: space-between;
            dd{
                width: 65%;
            }
            .product-title{
                font-size: ~`px2rem(32)`;
                margin-bottom: ~`px2rem(20)`
            }
            .product-info{
                display: -webkit-box;
                margin-top: ~`px2rem(20)`;
                p:nth-child(1){
                    color: #9DA3B4;
                    margin-right: ~`px2rem(20)`;
                    font-size: ~`px2rem(24)`;
                }
                p:nth-child(2){
                    font-weight: bold;
                    color: #484855;
                    font-size: ~`px2rem(28)`;
                }
                .contract{
                    color: #F5A623!important;
                    font-weight: normal!important;
                }
            }
        }
    }
}
.SignBtn{ 
    display: -webkit-flex;
    align-items: center;
    button{
        background: #2CBB55;
        display: block;
        padding: ~`px2rem(10)` ~`px2rem(32)`;
        border-radius: 100px;
         font-size: ~`px2rem(28)`;
         color: #fff;
    }
}
.alreadySign{
    display: -webkit-flex;
    align-items: center;
    button{
        background: #fff;
        display: block;
        padding: ~`px2rem(10)` ~`px2rem(44)`;
        border-radius: 100px;
        font-size: ~`px2rem(28)`;
        color: #9DA3B4;
        border: ~`px2rem(1)` solid #9DA3B4;
    }
}
.button-container{
    width: ~`px2rem(690)`;
    height: 10%;
    position: absolute;
    bottom: 0;
    left: ~`px2rem(30)`;
    display: -webkit-flex;
    align-items: center;
    .closeBtn{
        width: 40%;
        margin: 0 2.5%;
        display: block;
        background: #fff;
        border:~`px2rem(1)` solid #E0E3ED;
        border-radius: 100px;
        padding: ~`px2rem(20)` 0;
        color: #9DA3B4;
        font-size: ~`px2rem(28)`;
    }
    .allSign{
        width: 40%;
        margin: 0 2.5%;
        display: block;
        background: #2CBB55;
        border-radius: 100px;
        padding: ~`px2rem(16)` 0;
        color: #fff;
        font-size: ~`px2rem(36)`;
    }
    
}
</style>


