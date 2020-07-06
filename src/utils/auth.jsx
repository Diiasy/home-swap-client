import Axios from "axios";
import qs from "qs";

const axios = Axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

export const signup = (user)=>{
    return axios({
        method: "POST",
        url: "/user/signup",
        data: qs.stringify(user)
    })
    .catch(err => console.log(err));
}

export const setUser = (user)=> {
    window.localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = (user)=> {
    return JSON.parse(window.localStorage.getItem("user"));
}

export const login = (user)=>{
    return axios({
        method: "POST",
        url: "/user/login",
        data: qs.stringify(user)
    })
    .then((response)=> {        
        setUser(response.data);
    })
}

export const logout = ()=>{
    return axios.get("/user/logout")
    .then(()=> {        
        removeUser();
    })
}

export const removeUser = (user)=> {
    window.localStorage.removeItem("user");
}

export const userIsLoggedIn = (user)=> {
    let isLoggedIn;
    (window.localStorage.getItem("user")) ? isLoggedIn = true : isLoggedIn = false;
    return isLoggedIn;
}