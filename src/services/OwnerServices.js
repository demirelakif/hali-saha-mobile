import axios from "axios";
import { Alert } from "react-native";
import { readData, saveData } from "../storage/AsyncStorageManager";
const API_URL = "5000/owner/";
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
        console.log(err.response.data.error)
        Alert.alert(err.response.data.error)
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

  async getAllOwners() {
    try {
      const response = await axios.get(API_URL + "getAllOwners");
      const owners = response.data.owners;
      

      return owners;
    } catch (error) {
      console.error("Owner aranırken bir hata oluştu:", error.response.data);
      Alert.alert("Hata", "Owner aranırken bir hata oluştu.");
      return [];
    }
  }
  async getMyPitches() {
    token = await readData("Token")
    return axios
      .get(API_URL + "getMyPitches", {headers:{"x-access-token":token}}).
      then((res)=>{
        return res.data.pitches
      }).catch((err)=>{
        console.log("error getting mypitches",err)
        return err.data

      })

  }


  async getMyRequests() {
    token = await readData("Token")
    return axios
      .get(API_URL + "getMyRequests", {headers:{"x-access-token":token}}).
      then((res)=>{
        return res.data.data
      }).catch((err)=>{
        console.log("error getting mypitches",err)
        return err.data

      })

  }

  async acceptRequest(pitchId,reservationId,newStatus) {
    token = await readData("Token")
    return axios
      .post(API_URL + "updateRequest", 
      { pitchId, reservationId, newStatus },
      {headers:{"x-access-token":token}
    
    }
    ).
      then((res)=>{
        return res.data
      }).catch((err)=>{
        console.log("error getting mypitches",err)
        return err.data

      })

  }

  async searchOwnersByName(name) {
    try {
      const response = await axios.post(API_URL + "getOwnersByName", {
        name
      });
      const owners = response.data.owners;

      return owners;
    } catch (error) {
      console.error("Owners aranırken bir hata oluştu:", error.response.data);
      Alert.alert("Hata", "Sahalar aranırken bir hata oluştu.");
      return [];
    }
  }
}


export default new OwnerServices();