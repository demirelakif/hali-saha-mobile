import axios from "axios";
const API_URL = "http://localhost:3001/user/";
class UserAuth {
  login(phoneNumber, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  //logout
  logout() {
    return axios
      .post(API_URL + "signout", {
      }).then((response =>{
        localStorage.removeItem("user");  
        return response
      }))
      .catch((err)=>{
        return err
      })
    
  }
  register(name,username, email, password) {
    return axios.post(API_URL + "signup", {
      name,
      email,
      username,
      password
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();