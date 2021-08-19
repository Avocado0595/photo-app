const { default: axiosClient } = require("./axiosClient");

const categoryApi = {
    getAll: async (params)=>{
        const url = '/category'
        const getCategories = await axiosClient.get(url, {params});
        if (getCategories.result)
            return getCategories.categories;
        return null;
    },
    postCategory: (data)=>{
        const url = '/category';
        axiosClient.post(url,data);
    },
    // updateCategory: (data)=>{
    //     const url = '/photo';
    //     axiosClient.post(url,data);
    // }
}

export default categoryApi;