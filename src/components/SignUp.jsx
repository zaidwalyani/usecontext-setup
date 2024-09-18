import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { GlobalContext } from '../context/Context';

const SignUp = () => {
    let {state , dispatch} = useContext(GlobalContext)

    const navigate = useNavigate();

    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [email , setEmail] = useState("")
    const [number , setNumber] = useState("")
    const [password , setPassword] = useState("");

    const postData = (e) => {
        e.preventDefault()
        axios.post(`${state?.baseUrl}/register` , {
            "email" : email,
            "phone": number,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "address": "plot#275 sector 11½, Orangi Town, Karachi",
            "profile": "https://tinyurl.com/5n6pxa5f",
            "dob": "2024-01-05",
            "bio": "MERN Stack Developer"
        }).then((res) => {
            setFirstName("")
            setLastName("")
            setEmail("")
            setNumber("")
            setPassword("")
            console.log(res)
            Swal.fire({
                icon: "success",
                title: "Created",
                text: res.data?.message,
            });
            navigate("/login");
        }).catch((err) => {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.message,
            });
        })
    }
  return (
    <div className="row justify-content-center">
        <div className="col-lg-8">
            <form onSubmit={postData}>
                <div className="mb-3">
                    <label htmlFor="fname" className="form-label">First Name</label>
                    <input value={firstName} onChange={(e) => {setFirstName(e.target.value)}} type="text" className="form-control" id="fname" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lname" className="form-label">Last Name</label>
                    <input value={lastName} onChange={(e) => {setLastName(e.target.value)}} type="text" className="form-control" id="lname" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="number" className="form-label">Number</label>
                    <input value={number} onChange={(e) => {setNumber(e.target.value)}} type="number" className="form-control" id="number" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp