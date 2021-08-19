import userApi from 'api/userApi';
const createUser = async (user)=>{
    const isExist = await userApi.getOne(user.userId);
    if(!isExist){
        await userApi.postUser(user);
    }
}

export default createUser;