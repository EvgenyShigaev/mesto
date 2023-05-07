export default class UserInfo {
  constructor(selectorName, selectorJob) {
    this._name = document.querySelector(selectorName);
    this._job = document.querySelector(selectorJob);
  }
//
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  }
//
  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._job.textContent = userInfo.job;
  }
}