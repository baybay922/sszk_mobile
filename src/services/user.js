/**
 * 用户信息存储服务，目前后端仅是存储在session当中，所以前端也暂时只存在sessionStorage里
 */

export class UserService {
  static save(user) {
    sessionStorage.user = JSON.stringify(user);
  }

  static get() {
    return JSON.parse(sessionStorage.user || null);
  }

  static clear() {
    delete sessionStorage.user;
  }
}