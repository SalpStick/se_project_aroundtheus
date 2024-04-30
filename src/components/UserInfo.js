export default class UserInfo {
  constructor(profileName, profileDescription, avatar) {
    this._name = document.querySelector(profileName);
    this._description = document.querySelector(profileDescription);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      description: this._description.textContent,
    };
    return this._userInfo;
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
