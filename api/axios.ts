import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:3000',
});

// if (typeof window !== 'undefined') {
//   Axios.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${localStorage.getItem('accessToken')}`;
// }

Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default Axios;
