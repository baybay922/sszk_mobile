import Vue from 'vue'
import Router from 'vue-router'
import {UserService} from '../services/user'
const login = r => require.ensure([], () => r(require('../components/login')), 'index')
const homepage = r => require.ensure([], () => r(require('../components/homepage')), 'index')
const regist = r => require.ensure([], () => r(require('../components/regist')), 'index')
const test = r => require.ensure([], () => r(require('../components/test')), 'index')
const regist2b = r => require.ensure([], () => r(require('../components/regist2b')), 'index')  //渠道商完善信息
const regist2c = r => require.ensure([], () => r(require('../components/regist2c')), 'index')
const registsuc = r => require.ensure([], () => r(require('../components/registsuc')), 'index')
const registfail = r => require.ensure([], () => r(require('../components/registfail')), 'index')
const noactive = r => require.ensure([], () => r(require('../components/noactive')), 'index')
const productlist = r => require.ensure([], () => r(require('../components/productlist')), 'index')
const productinfo = r => require.ensure([], () => r(require('../components/productinfo')), 'index')
const getpwd = r => require.ensure([], () => r(require('../components/getpwd')), 'index')
const mine = r => require.ensure([], () => r(require('../components/mine')), 'index')
const getmoney = r => require.ensure([], () => r(require('../components/getmoney')), 'index')
const minfo = r => require.ensure([], () => r(require('../components/minfo')), 'index')
const mkorder = r => require.ensure([], () => r(require('../components/mkorder')), 'index')
const setting = r => require.ensure([], () => r(require('../components/setting')), 'index')
const changepwd = r => require.ensure([], () => r(require('../components/changepwd')), 'index')
const myorder = r => require.ensure([], () => r(require('../components/myorder')), 'index')
const agentorderinfo = r => require.ensure([], () => r(require('../components/agentorderinfo')), 'index')
const evaluation = r => require.ensure([], () => r(require('../components/evaluation')), 'index')
const cancelorder = r => require.ensure([], () => r(require('../components/cancelorder')), 'index')
const mygroup = r => require.ensure([], () => r(require('../components/mygroup')), 'index')
const sellers = r => require.ensure([], () => r(require('../components/sellers')), 'index')
const addseller = r => require.ensure([], () => r(require('../components/addseller')), 'index')
const changeseller = r => require.ensure([], () => r(require('../components/changeseller')), 'index')
const myselllist = r => require.ensure([], () => r(require('../components/myselllist')), 'index')
const mybilllist = r => require.ensure([], () => r(require('../components/mybilllist')), 'index')
const typeslist = r => require.ensure([], () => r(require('../components/typeslist')), 'index')
const indexpage = r => require.ensure([], () => r(require('../components/indexpage')), 'index')
const withdrawals = r => require.ensure([], () => r(require('../components/withdrawals')), 'index')//提现
const banklist = r => require.ensure([], () => r(require('../components/banklist')), 'index')//银行卡列表
const addBank = r => require.ensure([], () => r(require('../components/addBank')), 'index')//添加银行卡
const supplierOrder = r => require.ensure([], () => r(require('../components/supplierOrder')), 'index')//供应商我的订单
const supplierProduct = r => require.ensure([], () => r(require('../components/supplierProduct')), 'index')//供应商我的订单
const userInfo = r => require.ensure([], () => r(require('../components/userInfo')), 'index')//填写用户信息
const contract = r => require.ensure([], () => r(require('../components/contract')), 'index')//签订合同
const suporderinfo = r => require.ensure([], () => r(require('../components/suporderinfo')), 'index')
const creditScore = r => require.ensure([], () => r(require('../components/creditScore')), 'index')
const creditSupplier = r => require.ensure([], () => r(require('../components/creditSupplier')), 'index')
const supplierLogin = r => require.ensure([], () => r(require('../components/supplierLogin')), 'index')//供应商登陆
const perfectInfo = r => require.ensure([], () => r(require('../components/perfectInfo')), 'index')//供应商完善信息
const supplierReg = r => require.ensure([], () => r(require('../components/supplierReg')), 'index')//供应商完善信息
const institutionalInfo = r => require.ensure([], () => r(require('../components/institutionalInfo')), 'index')//供应商机构信息
const accountReceivable = r => require.ensure([], () => r(require('../components/accountReceivable')), 'index')//供应商机构信息
const supplierRegist = r => require.ensure([], () => r(require('../components/supplierRegist')), 'index')//供应商机构信息
const companyAddBank = r => require.ensure([], () => r(require('../components/companyAddBank')), 'index')//填写公司信息
const regSelectType = r => require.ensure([], () => r(require('../components/regSelectType')), 'index')//同业异业
const evaluateList = r => require.ensure([], () => r(require('../components/evaluateList')), 'index') //评价列表
const loading = r => require.ensure([], () => r(require('../components/loading')), 'index') //评价列表
const returning = r => require.ensure([], () => r(require('../components/returning')), 'index') //我的POS机
const cashStart = r => require.ensure([], () => r(require('../components/cashStart')), 'index') //我的POS机
const checkAgreement = r => require.ensure([], () => r(require('../components/checkAgreement')), 'index') //POS使用协议
const unlineReceive = r => require.ensure([], () => r(require('../components/pay/unlineReceive')), 'index') //线下申请
const onlineReceive = r => require.ensure([], () => r(require('../components/pay/onlineReceive')), 'index') //线上申请
const divisionAccounts = r => require.ensure([], () => r(require('../components/divisionAccounts')), 'index') //确认分账
const auditRejection = r => require.ensure([], () => r(require('../components/auditRejection')), 'index') //审核拒绝
const supplierBankList = r => require.ensure([], () => r(require('../components/supplierBankList')), 'index') //审核拒绝
const supportBankList = r => require.ensure([], () => r(require('../components/supportBankList')), 'index') //支持银行卡列表
const publicAccount = r => require.ensure([], () => r(require('../components/publicAccount')), 'index') //企业对公账户信息
const presonAccount = r => require.ensure([], () => r(require('../components/presonAccount')), 'index') //审核中
const AccountAudits = r => require.ensure([], () => r(require('../components/AccountAudits')), 'index') //审核中
const getBankList = r => require.ensure([], () => r(require('../components/getBankList')), 'index') //企业对公支持银行卡列表
const experiencePOS = r => require.ensure([], () => r(require('../components/experiencePOS')), 'index') //企业对公支持银行卡列表
const doctorQualifications = r => require.ensure([], () => r(require('../components/doctorQualifications')), 'index') //企业对公支持银行卡列表
const profitDetails = r => require.ensure([], () => r(require('../components/profitDetails')), 'index') //企业对公支持银行卡列表
const resultsDetail = r => require.ensure([], () => r(require('../components/resultsDetail')), 'index') //企业对公支持银行卡列表
const setSafetyCode = r => require.ensure([], () => r(require('../components/setSafetyCode')), 'index') //企业对公支持银行卡列表




//活动
const indexpagestica = r => require.ensure([], () => r(require('../components/statics/indexpagestica')), 'index')
const indexpagesticb = r => require.ensure([], () => r(require('../components/statics/indexpagesticb')), 'index')
const indexpagesticc = r => require.ensure([], () => r(require('../components/statics/indexpagesticc')), 'index')
const indexpagesticd = r => require.ensure([], () => r(require('../components/statics/indexpagesticd')), 'index')
const indexpagestice = r => require.ensure([], () => r(require('../components/statics/indexpagestice')), 'index')
const indexpagesticf = r => require.ensure([], () => r(require('../components/statics/indexpagesticf')), 'index')
const indexpagesticg = r => require.ensure([], () => r(require('../components/statics/indexpagesticg')), 'index')
const invitingFriends = r => require.ensure([], () => r(require('../components/statics/invitingFriends')), 'index')
// const useragreement = r => require.ensure([], () => r(require('../components/footer/useragreement')), 'index')
// const footer = r => require.ensure([], () => r(require('../components/footer/footer')), 'index')
// const index = r => require.ensure([], () => r(require('../components/footer/index')), 'index')
// const destination = r => require.ensure([], () => r(require('../components/footer/destination')), 'index')
// const hotline = r => require.ensure([], () => r(require('../components/footer/hotline')), 'index')
// const mine = r => require.ensure([], () => r(require('../components/footer/mine')), 'index')
// const search = r => require.ensure([], () => r(require('../components/footer/search')), 'index')
// const setting = r => require.ensure([], () => r(require('../components/footer/setting')), 'index')
// const about = r => require.ensure([], () => r(require('../components/footer/about')), 'index')
// const changecity = r => require.ensure([], () => r(require('../components/footer/changecity')), 'index')

// // import Hello from '../components/Hello'
// const Hello = r => require.ensure([], () => r(require('../components/Hello')), 'Hello')
// const fillorder = r => require.ensure([], () => r(require('../components/fillorder')), 'pro')
// const filltourist = r => require.ensure([], () => r(require('../components/filltourist')), 'pro')
// const fillinvoice = r => require.ensure([], () => r(require('../components/fillinvoice')), 'pro')
// const scheduledetail = r => require.ensure([], () => r(require('../components/scheduledetail')), 'pro')
// const pickschedule = r => require.ensure([], () => r(require('../components/pickschedule')), 'pro')
// const packagetour = r => require.ensure([], () => r(require('../components/productdetail/packagetour')), 'pro')
// const packagetouroffer = r => require.ensure([], () => r(require('../components/chooseoffer/packagetouroffer')), 'pro')
// const successpay = r => require.ensure([], () => r(require('../components/successpay')), 'pro')
// const pay = r => require.ensure([], () => r(require('../components/pay')), 'pro')
// const wechatcode = r => require.ensure([], () => r(require('../components/wechatcode')), 'pro')
// const productlist = r => require.ensure([], () => r(require('../components/productlist')), 'main')
// const orderlistall = r => require.ensure([], () => r(require('../components/orderlistall')), 'main')
// const orderdetail = r => require.ensure([], () => r(require('../components/orderdetail')), 'main')
// const twcontract = r => require.ensure([], () => r(require('../components/twcontract.vue')), 'main')
// const inlandcontract = r => require.ensure([], () => r(require('../components/inlandcontract')), 'main')
// const overseascontract = r => require.ensure([], () => r(require('../components/overseascontract')), 'main')
// const collection = r => require.ensure([], () => r(require('../components/collection')), 'main')
// const iosmiddlepage = r => require.ensure([], () => r(require('../components/iosmiddlepage')), 'others')

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/registfail',
      name: 'registfail',
      component: registfail
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/indexpage',
      name: 'indexpage',
      component: indexpage,
      meta: {
        title: '多加健康服务平台'
      }
    },
    {
      path: '/indexpagestica',
      name: 'indexpagestica',
      component: indexpagestica,
      meta: {
        title: '成单奖励'
      }
    },
    {
      path: '/indexpagesticb',
      name: 'indexpagesticb',
      component: indexpagesticb,
      meta: {
        title: '推新奖励'
      }
    },
    {
      path: '/indexpagesticc',
      name: 'indexpagesticc',
      component: indexpagesticc,
      meta: {
        title: '收益滚利'
      }
    },
    {
      path: '/indexpagesticd',
      name: 'indexpagesticd',
      component: indexpagesticd,
      meta: {
        title: '阶梯奖励'
      }
    },
    {
      path: '/indexpagestice',
      name: 'indexpagestice',
      component: indexpagestice,
      meta: {
        title: '异业拓客'
      }
    },
    {
      path: '/indexpagesticf',
      name: 'indexpagesticf',
      component: indexpagesticf,
      meta: {
        title: '集采返现'
      }
    },
    {
      path: '/indexpagesticg',
      name: 'indexpagesticg',
      component: indexpagesticg,
      meta: {
        title: '新品悬赏'
      }
    },

    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist,
      meta: {
        title: '多加网-合伙人注册加盟 '
      }
    },
    {
      path: '/regist2b',
      name: 'regist2b',
      component: regist2b,
      meta: {
        title: '完善企业信息'
      }
    },
    {
      path: '/registsuc',
      name: 'registsuc',
      component: registsuc,
      meta: {
        title: '完善个人信息'
      }
    },
    {
      path: '/noactive',
      name: 'noactive',
      component: noactive
    },
    {
      path: '/productlist',
      name: 'productlist',
      component: productlist,
      meta: {
        title: '产品列表',
        keepAlive: false
      }
    },
    {
      path: '/regist2c',
      name: 'regist2c',
      component: regist2c
    },
    {
      path: '/productinfo',
      name: 'productinfo',
      component: productinfo,
      meta: {
        title: '项目产品详情'
      }
    },
    {
      path: '/getpwd',
      name: 'getpwd',
      component: getpwd,
      meta: {
        title: '忘记密码'
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine,
      meta: {
        title: '我的'
      }
    },
    {
      path: '/getmoney',
      name: 'getmoney',
      component: getmoney,
      meta: {
        title: '收益计算'
      }
    },
    {
      path: '/minfo',
      name: 'minfo',
      component: minfo,
      meta: {
        title: '机构主页'
      }
    },
    {
      path: '/mkorder',
      name: 'mkorder',
      component: mkorder,
      meta: {
        title: '下单结果'
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting,
      meta: {
        title: '设置'
      }
    },
    {
      path: '/changepwd',
      name: 'changepwd',
      component: changepwd,
      meta: {
        title: '修改密码'
      }
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: myorder,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/agentorderinfo',
      name: 'agentorderinfo',
      component: agentorderinfo,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: evaluation,
      meta: {
        title: '评价'
      }
    },
    {
      path: '/cancelorder',
      name: 'cancelorder',
      component: cancelorder,
      meta: {
        title: '取消订单'
      }
    },
    {
      path: '/mygroup',
      name: 'mygroup',
      component: mygroup,
      meta: {
        title: '我的企业'
      }
    },
    {
      path: '/sellers',
      name: 'sellers',
      component: sellers,
      meta: {
        title: '管理业务员'
      }
    },
    {
      path: '/addseller',
      name: 'addseller',
      component: addseller,
      meta: {
        title: '添加新业务员'
      }
    },
    {
      path: '/changeseller',
      name: 'changeseller',
      component: changeseller,
      meta: {
        title: '操作业务员'
      }
    },
    {
      path: '/myselllist',
      name: 'myselllist',
      component: myselllist,
      meta: {
        title: '我的收益'
      }
    },
    {
      path: '/mybilllist',
      name: 'mybilllist',
      component: mybilllist,
      meta: {
        title: '账单'
      }
    },
    {
      path: '/typeslist',
      name: 'typeslist',
      component: typeslist,
      meta: {
        title: '产品分类收益'
      }
    },
    {
      path: '/withdrawals',
      name: 'withdrawals',
      component: withdrawals,
      meta: {
        title: '提现'
      }
    },
    {
      path: '/banklist',
      name: 'banklist',
      component: banklist,
      meta: {
        title: '银行卡列表'
      }
    },
    {
      path: '/addBank',
      name: 'addBank',
      component: addBank,
      meta: {
        title: '添加银行卡'
      }
    },
    {
      path: '/supplierOrder',
      name: 'supplierOrder',
      component: supplierOrder,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/supplierProduct',
      name: 'supplierProduct',
      component: supplierProduct,
      meta: {
        title: '我的产品'
      }
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo,
      meta: {
        title: '填写升单辅助信息'
      }
    },
    {
      path: '/contract',
      name: 'contract',
      component: contract,
      meta: {
        title: '签订合同'
      }
    },
    {
      path: '/suporderinfo',
      name: 'suporderinfo',
      component: suporderinfo,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/creditScore',
      name: 'creditScore',
      component: creditScore,
      meta: {
        title: '信用分是什么？'
      }
    },
    {
      path: '/creditSupplier',
      name: 'creditSupplier',
      component: creditSupplier,
      meta: {
        title: '信用分是什么？'
      }
    },
    {
      path: '/supplierLogin',
      name: 'supplierLogin',
      component: supplierLogin,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/perfectInfo',
      name: 'perfectInfo',
      component: perfectInfo,
      meta: {
        title: '第一步 完善基本资料'
      }
    },
    {
      path: '/supplierReg',
      name: 'supplierReg',
      component: supplierReg,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/institutionalInfo',
      name: 'institutionalInfo',
      component: institutionalInfo,
      meta: {
        title: '第二步 完善机构资料'
      }
    },
    {
      path: '/accountReceivable',
      name: 'accountReceivable',
      component: accountReceivable,
      meta: {
        title: '第三步 填写收账信息'
      }
    },
    {
      path: '/supplierRegist',
      name: 'supplierRegist',
      component: supplierRegist,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/companyAddBank',
      name: 'companyAddBank',
      component: companyAddBank,
      meta: {
        title: '添加银行卡'
      }
    },
    {
      path: '/invitingFriends',
      name: 'invitingFriends',
      component: invitingFriends,
      meta: {
        title: '多加网'
      }
    },
    {
      path: '/regSelectType',
      name: 'regSelectType',
      component: regSelectType,
      meta: {
        title: '注册'
      }
    },
    {
      path:'/evaluateList',
      name: 'evaluateList',
      component: evaluateList,
      meta: {
        title: '评价列表'
      }
    },
    {
      path:'/returning',
      name: 'returning',
      component: returning,
      meta: {
        title: '我的pos机'
      }
    },
    {
      path:'/cashStart',
      name: 'cashStart',
      component: cashStart,
      meta: {
        title: '我的pos机'
      }
    },
    {
      path:'/loading',
      name: 'loading',
      component: loading     
    },
    {
      path:'/checkAgreement',
      name: 'checkAgreement',
      component: checkAgreement,
      meta: {
        title: 'POS机使用协议'
      }
    },
    {
      path:'/unlineReceive',
      name: 'unlineReceive',
      component: unlineReceive,
      meta: {
        title: '我的POS机'
      }
    },
    {
      path:'/getBankList',
      name: 'getBankList',
      component: getBankList,
      meta: {
        title: '选择开户银行'
      }
    },
    {
      mode:history,
      path:'/onlineReceive',
      name: 'onlineReceive',
      component: onlineReceive,
      meta: {
        title: '我的POS机',
        //keepAlive:true
      }
    },
    {
      mode:history,
      path:'/divisionAccounts',
      name: 'divisionAccounts',
      component: divisionAccounts,
      meta: {
        title: '确认分账'
      }
    },
    {
      mode:history,
      path:'/auditRejection',
      name: 'auditRejection',
      component: auditRejection,
      meta: {
        title: '审核拒绝'
      }
    },
    {
      mode:history,
      path:'/supplierBankList',
      name: 'supplierBankList',
      component: supplierBankList,
      meta: {
        title: '选择开户银行'
      }
    },
    {
      mode:history,
      path:'/supportBankList',
      name: 'supportBankList',
      component: supportBankList,
      meta: {
        title: '已支持的银行卡'
      }
    },
    {
      mode:history,
      path:'/publicAccount',
      name: 'publicAccount',
      component: publicAccount,
      meta: {
        title: '企业对公账户信息'
      }
    },
    {
      mode:history,
      path:'/presonAccount',
      name: 'presonAccount',
      component: presonAccount,
      meta: {
        title: '银行卡信息'
      }
    },
    {
      mode:history,
      path:'/AccountAudits',
      name: 'AccountAudits',
      component: AccountAudits,
      meta: {
        title: '资料审核中'
      }
    },
    {
      mode:history,
      path:'/experiencePOS',
      name: 'experiencePOS',
      component: experiencePOS,
      meta: {
        title: '交易过程体验'
      }
    },
    {
      mode:history,
      path:'/doctorQualifications',
      name: 'doctorQualifications',
      component: doctorQualifications,
      meta: {
        title: '完善资质信息'
      }
    },
    {
      mode:history,
      path:'/profitDetails',
      name: 'profitDetails',
      component: profitDetails,
      meta: {
        title: '收益明细'
      }
    },
    {
      mode:history,
      path:'/resultsDetail',
      name: 'resultsDetail',
      component: resultsDetail,
      meta: {
        title: '结果详情'
      }
    },
    {
      mode:history,
      path:'/setSafetyCode',
      name: 'setSafetyCode',
      component: setSafetyCode,
      meta: {
        title: '设置安全码'
      }
    },
    
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  next();
});

export default router;
