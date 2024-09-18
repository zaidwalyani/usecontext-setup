import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Context'

const UserList = () => {
    const [data , setData] = useState([])
    let {state , dispatch} = useContext(GlobalContext)

    useEffect(() => {
        axios.get(`${state.baseUrl}/all-users`, {withCredentials: true}).then((res) => {
            console.log(res.data)
            setData(res.data.users)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

  return (
    <div>
        {data.map((user , i) => {
            return(
                <div key={i} style={{padding: 20, margin: 10, border:"1px solid black"}}>
                    <h6>{user.first_name}</h6>
                    <h6>{user.last_name}</h6>
                    <h6>{user.email}</h6>
                    <h6>{user.phone_number}</h6>
                </div>
            )
        })}
    </div>
  )
}

export default UserList