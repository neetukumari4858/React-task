import React from 'react'
import { UserDetail } from '../context/UserContext';

const AdminDashbord=()=> {
  const { data} = UserDetail();
  console.log(data,"data");

  return (
    <>
{
  data.map((item)=>{
    return (
      <div>
        <p>{item.email}</p>
      </div>
    )
  })
}
    </>
  )
}

export default AdminDashbord