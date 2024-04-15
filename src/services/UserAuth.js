import axios from "axios";
import { Alert } from "react-native";
import { readData, saveData } from "../storage/AsyncStorageManager";
const API_URL = "http://192.168.1.104:5000/user/";
class UserAuth {
  signin(phoneNumber, password) {
    return axios
      .post(API_URL + "signin", {
        phoneNumber,
        password
      })
      .then(response => {
        console.log(response.data.accessToken)
        if (response.data.accessToken) {
          saveData("Token",response.data.accessToken)
          return response.data.accessToken
        }
      }).catch((err) => {
        console.log(err.response.data)
      })

      ;
  }
  //logout
  logout() {
    return axios
      .post(API_URL + "signout", {
      }).then((response => {
        localStorage.removeItem("user");
        return response
      }))
      .catch((err) => {
        return err
      })

  }

  async checkUser() {
    token = await readData("Token")
    return axios
      .get(API_URL + "checkUser", {headers:{"x-access-token":token}}).then((res)=>{
        return true
      }).catch((err)=>{
        console.log("Check User Failed",err)
        return false
      })

  }
  signup(name, phoneNumber, password) {
    console.log(name)
    return axios.post(API_URL + "signup", {
      name,
      phoneNumber,
      password
    }).then((res) => {
      Alert.alert("Kayıt Başarılı")
      return "kayit"
    }).catch((err) => {
      console.log(err.response.data)
    })
      ;
  }


  async getHistory () {
    return axios.get(API_URL + "getHistory", {headers:{"x-access-token":token}}).then(async(res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err.response.data)
    })
      ;
  }

}
export default new UserAuth();