import axios from 'axios';

export default axios.create({baseURL:'http://10.0.2.2:3000'||'http://172.17.240.1:3000' ||'http://localhost:3000'||'172.20.10.2:3000' });