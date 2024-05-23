import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://45.140.19.41:3000',

});

export default instance