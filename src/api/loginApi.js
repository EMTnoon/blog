import axiosUtils from "../utils/axiosUtils";

class LoginApi{
    post(param){
        return axiosUtils.post('/admin/login',param)
    }
}

export default new LoginApi()