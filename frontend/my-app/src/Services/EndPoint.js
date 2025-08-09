import axios from 'axios';
export const BaseURL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL:BaseURL,
  withCredentials:true,
   timeout: 20000
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