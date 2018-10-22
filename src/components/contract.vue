<template>
    <div class="contract-container">
        <div class="contract">
           <!-- <contractText></contractText> -->
           <iframe :src="contractShowUrl" frameborder="0" style="width:100%;height:100%;"></iframe>
        </div>       
        <div class="radioBox" v-if="orgType">
            <mt-radio
            v-model="value"  
            :options="options">  
            </mt-radio>  
        </div>
        <div class="radioBox" v-else>
            <mt-radio   
            v-model="value2"  
            :options="options2">
            </mt-radio>  
        </div>
        <div class="Reserve" @click="reserve" v-if="supplir">确认签订</div>
        <div class="Reserve" @click="reserve" v-else>完成下单</div>        
    </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast, Indicator} from 'mint-ui'
import contractText from './contractText'
import $ from 'jquery'
import swiper from 'swiper'
export default {
    name:'contract',
    data(){
        return{
            contractShowUrl:"",
            type: this.$route.query.type,
            username: this.$route.query.username,
            consumption: this.$route.query.consumption,
            old: this.$route.query.old,
            myAddressProvince: this.$route.query.myAddressProvince,
            myAddressCity: this.$route.query.myAddressCity,
            myAddresscounty: this.$route.query.myAddresscounty,
            inCome: this.$route.query.inCome,
            productId: this.$route.query.productId,
            describe: this.$route.query.describe,
            orgId: this.$route.query.orgId,
            imgArr:this.$route.query.imgArr,
            clientSex: this.$route.query.sex,
            orderNo: this.$route.query.orderNo,
            isChecked:false,
            isContract:"1",
            value: "A",
            value2: "A",
            options : [{  
            label: '我已阅读并同意签订合同',  
            value: 'A'  
            },  
            {  
            label: '本次合作暂时不签订合同',  
            value: 'B'  
            }],
            options2 : [{  
            label: '我已阅读并同意签订合同',  
            value: 'A'  
            }],
            orgType:true,
            supplir:true,
            clientId:this.$route.query.id
        }
    },
    components:{
        contractText
    },
    methods: {      
        closepdf(){
            this.isshowpdf = false
        },
        pdferr(errurl) {
            console.log(errurl);
        },
        reserve(){
            Indicator.open();
            if(this.type == undefined){
                let orderNo = this.orderNo;
                loginService.contractOrder(orderNo,1).then(r =>{
                    if(r.flag == 20000){
                        Toast("合同签订成功，您现在可以让顾客付款了")
                        Indicator.close();
                        let path = {path:"/suporderinfo",query:{orderNo:orderNo}}
                        this.$router.push(path)
                    }
                 })
            }else if(this.type == 0){             
                loginService.addOrder(this.orderNo,this.productId,this.type,this.isContract,this.clientId).then(r => {
                    if (r.flag == 20000) {       
                        Indicator.close();                                  
                        let path = {path: '/mkorder', query:{status: 'suc', orderNo: r.data.orderNo}}
                        this.$router.push(path)
                    } else {
                        Indicator.close();
                        let path = {path: '/mkorder', query:{status: 'fail'}}
                        this.$router.push(path)
                    }
                }).catch(e => {
                    console.log(e)
                })
            }else{
                console.log(this.isContract)
                loginService.addOrder(this.orderNo,this.productId,this.type,this.isContract,this.clientId).then(r => {
                    if (r.flag == 20000) {
                        Indicator.close();
                        let path = {path: '/mkorder', query:{status: 'suc', orderNo: r.data.orderNo}}
                        this.$router.push(path)
                    } else {
                        Indicator.close();  
                        let path = {path: '/mkorder', query:{status: 'fail'}}
                        this.$router.push(path)
                    }
                }).catch(e => {
                    console.log(e)
                })
            }    

        }
    },
    mounted () {
        $(".mint-cell").css({
            "height":"25px",
            "min-height":"0",
            "margin-bottom":"7px"
        })
        $(".mint-cell-wrapper").css({
            "font-size":"12px",
            "width":"95%",
            "margin":"0 auto"
        })
        $(".mint-radio-label").css({
            "color":"#9DA3B4"
        })
        loginService.myInfo().then(r => {
            if (r.flag == 20000) {
                if(r.data.orgType == "P"){//判断是不是供应商
                this.orgType = false;
                this.supplir = true;
                $(".radioBox").css({
                    "position":"absolute",
                    "bottom":"0rem",
                    "width":"100%",
                    "left":"5%"
                })
                }else{
                 this.orgType = true
                 this.supplir = false;
                }
            }
        }) 
        // new swiper('.contract',{
        //     'direction':'vertical'
        // })
        loginService.agentOrderInfo(this.orderNo).then(r=>{
            if(r.flag == 20000) {
                this.contractShowUrl = r.data.contractShowUrl;
            }
        })
    },
    watch: {
        value(news){
            if(news == "A"){
                this.isContract = "1"
            }else{
                this.isContract = "0"
            }
        }
    }
}
</script>
<style scoped lang="less">
@import "../less/functions";
.contract-container{
    width: 100%;
    height: 100%;
    background: #fff;
    overflow-y: auto;

    .contract{
        width: 100%;
        height: 80%;
        margin: 0 auto;
        overflow: hidden;
        overflow-y: scroll;
       .swiper-wrapper{
           display:flex;
           flex-direction: column;
           .swiper-slide{
               width:100%;
               flex:1;
               img{
                   width:100%;
                   height:100%;
               }
           }
       }
    }
    .radioBox{
        margin-top: 15px;
        padding-bottom: 1.5rem;
    }
    .checkedBox{
        width: 90%;
        height: auto;
        color:#9DA3B4;
        position: absolute;
        bottom: 2rem;
        left: 50%;
        margin-left: -45%;
        input{
            opacity: 0;
        }
        label{
            display: block;
            background: url(../images/nocheck.png) no-repeat left center;
            background-size: .4rem .4rem;
            text-indent: .5rem;
        }
        .checked{
            display: block;
            background: url(../images/checked.png) no-repeat left center;
            background-size: .4rem .4rem;
            text-indent: .5rem;
        }
    }
    .Reserve{
        width: 100%;
        height: auto;
        position: fixed;
        bottom: 0;
        left: 0;
        background:  linear-gradient(-135deg, #2CBB86 0%, #2CBB55 100%);
        color:#fff;
        text-align: center;
        padding: .3rem 0;
        font-size: 16px;
    }
}
.nocheckedBox{
    position: absolute;
    bottom: 1.5rem!important;
    left: 0;
}

</style>


