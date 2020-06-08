import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-burger-4ced8.firebaseio.com/"
})

export default instance;