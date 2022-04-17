import React from "react";
import NavBar from "./NavBar";
import "../index.css";


const SignIn = () => {
  return (
    <div className="">
      <NavBar />
     



<div class="login-form">
  
    <h1 font size ="2" style={{color: "aliceblue"}}>Welcome back!</h1>
    <h1 style={{color:"white"}}>Sign In</h1>
    
    <div class="content">
      <div class="input-field">
        <input type="email"style={{color: "#e8e9ec;"}} placeholder="Email" autocomplete="nope"/>
      </div>
      <div class="input-field">
        <input type="password" style={{color: "#e8e9ec;"}} placeholder="Password" autocomplete="new-password"/>
      
      <a href={()=> true}  className="link">forgot your password</a>
    </div>
    <div class="action">
      <button style={{backgroundColor: "#F6BB42"}}>continue</button>
      
    </div>

      <a href={()=> false} className="link">don't have an account?</a>

    
    <div class="action">
      <button style={{backgroundColor:"#F6BB42"}}>Register</button>
      
    </div>
    
    
</div>
</div>
</div>


  );
};

export default SignIn;
