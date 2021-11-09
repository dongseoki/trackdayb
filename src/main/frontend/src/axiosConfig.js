import Axios from "axios";
import { Router } from "react-router";

const token = sessionStorage.getItem('jwt-token');



const axiosInstance = Axios.create({
  // timeout: 1000, // 세션만료 시간
  headers: {
    "Content-Type": "application/json",
    "Authorization" : token ? "Bearer "+token : null,
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
      /* config에는 위의 axiosInstance 객체를 이용하여 request를 보냈을떄의 모든
    설정값들이 들어있다.
    * 활용 *
    1. api요청의 경우 token이 필요한 경우가 있는데, 필요에 따른 토큰 정보들을 여기서 처리할 경우
    토큰에 대한 정보를 여러곳에서 처리하지 않아도 된다.
    2. 요청 method에 따른 외부로 드러내지 않고 처리하고 싶은 부분에 대한 작업이 가능.
    **/
    if (!config.headers.Authorization) {
      console.log('auth null')
      // window.location.href = "/login"
      // alert('세션 연결이 종료 되었습니다.')

        // const token = sessionStorage.getItem('jwt-token');
        // if (token && token.length > 0) {
        // //   let decodedToken = jwt_decode(token);
        // //   const tmstamp = parseInt(Date.now() / 1000);
        // //   if (tmstamp <= decodedToken.exp && decodedToken.user && decoded.user.id) {
        // //     config.headers.Authorization = token;
        // //   } else {
        // //     alert('세션 연결이 종료되었습니다.');
        // //   }
        // config.headers.Authorization = token;

        // }
      }else{
        // alert('세션 연결이 종료되었습니다.');
        // window.location = "/login"
    } 
    return config;
  },
  (err) => {
      /**
    request 요청을 보낼때 error가 발생하는 경우 여기서 catch가 가능하다.
    */
    return Promise.reject(err);
  }
);
axiosInstance.interceptors.response.use(
  (config) => {
    console.log("config", config)
      /* 요청을 보낸 뒤에 response(응답)이 오는 경우에 여기서 먼저 확인이 가능하다.
    * 활용 *
    1. status-code가 정상적이어도 내용상의 이유로 에러처리가 필요한 경우
    2. 민감정보 또는 데이터에 대한 가공 작업
    **/
    return config;
  },
  (err) => {
    console.log("Err", err)
    if(err.response.status === 401){
      console.log("401에러발생")
      // store.dispatch('logout');
      // Router.push('/login')
      // window.location.href = "/login"
      // alert("로그인 하세요")
      // ReturnLogin()
      // let myhistory = useHistoryTest()
      // myhistory.push('/login')
      // window.location.href = "/login"

    }

    // alert('세션 연결이 종료 되었습니다.')
      /**
    response응답 후에 status-code가 4xx, 5xx 처럼 에러를 나타내는 경우 해당 루트를 수행한다.
    */
    return Promise.reject(err);
  }
);
export default axiosInstance;