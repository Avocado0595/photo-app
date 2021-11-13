
export default function(url){
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+/g;
   // let a = new RegExp(reg,url);
    return reg.test(url);
}