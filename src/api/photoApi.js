const { default: axiosClient } = require("./axiosClient");

const photoApi = {
    getAll: (params)=>{
        const url = '/photo';
        return axiosClient.get(url, {params});
    }
}

export default photoApi;