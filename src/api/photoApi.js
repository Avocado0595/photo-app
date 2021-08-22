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
    postPhoto: (data)=>{
        const url = '/photo';
        axiosClient.post(url,data);
    },
    updatePhoto: (params, data)=>{
        const url = `/photo/${params}`;
        axiosClient.put(url,data);
    },
    deletePhoto:async(params)=>{
        const url = `/photo/${params}`;
        axiosClient.delete(url);
    }
}

export default photoApi;