
<template>
    <el-form ref="form" :model="form" label-width="100px" @submit.prevent="onSubmit" style="margin:20px;width:80%;min-width:600px;">
        <el-form-item label="appid">
            <el-input v-model="form.appid"></el-input>
        </el-form-item>
        <el-form-item label="cusid">
            <el-input v-model="form.cusid"></el-input>
        </el-form-item>
        <el-form-item label="charset">
            <el-input v-model="form.charset"></el-input>
        </el-form-item>
        <el-form-item label="trxamt">
            <el-input v-model="form.trxamt"></el-input>
        </el-form-item>
        <el-form-item label="orderid">
            <el-input v-model="form.orderid"></el-input>
        </el-form-item>
        <el-form-item label="randomstr">
            <el-input v-model="form.randomstr"></el-input>
        </el-form-item>
        <el-form-item label="goodsinf">
            <el-input v-model="form.goodsinf"></el-input>
        </el-form-item>
        <el-form-item label="goodsid">
            <el-input v-model="form.goodsid"></el-input>
        </el-form-item>
        <el-form-item label="validtime">
            <el-input v-model="form.validtime"></el-input>
        </el-form-item>
        <el-form-item label="returl">
            <el-input v-model="form.returl"></el-input>
        </el-form-item>
        <el-form-item label="notifyurl">
            <el-input v-model="form.notifyurl"></el-input>
        </el-form-item>
        <el-form-item label="appkey">
            <el-input v-model="form.appkey"></el-input>
        </el-form-item>
        <el-form-item label="sign">
            <el-input v-model="form.sign"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">前往支付</el-button>
		</el-form-item>
    </el-form>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'

export default{
    data() {
        return{
            orderNo:'',
            form: {
                appid:'',
                cusid:'',
                charset:'',
                trxamt:'',
                orderid:'',
                randomstr:'',
                goodsinf:'',
                goodsid:'',
                validtime:'',
                returl:'',
                notifyurl:'',
                appkey:'',
                sign:''
            },
        }
    },
    methods: {
        quertOrderInfo(){
            loginService.getwsgpayinfo(this.orderNo).then((res) => {
            if(res.flag == 20000) {
               this.form.appid = res.data.appid
               this.form.cusid = res.data.cusid
               this.form.charset = res.data.charset
               this.form.trxamt = res.data.trxamt
               this.form.orderid = res.data.orderid
               this.form.randomstr = res.data.randomstr
               this.form.goodsinf = res.data.goodsinf
               this.form.goodsid = res.data.goodsid
               this.form.validtime = res.data.validtime
               this.form.returl = res.data.returl
               this.form.notifyurl = res.data.notifyurl
               this.form.appkey = res.data.appkey
               this.form.sign = res.data.sign
            } else {
                Toast(res.msg)
            }
          }).catch(e => {
                onsole.log(e)
            });
        },
        onSubmit(){
            loginService.gogogo(this.form)
        }
    },
    computed: {
       
    },
    mounted() {

    },
    components: {
      
    }
}


</script>