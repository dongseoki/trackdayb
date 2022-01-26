import axios from "axios";
import React, {useState, createContext, useEffect} from "react";
import axiosInstance from "../axiosConfig";

import {toast} from "react-toastify";
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [ curUser, setCurUser ] = useState();

    useEffect(()=>{
        
        const fetchCurUser = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if(curUser) {
                axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            }
            else if(accessToken){
                try{
                    const result = await axiosInstance.get("/member/currentUser");
                    console.log('result.data.memberInfo', result.data.memberInfo)
                    // setCurUser({memberInfo : result.data.memberInfo})
                    setCurUser({memberId : result.data.memberId})
                }catch(err) {
                    console.log('curUser_에러', err);
                    toast.error("현재 유저 정보 가져오기 에러.", {
                        autoClose : 3000
                    })
                }
            }
            else delete axios.defaults.headers.common.Authorization;
        }
        fetchCurUser();
  
    }, [curUser])
    return (
        <AuthContext.Provider value={[curUser, setCurUser]}>{children}</AuthContext.Provider>
    )
}
