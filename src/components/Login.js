
import React,{ useState } from 'react';
import "../styles/Astyle.css";
import { Link } from 'react-router-dom';
import phfnpgfb from "./phfnpgfb.png";
function Login({ setUser }) {
  
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const handleSubmit= async(e)=>{
    e.preventDefault();
    
    try{
      const users={
        
        email,
        password,
        appType:"bookingportals",
      };
      const response = await fetch ("https://academics.newtonschool.co/api/v1/bookingportals/login",{
        method:'POST',
        headers:{
        projectID :"98a26mr3rzw8",
     "content-Type":"application/json",
        },
        body:JSON.stringify({...users})
      });
      const newData = await response.json();
      console.log("newData",newData);
      const {token="", data: { name = "" }} = newData;
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", name);
      console.log("User Name",name);
      setUser(name);
      alert("login done")
    }catch(error){
      alert(error);
    }}
    const handleUserEmail = (e) => {
      setEmail(e.target.value);
    };
  
    const handleUserPassword = (e) => {
      setPassword(e.target.value);
    };
  return (


    <div className='containerform'>
    <div class="creative-section"><img src={phfnpgfb}  className='imageoflogin'/></div>
    <div>
    <div className='signuplog'><p>New user,create an account .</p><p><Link className='policy' to="/Signup"> Login</Link></p></div>
    <h1>Log in to ixigo</h1>
    <form className='userForm' onSubmit= {handleSubmit}>
    
    
    <label className='namelabel'>Email : </label>
    <input className='namelabel1l' type='email'  value={email} onChange={handleUserEmail} /><br/>
    <label className='namelabel'>Password:</label>
    <input className='namelabell'  type='password'  value={password} onChange={handleUserPassword}/><br/>
    <button type='submit' className='btnsignup'>Login</button>
    <div className='privacy'>
    <p>By logging in,I understand & agree to ixigo <a className='policy' href='https://www.ixigo.com/about/terms-of-use/'>terms of use</a> and <a className='policy' href='https://www.ixigo.com/about/privacy/'>privacy policy</a></p>
    <p>This site is projected by reCAPTCHA and the Google <a className='policy' href='https://www.ixigo.com/about/privacy/'>Privacy Policy</a> and <a className='policy' href='https://www.ixigo.com/about/terms-of-use/'>Terms of Service</a></p>
    </div>
    
    </form>
    </div>
    </div>
  
  )
}

export default Login;
