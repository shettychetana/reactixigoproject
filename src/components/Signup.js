import React,{useState} from 'react';
import { URL,APP_TYPE,PROJECT_ID } from './Constants';
import "../styles/Astyle.css";
import { Link } from 'react-router-dom';
import phfnpgfb from "./phfnpgfb.png";

const Signup=()=> {
  const [name,setName]= useState('');
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
   const handleSubmit= async(e)=>{
    e.preventDefault();
    console.log(name,email,password);
    try{
      const users={
        name,
        email,
        password,
        appType:APP_TYPE,
      };
      const response = await fetch ("https://academics.newtonschool.co/api/v1/bookingportals/signup",{
        method:'POST',
        headers:{
        projectID :"98a26mr3rzw8",
     "content-Type":"application/json",
        },
        body:JSON.stringify({...users})
      });
      if(!response.ok) {
        alert("Something went wrong!");
        return;
    }else{
        console.log(response.token)
    alert("signup done");
    }
    setIsUserCreated(true);
    }catch(error){

    }
   }
   const handleUserName=(e)=>{
    setName(e.target.value);
   }
   const handleUserEmail=(e)=>{
    setEmail(e.target.value);
   }
   const handleUserPassword=(e)=>{
    setPassword(e.target.value);
   }
  return (
    <div className='containerform'>
    <div class="creative-section"><img src={phfnpgfb}  className='imageoflogin'/></div>
    <div>
    <div className='signuplog'><p>Already have an account?, </p><p><Link className='policy' to="/login"> Login</Link></p></div>
    <h1>Create your account</h1>
    <form className='userForm' onSubmit= {handleSubmit}>
    
    <label  className='namelabel'>Name :</label>
    <input className='namelabel1l' type='text'  value={name} onChange={handleUserName}/><br/>
    <label className='namelabel'>Email : </label>
    <input className='namelabel1l' type='email'  value={email} onChange={handleUserEmail} /><br/>
    <label className='namelabel'>password:</label>
    <input className='namelabell'  type='password'  value={password} onChange={handleUserPassword}/><br/>
    <button type='submit' className='btnsignup'>Register</button>
    
    </form>
    </div>
    </div>
  )
}

export default Signup;