import axios from 'axios';

let API_URI;
const apiURL = 'https://api/';
if (process.env.NODE_ENV === 'production') {
  API_URI = process.env.API_ENDPOINT || apiURL;
} else {
  API_URI = apiURL;
}

const Axios = axios.create({
  baseURL: API_URI,
});


export default Axios;