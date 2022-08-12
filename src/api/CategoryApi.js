import axiosUtils from "../utils/axiosUtils";

class CategoryApi{
    getList(){
        return axiosUtils.get("/category/list")
    }
    postNewCategory(param){
        return axiosUtils.post("/category/_token/add",param)
    }
    putCategory(param){
        return axiosUtils.put("/category/_token/update", { id:param.id, name: param.name})
    }
    delete(id){
        return axiosUtils.delete(`/category/_token/delete?id=${id}`)
    }
}

export default new CategoryApi()