import axios from 'axios';
import { getUser } from '../utils/auth'
let currentUser = getUser();

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true 
});

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    console.log('file in service: ', theFile)
    return service.post(`/user/profile/${currentUser._id}/edit`, theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewThing (newThing) {
    console.log('new thing is: ', newThing)
    return service.post('/things/create', newThing)
      .then(res => res.data)
      .catch(errorHandler);
  }
}
