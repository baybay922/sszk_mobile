/**
 * http service
 */
import $ from 'jquery';
import {UserService} from './user';
import { Indicator } from 'mint-ui';

const hookAjax = $ => {
  if ($.hooked) {
    return;
  }
  let doc = $(document);
  $.ajaxSetup({
    global: true,
    cache: false
  });
  doc.ajaxSend(function (evt, jqXHR, opts) {
    if (opts.hasOwnProperty('async') && !opts.async) {
      console.warn('%c发现同步的ajax调用，请尽快修改！url: ' + opts.url, 'background: #f00; color: #fff');
    }
    if (opts.showLoading) {
      let timer = null;
      Indicator.open();
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(function () {
        Indicator.close();
        clearTimeout(timer);
        timer = null;
        // 15秒还没有关闭则强制关闭
      }, 15 * 1000);

    }
  });
  doc.ajaxStop(function () {
    Indicator.close();
  });
  $.hooked = true;
};

const instaceHolder = {};

const getInstance = () => {
  if (!instaceHolder.instance) {
    instaceHolder.instance = new HttpService();
  }
  return instaceHolder.instance;
};

const errorHandler = r => {
  if (r.errorCode == 403) {
    console.log(r.message);
    UserService.clear();
    return location.replace('#/login');
  } else if(r.errorCode == 603) {
    console.log(r.message);
  }
};

export class HttpService {
  constructor() {

  }

  _getcode(url, showLoading){
    return new Promise((resolve, reject) => {
      resolve(url);
    })
  }

  _get(url, params, showLoading) {
    hookAjax($); // 之所以放在这里是因为在construct阶段，loading组件还没有渲染出来
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        method: 'GET',
        data: params,
        showLoading: showLoading,
        contentType: 'application/json',
        dataType: 'json',
        //cache: !noCache, // 不需要缓存了
        success: r => {
          if (!r) {
            return reject('服务器没有返回数据');
          }
          if ('errorCode' in r && r.errorCode != 0) {
            errorHandler(r);
            return reject(r);
          }
          if ('errorCode' in r && r.errorCode == 0) {
            return resolve(r.data);
          }
          resolve(r);
        },
        beforeSend: xhr=> {
          if(new Date().valueOf()-localStorage.getItem('time')<7*24*60*60*1000){
            xhr.setRequestHeader("X-BI", localStorage.getItem('X-BI'));
            xhr.setRequestHeader("X-BS", localStorage.getItem('X-BS'));
          }
        },
        error: (xhr, textStatus, error) => {
          reject(error);
        }
      })
    });
  }

  _post(url, body, showLoading) {
    hookAjax($); // 之所以放在这里是因为在construct阶段，loading组件还没有渲染出来
    return new Promise((resolve, reject) => {
      let options = {
        url: url,
        method: 'POST',
        data: body,
        contentType: 'application/json',
        dataType: 'json',
        showLoading: showLoading,
        //cache: cache, // 不需要缓存了
        beforeSend: xhr=> {
          if(body._IOS){
            xhr.setRequestHeader("C", "0x100L");
          }
          if(body._Android){
            xhr.setRequestHeader("C", "0x10000L");
          }
          if(new Date().valueOf()-localStorage.getItem('time')<7*24*60*60*1000){
            xhr.setRequestHeader("X-BI", localStorage.getItem('X-BI'));
            xhr.setRequestHeader("X-BS", localStorage.getItem('X-BS'));
          }
        },
        success: r => {
          if (!r) {
            return reject('服务器没有返回数据');
          }
          if ('errorCode' in r && r.errorCode != 0) {
            errorHandler(r);
            return reject(r);
          }
          if ('errorCode' in r && r.errorCode == 0) {
            return resolve(r.data);
          }
          resolve(r);
        },
        error: (xhr, textStatus, error) => {
          reject(error);
        }
      };
      if (body._json) {
        options.contentType = 'application/json';
        delete body._json;
        options.data = JSON.stringify(body);
      }
      $.ajax(options)
    });
  }


  _postForm(url, formData, showLoading) {
    hookAjax($); // 之所以放在这里是因为在construct阶段，loading组件还没有渲染出来
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json',
        showLoading: showLoading,
        success: r => {
          if (!r) {
            return reject('服务器没有返回数据');
          }
          if ('errorCode' in r && r.errorCode != 0) {
            errorHandler(r);
            return reject(r);
          }
          if ('errorCode' in r && r.errorCode == 0) {
            return resolve(r.data);
          }
          resolve(r);
        },
        beforeSend: xhr=> {
          if(new Date().valueOf()-localStorage.getItem('time')<7*24*60*60*1000){
            xhr.setRequestHeader("X-BI", localStorage.getItem('X-BI'));
            xhr.setRequestHeader("X-BS", localStorage.getItem('X-BS'));
          }
        },
        error: (xhr, textStatus, error) => {
          reject(error);
        }
      })
    });
  }

  static get(url, params, showLoading) {
    return getInstance()._get(url, params, showLoading);
  }

  static getcode(url, params, showLoading) {
    return getInstance()._getcode(url, showLoading);
  }

  static post(url, body, showLoading) {
    // 默认的contentType是application/x-www-form-urlencoded
    // 如果想发送application/json，需要在body中增加_json:true，如 {id:1, _json:true}
    return getInstance()._post(url, body, showLoading);
  }

  static postForm(url, formData, showLoading) {
    // 直接提交包含文件的formData
    return getInstance()._postForm(url, formData, showLoading);
  }
}

// HttpService.post('/',{a:1,b:{c:2},_json:true});

//HttpService.post('/',{a:1,b:{c:2},_json:true});

