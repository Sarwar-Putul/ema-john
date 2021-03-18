import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    
}

export const handleGoogleSignIn =()=> {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
      .then((res)=> {
        const {displayName, email, photoURL} = res.user;
        const signedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          picture: photoURL
        }
        return signedInUser;
  })
      .catch(error => {
        console.log(error);
        console.logo(error.message);
      })
  }

  export const handleFbSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then((result) => {
    var token = result.credential.accessToken;
    var user = result.user;
    return user;
    console.log('fb user after sign in', user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage, errorCode)
  });
  }

  export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignIn: false,
          name: '',
          email: '',
          picture:'',
          success: false
      }
      return signOutUser;
    })
    .catch(error => {
      console.log(error)
    });
  }

// export const createUserWithEmailAndPassword = () => {
//         firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//             const newUserInfo = {...user};
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//             updateUserName(user.name);
//         })
//     .catch(error => {
//         const newUserInfo = {...user};
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo);
//         });
//   }
// export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//         const newUserInfo = {...user};
//         newUserInfo.error = '';
//         newUserInfo.success = true;
//         setUser(newUserInfo);
//         setLoggedInUser(newUserInfo);
//         history.replace(from);
//         console.log('sign in user info', res.user);
//         })
//     .catch(error => {
//         const newUserInfo = {...user};
//         newUserInfo.error = error.message;
//         newUserInfo.success = false;
//         setUser(newUserInfo);
//         });
// }

// const updateUserName = name => {
//     const user = firebase.auth().currentUser;
//     user.updateProfile({
//       displayName: name
//     }).then(function() {
//       console.log('User name updated successfully')
//     }).catch(function(error) {
//       console.log(error);
//     });
// }
