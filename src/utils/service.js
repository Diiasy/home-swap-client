import axios from 'axios';
import { getUser } from '../utils/auth'

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true 
});

const errorHandler = err => {
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    let currentUser = getUser();
    return service.post(`/user/profile/${currentUser._id}/edit-pictures`, theFile)
      .then(res => {
        return res.data
      })
      .catch(errorHandler);
  }
}
