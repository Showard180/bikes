import axios from 'axios';

export default ({refresh, userId}) => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8080/user/auth', {headers: {token: refresh, bearer: userId}})
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
}
