import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/Firebase.init";
import toast from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(user);

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    setLoading(true);
    toast.error("User logged Out")
    return signOut(auth);

  }

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);

  }
  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData)
  }
  const authInfo = {
    user,
    setUser,
    createNewUser,
    logOut,
    userLogin,
    loading,
    updateUserProfile
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios.post('http://localhost:5000/jwt', user, {withCredentials:true})
          .then(res => {
            console.log('login', res.data);
            setLoading(false);
          })
      }
      else {
        axios.post('http://localhost:5000/logout', {}, {
          withCredentials : true
        })
          .then(res => {
            console.log('logout', res.data);
            setLoading(false);
        }
        )
      }

    });
    return () => {
      unSubscribe();
    }
  }, [])
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;