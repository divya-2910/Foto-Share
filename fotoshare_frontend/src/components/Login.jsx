import React from 'react'
import {GoogleOAuthProvider} from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";

const Login =() =>{
    function handleCallbackResponse(response){
      console.log("Encoded JWT ID Token: " + response.credential);
      var userObj = jwt_decode(response.credential);
      console.log(userObj);
    }
    useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
        client_id: "1030154317894-ujkkpdkmj3hiu811ctiers55thkqgte3.apps.googleusercontent.com",
        // client_id: {process.env.REACT_PUBLIC_GOOGLE_API_TOKEN},
        callback: handleCallbackResponse,
        cookiePolicy: "single_host_origin"
      });

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: "outline", size: "large"}
      );

    }, []);
    return (
      <div className='Login'>
        <div id='signInDiv'>

        </div>
      </div>
    )
}

// const Login = () => {
//   return (
//     // <GoogleOAuthProvider clientId = {`${process.env.REACT_PUBLIC_GOOGLE_API_TOKEN}`}>
//     //   <div>Login</div>
//     // </GoogleOAuthProvider>
    
//   )
// }

export default Login