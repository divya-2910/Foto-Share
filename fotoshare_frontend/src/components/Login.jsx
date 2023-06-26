import React from 'react'
import {GoogleOAuthProvider} from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import {client} from '../client';

const Login =() =>{
    const navigate = useNavigate();
    function handleCallbackResponse(response){
      console.log("Encoded JWT ID Token: " + response.credential);
      var userObj = jwt_decode(response.credential);
      console.log(userObj);
      const name = userObj.name;
      const googleId = userObj.sub;
      const imageURL = userObj.picture;
      const prof = {
        name: userObj.name,
        googleId: userObj.sub,
        imageURL: userObj.picture,
      }
      localStorage.setItem('user', JSON.stringify(prof));
      const doc = {
        _id : googleId,
        _type: 'user',
        userName: name,
        image: imageURL,
      }
      client.createIfNotExists(doc)
        .then(() => {
          navigate('/', {replace: true})
        })
      
      // const {name, googleId, imageURL} = {userObj.name, userObj.sub, userObj.picture};
    }


    useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
        client_id: "1030154317894-ujkkpdkmj3hiu811ctiers55thkqgte3.apps.googleusercontent.com",
        // // client_id: process.env.REACT_PUBLIC_GOOGLE_API_TOKEN,
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