import {HttpService} from './http';

/**
 * 封装登录相关的请求及数据处理
 */


export const loginService = {
  api: {
    supplierLogin:'/user/ucenter/supplierlogin/pwd',//密码登录
    supplierLogin2:'/user/ucenter/supplierlogin/sms',//验证码登录
    login: '/user/ucenter/login/pwd',//密码登录
    login2: '/user/ucenter/login/sms',//验证码登录
    getCode: '/user/validate/imgcode/create',//获取图片验证码
    getSmsCode: '/user/validate/smscode/create',//获取短信验证码
    sendCode: '/user/ucenter/agent/regist',//渠道商注册
    subinfoC: '/user/ucenter/agent2c/add',//完善个人信息
    subinfoB: '/user/ucenter/agent2b/add',//完善企业信息
    getUserInfo: '/user/ucenter/userinfo/get',//查询用户信息
    getagentinfo: '/user/ucenter/orginfo/get',//获取初始状态下用户之前填写的资料信息
    getPwd: '/user/ucenter/findpwd/login',//通过短信找回密码
    sendNewPwd: '/user/ucenter/findpwd/setpwd',//发送新密码
    changePwd: '/user/ucenter/reset/pwd',//根据旧密码修改密码
    getPorducts: '/product/info/list/query',//获取产品列表
    getLabels: '/product/info/label/listquery',//获取产品大类别，标签
    getProductInfo: '/product/info/detail/query',//获取产品详情
    addOrder: '/order/agent/info/add',//创建订单
    agentOrders: '/order/info/list/query',//订单列表查询
    agentOrderInfo: '/order/info/detail/query',//查询代理商订单详情
    markPrice: '/order/update/agent/markprice',//录入销售总金额
    evaluationAdd: '/order/evaluation/info/add',//提交评论
    logout: '/user/ucenter/login/loginout',//退出登录/注销
    myInfo: '/user/ucenter/myinfo/get',//我的信息
    testCall: '/SevenMoor/midNumBind',//测试拨号
    cancelOrder: '/order/update/agent/cancel',//订单取消
    rateCount: '/order/price/rate/count',//计算收益
    addSeller: '/user/ucenter/agentopter/add',//添加新业务员
    getSellers: '/user/ucenter/listagentopter/query',//查询业务员列表
    resetPwd: '/user/ucenter/agentopter/resetpwd',//重置业务员登录密码
    sellermana: '/user/ucenter/agentopter/manage',//管理业务员账号optType:0,启用。1,禁用
    getBills: '/bill/info/list/query',//获取账单列表
    getSupplierInfo: '/user/ucenter/supplier/info',//获取供应商信息
    getTypeBill: '/statistics/rate/producttype/listquery',//获取分类收益列表
    indexlists: '/index/agent/info/get',//获取首页数据
    getsubsidy: '/statistics/order/subsidy/get',//查询订单补贴统计
    getrecommendfee: '/statistics/order/recommendfee/get',//查询推荐奖励统计
    getyearsale: '/statistics/order/yearsale/get',//查询年度销售统计
    getqnmlgb: '/statistics/acc/return/get',//查询利益利滚利
    addbank:'/bill/info/add/do',//添加银行卡
    banklist:'/bill/info/list/do',//银行卡列表
    checkedBank:'/bill/info/check/do',//更改银行卡
    reBackMoney:'/bill/info/reBackMoney/do',//获取用户余额
    supplierList:'/product/info/supplier/listQuery',//获取供应商产品
    confirmprice:'/order/update/supplier/confirmprice',//供应商确定分账
    clientInfo:'/order/agent/clientInfo/query',//获取是否填写信息
    contractOrder:'/order/supplier/contract',//获取是否填写信息
    updatePrice:'/order/update/busi/status',//获取是否填写信息
    holeInfo:'/order/agent/clientInfo/add',//保存升单辅助信息
    modifyInfo:'/order/agent/clientInfo/update',//修改升单辅助信息
    supplierReg:'/user/ucenter/agent2p/add',//供应商注册
    signContract:'/user/ucenter/login/contact',//签订合同
    supplierBankInfo:'/user/ucenter/agent2p/add3',//供应商添加银行卡信息
    supplierAddImg:'/user/ucenter/agent2p/add2',//供应商添加照片
    supplierDoctorInfo:'/user/ucenter/agent2d/add',//供应商医生信息添加
    supplierDoctorPhotos:'/user/ucenter/agent2d/add2',//供应商医生照片添加
    purchase:'/statistics/acc/return/grossincome',//集成采购
    recommended: '/statistics/order/recommendfee/getdetail',//推荐收益
    getAddress: '/order/contract',//个人获取云商通合同地址,
    companyAddress: '/order/qy/contract',//企业获取云商通合同地址,    
    signcontractback:'/user/ucenter/querycontract',//签订合同
    companyBank:'/user/ucenter/agent2b/add2',//企业渠道商填写银行卡信息
    nameid:'/user/ucenter/getagent/nameid',//添加银行卡获取用户信息
    share:'/user/ucenter/wxsign/query',//微信分享
    getEvaluate:"/product/info/evaluation/query", //评价列表
    getwsgpayinfo:"/order/getwsgpayinfo",//网关支付
    forward:"/bill/agent/cashOrderMoney", //提现
    citySelect:"/product/info/city/listquery",//城市筛选
    marketInfo:"/order/manager/agent/getbynumber",//根据市场人员编号获取市场人员信息
    startPOS:"/pos/supplier/online/orgid",//我的pos机页面各个状态
    underline:"/pos/supplier/online/underline",//线下领取
    applypos:"/pos/supplier/online/applypos",//在线申请
    applyonline:"/pos/supplier/online/applyonline",//前台确认收货
    forrefund:"/pos/supplier/online/forrefund",//申请退还
    weixinPay:"/user/wx/order4pos/pay",//微信支付
    getAppId:"/user/wx/order4pos/query",//获取当前登录人员的appid
    getOpenId:"/user/wx/order4pos/openid",//获取当前登录人员的openId,
    toCall:'/SevenMoor/midNumBindForAXB', //联系医生或医院机构
    querycode:'/pos/supplier/online/querycode',//获取正确的POS编号
    queryorder:'/user/wx/order4pos/queryorder',//订单查询    
    certificationBindingbank:'/yunshangtong/certificationBindingbank',//供应商完善个人信息
    isContractStuta:'/order/info/contract/query',//未签订合同订单列表
    confirmSigning:'/order/supplier/contract',//单个/多个未签订合同
    confirmpriceInfo:'order/query/confirmprice/info',//确认分账信息
    confirmpriceTotal:'order/second/confirmprice',//收益总金额
    bankList:'/bill/info/list/do',//供应商银行卡列表
    checkBank:'/bill/get/banklogo',//校验银行卡
    supportBankList:'/bill/support/bank/list',//支持的银行卡列表
    createOrderNo:'/order/agent/info/create',//创建订单生产orderNoe
    ChangePwdType:'/user/ucenter/findpwd/supplierlogin',//更改密码检验是不是当前类型
    presonlBankInfo:'/bill/bank/query/detail',//个人银行卡详情
    businessBankInfo:'/user/ucenter/query/enterprise/account',//企业银行卡详情
    presonlUnBindBank:'/bill/bank/query/unbind',//企业银行卡详情
    getBankList:"/bill/supportqy/bank/list" ,//企业对公支持银行卡
    bankMessage:'/user/ucenter/enterprise/account', //企业对公添加银行卡
    havebank:'/user/ucenter/bank/query', //判断是否有银行卡
    certitication:'/user/ucenter/query/certitication', //判断是否实名
    fictitiousquery:'/order/agent/info/fictitiousquery',//交易过程体验按钮接口
    fictitiouscreate:'/order/agent/info/fictitiouscreate',//开始体验按钮接口 
    fictitious: '/order/agent/info/fictitious',//体验完毕、放弃体验一个接口
    fictitiouspay:'/order/agent/info/fictitiouspay',//我已付款按钮接口
    fictitiousdivision:'/order/agent/info/fictitiousdivision',//分账按钮接口
    fictitiousend:'/order/agent/info/fictitiousend',//体验总结接口
    cashMoney:'/bill/query/cashMoney',//提现查询金额
    cashOrderMoney: '/bill/agent/cashOrderMoney',//提现按钮接口
    profitDetails:'/bill/order/reward/details',//订单奖励详情
    getSecurityCode:'/user/ucenter/userinfo/get',//获取安全码
    setsafetycode: '/user/ucenter/findpwd/setsafetycode',//通过手机短信找回、设置安全码接口
    safetycode:'/user/ucenter/reset/safetycode',//根据老安全码设置新的安全码接口
    safetycodeCheck:'/user/ucenter/safetyCode/check',//校验安全码
    setDoctorImgInfo:'/user/ucenter/agent2d/add2',//医生注册时照片资料接口
    recommendlist:'/product/info/recommendlist/query',//首页优选产品
  },
  toCall(calledPhone,confirmPhone) {
    return HttpService.get(this.api.toCall, {calledPhone:calledPhone,confirmPhone:confirmPhone}, true)
  },
  bankMessage(companyName,authType,uniCredit,businessLicense,organizationCode,identityType,taxRegister,expLicense,legalName,legalIds,legalPhone,accountNo,parentBankName,bankCityNo,bankName,unionBank,province,city,licenseImgUrl,idCardImgUrls,defaultBankCard){
    return HttpService.post(this.api.bankMessage,JSON.stringify({companyName,authType,uniCredit,businessLicense,organizationCode,identityType,taxRegister,expLicense,legalName,legalIds,legalPhone,accountNo,parentBankName,bankCityNo,bankName,unionBank,province,city,licenseImgUrl,idCardImgUrls,defaultBankCard}),true)
  },
  
  getBankList(){
    return HttpService.get(this.api.getBankList,true)
  },
  supplierLogin(loginName, pwd, validCode) {
    return HttpService.post(this.api.supplierLogin, JSON.stringify({loginName, pwd, validCode}), true)
  },
  supplierLogin2(loginName, imgValidateCode, msgValidateCode, validCode) {
    return HttpService.post(this.api.supplierLogin2, JSON.stringify({loginName, imgValidateCode, msgValidateCode}), true)
  },
  login(loginName, pwd, validCode) {
    return HttpService.post(this.api.login, JSON.stringify({loginName, pwd, validCode}), true)
  },
  login2(loginName, imgValidateCode, msgValidateCode, validCode) {
    return HttpService.post(this.api.login2, JSON.stringify({loginName, imgValidateCode, msgValidateCode}), true)
  },
  getCode() {
    return HttpService.getcode(this.api.getCode, true)
  },
  getSmsCode(mobile, type, orgType, imgCode) {
    return HttpService.post(this.api.getSmsCode, JSON.stringify({mobile, type, orgType, imgCode}), true)
  },
  sendCode(loginName, imgValidateCode, msgValidateCode, orgType, type, validCode, internalNumber) {
    return HttpService.post(this.api.sendCode, JSON.stringify({loginName, imgValidateCode, msgValidateCode, orgType, type, validCode, internalNumber}), true)
  },
  subinfoC(name, idCardNo, email, inviterPhone, validCode) {
    return HttpService.post(this.api.subinfoC, JSON.stringify({name, idCardNo, email, inviterPhone, validCode}), true)
  },
  subinfoB(orgName, imgUrl, leaderName, idCardNo, email, validCode) {
    return HttpService.post(this.api.subinfoB, JSON.stringify({orgName, imgUrl, leaderName, idCardNo, email, validCode}), true)
  },
  getUserInfo() {
    return HttpService.post(this.api.getUserInfo, {}, true)
  },
  getagentinfo() {
    return HttpService.post(this.api.getagentinfo, {}, true)
  },
  getLabels() {
    return HttpService.post(this.api.getLabels, {}, true)
  },
  getpwd(loginName, imgValidateCode, msgValidateCode) {
    return HttpService.post(this.api.getPwd, JSON.stringify({loginName, imgValidateCode, msgValidateCode}), true)
  },
  sendNewPwd(phone, newPwd, confirmNewPwd) {
    return HttpService.post(this.api.sendNewPwd, JSON.stringify({phone, newPwd, confirmNewPwd}), true)
  },
  changePwd(oldPwd, newPwd, confirmNewPwd) {
    return HttpService.post(this.api.changePwd, JSON.stringify({oldPwd, newPwd, confirmNewPwd}), true)
  },
  getPorducts(keyWord, productName, productType, label, pageNo, pageSize, orderField, searchScope, orgId, provinceName, city) {
    return HttpService.post(this.api.getPorducts, JSON.stringify({keyWord, productName, productType, label, pageNo, pageSize, orderField, searchScope,  orgId, provinceName, city}), true)
  },
  getProductInfo(productId,type) {
    return HttpService.get(this.api.getProductInfo, {productId: productId,type: type}, true)
  },
  addOrder(orderNo,productId,type,isContract,clientId) {
    return HttpService.post(this.api.addOrder, JSON.stringify({orderNo,productId,type,isContract,clientId}), true)
  },
  agentOrders(productType, orderField, agentBusiStatus, orgId, supplierBusiStatus, pageNo, pageSize) {
    return HttpService.post(this.api.agentOrders, JSON.stringify({productType, orderField, agentBusiStatus, orgId, supplierBusiStatus, pageNo, pageSize}), true)
  },
  agentOrderInfo(orderNo) {
    return HttpService.get(this.api.agentOrderInfo, {orderNo: orderNo}, true)
  },
  markPrice(orderNo, price) {
    return HttpService.post(this.api.markPrice, JSON.stringify({orderNo, price}), true)
  },
  evaluationAdd(orderNo, evaNotes, orderScore, platformScore, oppScore, evaType, evaluationImgs, anonymity) {
    return HttpService.post(this.api.evaluationAdd, JSON.stringify({orderNo, evaNotes, orderScore, platformScore, oppScore, evaType, evaluationImgs, anonymity}), true)
  },
  logout() {
    return HttpService.post(this.api.logout, {}, true)
  },
  myInfo() {
    return HttpService.post(this.api.myInfo, {}, true)
  },
  testCall() {
    return HttpService.post(this.api.testCall, {calledPhone:calledPhone}, true)
  },
  cancelOrder(orderNo, cancelType, reason) {
    return HttpService.post(this.api.cancelOrder, JSON.stringify({orderNo, cancelType, reason}), true)
  },
  rateCount(returnRate, marginReturnRate, groupBuyingRate, totalPrice) {
    return HttpService.post(this.api.rateCount, JSON.stringify({returnRate, marginReturnRate, groupBuyingRate, totalPrice}), true)
  },
  addSeller(phone, name, loginPwd) {
    return HttpService.post(this.api.addSeller, JSON.stringify({phone, name, loginPwd}), true)
  },
  getSellers() {
    return HttpService.post(this.api.getSellers, {}, true)
  },
  resetPwd(userNo) {
    return HttpService.get(this.api.resetPwd, {userNo: userNo}, true)
  },
  sellermana(userNo, optType) {
    return HttpService.post(this.api.sellermana, JSON.stringify({userNo, optType}), true)
  },
  getBills(pageNo, pageSize, month) {
    return HttpService.post(this.api.getBills, JSON.stringify({pageNo, pageSize, month}), true)
  },
  getSupplierInfo(orgId) {
    return HttpService.get(this.api.getSupplierInfo, {orgId}, true)
  },
  getTypeBill(productType) {
    return HttpService.post(this.api.getTypeBill, JSON.stringify({productType}), true)
  },
  indexlists() {
    return HttpService.post(this.api.indexlists, {}, true)
  },
  getsubsidy() {
    return HttpService.post(this.api.getsubsidy, {}, true)
  },
  getrecommendfee() {
    return HttpService.post(this.api.getrecommendfee, {}, true)
  },
  getyearsale() {
    return HttpService.post(this.api.getyearsale, {}, true)
  },
  getqnmlgb() {
    return HttpService.post(this.api.getqnmlgb, {}, true)
  },
  addbank(cardId, cardName,identityNo) {
    return HttpService.post(this.api.addbank, JSON.stringify({cardId, cardName,identityNo}), true)
  },
  banklist(pageNo,pageSize) {
    return HttpService.post(this.api.banklist, JSON.stringify({pageNo, pageSize}), true)
  },
  checkedBank(cardId) {
    return HttpService.post(this.api.checkedBank, JSON.stringify({cardId}), true)
  },
  reBackMoney() {
    return HttpService.post(this.api.reBackMoney, {}, true)
  },
  supplierList(keyWord, productName, productType, label, pageNo, pageSize, orderField, searchScope, provinceName, city, orgId) {
    return HttpService.post(this.api.supplierList, JSON.stringify({keyWord, productName, productType, label, pageNo, pageSize, orderField, searchScope, provinceName, city, orgId}), true)
  },
  confirmprice(orderNo) {
    return HttpService.post(this.api.confirmprice, JSON.stringify({orderNo}), true)
  },
  clientInfo(orderNo,orgId,isClient) {
    return HttpService.post(this.api.clientInfo, JSON.stringify({orderNo,orgId,isClient}), true)
  },
  contractOrder(orderNo, Stuta) {
    return HttpService.post(this.api.contractOrder, JSON.stringify({orderNo, Stuta}), true)
  },
  updatePrice(orderNo) {
    return HttpService.post(this.api.updatePrice, JSON.stringify({orderNo}), true)
  },
  modifyInfo(orderNo,clientName,clientSex,clientAge,clientProvince,clientCity,clientArea,agentOrgId,incomeLevel,consumption,describeHealth,clientImgVOS,clientInspectionImgVOS) {
    return HttpService.post(this.api.modifyInfo, JSON.stringify({orderNo,clientName,clientSex,clientAge,clientProvince,clientCity,clientArea,agentOrgId,incomeLevel,consumption,describeHealth,clientImgVOS,clientInspectionImgVOS}), true)
  },
  holeInfo(orderNo,clientName,clientSex,clientAge,clientProvince,clientCity,clientArea,agentOrgId,incomeLevel,consumption,describeHealth,clientImgVOS,clientInspectionImgVOS) {
    return HttpService.post(this.api.holeInfo, JSON.stringify({orderNo,clientName,clientSex,clientAge,clientProvince,clientCity,clientArea,agentOrgId,incomeLevel,consumption,describeHealth,clientImgVOS,clientInspectionImgVOS}), true)
  },
  supplierReg(companyName,leaderName,idCardNo,mainField,mainProduct,province,city) {
    return HttpService.post(this.api.supplierReg, JSON.stringify({companyName,leaderName,idCardNo,mainField,mainProduct,province,city}), true)
  },
  signContract() {
    return HttpService.post(this.api.signContract, {}, true)
  },
  supplierBankInfo(cardId, cardName, cardPhone, personCardId, verificationCode) {
    return HttpService.post(this.api.supplierBankInfo,JSON.stringify({cardId, cardName, cardPhone, personCardId, verificationCode}), true)
  },
  supplierAddImg(imageUrl, orgImgUrls) {
    return HttpService.post(this.api.supplierAddImg,JSON.stringify({ imageUrl, orgImgUrls }), true)
  },
  supplierDoctorInfo(leaderName,idCardNo, mainField, mainProduct,province,city) {
    return HttpService.post(this.api.supplierDoctorInfo,JSON.stringify({ leaderName,idCardNo, mainField, mainProduct , province, city}), true)
  },
  supplierDoctorPhotos(orgImgUrls) {
    return HttpService.post(this.api.supplierDoctorPhotos,JSON.stringify({ orgImgUrls }), true)
  },
  purchase() {
    return HttpService.post(this.api.purchase,JSON.stringify({}), true)
  },
  recommended() {
    return HttpService.post(this.api.recommended,JSON.stringify({}), true)
  },
  getAddress() {
    return HttpService.post(this.api.getAddress,JSON.stringify({}), true)
  },
  companyAddress(){
    return HttpService.post(this.api.companyAddress,JSON.stringify({}), true)
  },
  signcontractback() {
    return HttpService.post(this.api.signcontractback,JSON.stringify({}), true)
  },
  companyBank(cardId, cardName, cardPhone, personCardId, verificationCode,defaultBankCard) {
    return HttpService.post(this.api.companyBank,JSON.stringify({cardId, cardName, cardPhone, personCardId, verificationCode, defaultBankCard}), true)
  },
  nameid() {
    return HttpService.post(this.api.nameid,JSON.stringify({}), true)
  },
  share(url) {
    return HttpService.get(this.api.share,{url:url}, true)
  },
  getEvaluate(productId){
    return HttpService.get(this.api.getEvaluate, {productId:productId}, true)
  },
  getwsgpayinfo(orderNo){
    return HttpService.post(this.api.getwsgpayinfo,{orderNo: orderNo}, true)
  },
  forward(amount) {
    return HttpService.post(this.api.forward,JSON.stringify({ amount }), true)
  },
  citySelect() {
    return HttpService.post(this.api.citySelect,JSON.stringify({ }), true)
  },
  marketInfo(externalNumber) {
    return HttpService.get(this.api.marketInfo,{externalNumber:externalNumber}, true)
  },

  startPOS(orgId) {
    return HttpService.get(this.api.startPOS,{orgId:orgId}, true)
  },
  underline(posCode,orderid) {
    return HttpService.get(this.api.underline,{orderid:posCode,orderid:orderid}, true)
  },
  applypos(orgName, orgPhone, address, orderid) {
    return HttpService.post(this.api.applypos,JSON.stringify({ orgName, orgPhone, address, orderid }), true)
  },
  applyonline(orderNo) {
    return HttpService.get(this.api.applyonline,{orderNo:orderNo}, true)
  },
  forrefund(causeOfReturn, reclaimRemark, express, courierNumber){
    return HttpService.post(this.api.forrefund,JSON.stringify({ causeOfReturn, reclaimRemark, express, courierNumber }), true)
  },
  weixinPay(price, openid, orderid){
    return HttpService.post(this.api.weixinPay,JSON.stringify({ price, openid, orderid }), true)
  },
  getAppId(){
    return HttpService.post(this.api.getAppId,JSON.stringify({  }), true)
  },
  getOpenId(code){
    return HttpService.get(this.api.getOpenId,{ code: code}, true)
  },
  querycode(posCode){
    return HttpService.get(this.api.querycode,{ posCode: posCode}, true)
  },
  certificationBindingbank(cardId, cardName, cardPhone, identityNo, verificationCode) {
    return HttpService.post(this.api.certificationBindingbank,JSON.stringify({cardId, cardName, cardPhone, identityNo, verificationCode}), true)
  },
  isContractStuta(isContract, pageNo, pageSize) {
    return HttpService.post(this.api.isContractStuta,JSON.stringify({isContract, pageNo, pageSize}), true)
  },
  confirmSigning(contractVOS) {
    return HttpService.post(this.api.confirmSigning,JSON.stringify({contractVOS}), true)
  },
  confirmpriceInfo(orderNo) {
    return HttpService.get(this.api.confirmpriceInfo,{orderNo:orderNo}, true)
  },
  confirmpriceTotal(orderNo, costPrice) {
    return HttpService.get(this.api.confirmpriceTotal,{orderNo: orderNo,costPrice: costPrice}, true)
  },
  bankList(pageNo, pageSize){
    return HttpService.post(this.api.bankList,JSON.stringify({pageNo, pageSize}), true)
  },
  checkBank(bankNo){
    return HttpService.post(this.api.checkBank,JSON.stringify({bankNo}), true)
  },
  supportBankList(){
    return HttpService.post(this.api.supportBankList,JSON.stringify({}), true)
  },
  createOrderNo(productId){
    return HttpService.post(this.api.createOrderNo,JSON.stringify({productId}), true)
  },
  ChangePwdType(loginName, imgValidateCode, msgValidateCode){
    return HttpService.post(this.api.ChangePwdType, JSON.stringify({loginName, imgValidateCode, msgValidateCode}), true)
  },
  presonlBankInfo(cardId){
    return HttpService.get(this.api.presonlBankInfo, {cardId:cardId}, true)
  },
  businessBankInfo(cardNo){
    return HttpService.post(this.api.businessBankInfo, JSON.stringify({cardNo:cardNo}), true)
  },
  presonlUnBindBank(cardId){
    return HttpService.get(this.api.presonlUnBindBank, {cardId:cardId}, true)
  },
  havebank(){
    return HttpService.get(this.api.havebank, {}, true)
  },
  certitication(){
    return HttpService.get(this.api.certitication, {}, true)
  }, 
  fictitiousquery(){
    return HttpService.get(this.api.fictitiousquery, {}, true)
  },
  fictitiouscreate(){
    return HttpService.get(this.api.fictitiouscreate, {}, true)
  },
  fictitious(){
    return HttpService.get(this.api.fictitious, {}, true)
  },
  fictitiouspay(){
    return HttpService.get(this.api.fictitiouspay, {}, true)
  },
  fictitiousdivision(orderNo, costPrice){
    return HttpService.get(this.api.fictitiousdivision, {orderNo: orderNo, costPrice: costPrice}, true)
  },
  fictitiousend(){
    return HttpService.get(this.api.fictitiousend, {}, true)
  },
  cashMoney(){
    return HttpService.get(this.api.cashMoney, {}, true)
  },
  cashOrderMoney(amount, orderMoney, oneAvailable){
    return HttpService.post(this.api.cashOrderMoney, JSON.stringify({amount, orderMoney, oneAvailable}), true)
  },
  profitDetails(pageIndex, pageSize){
    return HttpService.post(this.api.profitDetails, JSON.stringify({pageIndex, pageSize}), true)
  },
  getSecurityCode(){
    return HttpService.get(this.api.getSecurityCode, {}, true)
  },
  setsafetycode(phone, smsCode, newPwd, confirmNewPwd){
    return HttpService.post(this.api.setsafetycode, JSON.stringify({phone, smsCode, newPwd, confirmNewPwd}), true)
  },
  safetycode(oldPwd, newPwd, confirmNewPwd){
    return HttpService.post(this.api.safetycode, JSON.stringify({oldPwd, newPwd, confirmNewPwd}), true)
  },
  safetycodeCheck(safetyCode){
    return HttpService.get(this.api.safetycodeCheck, {safetyCode}, true)
  },
  setDoctorImgInfo(identityCard1, identityCard2, orgImgUrls, homePage, change){
    return HttpService.post(this.api.setDoctorImgInfo, JSON.stringify({identityCard1, identityCard2, orgImgUrls, homePage, change}), true)
  },
  recommendlist(pageNo, pageSize){
    return HttpService.post(this.api.recommendlist, JSON.stringify({pageNo, pageSize}), true)
  },
  
};






