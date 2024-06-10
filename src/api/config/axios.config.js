import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    headers: {
        user_id: localStorage.getItem('user_id'),
        role_id: localStorage.getItem('role_id'),
    },

});

export default instance