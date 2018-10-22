<template>
  <div class="filterbar" :style="{'top': top + 'px'}">
    <div class="container">
      <div class="row">
        <div class="col" :class="{'selected': index == selectedIndexMenu}" @click="handleShowDialog(barMenu, index)" v-for="(barMenu, index) in barMenus">
          {{barMenu.name}}<span :class="index == selectedIndexMenu ? barMenu.selectIcon : barMenu.defaultIcon"></span><i></i>
        </div>
      </div>
      <filter-bar-pop :filterTop="top" :show-dialog="isShow" :hasTabHeader="hasTabHeader" :menu="selectedMenu" @changeTab="handleChangeTab"
        @changeMainItem="handleChangeMainItem" @changeSelect="changeSelect" @closeDialog="handleCloseDialog"></filter-bar-pop>
    </div>
  </div>
</template>
<script>
  import FilterBarPop from './FilterBarPop'
  
  export default {
    props: {
      barMenus: {
        type: Array,
        required: true,
        validator: function (value) {
          //TODO:验证数据有效性
          return true;
        }
      },
      top: String
    },
    data() {
      return {
        isShow: false,
        hasTabHeader: false,
        selectedMenu: {},
        selectedIndexMenu: undefined
      }
    },
    methods: {
      handleShowDialog(menu, index) {
        this.isShow = !this.isShow;
        if(this.isShow == true){
          this.selectedMenu = menu;
          this.selectedIndexMenu = index;
          if (menu.showTabHeader) {
            this.hasTabHeader = true;
          } else {
            this.hasTabHeader = false;
          }
          let _menu = JSON.parse(JSON.stringify(menu));
          _menu.tabs = {};
          this.$emit('showDialog', _menu);
        }else{
          this.handleCloseDialog()
        }
        
      },
      handleChangeTab(tab) {
        console.log(tab)
        this.$emit('changeTab', tab.index);
      },
      handleChangeMainItem(mainItem) {
        let _mainItem = JSON.parse(JSON.stringify(mainItem));
        this.$emit('changeMainItem', _mainItem);
      },
      handleCloseDialog() {
        this.isShow = false;
        this.selectedIndexMenu = -1;
        this.$emit('closeDialog');
      },
      changeSelect() {
        var selectData = [];
        this.barMenus.forEach(function (barMenu, index, arr) {
          let _selectBarData = {};
          // console.log("barMenu.name: " + barMenu.name);

          _selectBarData.name = barMenu.name;
          _selectBarData.value = barMenu.value;
          _selectBarData.tab = {};
          let tab = barMenu.tabs[barMenu.selectIndex];
          // console.log("tab.name: " + tab.name);
          _selectBarData.tab.name = tab.name;
          _selectBarData.tab.value = tab.value;
          let mainItem = tab.detailList[tab.selectIndex];
          _selectBarData.tab.mainItem = {}
          // console.log("mainItem.name: " + mainItem.name);          
          _selectBarData.tab.mainItem.name = mainItem.name;
          _selectBarData.tab.mainItem.value = mainItem.vaule;
          let subItem = false;
          if (mainItem.list) {
            subItem = mainItem.list[mainItem.selectIndex];
            _selectBarData.tab.mainItem.subItem = {};
            // console.log("subItem.name: " + subItem.name);                      
            _selectBarData.tab.mainItem.subItem.name = subItem.name;
            _selectBarData.tab.mainItem.subItem.value = subItem.value;
          } else {
            _selectBarData.tab.mainItem.subItem = subItem;
          }
          selectData.push(_selectBarData);
        });
        this.$emit('changeSelect', selectData);
      }
    },
    components: {
      'filter-bar-pop': FilterBarPop
    }
  }
</script>
<style lang="less">
@import "../../less/functions";
  .filterbar {
    width: 100%;
    font-size: ~`px2rem(30)`;
    z-index: 9999;
    height: ~`px2rem(88)`;
   
    position: fixed;
    top: ~`px2rem(88)`;
    //left: 0;
    //right: 0;
    color: #9DA3B4;
    .container {
      width: 100%;
      //outline: 1px solid #DBDCDE;
      position: relative;
     
      .row {
        display: flex;
        display: -ms-flexbox;
        display: -moz-box;
        display: -webkit-box;
        display: -webkit-flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        justify-content: space-around;
        -webkit-box-pack: space-around;
        -moz-box-pack: space-around;
        -ms-flex-pack: space-around;
        width: 100%;
        height: ~`px2rem(88)`;
        margin: 0 auto;
        line-height: ~`px2rem(88)`;
        font-size: 15px;
        .col {
          width: ~`px2rem(250)`;
          text-align: center;
          position: relative;
          font-size: 15px;
          span {
            margin-left: ~`px2rem(10)`;
            vertical-align: middle;
          }
        }
        .selected {
          font-weight: bold;
          color: #fff;
        }
        .col:after {
          width: ~`px2rem(18)`;
          height: ~`px2rem(18)`;
          display: inline-block;
          vertical-align: middle;
          background: url('../../images/up.png');
          background-size: ~`px2rem(18)`;
          background-repeat: no-repeat;
          content: '';
        }
        .col i{
          width:1px;
          height: 20px;
          display: block;
          position: absolute;
          right: -1px;
          top: 50%;
          //background: #484855;
          background: #484855;
          margin-top: -10px;
        }
        .selected:after {
          width: ~`px2rem(18)`;
          height: ~`px2rem(18)`;
          display: inline-block;
          vertical-align: middle;
          background: url('../../images/down.png');
          background-size: ~`px2rem(18)`;
          background-repeat: no-repeat;
          content: '';
        }
      }
    }
  }
</style>