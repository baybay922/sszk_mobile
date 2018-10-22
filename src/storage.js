/*
    storage 主要放项目中的storage相关操作：存取等
*/
var storage = {
    /**
     对本地数据进行操作的相关方法，如localStorage,sessionStorage的封装
    */
    setStorage: function(key, value, duration) {
        var data = {
            value: value,
            expiryTime: !duration || isNaN(duration) ? 0 : this.getCurrentTimeStamp() + parseInt(duration)
        };
        localStorage[key] = JSON.stringify(data);
    },
    getStorage: function(key) {
        var data = localStorage[key];
        if (!data || data === "null") {
            return null;
        }
        var now = this.getCurrentTimeStamp();
        var obj;
        try {
            obj = JSON.parse(data);
        } catch (e) {
            return null;
        }
        if (obj.expiryTime === 0 || obj.expiryTime > now) {
            return obj.value;
        }
        return null;
    },
    removeStorage: function(key){
        localStorage.removeItem(key);
    },
    getSession: function(key) {
        var data = sessionStorage[key];
        if (!data || data === "null") {
            return null;
        }
        return JSON.parse(data).value;

    },
    setSession: function(key, value) {
        var data = {
            value: value
        }
        sessionStorage[key] = JSON.stringify(data);
    },
    getCurrentTimeStamp: function() {
        return Date.parse(new Date());
    },
    setCookie(cname, cvalue, exdays){//设置cookie，//exdays 时间  0.01大概25分钟
        var d = new Date();
            d.setTime(d.getTime() + (60*60*1000));
        var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires
    },
    getCookie(cname){//获取cookie
        var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while(c.charAt(0) == ' ') c = c.substring(1);
                if(c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
    },
    clearCookie(){//删除 cookie
        setCookie(name, "", -1);
    }
};
export default storage;