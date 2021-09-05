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
    getUserCollection:async(userUid)=>{
        const url = `/category/${userUid}`;
        const userCollection = await axiosClient.get(url);
        if (userCollection.result)
            return userCollection.collection;
        return null;
    }
    // updateCategory: (data)=>{
    //     const url = '/photo';
    //     axiosClient.post(url,data);
    // }
}

export default categoryApi;