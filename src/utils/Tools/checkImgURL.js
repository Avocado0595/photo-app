import axios from "axios";
import checkValidURL from "./checkValidURL";
const checkImgURL = async (url)=>{
    if(checkValidURL(url)){
        try{
        const data = await axios.get(url);
        return data.headers["content-type"].includes("image");
        }
        catch{
            return false;
        }
       
    }
    return false;
}

export default checkImgURL;