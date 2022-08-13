import axiosUtils from '../utils/axiosUtils'

class blogApi {
    getList (pageInfo) {
        return axiosUtils.get(
            `/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`
        )
    }
    getBlogTime () {
        return axiosUtils.get(`/blog/createtime`)
    }
    getTime (searchTime) {
        return axiosUtils.get(`/blog/bloglist?searchTime=${searchTime}`)
    }
    getlistCount () {
        return axiosUtils.get(`/blog/search/blogCount`)
    }
    getListID (id) {
        return axiosUtils.get('/blog/detail?id=' + id)
    }
    post (param) {
        return axiosUtils.post('/blog/_token/add', param)
    }
    putBlog (param) {
        return axiosUtils.put('/blog/_token/update', param)
    }
    delete (id) {
        return axiosUtils.delete('/blog/_token/delete?id=' + id)
    }
}

export default new blogApi()
