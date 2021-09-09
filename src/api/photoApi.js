const { default: axiosClient } = require("./axiosClient");

const photoApi = {
    getAll: async (params)=>{
        const url = '/photo';
        const getPhotos = await axiosClient.get(url, {params});
        if (getPhotos.result)
            return getPhotos.photos;
        return null;
    },
    getByAuthor: async (params)=>{
        const url = `/photo/${params}`;
        const getPhotos = await axiosClient.get(url);
        if (getPhotos.result)
            return getPhotos.photos;
        return null;
    },
    postPhoto: async (data)=>{
        const url = '/photo';
        await axiosClient.post(url,data);
    },
    updatePhoto: async (params, data)=>{
        const url = `/photo/${params}`;
        await axiosClient.put(url,data);
    },
    deletePhoto: async(params)=>{
        const url = `/photo/${params}`;
        axiosClient.delete(url);
    },
    searchPhoto: async(params)=>{
        const url = `/photo/search/${params}`;
        const data = await axiosClient.get(url);
        if(data.result){
            return data.photos;
        }
        return null;
    }
}

export default photoApi;