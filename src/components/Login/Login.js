import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import './Login.css'
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });
    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
  
    const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res =>{
      handleResponse(res, true);
    })
  }

    const fbSignIn = () => {
      handleFbSignIn()
      .then(res =>{
        handleResponse(res, true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res =>{
      handleResponse(res, false);
  })
}

    const handleResponse = (res, redirect) => {
      setUser(res);
      setLoggedInUser(res);
      if(redirect){
        history.replace(from);
      }
    }

  const handleBlur = (e) => {
    let isFildValid = true;
    if (e.target.name === 'email') {
      isFildValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasValid =/\d{1}/.test(e.target.value);
      isFildValid = isPasswordValid && isPasswordHasValid;
    }

    if (isFildValid) {
      const newUserInfo ={...user}
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
    const handleSubmit = (e) => {
      if(newUser && user.email && user.password){
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
      }

      if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
          })
        }
        e.preventDefault();
    }


  return (
    <div className="container" style= {{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button className="btn" onClick ={signOut}> Sign out </button> : <button className="btn" onClick ={googleSignIn}> Sign in </button>
      }
      <br/>
      <button className="btn" onClick ={fbSignIn}>Facebook login</button>
      {
        user.isSignedIn && <div>
              <p>Welcome, {user.name}</p>
              <p>Email: {user.email}</p>
              <img src={user.photo} alt=""/>
        </div>
      }

      <h1> Authentication</h1>
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      
        <form onSubmit={handleSubmit}>
            {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Type name" required/>}
            <br/>
            <input type="text" onBlur={handleBlur} name="email"  placeholder="Type your email address" required/>
            <br/>
            <input type="password" onBlur={handleBlur} name="password" placeholder="Type your password" required/>
            <br/>
            <input className="btn" type="submit" value={ newUser ? 'Sign Up' : 'Sign In' }/>
        </form>
          <p style= {{color: 'red'}}>{user.error}</p>
          {
            user.success && <p style= {{color:'green'}}>User {newUser ? 'created' : 'Logged in'} successfully</p>
          }
    </div>
  );
}

export default Login;
