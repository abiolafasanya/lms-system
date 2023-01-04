import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.NEXTAUTH_URL || 'https://lms-next-typescript.vercel.app',
});

// if (typeof window !== 'undefined') {
//   Axios.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${localStorage.getItem('accessToken')}`;
// }

Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default Axios;
