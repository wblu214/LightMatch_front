import axios, {AxiosInstance} from "axios";


const isDev = process.env.NODE_ENV === 'development';

const myAxios: AxiosInstance = axios.create({
    baseURL: isDev ?  '/api/proxy' : '/api/proxy',
});

myAxios.defaults.withCredentials = true; // 配置为true

export default myAxios;