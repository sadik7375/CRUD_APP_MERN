import {React,useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateUsers = () => {
    const {id}=useParams();
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [age,setAge]=useState();
    const Navigate=useNavigate();


    useEffect(()=>{

        axios.get('http://localhost:8000/getUser/'+id)
        .then(result=>{ console.log(result)
            setName(result.data.name)
            setEmail(result.data.email)
            setAge(result.data.age)


        }
                    
        )
        .catch(err=>console.log(err))
    
    
    },[])

    const Update=(e)=>{
        e.preventDefault(); //prevent default browser refresh
        axios.put("http://localhost:8000/updateuser/" + id, { name, email, age })

        .then(result=>{console.log(result)
            Navigate ('/');
        
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className="flex justify-center items-center h-screen bg-indigo-600">
              <h2 className="text-3xl block text-center font-semibold px-5 uppercase">Update user</h2>
               <form onSubmit={Update}>
                <label htmlFor="">Name</label>
                <input className="block text-base mb-2" type="text" placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)}  />
                <label htmlFor="">Email</label>
                <input className="block text-base mb-2" type="text" placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <label htmlFor="">Age</label>
                <input className="block text-base mb-2" type="text" placeholder='Enter your age'  value={age} onChange={(e)=>setAge(e.target.value)} />
                <button className="border-2 border-indigo-900 bg-indigo-900 shadow-md text-white py-1 w-full rounded-md hover:bg-white hover:text-indigo-700 font-semibold  " type='submit'>update</button>
                
        


            </form>
        </div>
    );
};

export default UpdateUsers;