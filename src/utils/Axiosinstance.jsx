import axios from "axios"

// const baseURL = "https://robolox.onrender.com";
const baseURL = "http://localhost:4000";    



const api = axios.create({
    baseURL : baseURL,
    withCredentials :true,       //sends cookie through headers 
})
 





export default api