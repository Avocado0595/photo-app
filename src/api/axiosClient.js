import axios from 'axios';
import queryString from 'query-string';
import firebase, {auth}  from '../firebase/Firebase';
const getFirebaseToken = async()=>{
    const currentUser = firebase.auth().currentUser;
    if(currentUser)
        return currentUser.getIdToken();

    const hasFirebaseToken = localStorage.getItem('firebaseToken');
    if (!hasFirebaseToken) return null;

    return new Promise((resolve, reject)=>{
        const waitTimer = setTimeout(()=>{
            reject(null);
        }, 3000);

        const unregister = auth.onAuthStateChanged(
            async (user) => {
                if (!user) {
                    reject(null);
                }
                const token = await user.getIdToken();
                resolve(token);
                unregister();
                clearTimeout(waitTimer);
            }
          )
    })
    
}

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'content-type':'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config)=>{
    const token = await getFirebaseToken();
    if(token)
        config.headers.Authorization = `Bearer ${token}`;
    
    return config;
})

axiosClient.interceptors.response.use((response)=>{
    if (response && response.data){
        return response.data;
    }
    return response;
},
(error)=>{
    throw error;
})

export default axiosClient;