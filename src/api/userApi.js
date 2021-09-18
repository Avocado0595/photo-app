const { default: axiosClient } = require("./axiosClient");

const userApi = {
    getAll: async (params)=>{
        const url = '/user';
        const userList = await axiosClient.get(url, {params});
        if (userList.result)
            return userList.data;
        return null;
    },
    getOne: async(params)=>{
        const url = `/user/${params}`;
        const user = await axiosClient.get(url);
        if(user.result)
            return user.data;
        return null;
    },
    postUser: async (data)=>{
        const url = '/user';
        const postUser = axiosClient.post(url,data);
        if(!postUser.result)
            console.log('fail to add new user');
    },
    updateUser: async (uid,data)=>{
        const url = `/user/${uid}`;
        const updatedUser = await axiosClient.put(url,data);
        if(!updatedUser.result){
            console.log('fail to add new user');
            return null;
            }
        return updatedUser.data;
    },
}

export default userApi;