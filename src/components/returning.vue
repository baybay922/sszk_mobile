<template>
    <div class="cash-container">
        <dl class="header">
            <dd>
                <p>POS机型号：<span>{{model}}</span></p>
                <p>目前状态：<span v-html="getStatus(status)">未申请</span></p>
                <p>押金数额：<span>{{money}}</span></p>
                <p>押金状态：<span>{{deposit}}</span></p>
            </dd>
            <dt>
                <img src="../images/headerLogo.png" alt="">
            </dt>
        </dl>
        <div class="distribution-info reason-container"> <!-- 申请退还  -->
            <h2 class="title">申请退还</h2>
            <ul>
                <li @click="getreason">
                    <p>退还原因</p>
                    <p class="reason">{{reason}}</p>
                </li>
                <li v-if="other">
                    <textarea cols="49" rows="8" placeholder="请输入您的退还原因" v-model="reasonInfo"></textarea>
                </li>
                <li v-if="reason !== 'POS机丢失'">
                    <p>快递公司</p>
                    <input type="text" v-model="express" placeholder="请输入快递公司名称">
                </li>
                <li v-if="reason !== 'POS机丢失'">
                    <p>发货单号</p>
                    <input type="tel" v-model="oddNumber" placeholder="请输入发货单号" maxlength="15">
                </li>
                <li v-if="reason !== 'POS机丢失'">
                    <p>退还地址</p>
                    <p>北京市东城区中海地产广场东塔二层</p>
                </li>
                 <li v-if="reason !== 'POS机丢失'">
                    <p>收件人</p>
                    <p>多加网行政部</p>
                </li>
                <li v-if="reason !== 'POS机丢失'">
                    <p>联系电话</p>
                    <p>86461377</p>
                </li>
            </ul>
            <button class="receiveBtn" @click="returnIng">退还POS机</button>
        </div>
         <!-- 原因轴 -->
        <div class="oldSlots" v-if="resonPicker">
            <div class="pickerBtn">
                <div class="closeBtn" @click="closePicker">取消</div>
                <div class="sureBtn" @click="getreasonInner">确定</div>
            </div>
            <mt-picker ref="reson" :slots="ResonSlots"></mt-picker>
        </div>
    </div>
</template>
<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
    data(){
        return{
            reasonInfo:"",
            oddNumber:"",
            reason: " 申请返修",
            express:"",
            resonPicker: false,
            other:false,
            ResonSlots:[
                {
                    values: [' 申请返修','POS机丢失', '暂无使用需求', '其他'],
                }
            ],
            model:this.$route.query.model,
            status:this.$route.query.status,
            money:this.$route.query.money,
            deposit:this.$route.query.deposit,
            orgId:this.$route.query.orgId
        }
    },
    methods:{
        returnIng(){
            if(this.reason =='POS机丢失'){
                loginService.forrefund(this.reason, this.reasonInfo, this.express, this.oddNumber).then(r =>{
                    if(r.flag == 20000){
                        let path = {path:'./mine',query:{orgId: this.orgId}};
                        this.$router.push(path)
                    }else{
                        Toast(r.msg)
                    }
                })
            }else if( this.oddNumber == "" || this.express == ""){
                Toast("请完善您的信息")
            }else{
                loginService.forrefund(this.reason, this.reasonInfo, this.express, this.oddNumber).then(r =>{
                    if(r.flag == 20000){
                        let path = {path:'./mine',query:{orgId: this.orgId}};
                        this.$router.push(path)
                    }else{
                        Toast(r.msg)
                    }
                })
            }
        },
        getStatus(ind){
            switch(ind){
                case "0":
                return '<span style="color:#f5a623">未申请</span>';
                break;
                case "1":
                return '<span style="color:#f5a623">等待配送</span>';
                break;
                case "2":
                return '<span style="color:#f5a623">配送中</span>';
                break;
                case "3":
                return '<span style="color:#2CBB55">使用中</span>';
                break;
                case "4":
                return '<span style="color:#E5322E">退还中</span>';
                break;
                case "5":
                return '<span style="color:#f5a623">已退还</span>';
                break;
            }
        },
        getreasonInner(index){
            var reason = this.$refs.reson.getValues();
            this.reason = reason[0];
            this.resonPicker = false;
            if(reason[0] == "其他"){
                this.other = true
            }else{
                this.other = false
            }
        },
        closePicker(){//关闭时间轴
            this.resonPicker = false;
        },
        getreason(){
            this.resonPicker = true
        },
        onlineReceive(){
            let path = {path:'./onlineReceive',query:{}};
            this.$router.push(path)
        },
        unlineReceive(){
            let path = {path:'./unlineReceive',query:{}};
            this.$router.push(path)
        }
    }
}
</script>
<style scoped lang="less">
@import "../less/functions";
.header{
    width: 100%;
    height: auto;
    background: #272734;
    display: -webkit-flex;
    justify-content: space-between;
    dd{
        width: 50%;
        padding: 15px;
        padding-right:0;
        color: #9DA3B4;
        font-size: ~`px2rem(32)`;
        line-height: 2;
        span{
            color: #fff;
        }
    }
    dt{
        width: 50%;
        padding: 15px;
        padding-left: 0;
        text-align: right;
        position: relative;
        img{
            width: 55%;
            position: absolute;
            bottom: 0;
            right: 15px;
            margin-left: -33%;
            height: auto;
        }
    }
}
.distribution-info{
    width: 100%;
    .title{
        padding: 15px 0;
        color: #9DA3B4;
        font-size: 14px;
        border-bottom:~`px2rem(1)` solid #363645;
        text-indent: 25px;
        position: relative;
    }
    .title::after{
        content: "";
        width: 4px;
        height:30%;
        background: #FBC700;
        border-radius: 1px;
        display: block;
        position: absolute;
        left: 15px;
        top: 17.5px;   
    }
    ul{
        width: ~`px2rem(690)`;
        margin: 0 auto;
        li{
            display: -webkit-flex;
            justify-content: space-between;
            padding: 8px 0;
            color: #9DA3B4;
            font-size: 16px;
        }
    }
}
.useIng{
    width: 100%;
    padding: 15px 0;
    text-indent: 15px;
    color: #9DA3B4;
    font-size: 16px;
    border-bottom: ~`px2rem(1)` solid #363645;
    background: url("../images/moreinfo.png") no-repeat 95% center;
    background-size: .2rem auto;
}
.reason-container{
    width: 100%; 
    ul{
        width: 100%!important;
        border-bottom: ~`px2rem(1)` solid #363645;
        li{
            width: 95%;
            padding: ~`px2rem(25)` 0;
            margin-left:  ~`px2rem(30)`;
            border-bottom: ~`px2rem(1)` solid #363645;
            input,p{
                padding-right: ~`px2rem(30)`;
            }
        }
    }
}
.receiveBtn{
    width: 100%;
    padding: ~`px2rem(30)` 0;
    position: absolute;
    bottom: 0;
    left: 0;
    background: -webkit-gradient(linear,0 0,100% 0,from(#2cbb55),to(#2cbb86));
    font-size: ~`px2rem(36)`;
    color: #fff;
}
.promptInfo{
    width: 100%;
    border-top: ~`px2rem(1)` solid #363645;
    padding:~`px2rem(30)` 0;
    text-indent: 15px;
    color: #9DA3B4;
    font-size: 12px;
    span{
         color:#f5a623;
    }
}
.reason{
    padding-right: ~`px2rem(70)`!important;
    text-align: left;
    background: url("../images/moreinfo.png") no-repeat 80% center;
    background-size: .2rem auto;
}
.oldSlots{
    position: fixed;
    width: 100%;
    background: #fff;
    bottom: 0;
    left: 0;
}
.pickerBtn{
    width: 100%;
    display: -webkit-flex;
    justify-content: space-between;
    border-bottom:1px solid #eaeaea;
    div{
        width: 50%;
        text-align: center;
        padding: .3rem 0;
        font-size: 16px;
    }
    .closeBtn{
        color:#9DA3B4
    }
    .sureBtn{
        color: #2CBB55;
    }
}
.reason-container{
    width: 100%; 
    ul{
        width: 100%!important;
        border-bottom: ~`px2rem(1)` solid #363645;
        li{
            width: 95%;
            padding: ~`px2rem(25)` 0;
            margin-left:  ~`px2rem(30)`;
            border-bottom: ~`px2rem(1)` solid #363645;
            input,p{
                padding-right: ~`px2rem(30)`;

            }
        }
    }
}
.receiveBtn{
    width: 100%;
    padding: ~`px2rem(30)` 0;
    position: fixed;
    bottom: 0;
    left: 0;
    background: -webkit-gradient(linear,0 0,100% 0,from(#2cbb55),to(#2cbb86));
    font-size: ~`px2rem(36)`;
    color: #fff;
}
.distribution-info{
    padding-bottom: ~`px2rem(120)`;
    width: 100%;
    .title{
        padding: ~`px2rem(30)` 0;
        color: #9DA3B4;
        font-size: ~`px2rem(28)`;
        border-bottom:~`px2rem(1)` solid #363645;
        text-indent: 25px;
        position: relative;
    }
    .title::after{
        content: "";
        width: 4px;
        height:30%;
        background: #FBC700;
        border-radius: 1px;
        display: block;
        position: absolute;
        left: 15px;
        top: 17.5px;   
    }
    ul{
        width: ~`px2rem(690)`;
        margin: 0 auto;
        
        li{
            display: -webkit-flex;
            justify-content: space-between;
            padding: ~`px2rem(30)` 0;
            color: #fff;
            font-size: ~`px2rem(32)`;
            p:nth-child(1){
                font-size: ~`px2rem(32)`;
            }
            p:nth-child(2){
                font-size: ~`px2rem(28)`;
            }
            input{
                color: #fff;
                font-size:  ~`px2rem(28)`;
                border:none;
                background: none;
                outline: none;
                text-align: right;
            }
            textarea{
                display: block;
                text-indent: ~`px2rem(24)`;
                background: #272734;
                width: ~`px2rem(690)`;
                border-radius: 10px;
                margin: 0 auto;
                border:none;
                padding-top: ~`px2rem(24)`;
                color: #fff;
                font-size: ~`px2rem(24)`;
            } 
        }
    }
}
</style>


