import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import './Login.css'
import { useHistory, useLocation } from 'react-router';
import { handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    picture: '',
    error:'',
  });
  initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
  
    const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res =>{
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res =>{
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
  })
}

    const fbSignIn = () => {
      handleFbSignIn()
      .then(res =>{
        setUser(res);
        setLoggedInUser(res);
    })
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
        }

      if(!newUser && user.email && user.password){
        
        }
        e.preventDefault();
    };
  return (
    <div style= {{textAlign: 'center'}}>
      {
        user.isSignIn ? <button className="btn"onClick ={signOut}>Sign out</button> : <button className="btn" onClick ={googleSignIn}>Sign in</button>
      }
      <br/>
      <button className="btn" onClick ={fbSignIn}>Facebook login</button>
      {
        user.isSignIn && <div>
              <p>Welcome, {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Image: <img src={user.picture} alt=""/></p>
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
