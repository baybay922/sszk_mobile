<template>
    <div class="evaluate-list-box">
        <div class="evaluate-list" v-for="(item,index) in data" :key="index">
            <div class="evaluate-list-title">
                <dl>
                    <dt><img src="../images/linkimgc.png" alt=""></dt>
                    <dd>{{item.anonymity == "0" ? "匿名用户" :item.evaUserName}}</dd>
                </dl>
                <span>{{timeDate[index]}}</span>
            </div>
            <p v-if="item.evaNotes">{{item.evaNotes}}</p>
            <div class="swiper">
                <div class="imgbox">
                    <div class="swiper-slide" v-for="(ite,ind) in item.imgs" :key="ind">
                        <img :src="ite" alt="">
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
    name:'evaluateList',
    data(){
        return {
            data:this.$route.params.data,
            timeDate:[]
        }
    },
    methods:{
        //格式化日期
        formatDate(timestamp){
            let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '年';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
            let D = (date.getDate() < 10 ? "0" + date.getDate() + "日": date.getDate() + '日');
            return Y+M+D;
        },
        getTime(){
            
            this.data.forEach((item,index)=>{
                this.timeDate.push(this.formatDate(item.createtime))
            })
        }
    },
    mounted(){
        let len = $('.imgbox').length;       
        for(var i=0;i<len;i++){
            let childLen = $('.imgbox').eq(i).children('.swiper-slide').length;
            console.log(childLen)
            $('.imgbox').eq(i).width(100*childLen)
        }
        this.getTime();
        this.$nextTick(function() {
            var imgsObj = $('.imgbox').find('img');
            var imgs = new Array();  
            for(var i = 0; i < imgsObj.length; i++){  
                imgs.push(imgsObj.eq(i).attr('src'));  
            }  
              imgsObj.on('click',function(){  
                  WeixinJSBridge.invoke('imagePreview', {  
                  'current': $(this).attr('src'),  
                  'urls': imgs  
              });  
            }); 
          })
    }
}
</script>

<style scoped lang="less">
@import "../less/functions";
.evaluate-list{
    box-sizing: border-box;
    padding:~`px2rem(30)`;
    display:block;
    height:auto;
    border-bottom:~`px2rem(2)` solid  #363645;
    .evaluate-list-title{
      display:flex;
      align-items: center;
      justify-content: space-between;
      dl{
        dt{
          margin-right:~`px2rem(20)`;
          float: left;
          img{
            width:~`px2rem(60)`;
          }
        }
        dd{
          float:right;
          font-size: 15px;
          color: #FFFFFF;
          line-height: ~`px2rem(60)`;
        }
      }
      span{
        font-size: 12px;
        color: #9DA3B4 ;
      }
    }
    p{
      font-size: 12px;
      color: #9DA3B4;
      margin-top:~`px2rem(20)`;
    }
    .imgbox{
      display:flex;
      div{
         width: 100px;
         margin: 0 ~`px2rem(10)`;
         height: 2rem;   
         display: flex;
         align-items: center;
         overflow: hidden;
         border-radius: ~`px2rem(20)`;
         img{
            max-height: 100%;
            margin-left: 50%;
            transform: translateX(-50%);
        }
      }
      
    }
  }
  .swiper{
      overflow:hidden;
      overflow-x:scroll;
      margin-top: ~`px2rem(30)`;
  }
  .scrollbar{
      display:none;
  }
</style>