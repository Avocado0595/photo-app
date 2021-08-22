const { default: axiosClient } = require("./axiosClient");

const authorApi = {
    getAll: async (params)=>{
        const url = '/user';
        const userList = await axiosClient.get(url, {params});
        if (userList.result)
            return userList.userList;
        return null;
    },
}

export default authorApi;