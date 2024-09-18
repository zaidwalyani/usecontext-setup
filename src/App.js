import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useContext, useEffect } from 'react';
import { GlobalContext } from './context/Context';
import UserList from './components/UserList';
import axios from 'axios';

function App() {
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    axios.get(`${state?.baseUrl}/profile`, {
      withCredentials: true
    }).then((res) => {
      console.log(res);
      dispatch({type: "USER_LOGIN" , payload: res.data.user})
    }).catch((err) => {
      console.log(err)
    })
  },[])

  useEffect(() => {
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent

      config.withCredentials = true

      return config;
   }, function (error) {
      // Do something with request error
      return Promise.reject(error);
   });

   // Add a response interceptor
   axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
   }, function (error) {

      if (error.response.status === 401) {
         dispatch({
            type: 'USER_LOGOUT'
         });
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
   });
  }, [])
  
  return (
    <div className="container">
      {(state.isLogin == true) ?
        <Routes>
          <Route path='/userlist' element={<UserList />} />
          <Route path='*' element={<Navigate to={"/userlist"} />} />
        </Routes>
        :
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to={"/signup"} />} />
        </Routes>
      }
    </div>
  );
}

export default App;
