<template>
  <div class="changeseller">
    <div>
      <mt-button type="default" class="loginbutton" @click="resetPwd">重置登录密码</mt-button>
    </div>
    <div v-if="lockFlag == 0">
      <mt-button type="primary" class="loginbutton mt30" @click="sellermana(1)">禁用账号</mt-button>
    </div>
    <div v-if="lockFlag == 1">
      <mt-button type="primary" class="loginbutton mt30" @click="sellermana(0)">启用账号</mt-button>
    </div>
  </div>
</template>

<script>
import {loginService} from "../services/login"
import {Toast} from 'mint-ui'
export default {
  name: 'changeseller',
  data () {
    return {
      userNo: this.$route.query.userNo,
      lockFlag: this.$route.query.lockFlag
    }
  },
  methods: {
    resetPwd() {
      loginService.resetPwd(this.userNo).then(r => {
        if (r.flag == 20000) {
          Toast("修改成功")
          let path = {path: '/sellers', query: {}}
          this.$router.push(path)
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    sellermana(num) {
      loginService.sellermana(this.userNo, num).then(r => {
        if (r.flag == 20000) {
          Toast(r.msg)
          let path = {path: '/sellers', query: {}}
          this.$router.push(path)
        } else {
          Toast(r.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    }
  },
  mounted(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/functions";
.changeseller{
  margin-top: ~`px2rem(30)`;
  text-align: center;
}
</style>
