import axios from "axios";
import { Alert } from "react-native";
import { readData, saveData } from "../storage/AsyncStorageManager";
const API_URL = "http://192.168.1.105:5000/owner/";
class OwnerServices {
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
  async checkOwner() {
    token = await readData("Token")
    return axios
      .get(API_URL + "checkOwner", {headers:{"x-access-token":token}}).then((res)=>{
        return true
      }).catch((err)=>{
        console.log("Check Owner Failed",err)
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

  async getOwnerById(id) {
    try {
      const response = await axios.post(API_URL + "getOwnerById", {
        id
      });
      const owner = response.data.owner;
      

      return owner;
    } catch (error) {
      console.error("Owner aranırken bir hata oluştu:", error.response.data);
      Alert.alert("Hata", "Owner aranırken bir hata oluştu.");
      return [];
    }
  }
}
export default new OwnerServices();