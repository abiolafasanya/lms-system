import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

// if (typeof window !== 'undefined') {
//   Axios.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${localStorage.getItem('accessToken')}`;
// || 'https://lms-next-typescript.vercel.app
// }

Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default Axios;
