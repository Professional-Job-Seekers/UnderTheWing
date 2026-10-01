import { apiFetch } from './api';
import {setCookie} from "./cookies";

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