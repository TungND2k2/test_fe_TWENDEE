import axios from "axios";

const customAxios = axios.create({
    baseURL: 'https://randomuser.me/',
    headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem("access-token"),
    }
})
export default customAxios;