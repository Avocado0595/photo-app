const { default: axiosClient } = require("./axiosClient");

const photoApi = {
    getAll: async (params)=>{
        const url = '/photo';
        const getPhotos = await axiosClient.get(url, {params});
        if (getPhotos.result)
            return getPhotos.data;
        return null;
    },
    getByAuthor: async (params)=>{
        const url = `/photo/${params}`;
        const getPhotos = await axiosClient.get(url);
        if (getPhotos.result)
            return getPhotos.data;
        return null;
    },
    postPhoto: async (data)=>{
        const url = '/photo';
        const postData = await axiosClient.post(url,data);
        if(!postData.result)
            console.log('post photo fail');
    },
    updatePhoto: async (params, data)=>{
        const url = `/photo/${params}`;
        const updatePhoto = await axiosClient.put(url,data);
        if(!updatePhoto.result)
            console.log('update photo fail');
    },
    deletePhoto: async(params)=>{
        const url = `/photo/${params}`;
        const deletePhoto = await axiosClient.delete(url);
        if(!deletePhoto.result)
            deletePhoto.log('delete photo fail');
    },
    searchPhoto: async(params)=>{
        const url = `/photo/search/${params}`;
        const data = await axiosClient.get(url);
        if(data.result){
            return data.data;
        }
        return null;
    },
    likePhoto: async (params, userUid)=>{
        const url = `/photo/like/${params}`;
        await axiosClient.put(url,userUid);
    },
    unLikePhoto: async (params, userUid)=>{
        const url = `/photo/unlike/${params}`;
        await axiosClient.put(url,userUid);
    },
}

export default photoApi;