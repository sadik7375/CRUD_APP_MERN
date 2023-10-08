import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {

    const [users,setUsers]=useState([]);

useEffect(()=>{

    axios.get('http://localhost:8000')
    .then(result=>setUsers(result.data)
                
    )
    .catch(err=>console.log(err))


},[])


const handleDelete=(id)=>{
   console.log(id);
    axios.delete(`http://localhost:8000/deleteUser/${id}`)
    .then(res=>{console.log(res)
       window.location.reload();
    
    })
    .catch(err=>console.log(err))



}


    return (
        <div >
            <div className=" bg-indigo-600 relative overflow-x-auto">
            
            
<table className='w-full text-sm text-left text-white dark:text-gray-200'  >
    <thead className='text-xs text-white uppercase ' >
  <tr >
    <th className='text-sm px-2 py-3'>Name</th>
    <th className='text-sm px-2 py-3'>Email</th>
    <th className='text-sm px-2 py-3'>Age</th>
    <th className='text-sm px-2 py-3'>Action</th>
  </tr>
  </thead>
  <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >



    {
        users.map((user) => (  
            // ( dont miss this parenthesis
            <tr  key={user.email} > 
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td><Link className='bg-green-300 text-black' to={`/update/${user._id}`}>Update</Link>
                <button className='bg-red-300  text-black'  onClick={(e)=>handleDelete(user._id)} >Delete</button></td>   

            </tr>
        ))
    }
           



  </tbody>
  

</table>
<Link className='bg-cyan-400 mt-8 flex justify-center items-center' to="/createuser">+Add user</Link>
</div>
        </div>
    );
};

export default Users;