import { readData } from "../storage/AsyncStorageManager";

export default function authHeader(contentType) {
    const user = JSON.parse(readData('user'));
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': user.token , "Content-Type":`${contentType}`};
    } else {
      return {};
    }
  }