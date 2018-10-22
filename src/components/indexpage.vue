<template>
  <div class="indexpage">
    <div class="searchbox">
      <div class="searchtype">
        <filter-bar
          top="0"
          :bar-menus="barMenus" 
          @showDialog="handleShowDialog" 
          @closeDialog="handleCloseDialog" 
          @changeTab="handleChangeTab"
          @changeMainItem="handleChangeMainItem" 
          @changeSelect="changeData">
        </filter-bar>
      </div>
      <div class="fl logo" style="margin: 8px 10px 3px 10px;"><img src="../images/pindexlogo.png" class="pindexlogo"></div>
      <mt-field placeholder="搜索项目或医院" class="searchinput" v-model="keyWord" @keyup.enter.native="searchProducts()" auto>
        <mt-button type="primary" class="searchbtn" id="searchwords" @click="searchProducts"><img src="../images/index/search.png" height="95%"></mt-button>
      </mt-field>
      <div class="clear"></div>
      <!-- test -->
    </div>
    
    <div class="infoswipe">
      <mt-swipe :auto="0" :showIndicators="false">
        <mt-swipe-item v-for="(item, index) in indexBannerInfos" :key="index">
          <a style="width:100%;height:100%;display:block;border-radius:10px;overflow:hidden;" :href="item.targUrl?item.targUrl:prohibition"><img v-bind:src="item.imgUrl" width="100%" height="100%"></a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="welfare">
      <div class="welbox fl" @click="toindexpagestica">
        <img src="../images/index/nav1.png">
        <p>成单奖励</p>
      </div>
      <div class="welbox fl" @click="toindexpagesticb">
        <img src="../images/index/nav2.png">
        <p>推新奖励</p>
      </div>
      <div class="welbox fl" @click="toindexpagesticc">
        <img src="../images/index/nav3.png">
        <p>收益滚利</p>
      </div>
      <div class="welbox fl" @click="toindexpagesticd">
        <img src="../images/index/nav4.png">
        <p>阶梯奖励</p>
      </div>

      <div class="welbox fl" @click="toindexpagestice">
        <img src="../images/index/nav5.png">
        <p>异业拓客</p>
      </div>
      <div class="welbox fl" @click="toindexpagesticf">
        <img src="../images/index/nav6.png">
        <p>集采返现</p>
      </div>
      <div class="welbox fl" @click="toindexpagesticg">
        <img src="../images/index/nav7.png">
        <p>新品悬赏</p>
      </div>
      <div class="welbox fl expect">
        <img src="../images/index/nav8.png">
        <p>敬请期待</p>
      </div>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
    <div class="hotlabels">
      <p class="title"><b><span></span>金牌供应商</b></p>
      <div class="infoswipe medalSup">
         <div class="medal" v-for="(item, index) in orgInfos" :key="index" v-if="index%2 != 1" @click="gosupplierInfo(item.orgId)">
            <img src="../images/index/international.png" alt="">
            <p>{{item.orgName}}</p>
          </div>
          <div class="medal" @click="gosupplierInfo(item.orgId)" v-else>
            <img src="../images/index/international2.png" alt="">
            <p>{{item.orgName}}</p>
          </div>
      </div>
    </div>
    <div class="hotlabels classification">
      <p class="title"><b><span></span>热门分类</b></p>
      <div class="label">
        <span class="prolabel" v-for="(item, index) in productLabelVOS" @click="toproducts(item.productType, item.label)">{{ item.label }}</span>
      </div>
    </div>
    <div class="hotlabels" style="border-bottom:none;">
      <p class="title"><b><span></span>优选产品</b><span class="more" @click="seemore"><img src="../images/index/right_arrow.png" alt=""></span></p>
      <div class="productbox" v-for="(item, index) in productInfos" :key="index">
        <dl>
          <dd @click="toproinfo(item.productId,'m')">
            <img v-bind:src="item.imgUrl" alt="">
            <img class="Recommend" src="../images/index/Recommend.png" v-if="item.isRecommend == 1" alt="">
          </dd>
          <dt>
            <h3  @click="toproinfo(item.productId,'m')">{{ item.productName }}</h3>
            <p  @click="toproinfo(item.productId,'m')">
              <span v-if="item.productPlace == 'null'"></span>
              <span v-else> {{ item.productPlace }}</span>
              <span v-if="item.productDoctor == 'null'"></span>
              <span v-else> {{ item.productDoctor }}专家</span>
            </p>
            <ul @click="toproinfo(item.productId,'m')">
              <li>
                信用分 <span>{{item.creditRate}}</span>
              </li>
              <li>
                月售 <span>{{ item.sellNum }}</span> 单
              </li>
               <li>
                <span>{{ parseInt(item.returnRate) + parseInt(item.groupBuyingRate) }}% </span>订单收益
              </li>
            </ul>
            <a class="computer" @click="togetmoney(item.returnRate, item.marginReturnRate, item.groupBuyingRate)">
              <img src="../images/index/computer.png" alt="">
            </a>
          </dt>
        </dl>
      </div>
      <p class="loadmore" @click="seemore" v-if="pageNo == totalPages">点击查看全部产品</p>
      <p class="loadmore"  @click="getLoadMore" v-else>点击加载更多</p>
    </div>
    <div @click="hideCalcuator">
      <Calculator class="Calculator" :returnRate="returnRate" :marginReturnRate="marginReturnRate" :groupBuyingRate="groupBuyingRate"></Calculator>
    </div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="index">
        <span><img slot="icon" src="../images/productonicon.png" class="tabbaricon">首页</span>
      </mt-tab-item>
      <mt-tab-item id="mine">
        <span><img slot="icon" src="../images/mineoff.png" class="tabbaricon">我的</span>
      </mt-tab-item>
    </mt-tabbar>    
  </div>
  
</template>

<script>
import {loginService} from "../services/login"
import {Toast, MessageBox} from 'mint-ui'
import $ from 'jquery'
import FilterBar from './filter/FilterBar'
import Calculator from './getmoney'
import storage from '../storage.js'
export default {
  name: 'indexpage',
  data () {
    return {
      selected: 'index',
      productType: '',
      keyWord: '',
      indexBannerInfos: [],
      productLabelVOS: [],
      orgInfos: [],
      productInfos: [],
      barMenus: [],
      returnRate:"",
      marginReturnRate:"",
      groupBuyingRate:"",
      prohibition:"javascript:void(0)",
      markShow:false,
      orgType:"",
      supplierType:"",
      pageNo: 1,
      pageSize: 10,
      loadmoreData: true,
      totalPages:0
    }
  },
  watch: {
    selected(data) {
      if(data == 'mine') {
        let path = {path: '/mine', query:{}}
        this.$router.push(path)
      } else if(data == 'index') {
        let path = {path: '/indexpage', query:{}}
        this.$router.push(path)
      }
    }
  },
  methods: {
    getLoadMore() {//点击加载更多
      this.pageNo = this.pageNo + 1
      this.getRecommendlist();
    },
    getRecommendlist(){//获取首页优选产品列表
      loginService.recommendlist(this.pageNo, this.pageSize).then((r)=>{
        if(r.flag == 20000){
          this.productInfos = this.productInfos.concat(r.data.list)
          this.totalPages = r.data.totalPages
        }else{
          Toast(r.msg)
        }
      })
    },
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
                  if(this.orgType == "C" || this.supplierType == "D"){
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
    gobankList(){

    },
     hideCalcuator(){      
      $(".Calculator").hide();
      $("body").css({
        "overflow-y":"auto"
      })
    },
    togetmoney(returnRate, marginReturnRate, groupBuyingRate) {
      $(".Calculator").show();
      $("body").css({
        "overflow":"hidden"
      })
      $("#computing").focus()
      this.returnRate = returnRate;
      this.marginReturnRate = marginReturnRate;
      this.groupBuyingRate = groupBuyingRate;
      
    },
    gosupplierInfo(orgId){
      let path = {path:'./minfo',query:{orgId:orgId,type:"m"}}
      this.$router.push(path)
    },
    handleShowDialog(v) {
      // console.log(v);
    },
    handleCloseDialog(v) {
      // console.log(v);
    },
    handleChangeTab(v) {
      // console.log(v);
    },
    handleChangeMainItem(v) {
      // console.log(v)
      if(v.v.value == '') {
        this.$router.push({path: '/productlist', query: {productType: '', label: ''}})
      }
      
    },
    changeData(v) {
      //console.log(v[0].value)
      let productType = v[0].value.split('-')[1]
      let label = v[0].value.split('-')[0]
      this.$router.push({path: '/productlist', query: {productType: productType, label: label}})
    },
    toindexpagestice() {
      this.$router.push({path: '/indexpagestice'})
    },
    toindexpagestica() {
      this.$router.push({path: '/indexpagestica'})
    },
    toindexpagesticb() {
      this.$router.push({path: '/indexpagesticb'})
    },
    toindexpagesticc() {
      this.$router.push({path: '/indexpagesticc'})
    },
    toindexpagesticd() {
      this.$router.push({path: '/indexpagesticd'})
    },
    toindexpagesticf() {
      this.$router.push({path: '/indexpagesticf'})
    },
    toindexpagesticg(){
      this.$router.push({path: '/indexpagesticg'})
    },
    getdate(){
      loginService.indexlists().then(r => {
        if(r.flag == 20000){
          this.indexBannerInfos = r.data.indexBannerInfos
          this.productLabelVOS = r.data.productLabelVOS
          this.orgInfos = r.data.orgInfos
          
        }else{
          Toast(r.msg)
        }
      });
    },
    toproinfo(productId,type) {
      let path = {path: '/productinfo', query:{productId: productId,type:type}}
      this.$router.push(path)
    },
    toproducts(productType, label) {
      this.$router.push({path: '/productlist', query: {productType: productType, label: label}})
    },
    toorgpage(orgId) {
      this.$router.push({path: '/minfo', query: {orgId: orgId}})
    },
    searchProducts() {
      if(this.keyWord == ""){
        Toast("请输入查找内容")
      }else{
        this.$router.push({path: '/productlist', query: {keyWord: this.keyWord}})
      }
    },
    seemore() {
      this.$router.push({path: '/productlist', query: {}})
    },
    getLabels() {
     loginService.getLabels().then(r => {
        this.Labels = r.data
        var lista = [{name: '全部', value: ''+'-1'}]
        var listb = [{name: '全部', value: ''+'-2'}]
        var listc = [{name: '全部', value: ''+'-3'}]
        for(var i=0;i<r.data.length;i++){
          if(r.data[i].productType == 1){
            lista.push({name: r.data[i].label,value: r.data[i].label + '-' + r.data[i].productType})
          }else if(r.data[i].productType == 2) {
            listb.push({name: r.data[i].label,value: r.data[i].label + '-' + r.data[i].productType})
          }else if(r.data[i].productType == 3) {
            listc.push({name: r.data[i].label,value: r.data[i].label + '-' + r.data[i].productType})
          }
        }
        this.barMenus = [{
              name: '分类',
              icon: '',
              value: '',
              showTabHeader: false,
              defaultIcon: '',
              selectIcon: '',
              selectIndex: 0,
              tabs: [{
                      icon: '',
                      name: '类型',
                      selectIndex: 0,
                      detailList: [{
                        name: '全部',
                        icon: '',
                        value: '',
                        selectIndex: 0,
                        list: [{
                          name: '全部',
                            icon: '',
                            value: '',
                            selectIndex: 0
                        }]
                      }, {
                        name: '大健康',
                        icon: '',
                        selectIndex: 1,
                        list: lista
                      }, {
                          name: '医美',
                          icon: '',
                          selectIndex: 2,
                          list: listb
                      }, {
                          name: '皮肤',
                          icon: '',
                          selectIndex: 3,
                          list: listc
                      }]
                    }]
                  }]
      }).catch(e => {
        console.log(e)
      });
   }
  },
  mounted(){    
    this.getRecommendlist();
    loginService.getUserInfo().then(r=>{
      if(r.flag == 20000){
        this.orgType = r.data.orgType;
        this.supplierType = r.data.supplierType;
        if(r.data.contactStatus !== 1){
          let path = {path: '/homepage', query:{}}
          this.$router.push(path)
        }
      }else{
        let path = {path: '/login', query:{}}
        this.$router.push(path)
        Toast(r.msg)
      }
    })
    this.getdate();
    this.getLabels();
    
    $('.mint-cell-wrapper').css('padding','0').css('width','100%')
    $('.mint-cell-value').css({
      'padding':'0',
      'background-color':'#fff',
      'height':'68%',
      'overflow':'hidden',
      "position":"relative"
    })
    $(".mint-button").css({
      "overflow":"hidden"
    })
    $('.searchbtn').css('padding','0')
    $('.is-selected').css('color','#2CBB55')
    $('.mint-field-core').attr('type','search');
    $(".mint-field-core").css({
      "color":"#484855"
    })
    $(".mint-field-clear").css({
      "opacity":"0"
    })
    $(".searchbtn").parent(".mint-field-other").css({
      "position":"absolute",
      "right":'.2rem',
      "top":"0",
      'overflow':'hidden'
    })
    // $(".mint-button").css({
    //   "border-radius":"0"
    // })
    $(".mint-swipe-items-wrap").css({
      "width":"92%",
      "margin":"15px auto",
      "border-radius":"10px",
      "overflow":"hidden"
    })
    $(".mint-swipe-item").css({
      "border-radius":"10px",
      "overflow":"hidden"
    })
    $(".mint-tab-item").css({
      "color":"#363645"
    })
    $(".mint-tab-item-label span").css({
      "font-size":"15px"
    })
    $(".item").css({
      "border-bottom":"1px solid #fff"
    })
    $(".container").css({
      "color":"#fff"
    })
    $(".mint-field-core").blur();
    $("body").css({
      "overflow-y":"scroll"
    })
    storage.setCookie('havaBingBank','true')

  },
  components: {
    'filter-bar': FilterBar,
    Calculator
  },
  created() {
    var bankInfo = storage.getCookie('havaBingBank');
    if(!bankInfo){
      this.haveBankInfo();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.mark{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left:0;
  opacity: 0.8;
  background: #1D1D28;
  z-index: 1;
}
.Calculator{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  z-index: 99999999999;
}
.expect{
  p{
    color: #9DA3B4!important;
  }
}
::-webkit-scrollbar {display:none}
.computer{
  width:1rem;
  height:auto;
  position: absolute;
  right: 0;
  bottom: 0;
  img{
    width:100%;
    height:auto;
  }
}
.productbox{
  width:100%;
  height:auto;
  border-bottom: ~`px2rem(1)` solid #363645;
  dl{
    display: -webkit-flex;
    justify-content: center;
    dd{
    width:31.6%;
    height: auto;
    max-height: 2.7rem;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    img{
      width:100%;
      height:auto;
    }
    .Recommend{
      position: absolute;
      width:71%;
      height: auto;
      left: -5px;
      bottom:0rem;
    }
  }
  dt{
    width:65%;
    margin-left:.5rem;
    color:#fff;
    position: relative;
    h3{
      font-weight: normal;
      font-size: 16px;
      width:100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p{
      color:#9DA3B4;
      font-size: 12px;
      margin:0.2rem 0 .2rem;
    }
    ul{
      display: -webkit-flex;
      flex-wrap: wrap;
      li{
        padding:.1rem .3rem;
        border:1px solid #363645;
        margin-right:.2rem;
        border-radius:100px;
        color:#9DA3B4;
        margin-bottom: .1rem;
        span{
          color:#FBC700;
        }
      }
    }
  }
  }
}
.Other{
  border:1px solid #363645;
}
.label span:nth-child(1){
  background: url(../images/index/blood.png) no-repeat center;
  background-size:contain; 
}
.label span:nth-child(2){
  background: url(../images/index/Cells.png) no-repeat center;
  background-size:contain; 
}
.label span:nth-child(3){
  background: url(../images/index/Eye.png) no-repeat center;
  background-size:contain; 
}
.label span:nth-child(4){
  background: url(../images/index/Cosmetology.png) no-repeat center;
  background-size:contain; 
}
.medalSup{
  height: 2.7rem!important;
  display: -webkit-box;
}
.medal{
  width:53.3%;
  height: auto;
  position: relative;
  margin: 0 0 0 .15rem;
}
.medal img{
  width:100%;
  height:auto;
}
.medal p{
  width:80%;
  height: 23px;
  text-align: center;
  font-size: 18px;
  color:#fff;
  position: absolute;
  top: 50%;
  margin-top: -20px;
  left:50%;
  margin-left: -40%;
  overflow: hidden;
  text-align: center;
  
}
.clear{
  clear: both;
}
.filterbar{
  width: 18%;
  right: 0;
  top: 0px!important;
}
.infoswipe::-webkit-scrollbar {
    display: none;
}
.indexpage{
  padding-bottom: ~`px2rem(98)`;
  background-color: #1D1D28 ;
  padding-top: ~`px2rem(80)`;
  .hotlabels{
    background-color: #1D1D28;
    margin-top: ~`px2rem(18)`;
    border-bottom: ~`px2rem(1)` solid #363645;
    .more{
      float: right;
      color: #8A8A8A;
      img{
        width: 60%;
      }
    }
    .infoswipe{
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: .2rem;
      a{
        width: 100%;
        height: 100%;
      }
    }
    .productbox{
      width: ~`px2rem(690)`;
      padding: ~`px2rem(30)`;
      border-bottom: ~`px2rem(1)` solid #363645;
      clear: both;
      .ishot{
        width: ~`px2rem(126)`;
        height: ~`px2rem(40)`;
        position: relative;
        top: ~`px2rem(-45)`;
      }
      .proimg{
        width: ~`px2rem(180)`;
        height: ~`px2rem(180)`;
        float: left;
        border-radius: ~`px2rem(15)`;
        margin-right: ~`px2rem(30)`;
      }
      .protitle{
        color: #fff;
        line-height: ~`px2rem(48)`;
        font-size: ~`px2rem(34)`;
        height: ~`px2rem(96)`;
        overflow: hidden;
      }
      .proinfo{
        color: #9DA3B4;
        font-size: ~`px2rem(24)`;
        line-height: ~`px2rem(45)`;
        span{
          color: #E5322E;
        }
        .jssyimg{
          width: ~`px2rem(30)`;
        }
      }
    }
    .manageinfo{
        height: ~`px2rem(100)`;
        padding: 0 ~`px2rem(40)`;
        clear: both;
        //border-top: ~`px2rem(1)` solid #e5e5e5;
        //padding-top: ~`px2rem(15)`;
        background-color: #fff;
        margin-bottom: ~`px2rem(20)`;
        .orglogo{
          width: ~`px2rem(100)`;
          height: ~`px2rem(100)`;
          margin: ~`px2rem(0)` ~`px2rem(20)` ~`px2rem(10)` 0;
          border: ~`px2rem(1)` solid #E5E5E5;
        }
        .orgname{
          height: ~`px2rem(55)`;
          font-size: ~`px2rem(28)`;
          line-height: ~`px2rem(55)`;
        }
        .orgnum{
          height: ~`px2rem(50)`;
          line-height: ~`px2rem(55)`;
          font-size: ~`px2rem(24)`;
          span{
            color: #fc5b51;
          }
        }
      }
    .label{
      padding: ~`px2rem(0)` ~`px2rem(5)`;
      word-break: break-all;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .prolabel{
        text-align: center;
        flex: 1;
        height: 2rem;
        line-height: 2rem;
        color: #fff;
        font-size: 14px;
      }
    }
    .title{
      padding: ~`px2rem(20)`;
      b{
        padding-left: ~`px2rem(25)`;
        position: relative;
        color:#fff;
        font-size: 16px;
        font-weight: normal;
        span{
          width:4px;
          height:15px;
          background:#FBC700;
          position: absolute;
          left:0;
          top:3px;
          border-radius:1px;
        }
      }
    }
  }
  .searchbox{
    width: 100%;
    position: fixed;
    height: ~`px2rem(88)`;
    top: 0;
    z-index: 99999;
    background:-webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
    display: -webkit-flex;
    align-items: center;
    .pindexlogo{
      width: ~`px2rem(76)`;
      height: auto;
    }
    .searchinput{
      width: 68%;
      float: left;
      text-align: center;
    }
    .searchbtn{
      background-color: #fff;
      height: ~`px2rem(50)`;
    }
  }
  .tabbaricon{
    width: ~`px2rem(40)`;
    height: ~`px2rem(40)`;
    position: relative;
    top: ~`px2rem(10)`;
    left: -.3rem;
  }
  .infoswipe{
    height: 4rem;
    width: ~`px2rem(750)`;
  }
  .welfare{
    background-color: #1D1D28;
    padding: ~`px2rem(20)` ~`px2rem(10)` ~`px2rem(10)`;
    border-bottom: ~`px2rem(1)` solid #363645;
    .welbox{
      width: ~`px2rem(150)`;
      height: ~`px2rem(120)`;
      margin: ~`px2rem(15)` ~`px2rem(15)`;
      text-align: center;
      img{
        width: 1rem;
        height: 1rem;
      }
      p{
        font-size:14px;
        color: #fff;
        margin-top: 1%;
      }
    }
    
  }
}
.loadmore{
  height: ~`px2rem(90)`;
  line-height: ~`px2rem(90)`;
  text-align: center;
  font-size: ~`px2rem(25)`;
  color: #8e8e8e;
}
</style>
