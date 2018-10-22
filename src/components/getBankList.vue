<template>
    <!-- 企业对公银行卡列表 -->
    <div class="bank-list">
        <ul @click="getBank($event)">
            <li v-for="(item,index) in bankList" :key="index"><img :src="item.bankLogo" alt="" v-if="item.bankLogo">{{item.bankName}}</li>
           
        </ul>
         <p class="last">暂不支持未列出的银行卡</p>
    </div>
</template>

<script>
    import {loginService} from "../services/login"
    import {Toast} from 'mint-ui'
    import $ from 'jquery'
    export default {
        name:"getBankList",
        data(){
            return {
                bankList:[],
                step:this.$route.query.step || ""
            }
        },
        methods: {
            getBank(e){
                let bankName = $(e.target).text();
                let imgUrl = $(e.target).find('img').attr('src');
                this.$router.push({
                    path:'/addBank',
                    query:{
                        bankName:bankName,
                        imgUrl:imgUrl,
                        step:this.step
                    }
                })
            }
        },
        mounted(){
            loginService.getBankList().then(r => {
                if(r.flag === 20000){
                    this.bankList = r.data;
                }else{
                    Toast(r.msg)
                }
            })
        }
    }
</script>

<style scoped lang="less">
@import "../less/functions";
    .bank-list{
        width:100%;
        height:100%;
        position: relative;
        ul{
            box-sizing: border-box;
            padding-left:5%;

            li{
                height:1.3rem;
                font-size:~`px2rem(30)`;
                color:#fff;
                display:flex;
                align-items: center;
                border-bottom: 0.01rem solid #363645;
                img{
                    width:~`px2rem(48)`;
                    height:~`px2rem(48)`;
                    margin-right:~`px2rem(30)`;
                    border-radius: 50%;
                }
            }          
        }
        p.last{
                border:none;
                color: #9DA3B4;
                font-size:0.32rem;
                position: absolute;
                left:50%;
                transform: translateX(-50%);
                text-align: center;
                bottom:0.5rem;
            }
    }
</style>