"use client";
import { login, logout, selectUser } from "@feature/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReduxProvider from "@components/ReduxProvider";

import { auth } from "@firebase/config";

import Login from "@app/admin/login/page";
import { redirect } from "next/navigation";
import { Spinner } from "flowbite-react";

function AuthApp() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    const unsuscribe = auth.onAuthStateChanged((userAuth) => {
      console.log(userAuth);
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            userEmail: userAuth.email,
          })
        );
        setisLoading(false);
      } else {
        dispatch(logout());
        setisLoading(false);
      }
    });
    return unsuscribe;
  }, [dispatch]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div>{user ? redirect("/admin") : <Login />})</div>
  );
}

// Wrap the component with ReduxProvider only for this auth page
export default function App() {
  return (
    <ReduxProvider>
      <AuthApp />
    </ReduxProvider>
  );
}
