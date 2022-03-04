import axios from "axios";
import { store } from './store/store';

const axiosInstance = axios.create({
  // timeout: 1000, // 세션만료 시간
  headers: {
    "Content-Type": "application/json",
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
   const accessToken = localStorage.getItem('accessToken');
   
   if(accessToken){
      config.headers.Authorization = `test1 ${accessToken}`;
      console.log('axios instance request', accessToken)
   }else{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = '/login'
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

let isRefreshing = false; // 발행중 flag
let failedQueue = []; // 할 일 리스트

// 저장해둔 할 일 수행
const processQueue = (error, token=null) => {
  failedQueue.forEach(prom => {
    if(error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })
  failedQueue = [];
}

axiosInstance.interceptors.response.use(
  (config) => {
      /* 요청을 보낸 뒤에 response(응답)이 오는 경우에 여기서 먼저 확인이 가능하다.
    * 활용 *
    1. status-code가 정상적이어도 내용상의 이유로 에러처리가 필요한 경우
    2. 민감정보 또는 데이터에 대한 가공 작업
    **/
    return config;
  },
  (err) => {
    const originalRequest = err.config;

    if(err.response.status === 401 && !originalRequest._retry){
      
      if(isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject})
        }).then(token => {
          originalRequest.headers['Authorization'] = `test2 ` + token;
          return axios(originalRequest);
        }).catch(err => {
          return err
        })
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      const tokenData = {
        accessToken : "sdfsdf",
        refreshToken,
      };

      return new Promise(function(resolve, reject) {
        axios.post('/member/reissue', tokenData)
        .then(({data}) => {
          localStorage.setItem('accessToken', data.tokenInfo.accessToken);
          originalRequest.headers.Authorization = `test3 ${data.tokenInfo.accessToken}`;
          resolve(axios(originalRequest))
          processQueue(null, data.tokenInfo.accessToken);
        })
        .catch((err) => {
          processQueue(err, null);
          reject(err);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = '/login'
        })
        .then(() => { isRefreshing = false })
      })
    }
    return Promise.reject(err);
  }
);
export default axiosInstance;