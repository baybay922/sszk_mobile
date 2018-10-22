<template>
  <div class="setSafetyCode">
      <ul class="newSafetyCodeFrom" v-if="isSafetyCode == 0">
        <li>
            <input type="password" placeholder="请输入旧密码" maxlength="6" v-model="oldSafetyCodeFrom.oldPwd" />
        </li>
        <li>
            <input type="password" placeholder="请输入新密码" maxlength="6" v-model="oldSafetyCodeFrom.newPwd" />
        </li>
        <li>
            <input type="password" placeholder="请再输入一次新密码" maxlength="6" v-model="oldSafetyCodeFrom.againNewPwd" />
        </li>
      </ul>
      <ul class="oldSafetyCodeFrom" v-else>
          <li>
              <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="newSafetyCodeFrom.phone" />
          </li>
          <li v-if="!isweixin">
              <input type="tel" v-model="imgValidateCode" placeholder="请输入右侧图片验证码">
                <span class="getImgCode" @click="getimgValidateCode">
                    <img v-bind:src="this.imgValidateCodeImg" class="borad">
                </span>
          </li>
          <li>
              <input type="text" placeholder="请输入短信验证码" maxlength="6" v-model="newSafetyCodeFrom.verification" />
              <button v-bind:disabled="this.msgdisabled" @click="getSmsCode">{{msgtitle}}</button>
          </li>
          <li>
              <input type="password" placeholder="请输入新密码" maxlength="6" v-model="newSafetyCodeFrom.newPwd" />
          </li>
          <li>
              <input type="password" placeholder="请再输入一次新密码" maxlength="6" v-model="newSafetyCodeFrom.againNewPwd" />
          </li>
      </ul>
      <button class="sureBtn" @click="changesafety(isSafetyCode)">确定</button>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
import $ from 'jquery'
export default {
  name: 'setSafetyCode',
  data () {
    return {
        isSafetyCode:this.$route.query.isSafetyCode,
        msgtitle: '发送验证码',
        msgdisabled: false,
        imgValidateCode:'',
        imgValidateCodeImg:'',
        safetyType:this.$route.query.safetyType,
        orderNo:this.$route.query.orderNo,
        isweixin: false,
        newSafetyCodeFrom: {
            phone:'',
            verification:'',
            newPwd:'',
            againNewPwd:''
        },
        oldSafetyCodeFrom: {
            oldPwd:'',
            newPwd:'',
            againNewPwd:''
        }
    }
  },
  methods: {
      isWeiXin() { 
      var ua = window.navigator.userAgent.toLowerCase()
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        this.isweixin = true
      }else{ 
        this.isweixin = false
      } 
    },
    getimgValidateCode() {
      let max = 100
      let randnum = parseInt(Math.random()*(max+1),10)
      loginService.getCode().then(r => {
          this.imgValidateCodeImg =  r + '?randnum' + randnum
        }).catch(e => {
        });
    },
    getSmsCode() {//获取验证码
      var myreg = /^[1]\d{10}$/;
      if(!myreg.test(this.newSafetyCodeFrom.phone) || this.newSafetyCodeFrom.phone.length < 11){
        Toast("请输入正确的手机号")
        return
      }
      if(this.isweixin){
        this.imgValidateCode = 'weixin'
      }
      loginService.getSmsCode(this.newSafetyCodeFrom.phone, 4, '' , this.imgValidateCode).then(r => {
          if (r.flag == 20000) {
            Toast('短信已发送，请注意查收！')
            this.msgdisabled = true
            this.makenum()
            return
          } else {
            Toast(r.msg);
          }

        }).catch(e => {
        });
    },
    makenum() {//倒计时
      let num = 60
      let self = this
      let interval = window.setInterval(function() {
          num--
          self.msgtitle = '重新获取(' + num + ')'
          if (num == 0) {
            self.msgtitle = '获取短信验证码'
            self.msgdisabled = false
            window.clearInterval(interval)
          }
        }, 1000)
    },
    changesafety(changesafety){//设置安全码
        let vm = this;
        if(changesafety == 0){
            loginService.safetycode(this.oldSafetyCodeFrom.oldPwd, this.oldSafetyCodeFrom.newPwd, this.oldSafetyCodeFrom.againNewPwd).then((r)=>{
                if(r.flag == 20000){
                    Toast('设置成功')
                    console.log(vm.orderNo)
                    if(vm.safetyType == '1'){
                        this.$router.push("/withdrawals")
                    }else if(vm.safetyType == '2'){
                        let path = {path:'/divisionAccounts',query:{orderNo: this.orderNo}}
                        this.$router.push(path)
                    }else if(vm.safetyType == 'undefined'){
                        this.$router.push("/myselllist")
                    }
                    
                }else{
                    Toast(r.msg)
                }
            })
        }else{
            loginService.setsafetycode(this.newSafetyCodeFrom.phone, this.newSafetyCodeFrom.verification ,this.newSafetyCodeFrom.newPwd,this.newSafetyCodeFrom.againNewPwd,).then((r)=>{
                if(r.flag == 20000){
                    Toast('设置成功')
                    console.log(this.safetyType)
                    if(vm.safetyType == '1'){
                        this.$router.push("/withdrawals")
                    }else if(vm.safetyType == '2'){
                        let path = {path:'/divisionAccounts',query:{orderNo: this.orderNo}}
                        this.$router.push(path)
                    }else if(vm.safetyType == 'undefined'){
                        this.$router.push("/myselllist")
                    }
                }else{
                    Toast(r.msg)
                }
            })
        }
    }
  },
  mounted(){
      this.getimgValidateCode()
      this.isWeiXin()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.setSafetyCode{
    width: 100%;
    height: auto;
    ul{
        width: 100%;
        border-bottom: ~`px2rem(1)` solid #363645;
        li{
            width:~`px2rem(720)`;
            padding: ~`px2rem(48)` 0 ~`px2rem(22)`;
            margin-left: ~`px2rem(30)`;
            border-bottom: ~`px2rem(1)` solid #363645;
            position: relative;
            input{
                font-size: ~`px2rem(30)`;
                color: #fff;
                background: transparent;
                outline: none;
                border: none;
            }
            button{
                position: absolute;
                right: ~`px2rem(30)`;
                color: #2CBB55;
                border:none;
                outline: none;
                background: transparent;
            }
            img{
                width: ~`px2rem(120)`;
                position: absolute;
                top: ~`px2rem(24)`;
                right: ~`px2rem(30)`;
            }
        }
        :last-child{
            border:none;
        }
    }
}
.sureBtn{
    width: 80%;
    height: ~`px2rem(88)`;
    line-height: ~`px2rem(88)`;
    background: -webkit-gradient(linear,0 0,100% 0,from(#2CBB55),to(#2CBB86));
    margin:~`px2rem(80)` auto;
    font-size: ~`px2rem(28)`;
    color: #fff;
    display: block;
    border-radius: 50px;

}
</style>
