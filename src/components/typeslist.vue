<template>
  <div class="typeslist">
    <div class="cellbox" v-for="item in list" @click="gettypelist(item.productType)">
      <mt-progress v-bind:value="parseFloat(item.rate)" :bar-height="15">
        <div slot="start">{{ item.productTypeName }}  {{ item.rate }}</div>
      </mt-progress>
      <mt-cell is-link class="arrow-right"></mt-cell>       
    </div>
    <mt-popup
      v-model="popupone"
      position="right">
      <div class="typeslistson">
        <div class="cellbox" v-for="item in listmainason">
          <mt-progress v-bind:value="parseFloat(item.rate)" :bar-height="15">
            <div slot="start">{{ item.label }}  {{ item.rate }}</div>
          </mt-progress>
        </div>
        <mt-button type="primary" class="loginbutton mt30" @click="popupone = !popupone">关闭</mt-button>
      </div>
    </mt-popup>
    <mt-popup
      v-model="popuptwo"
      position="right">
      <div class="typeslistson">
        <div class="cellbox" v-for="item in listmainbson">
          <mt-progress v-bind:value="parseFloat(item.rate)" :bar-height="15">
            <div slot="start">{{ item.label }}  {{ item.rate }}</div>
          </mt-progress>
        </div>
        <mt-button type="primary" class="loginbutton mt30" @click="popuptwo = !popuptwo">关闭</mt-button>
      </div>
    </mt-popup>
    <mt-popup
      v-model="popupthree"
      position="right">
      <div class="typeslistson">
        <div class="cellbox" v-for="item in listmaincson">
          <mt-progress v-bind:value="parseFloat(item.rate)" :bar-height="15">
            <div slot="start">{{ item.label }}  {{ item.rate }}</div>
          </mt-progress>
        </div>
        <mt-button type="primary" class="loginbutton mt30" @click="popupthree = !popupthree">关闭</mt-button>
      </div>
    </mt-popup>
    <div class="productemt talignc" v-if="list.length == 0 && listmainason.length == 0 && listmainbson.length == 0 && listmaincson.length == 0">
        <img src="../images/nodata.png">
        <p class="productemtinfo">当前列表还没有产品</p>
      </div>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'typeslist',
  data () {
    return {
      popupone: false,
      popuptwo: false,
      popupthree: false,
      list: [],
      listmainason: [],
      listmainbson: [],
      listmaincson: []
    }
  },
  methods: {
    gettypelist(index) {
      console.log(index)
      if(index == 1) {
        this.popupone = !this.popupone
        loginService.getTypeBill('1').then(r => {
          this.listmainason = r.data
        }).catch(e => {
          console.log(e)
        });
      }else if(index == 2) {
        this.popuptwo = !this.popuptwo
        loginService.getTypeBill('2').then(r => {
          this.listmainbson = r.data
        }).catch(e => {
          console.log(e)
        });
      }else if(index == 3) {
        this.popupthree = !this.popupthree
        loginService.getTypeBill('3').then(r => {
          this.listmaincson = r.data
        }).catch(e => {
          console.log(e)
        });
      }
    },
    getTypeBill() {
      loginService.getTypeBill('').then(r => {
        console.log(r)
        this.list = r.data
      }).catch(e => {
        console.log(e)
      });
    }
  },
  mounted(){
    this.getTypeBill()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.typeslist{
  width:100%;
  height: 100%;
  background: #1D1D28;
  .cellbox{
   width:96%;
   padding: .4rem 4%;
   border-bottom:1px solid #363645;
 
   justify-content: space-between;
   color:#fff;
   font-size: 16px;
  }
  .typeslistson{
    width: 100%;
    text-align: center;
  }
}
.mt-progress{
  display: -webkit-box;
  div:nth-child(1){
    width: 40%;
    font-size: 14px;
    text-align: left;
  }
}
.mt-progress-content{
  width:90%;
}
.arrow-right{
  width:10%;
  position: absolute;
  right: 0;
  top: .2rem;
}
.mint-popup{
  background: #1D1D28;
}
.mt30{
  width:100%;
  background: linear-gradient(-135deg, #2CBB86 0%, #2CBB55 100%);
  border-radius: 0;
  position: fixed;
  bottom:0;
  left:0;
}
.productemt{
  width: 100%;
  height: auto;
  padding: 35% 0;
  img{
    width: 30%;
    height: auto;
  }
  p{
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    color:#fff;
    font-size: 14px;
    text-align: center;
  }
}
</style>
