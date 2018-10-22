<template>
    <div>
        <ul class="bankList">
            <li class="bank-info" v-for="(item, index) in bankInfo" :key="index">
                <span class="bankLogo">
                    <img :src="item.bankLogo" alt="">
                </span>
                <span class="bankName">{{item.bankName}}</span>
            </li>
        </ul>
        <p class="support">暂不支持未列出的银行卡</p>
    </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
    data(){
        return{
            bankInfo:[]
        }
    },
    mounted(){
        loginService.supportBankList().then(r=>{
            if(r.flag == 20000){
                console.log(r)
                this.bankInfo = r.data;
            }else{
                Toast(r.msg)
            }
        })
    }
}
</script>
<style lang="less" scoped>
@import '../less/functions';
.bankList{
    width:100%;
    border-bottom: ~`px2rem(1)` solid #363645;
}
.bank-info{
    width: 95%;
    height: ~`px2rem(110)`;
    line-height: ~`px2rem(110)`;
    margin-left: 5%;
    border-bottom: ~`px2rem(1)` solid #363645;
    display: -webkit-box;
    color: #fff;
    font-size: ~`px2rem(30)`;
    align-items: center;
}
.bank-info:last-child{
    border-bottom: 0;
}
.bankLogo{
    width: ~`px2rem(48)`;
    height: ~`px2rem(48)`;
    display: block;
    margin-right: ~`px2rem(30)`;
    margin-top: ~`px2rem(31)`;
    border-radius: 100%;
    overflow: hidden;
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
}
.support{
    width: 100%;
    height: ~`px2rem(110)`;
    line-height: ~`px2rem(110)`;
    color: #9da3b4;
    font-size: ~`px2rem(24)`;
    text-align: center;
}
</style>

