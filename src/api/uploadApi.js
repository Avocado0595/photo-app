const { default: axiosClient } = require("./axiosClient");

const uploadApi = {
    getAll: async (params)=>{
        const url = 'test/file';
        const fileList = await axiosClient.get(url, {params});
        if (fileList.result)
            return fileList.fileList;
        return null;
    },
   
    postFile: async (data)=>{
        try{
            
            console.log('uploading...', data);
        const url = 'test/file';
        axiosClient.post(url,data,{
            headers: {'content-type':'multipart/form-data',}
        });
        }
        catch(err){
            console.log(err);
        }
    },
   
}

export default uploadApi;