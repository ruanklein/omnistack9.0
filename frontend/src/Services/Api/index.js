import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL, 
      port    = process.env.REACT_APP_PORT;

export default axios.create({
    baseURL: `${baseUrl}:${port}`
});
