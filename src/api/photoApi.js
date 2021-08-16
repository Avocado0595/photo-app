const { default: axiosClient } = require("./axiosClient");

const photoApi = {
    getAll: async (params)=>{
        const url = '/photo';
        const getPhotos = await axiosClient.get(url, {params});
        if (!getPhotos.err)
            return getPhotos;
        return null;
    },
    postPhoto: (data)=>{
        const url = '/photo';
        axiosClient.post(url,data);
    }
}

export default photoApi;