const { default: axiosClient } = require("./axiosClient");

const userApi = {
    getAll: async (params)=>{
        const url = '/user';
        const userList = await axiosClient.get(url, {params});
        if (userList.result)
            return userList.userList;
        return null;
    },
    getOne: async(params)=>{
        const url = `/user/${params}`;
        const user = await axiosClient.get(url);
        if(user.result)
            return user.user;
        return null;
    },
    postUser: async (data)=>{
        const url = '/user';
        axiosClient.post(url,data);
    },
    updateUser: async (uid,data)=>{
        const url = `/user/${uid}`;
        const up = await axiosClient.put(url,data);
        console.log(up);
    },
   
}

export default userApi;