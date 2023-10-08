import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; //third party hook

const CreateUsers = () => {

    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [age,setAge]=useState();
    const Navigate=useNavigate();

    const submit=(e)=>{

        e.preventDefault(); //prevent default browser refresh
        axios.post("http://localhost:8000/createuser",{name,email,age})
        .then(result=>{console.log(result)
            Navigate ('/');
        
        })
        .catch(err=>console.log(err))
        setName("");



    }

    return (
        <div className="flex justify-center items-center h-screen bg-indigo-600">
            <h2 className="text-3xl block text-center font-semibold px-5">Add user</h2>
               <form onSubmit={submit}>
                <label htmlFor="">Name</label>
                <input className="block text-base mb-2" type="text" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} />
                <label htmlFor="">Email</label>
                <input className="block text-base mb-2" type="text" placeholder='Enter your name'  onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="">Age</label>
                <input className="block text-base mb-2" type="text" placeholder='Enter your name' onChange={(e)=>setAge(e.target.value)} />
                <button className="border-2 border-indigo-900 bg-indigo-900 shadow-md text-white py-1 w-full rounded-md hover:bg-white hover:text-indigo-700 font-semibold  " type='submit'>Submit</button>
                
        


            </form>
        </div>
    );
};

export default CreateUsers;