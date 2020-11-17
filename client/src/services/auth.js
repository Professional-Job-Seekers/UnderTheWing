// This service object was adapted from here: 
//  https://tylermcginnis.com/react-router-protected-routes-authentication/
//
// This version was modified to use real authentication implemented
// in the backend api. It was also modified to return promises instead
// of using callbacks `cb`.

const auth = {
  isAuthenticated: false,
  async authenticate(username, password) {
    const URL = 'api/auth/login/';
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
      const response = await fetch(URL, requestOptions);
      if(!response.ok) {
        throw new Error('Login Failed');
      }
      this.isAuthenticated = true;
      return response.json();
    } catch (err) {
      console.log(err);
    }
  },
  async signout(cb) {
    const URL = '/api/auth/logout';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch(URL, requestOptions);
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