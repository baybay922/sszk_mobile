<template>
  <div class="minfo">
    <div class="supplierbox">
      <img v-bind:src="supinfo.logo" class="proimg">
      <p class="protitle" style="height: 0.64rem">{{ supinfo.orgName }}</p>
      <!-- <p class="proinfo" v-if="supinfo.orgRemark !== ''">{{ supinfo.orgRemark }}</p>
      <p class="proinfo" v-else>暂无介绍</p> -->
      <p class="proinfo"><span v-if="supinfo.isRecommend == 1" class="mr30">金牌供应商</span>信用分 <span>{{ supinfo.creditRate }}</span> <b style="color:#484855;">|</b>  月售 <span>{{ supinfo.sellNum }}</span> 单</p>
    </div>
    <mt-navbar v-model="selected" class="tab">
      <mt-tab-item id="tabtitleone">介绍</mt-tab-item>
      <mt-tab-item id="tabtitletwo">产品项目（ {{ total }} 件 ）</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="tabone">
        <div v-html="supinfo.orgIntroduce" class="supplierinfo"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tabtwo">
        <!-- <div class="productbox" v-for="item in getProductlist">
          <div @click="toproductinfo(item.productId)">
            <img v-bind:src="item.imgUrl" class="proimg" @click="toproinfo(item.productId)">
            <p class="protitle" @click="toproinfo(item.productId)">{{ item.productName }}</p>
            <p class="proinfo" @click="toproinfo(item.productId)">{{ item.productPlace }} | {{ item.productDoctor }}</p>
            <p class="proinfo" @click="toproinfo(item.productId)"><span>{{ item.returnRate }}</span>分成收益 | 月售<span>{{ item.sellNum }}</span>单</p>
          </div>
        </div> -->
        <div class="productbox" v-for="(item, index) in getProductlist" :key="index">
        <dl @click="toproductinfo(item.productId)">
          <dd>
            <img v-bind:src="item.imgUrl"  @click="toproinfo(item.productId)" alt="">
            <img v-if="item.isRecommend == 1" class="Recommend" src="../images/index/Recommend.png" alt="" >
          </dd>
          <dt>
            <h3  @click="toproinfo(item.productId)">{{ item.productName }}</h3>
            <p  @click="toproinfo(item.productId)">
               <span v-if="item.productPlace == 'null'"></span>
               <span v-else> {{ item.productPlace }}</span>
              <span v-if="item.productDoctor == 'null'"></span>
              <span v-else> {{ item.productDoctor }}专家</span>
            </p>
            <ul>
              <li>
                <span>{{ parseInt(item.returnRate) + parseInt(item.groupBuyingRate) }}</span> %订单收益
              </li>
              <li>
                月售 <span>{{ item.sellNum }}</span> 单
              </li>
            </ul>
          </dt>
        </dl>
      </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'minfo',
  data () {
    return {
      orgId: this.$route.query.orgId,
      supinfo: {},
      active: 'tabone',
      selected: 'tabtitleone',
      getProductlist: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      type:this.$route.query.type
    }
  },
  watch: {
    selected(data) {
      if(data == 'tabtitleone'){
        this.active = 'tabone'
      }else{
        this.active = 'tabtwo'
      }
    }
  },
  methods: {
    toproductinfo(productId) {
      let path = {path: '/productinfo', query: {productId: productId,type:this.type}}
      this.$router.push(path)
    },
    getinfo() {
      loginService.getSupplierInfo(this.orgId).then(r => {
        if (r.flag == 20000) {
          this.supinfo = r.data
          this.$nextTick(function(){
            $('.supplierinfo').find('img').css('width','100%')
          })
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getProducts() {
      loginService.getPorducts('', '', '', '', this.pageNo, this.pageSize, 0, 0, this.orgId).then(r => {
          this.getProductlist = r.data.list
          this.total = r.data.total
        }).catch(e => {
          console.log(e)
        });
    }
  },
  mounted(){
    this.getinfo()
    this.getProducts()
    $('.mint-tab-container').css('background-color','#1d1d28')
    $('.mint-tab-item').css({
      "color":"#ccc",
      'padding': '0'
    })
    $('.mint-tab-container').css('padding','0 0.2rem');
    $(".mint-tab-item-label").css('border','none')
    $(".is-selected").css({
      "color":"#fff",
      "font-size":"16px"
    })
  } 
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.productbox{
  width:100%;
  height:auto;
  border-bottom:1px solid #1D1D28;
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
      width:60%;
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
      color:#999;
      font-size: 12px;
      margin:.5rem 0 .1rem;
    }
    ul{
      display: -webkit-flex;
      flex-wrap: wrap;
      li{
        padding:.1rem .3rem;
        border:1px solid #484855;
        margin-right:.2rem;
        border-radius:100px;
        color:#9DA3B4;
        margin-top: .2rem;
        span{
          color:#F5A623;
        }
      }
    }
  }
  }
  
}
.minfo {
  background: #1d1d28;
}
.productbox{
  width: 100%;
  height: ~`px2rem(180)`;
  padding: ~`px2rem(30)` 0 ~`px2rem(40)` 0;
  border-bottom: 1px solid #484855;
  clear: both;
  .proimg{
    width: ~`px2rem(160)`;
    height: ~`px2rem(160)`;
    float: left;
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
    line-height: ~`px2rem(75)`;
    height: ~`px2rem(45)`;
    span{
      color: #F5A623;
    }

  }
  .mr30{
    margin-right: ~`px2rem(30)`;
  }
}
.supplierbox{
  width: ~`px2rem(690)`;
  height: ~`px2rem(180)`;
  padding: ~`px2rem(10)` ~`px2rem(30)` ~`px2rem(30)`;
  background-color: #1d1d28;
  clear: both;
  .proimg{
    width: ~`px2rem(160)`;
    height: ~`px2rem(160)`;
    float: left;
    margin-right: ~`px2rem(30)`;
    margin-top: 10px;
  }
  .protitle{
    color: #fff;
    line-height: ~`px2rem(48)`;
    font-size: ~`px2rem(34)`;
    height: ~`px2rem(96)`;
    overflow: hidden;
    margin-top: 20px;
  }
  .proinfo{
    color: #9DA3B4;
    font-size: ~`px2rem(24)`;
    line-height: ~`px2rem(75)`;
    height: ~`px2rem(45)`;
    span{
      color: #FBC700;
    }

  }
  .mr30{
    margin-right: ~`px2rem(30)`;
  }
}
.minfo{
  height: 100%;
  .supplierinfo{
    padding: ~`px2rem(20)`;
    color: #fff;
    line-height: 24px;
    font-size: 14px;
    p{
      margin:10px 0;
    }
  }
  .tab{
    background: #272734;
    height: ~`px2rem(86)`;
    .is-selected{
      background: -webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
    }
  }
}
</style>
