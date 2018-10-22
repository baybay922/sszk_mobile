<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
@import "../less/functions";

::-webkit-scrollbar {display:none}
.searchBtn{
  color: #fff;
  font-size: 15px;
  line-height: ~`px2rem(94)`;
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
.productbox:nth-child(1){
  margin-top: .3rem;
}
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
.productlist{
  padding-bottom: ~`px2rem(84)`;
  padding-top: ~`px2rem(155)`;
  .search select{
    width: ~`px2rem(100)`;
    height: ~`px2rem(60)`;
  }
  .products{
    background-color: #1d1d28;
    height: 100%;
    .loadmore{
      height: ~`px2rem(90)`;
      line-height: ~`px2rem(90)`;
      text-align: center;
      font-size: ~`px2rem(25)`;
      color: #8e8e8e;
      //margin-bottom: ~`px2rem(98)`;
    }
    .productbox{
      width: ~`px2rem(690)`;
      height: auto;
      padding: ~`px2rem(30)`  ~`px2rem(30)`  ~`px2rem(30)`  ~`px2rem(30)`;
      border-bottom: ~`px2rem(1)` solid #484855;
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
        color: #3A3A3A;
        line-height: ~`px2rem(48)`;
        font-size: ~`px2rem(34)`;
        height: ~`px2rem(96)`;
        overflow: hidden;
      }
      .proinfo{
        color: #8A8A8A;
        font-size: ~`px2rem(24)`;
        line-height: ~`px2rem(45)`;
        height: ~`px2rem(45)`;
        overflow: hidden;
        span{
          color: #D7000F;
        }
        .jssyimg{
          width: ~`px2rem(30)`;
        }
      }
    }
    .productemt{
      height: 100%;
      padding: ~`px2rem(200)`;
      padding-bottom: ~`px2rem(525)`;
      background-color: #1d1d28;
      img{
        width: 50%;
      }
      .productemtinfo{
        color: #8A8A8A;
        font-size: ~`px2rem(30)`;
        padding-top: ~`px2rem(30)`;
      }
    }
  }
  .tabbaricon{
    width: ~`px2rem(40)`;
    height: ~`px2rem(40)`;
    position: relative;
    top: ~`px2rem(6)`;
    left: -.3rem;
  }
  .searchbox{
    height: ~`px2rem(88)`;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 99999;
    background: -webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
    display: -webkit-flex;
    .searchbtn{
      background-color: #fff;
      height: ~`px2rem(55)`;
    }
  }
}
.Calculator{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  z-index: 999999;
}
</style>
<template>
  <div class="productlist">
    <div class="searchbox">
      <mt-field placeholder="搜索项目或医院" class="searchinput" v-model="searchlist.keyWord" @keyup.enter.native="searchProducts()">
        <mt-button type="primary" class="searchbtn" @click="searchProducts"><img src="../images/index/search.png" height="95%"></mt-button>
      </mt-field>
      <div class="searchBtn" @click="searchProducts">搜索</div>
    </div>
    <div class="searchtype">
      <filter-bar
        :bar-menus="barMenus" 
        @showDialog="handleShowDialog" 
        @closeDialog="handleCloseDialog" 
        @changeTab="handleChangeTab"
        @changeMainItem="handleChangeMainItem" 
        @changeSelect="changeData">
      </filter-bar>
    </div>
    <div class="products">
      <div class="productbox" v-for="item in getProductlist">
        <dl>
          <dd @click="toproinfo(item.productId,'m',$event)">
            <img v-bind:src="item.imgUrl" alt="">
            <img class="Recommend" src="../images/index/Recommend.png" v-if="item.isRecommend == 1" alt="">
          </dd>
          <dt>
            <h3  @click="toproinfo(item.productId,'m',$event)">{{ item.productName }}</h3>
            <p  @click="toproinfo(item.productId,'m',$event)">
              <span v-if="item.productPlace == 'null'"></span>
              <span v-else> {{ item.productPlace }}</span>
              <span v-if="item.productDoctor == 'null'"></span>
              <span v-else> {{ item.productDoctor }}专家</span>
            </p>
            <ul @click="toproinfo(item.productId,'m',$event)">
              <li>
                信用分 <span>{{item.creditRate}}</span>
              </li>
              <li>
                月售 <span>{{ item.sellNum }}</span > 单
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
      <p v-if="searchlist.pageNo == totalPages" class="loadmore">已加载全部数据</p>
      <p @click="loadMore"  class="loadmore" v-else>点击加载更多</p>
      <div class="productemt talignc" v-if="getProductlist.length == 0">
        <img src="../images/nodata.png">
        <p class="productemtinfo">当前列表还没有产品</p>
      </div>
    </div>
    <div @click="hideCalcuator">
      <Calculator class="Calculator" :returnRate="returnRate" :marginReturnRate="marginReturnRate" :groupBuyingRate="groupBuyingRate"></Calculator>
    </div>
    
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="index">
        <span><img slot="icon" src="../images/productoffimg.png" class="tabbaricon">首页</span>
      </mt-tab-item>
      <mt-tab-item id="mine">
        <span><img slot="icon" src="../images/mineoff.png" class="tabbaricon">我的</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
import FilterBar from './filter/FilterBar'
import Calculator from './getmoney'
import storage from '../storage.js'
export default {
  name: 'productlist',
  data () {
    return {
      loadmoreData:"点击加载更多",
     searchwords: '',
     selected: '',
     searchlist: {
       keyWord: this.$route.query.keyWord ? this.$route.query.keyWord : '',
       productName: '',
       productType: this.$route.query.productType ? this.$route.query.productType : '',
       label: this.$route.query.label ? this.$route.query.label : '',
       pageNo: 1,
       pageSize: 10,
       orderField: 0,//0-最新；1-最热；2-折扣最高
       searchScope: 0,//0-全部；1-仅合作过；2-仅集采产品
       provinceName:'',
       city:'',
       orgId: ''
     },
     getProductlist: [],
     Labels: [],
     barMenus: [],
     returnRate:"",
    marginReturnRate:"",
    groupBuyingRate:"",
    cityList:[],
    totalPages:""
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
    CloseSearch(){
      this.getProductlist = []
      this.getProducts()
    },
    hideCalcuator(){
      $(".Calculator").hide();
      $("body").css({
        "overflow-y":"auto"
      })
    },
    searchProducts() {
      this.getProductlist = []
      this.getProducts()
    },
    loadMore() {
      this.searchlist.pageNo = this.searchlist.pageNo + 1
      this.getProducts()
    },
    toproinfo(productId, type,$event) {
      var  scroll_Top= $event.pageY;
      storage.setSession('scroll_Top',scroll_Top)
      let path = {path: '/productinfo', query:{productId: productId,type:type}}
      this.$router.push(path)
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
   getProducts() {     
      loginService.myInfo().then(r => {
        if(r.data.orgType == "P"){
             loginService.supplierList(this.searchlist.keyWord, this.searchlist.productName, this.searchlist.productType, this.searchlist.label, this.searchlist.pageNo, this.searchlist.pageSize, this.searchlist.orderField, this.searchlist.searchScope, 
             this.searchlist.orgId,this.searchlist.provinceName, this.searchlist.city).then(r => {
            if(r.data.list.length == 0) {
              Toast('没有更多数据了！')
              $(".loadmore").hide()
            }else{
              this.getProductlist = this.getProductlist.concat(r.data.list)
              this.totalPages = r.data.totalPages
            }
          }).catch(e => {
            console.log(e)
          });
          }else{
            loginService.getPorducts(this.searchlist.keyWord, this.searchlist.productName, this.searchlist.productType, this.searchlist.label, this.searchlist.pageNo, this.searchlist.pageSize, this.searchlist.orderField, this.searchlist.searchScope, 
            this.searchlist.orgId,this.searchlist.provinceName, this.searchlist.city).then(r => {
            if(r.data.list.length == 0) {
              Toast('没有更多数据了！');
              $(".loadmore").hide()
            }else{
              this.getProductlist = this.getProductlist.concat(r.data.list);
              this.totalPages = r.data.totalPages
            }
            
          }).catch(e => {
            
          });
          }
      })
     
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
        loginService.citySelect().then(res =>{
          if(r.flag == 20000){
            this.cityList = res.data;
            var quanguo = [{name: '全国范围', value: ''+'全国范围'}]
            var beijing = [{name: '全部', value: ''+'北京-全部'}]
            var tianjin = [{name: '全部', value: ''+'天津-全部'}]
            var heibei = [{name: '全部', value: ''+'河北-全部'}]
            var shanxi = [{name: '全部', value: ''+'山西-全部'}]
            var neimeng = [{name: '全部', value: ''+'内蒙-全部'}]
            var liaojing = [{name: '全部', value: ''+'辽宁-全部'}]
            var jinlin = [{name: '全部', value: ''+'吉林-全部'}]
            var heilongjiang = [{name: '全部', value: ''+'黑龙江-全部'}]
            var shanghai = [{name: '全部', value: ''+'上海-全部'}]
            var jiangsu = [{name: '全部', value: ''+'江苏-全部'}]
            var zhejiang = [{name: '全部', value: ''+'浙江-全部'}]
            var anhui = [{name: '全部', value: ''+'安徽-全部'}]
            var fujian = [{name: '全部', value: ''+'福建-全部'}]
            var jiangxi = [{name: '全部', value: ''+'江西-全部'}]
            var shandong = [{name: '全部', value: ''+'山东-全部'}]
            var heinan = [{name: '全部', value: ''+'河南-全部'}]
            var hubei = [{name: '全部', value: ''+'湖北-全部'}]
            var hunan = [{name: '全部', value: ''+'湖南-全部'}]
            var guangdong = [{name: '全部', value: ''+'广东-全部'}]
            var guangxi = [{name: '全部', value: ''+'广西-全部'}]
            var hainan = [{name: '全部', value: ''+'海南-全部'}]
            var chongqing = [{name: '全部', value: ''+'重庆-全部'}]
            var sichuan = [{name: '全部', value: ''+'四川-全部'}]
            var guizhou = [{name: '全部', value: ''+'贵州-全部'}]
            var yunnan = [{name: '全部', value: ''+'云南-全部'}]
            var xizang = [{name: '全部', value: ''+'西藏-全部'}]
            var shanxi2 = [{name: '全部', value: ''+'陕西-全部'}]
            var gansu = [{name: '全部', value: ''+'甘肃-全部'}]
            var qinghai = [{name: '全部', value: ''+'青海-全部'}]
            var ningxia = [{name: '全部', value: ''+'宁夏-全部'}]
            var xinjiang = [{name: '全部', value: ''+'新疆-全部'}]
            var taiwan = [{name: '全部', value: ''+'台湾-全部'}]
            var xianggang = [{name: '全部', value: ''+'香港-全部'}]
            var aomen = [{name: '全部', value: ''+'澳门-全部'}];
            for(var i=0;i<res.data.length;i++){
              if(res.data[i].provinceId == 110000){
                beijing.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 120000) {
                tianjin.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 130000) {
                heibei.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 140000) {
                shanxi.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 150000) {
                neimeng.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 210000) {
                liaojing.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 220000) {
                jinlin.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 230000) {
                heilongjiang.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 310000) {
                shanghai.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 320000) {
                jiangsu.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 330000) {
                zhejiang.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 340000) {
                anhui.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 350000) {
                fujian.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 360000) {
                jiangxi.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 370000) {
                shandong.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 410000) {
                heinan.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 420000) {
                hubei.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 430000) {
                hunan.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 440000) {
                guangdong.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 450000) {
                guangxi.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 460000) {
                hainan.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 500000) {
                chongqing.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 510000) {
                sichuan.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 520000) {
                guizhou.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 530000) {
                yunnan.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 540000) {
                xizang.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 610000) {
                shanxi2.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 620000) {
                gansu.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 630000) {
                qinghai.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 640000) {
                ningxia.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 650000) {
                xinjiang.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 710000) {
                taiwan.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 810000) {
                xianggang.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }else if(res.data[i].provinceId == 820000) {
                aomen.push({name: res.data[i].cityName,value: res.data[i].provinceName + '-' + res.data[i].cityName})
              }
            }

             this.barMenus = [{
              name: '全部分类',
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
                        name: '医美',
                        icon: '',
                        selectIndex: 2,
                        list: listb
                      }, {
                          name: '大健康',
                          icon: '',
                          selectIndex: 1,
                          list: lista
                      }, {
                          name: '皮肤',
                          icon: '',
                          selectIndex: 3,
                          list: listc
                      }]
                    }]
                  },{
                    name: '地区',
                    icon: '',
                    value: 0,
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
                        }],
                      },
                      {
                        name: '全国范围',
                        icon: '',
                        selectIndex: 0,
                        list: [{
                          name: '全国范围',
                            icon: '',
                            value: '',
                            selectIndex: 0
                        }],
                      },
                       {
                        name: '北京市',
                        icon: '',
                        selectIndex: 110000,
                        list: beijing
                      },
                      {
                        name: '天津市',
                        icon: '',
                        selectIndex: 120000,
                        list: tianjin
                      },
                      {
                        name: '河北省',
                        icon: '',
                        selectIndex: 130000,
                        list: heibei
                      },
                      {
                        name: '山西省',
                        icon: '',
                        selectIndex: 140000,
                        list: shanxi
                      },
                      {
                        name: '内蒙古',
                        icon: '',
                        selectIndex: 150000,
                        list: neimeng
                      },
                      {
                        name: '辽宁省',
                        icon: '',
                        selectIndex: 210000,
                        list: liaojing
                      },
                      {
                        name: '吉林省',
                        icon: '',
                        selectIndex: 220000,
                        list: jinlin
                      },
                      {
                        name: '黑龙江省',
                        icon: '',
                        selectIndex: 230000,
                        list: heilongjiang
                      },
                      {
                        name: '上海省',
                        icon: '',
                        selectIndex: 310000,
                        list: shanghai
                      },
                      {
                        name: '江苏省',
                        icon: '',
                        selectIndex: 320000,
                        list: jiangsu
                      },
                      {
                        name: '浙江省',
                        icon: '',
                        selectIndex: 330000,
                        list: zhejiang
                      },
                      {
                        name: '安徽省',
                        icon: '',
                        selectIndex: 340000,
                        list: anhui
                      },
                      {
                        name: '福建省',
                        icon: '',
                        selectIndex: 350000,
                        list: fujian
                      },
                      {
                        name: '江西省',
                        icon: '',
                        selectIndex: 360000,
                        list: jiangxi
                      },
                      {
                        name: '山东省',
                        icon: '',
                        selectIndex: 370000,
                        list: shandong
                      },
                      {
                        name: '河南省',
                        icon: '',
                        selectIndex: 410000,
                        list: heinan
                      },
                      {
                        name: '湖北省',
                        icon: '',
                        selectIndex: 420000,
                        list: hubei
                      },
                      {
                        name: '湖南省',
                        icon: '',
                        selectIndex: 430000,
                        list: hunan
                      },
                      {
                        name: '广东省',
                        icon: '',
                        selectIndex: 440000,
                        list: guangdong
                      },
                      {
                        name: '广西',
                        icon: '',
                        selectIndex: 450000,
                        list: guangxi
                      },
                      {
                        name: '海南省',
                        icon: '',
                        selectIndex: 460000,
                        list: hainan
                      },
                      {
                        name: '重庆市',
                        icon: '',
                        selectIndex: 500000,
                        list: chongqing
                      },
                      {
                        name: '四川省',
                        icon: '',
                        selectIndex: 510000,
                        list: sichuan
                      },
                      {
                        name: '贵州省',
                        icon: '',
                        selectIndex: 520000,
                        list: guizhou
                      },
                      {
                        name: '云南省',
                        icon: '',
                        selectIndex: 530000,
                        list: yunnan
                      },
                      {
                        name: '西藏',
                        icon: '',
                        selectIndex: 540000,
                        list: xizang
                      },
                      {
                        name: '陕西省',
                        icon: '',
                        selectIndex: 610000,
                        list: shanxi2
                      },
                      {
                        name: '甘肃省',
                        icon: '',
                        selectIndex: 620000,
                        list: gansu
                      },
                      {
                        name: '青海省',
                        icon: '',
                        selectIndex: 630000,
                        list: qinghai
                      },
                      {
                        name: '宁夏',
                        icon: '',
                        selectIndex: 640000,
                        list: ningxia
                      },
                      {
                        name: '新疆',
                        icon: '',
                        selectIndex: 650000,
                        list: xinjiang
                      },
                      {
                        name: '台湾省',
                        icon: '',
                        selectIndex: 710000,
                        list: taiwan
                      },
                      {
                        name: '香港',
                        icon: '',
                        selectIndex: 810000,
                        list: xianggang
                      },
                      {
                        name: '澳门',
                        icon: '',
                        selectIndex: 820000,
                        list: aomen
                      }
                      ]
                    }]
                 },{
                    name: '最新',
                    icon: '',
                    value: 0,
                    showTabHeader: false,
                    defaultIcon: '',
                    selectIcon: '',
                    selectIndex: 0,
                    tabs: [{
                        icon: '',
                        name: '',
                        selectIndex: 0,
                        detailList: [{
                            name: '最新',
                            icon: '',
                            value: 1,
                            selectIndex: 1
                        }, {
                            name: '最热',
                            icon: '',
                            value: 2,
                            selectIndex: 2
                        }, {
                            name: '折扣最高',
                            icon: '',
                            value: 3,
                            selectIndex: 4
                        }]
                    }]
                 },]
          }else{
            Toast(r.msg)
          }
        })
      }).catch(e => {
        
      });
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
      if(v.v.value == '') {
        this.searchlist.productType = ''
        this.searchlist.label = ''
        this.searchlist.pageNo = 1
        this.getProductlist = []
        this.getProducts()
      }
    },
    changeData(v) {
      if(v[0].value !== '') {
        this.searchlist.productType = v[0].value.split('-')[1]
        this.searchlist.label = v[0].value.split('-')[0]
       
      }else{
        this.searchlist.productType = ''
        this.searchlist.label = ''
      }

      if(v[2].value != ''){ 
        this.searchlist.orderField = v[2].value;
      }else{
         this.searchlist.orderField = ''
      }

      this.searchlist.searchScope = 0
      if(v[1].value != ''){
        this.searchlist.provinceName = v[1].value.split('-')[0]
        this.searchlist.city = v[1].value.split('-')[1];
      }else{
        this.searchlist.provinceName = ''
        this.searchlist.city = ''
      }
      this.searchlist.pageNo = 1
      this.getProductlist = []
      this.getProducts()
    }
  },
  mounted(){
    this.getProducts()
    this.getLabels()
    $('.mint-cell-wrapper').css('padding','0').css('width','96%').css('margin-left','2%')
    $('.mint-cell-value').css('padding','0').css('background-color','#fff').css('height','70%').css('position','relative')
    $('.searchbtn').css('padding','0')
    $('.mint-field-core').css('background-color','#fff')
    $('a').css('color','#aaa')
    $('.is-selected').css('color','#D7000F')
    // $(".mint-field-other").css({
    //   "width":"20%"
    // })
    $(".mint-field-other").css({
      "right":"5px"
    })
    $(".mint-button").css({
      "display":"block",
      "margin":"0 auto"
    })
    $(".container").css({
      "background":"#272734"
    })
    $(".products").css({
        "height": "auto",
        "padding-bottom":".3rem"
    })
    $(".mint-tab-item").css({
      "color":"#363645"
    })
    $(".selected").css({
      "border-bottom":"1px solid #fff"
    })
    $(".mint-field-core").css({
      "color":"#484855"
    })
    $(".mint-cell").css({
      "margin-top":"2px",
      "width":"90%"
    })
    $(".mint-field-clear").css({
      "margin-right":"10px",
      "opacity":".5"
    })
    var vm = this;
    $(".mintui-field-error").on("click",function(){
        vm.CloseSearch()
    }) 
    //返回产品列表回到原来位置
    // setTimeout(()=>{
    //   let scroll_Top = storage.getSession('scroll_Top');
    //     if(scroll_Top == null){
    //       $('body,html').animate({scrollTop:0},500);
    //     }else{
    //       $('body,html').animate({scrollTop:scroll_Top},500);
    //     } 
    // },300)
      
    
  },
  components: {
    'filter-bar': FilterBar,
    Calculator
  }
}
</script>