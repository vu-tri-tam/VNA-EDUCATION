import axios from "axios";
import Cookies from "js-cookie";
import { decodeToken } from "../auth/AuthFun";

const tokenfake = Cookies.get("_token")

const getToken = (tokenfake) => {
    if (tokenfake !== undefined) {
        let token = decodeToken(tokenfake)
        return token
    }
    return null
}

const axiosConfig = axios.create({
    baseURL: "https://vna-education-back-end.herokuapp.com",
    headers: { 'Authorization': getToken(tokenfake) }
})


axiosConfig.interceptors.response.use(function (response) {
    console.log(response, '565656');
    return response;
}, function (error) {
    if (error.response !== undefined && error.response.status === 403) {
        Cookies.remove('_token')
        window.location.href = "/"
    }
});

export default axiosConfig