import axios from 'axios';
export const BaseURL = "http://localhost:9090";

const instance = axios.create({
  baseURL:BaseURL,
  withCredentials:true
})


export const get =(url,params)=>instance.get(url,{params})
export const post = (url, data) => {
  const config = data instanceof FormData
    ? {} 
    : { headers: { "Content-Type": "application/json" } };
  return instance.post(url, data, config);
};

export const put =(url,data)=>instance.put(url,data)
export const dele =(url)=>instance.delete(url)