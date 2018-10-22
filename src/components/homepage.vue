<template>
    <div>
        <div class="start_bg" v-if="mold">
            <div class="title-img">
                <img src="../images/regSuc.png" alt="">
            </div>
            <div class="title-letters">
                <p>恭喜您通过了资质审核！</p>
                <p>您已经成为多+平台认证的渠道商合作伙伴！</p>
            </div>
            <ul class="rule">
                <li><span>	• 	</span><p>多+为您精心准备了七大福利活动，赶快去查看最新的医美产品吧！</p></li>
                <li><span>	• 	</span><p>请注意您每月的信用分的变化，信用分代表了您在平台的诚信水平。</p></li>
                <li><span>	• 	</span><p>多+平台还在成长中，如果您认为我们在哪里做的不足，请一定要告诉我们，让我们更好的为您服务！</p></li>
            </ul>
            <label for="check" class="input-checkBox input-check" style="margin-bottom:.2rem;">
                <input type="checkbox" v-model="checkedNames" id="check" v-on:click="alocked()">
                我同意履行<span @click="goChannelAgreement($event)">《多加网(TSN)平台渠道商合作协议书》</span>的规定
            </label>
            <!-- <label for="check2" class="input-checkBox2">
                <input type="checkbox" v-model="checkedNames2" id="check2" v-on:click="alocked2($event)">
                阅读并同意履行<span>《云账号用户协议》</span>的规定
            </label> -->
            <button class="startUse" @click="startBtn">开始使用</button>
        </div>
        <div class="start_bg" v-else>
            <div class="title-img">
                <img src="../images/regSuc.png" alt="">
            </div>
            <div class="title-letters">
                <p>恭喜您通过了资质审核！</p>
                <p>您已经成为多+平台认证的供应商合作伙伴！</p>
            </div>
            <ul class="rule">
                <li><span>	• 	</span><p>请上架您的医美产品，以便合作伙伴下单。</p></li>
                <li><span>	• 	</span><p>请注意您每月的信用分的变化，信用分代表了您在平台的诚信水平。</p></li>
                <li><span>	• 	</span><p>多+平台还在成长中，如果您认为我们在哪里做的不足，请一定要告诉我们，让我们更好的为您服务！</p></li>
            </ul>
            <label for="check" class="input-checkBox input-check">
                <input type="checkbox" v-model="checkedNames" id="check" v-on:click="alocked()">
                我同意履行<span @click="goSupplierAgreement($event)">《多加网(TSN)平台供应商合作协议书》</span>的规定
            </label>
            <!-- <label for="check2" class="input-checkBox2">
                <input type="checkbox" v-model="checkedNames2" id="check2" v-on:click="alocked2($event)">
                阅读并同意履行<span>《云账号用户协议》</span>的规定
            </label> -->
            <button class="startUse" @click="startBtn">开始使用</button>
        </div>
    </div>
</template>
<script>
import {loginService} from "../services/login";
import {Toast} from 'mint-ui';
import $ from 'jquery';
export default {
    data(){
        return{
           checkedNames: false,
           checkedNames2: false,
           value:1,
           value2:0,
           mold:true,
           orgType: this.$route.query.orgType,
           rps: this.$route.query.rps,
           ystContract:"",
           viewUrl:''
        }
    },
    methods: {
        getinfo() {
            loginService.getUserInfo().then(r => {
                if(r.flag ==20000 ){
                    this.viewUrl = r.data.viewUrl
                    this.ystContract = r.data.ystContract;
                    if(this.ystContract == 1 || $.parseJSON(this.rps).status == "OK"){
                        $(".input-checkBox2").addClass("input-check")
                        this.value2 = 1;
                    }else{
                        $(".input-checkBox2").removeClass("input-check")
                        this.value2 = 0;
                    }
                }
            })
        },
        goSupplierAgreement(e){//供应商合同
            e.stopPropagation();
            location.href=""+this.viewUrl+"" ;
        },
        goChannelAgreement(e){//渠道商合同
            e.stopPropagation();
            location.href=""+this.viewUrl+"" ;
            console.log(this.value)
        },
        startBtn(){
            // if(this.value == 0 || this.value2 == 0){
            if(this.value == 0){
                Toast("您必须签订合同才能使用")
            }else{
                loginService.signContract().then(r =>{
                    if(r.flag == 20000){
                        if(r.data.orgType == "P" || r.data.orgType == "D"){
                            let path = {path: '/supplierOrder', query: {}}
                            this.$router.push(path)
                        }else{
                            let path = {path: '/indexpage', query: {}}
                            this.$router.push(path)
                        }
                    }else if(r.flag == 50001){
                        if(this.orgType == "P"){
                            let path = {path: '/supplierLogin', query:{}}
                        this.$router.push(path)
                        }else{
                            let path = {path: '/login', query:{}}
                            this.$router.push(path)
                        }
                    }else{
                        Toast(r.msg)
                    }
                })
                
            }
        },
        alocked: function () {            
            if(this.checkedNames){
                $(".input-checkBox").addClass("input-check");
                this.value = 1
            }else{
                $(".input-checkBox").removeClass("input-check");
                this.value = 0
            }
        },
        alocked2: function (e) {  
            e.stopPropagation();
            loginService.getAddress().then(r =>{
                if(r.flag == 20000){
                    location.href = r.data;
                }else{
                    Toast(r.msg)
                }
            })
        },
        // getYunPayAgreement(e){
            
        // },
        getQueryString(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
            var r = window.location.search.substr(1).match(reg); 
            if (r != null) return unescape(r[2]); 
            return null; 
        }
    },
    mounted () {
        this.getinfo();
        $(".is-placemiddle").css({
            "width":"90%"
        })
        

        if(this.orgType == "P" || this.orgType == "D"){//判断是不是供应商，显示不同的导航
            this.mold = false
        }else{
            this.mold = true
        }
    }
}
</script>

<style scoped lang="less">  
@import "../less/functions";
.start_bg{
    width:95%;
    height:auto;
    position: relative;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 2.5%;
    left: 2.5%;
    overflow-x: hidden;
    margin-bottom: .5rem;
}
.title-img{
    width: 50%;
    height: auto;
    margin: 1rem auto;
    img{
        width: 100%;
        height: auto;
    }
}
.title-letters{
    width: 100%;
    height: auto;
    text-align: center;
    font-size: 16px;
    color: #333;
    padding: .2rem 0;
}
.rule{
    width: 80%;
    margin: 25px auto;
    li{
        display: -webkit-flex;
        color: #9DA3B4;
        line-height: 1.8;
        font-size: 12px;
        margin-top: 10px;
        span{
            width: 10%;
            font-size: 16px;
            line-height: 1.5;
        }
        p{
            width: 90%;
        }
    }
}
.input-checkBox,.input-checkBox2{
    width: 90%;
    margin-left: 10%;
    padding: .05rem 0;
    background: url(../images/nocheck.png) no-repeat left top;
    background-size: .4rem auto;
    text-indent: .1rem;
    color:#9DA3B4;
    word-wrap: break-word;
    display: -webkit-box;
    span{
        color:#f5a623;
        font-weight: bold;
    }
    input{
        opacity: 0;
    }
}
.input-check{
    background: url(../images/checked.png) no-repeat left top;
    background-size: .4rem auto;
}
.startUse{
    width: 55%;
    padding: .3rem 0;
    text-align: center;
    border-radius:100px;
    outline: none;
    background: none;
    color: #fff;
    background: #2CBB55;
    font-size: 16px;
    display: block;
    margin: 1rem auto;
}

</style>

