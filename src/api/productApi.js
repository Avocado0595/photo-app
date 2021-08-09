const { default: axiosClient } = require("./axiosClient");

const productApi = {
    getAll: (params)=>{
        const url = '/products';
        return axiosClient.get(url, {params});
    }
}

export default productApi;