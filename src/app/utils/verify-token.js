import axios from 'axios';

export default ({userId, access}) => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8080/user/verify', {headers: {bearer: userId, auth: access}})
      .then(res => {
        resolve();
      })
      .catch(err => {
        reject(err)
      })
  });
}
