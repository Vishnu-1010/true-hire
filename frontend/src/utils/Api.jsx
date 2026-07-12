import axios from "axios";
import {useNavigate} from "react-router-dom"
const api = axios.create({
  baseURL: import.meta.env.BackEndUrl,
  withCredentials: true,
});

// interceptors used to process the request
// request interceptor
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
console.log(config);
  return config;
},
(error)=>{
console.log(error);
return await Promise.reject(error);
}
);


//responce interceptor
api.interceptors.response.use((response)=>{
  if(response)
  {
    return response;
  }
},
(error)=>{
if(error.response && error.response.status == 401){
  console.log(error.response);
  const navigate = useNavigate();
  navigate("/login");
}
return await Promise.reject(error);
}

)



export default api;
