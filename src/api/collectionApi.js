const { default: axiosClient } = require("./axiosClient");

const collectionApi = {
    getAll: async (params)=>{
        const url = '/collection'
        const getCollections = await axiosClient.get(url, {params});
        if (getCollections.result)
            return getCollections.data;
        return null;
    },
    postCollection: (data)=>{
        const url = '/collection';
        axiosClient.post(url,data);
    },
    getUserCollection:async(userUid)=>{
        const url = `/collection/${userUid}`;
        const userCollection = await axiosClient.get(url);
        if (userCollection.result)
            return userCollection.data;
        return null;
    }
}

export default collectionApi;