import storage from "../storage";

export default {
  initTouristNum: state => {
    state.orderAdultNum = 1;
    state.orderChildNum = 0;
  },
  decreaseTouristNum: (state, type, num) => {
    if(type == 1){
      state.orderAdultNum--;
    }else if(type == 2){
      state.orderChildNum--;
    }
  },
  setTouristAdult: (state, adult) => {
    state.orderAdultNum = adult || 1;
  },
  setTouristChild: (state, child) => {
    state.orderChildNum = child || 0;
  },
  changeDepartCity: (state, city) => {
    state.departCity = city;
  },
  changeArriveCity: (state, city) => {
    state.arriveCity = city;
  },
  changePositionCity: (state, city) => {
    state.positionCity = city;
  },
  getCustomPhone: (state, customPhoneNum) => {
    state.customPhoneNum = customPhoneNum;
  },
  getCustomName: (state, customName) => {
    state.customName = customName;
  },
  getCustomUserName: (state, customUserName) => {
    state.customUserName = customUserName;
  },
  getStoreData(state,curVal){
    state.orderAdultNum = curVal
  },
  setExpireIime(expire){    
    setTimeout(()=>{
      storage.setCookie('havaBingBank','false',-1);
    },10000)
  }
}
