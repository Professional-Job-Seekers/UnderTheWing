import { apiFetch } from './api';
import {setCookie, getCookie} from "./cookies";

const auth = {
  isAuthenticated: false,
  async authenticate(username, password) {
    const URL = '/api/auth/login/';
    const loginRequestJSON = {
      "username": username,
      "password": password
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(loginRequestJSON)
    };
    try {
      const response = await apiFetch(URL, requestOptions);
      if(!response.ok) {
        throw new Error('Login Failed');
      }
      const result = await response.json();
      this.isAuthenticated = true;
      return result;
    } catch (err) {
      this.isAuthenticated = false;
      throw err;
    }
  },
  // Signs in, then records the account role in cookies for the navigation.
  async signInAs(username, password) {
    await this.authenticate(username, password);
    const response = await apiFetch(`/api/accounts/mentor/?username=${encodeURIComponent(username)}`);
    if (!response.ok) {
      this.isAuthenticated = false;
      throw new Error('Could not load account role');
    }
    const profile = await response.json();
    setCookie("auth", true);
    setCookie("username", username);
    setCookie("user_type", profile.is_mentor ? "mentor" : "mentee");
    return profile;
  },
  hasSession() {
    return this.isAuthenticated === true || getCookie("auth") === "true";
  },
  async signout(cb) {
    setCookie('auth', "false");
    setCookie('user_type', "");
    const URL = '/api/auth/logout';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
    };
    try {
      const response = await apiFetch(URL, requestOptions);
      if(!response.ok) {
        throw new Error('Logout Failed');
      }
      this.isAuthenticated = false;
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }
}
  
export default auth; 