import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/Context'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {
    let {state , dispatch} = useContext(GlobalContext)
    
    
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    const getDat = (e) => {
        e.preventDefault()
        axios.post(`${state?.baseUrl}/login` , {
            "email" : email,
            "password": password,
        }).then((res) => {
            dispatch({type: "USER_LOGIN" , payload: res.data.user})
            console.log(res)
            setEmail("")
            setPassword("")
            Swal.fire({
                icon: "success",
                text: res?.data?.message,
            });
        }).catch((err) => {
            console.log(err)
            Swal.fire({
                icon: "error",
                text: err?.response?.data?.message,
            });
        })
    }

  return (
    <form onSubmit={getDat}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input onChange={(e) => {setEmail(e.target.value)}} value={email} type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={(e) => {setPassword(e.target.value)}} value={password} type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Login