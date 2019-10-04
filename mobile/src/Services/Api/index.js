import axios from 'axios';

import env from '../../../env.json';

export default axios.create({
    baseURL: `${env.host}:${env.port}`
});
