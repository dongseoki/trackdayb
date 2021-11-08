import axios from "axios";
import React, {useState, createContext, useEffect} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [ curUser, setCurUser ] = useState();
    
    useEffect(()=>{
        const token = sessionStorage.getItem('jwt-token');
        if(curUser) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
        // else if(token){
        //     result = axios.get('/member/curUser')
        //     setCurUser(result)
        // }
        else delete axios.defaults.headers.common.Authorization
    }, [curUser])
    return (
        <AuthContext.Provider value={[curUser, setCurUser]}>{children}</AuthContext.Provider>
    )
}


// sessionStorage.setItem('jwt-token', token);