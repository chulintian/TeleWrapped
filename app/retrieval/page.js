"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Background from "../components/retrieval/background";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Retrieval() {
  const router = useRouter(); 

  // get ingredients and chats, route aft retrieval -- to be tested
  useEffect(() => {
    Promise.all([
      fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionObj: sessionStorage.getItem("session") 
        }),
      })
        .then(res => res.json())
        .then(data => {
          sessionStorage.setItem("chats", JSON.stringify(data.chatInfo));
        }),
      fetch('/api/generate')
        .then(res => res.json())
        .then(data => {
          sessionStorage.setItem("ingredients", JSON.stringify(data.sets));
        })
    ])
    .then(() => {
      router.push("/menu");
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []);

  // log out once tab is closed -- to be tested
  useEffect(() => {
    const session = sessionStorage.getItem("session");
    if (!session) return;
  
    const handleLogout = () => {
      navigator.sendBeacon("/logout", session);
    };
  
    window.addEventListener("beforeunload", handleLogout);
    return () => window.removeEventListener("beforeunload", handleLogout);
  }, []);

  return (
    <div className="w-full h-screen pt-5 px-7 flex flex-col items-center">
      <div className="w-full flex flex-col items-center mb-6">
        <Image
          src="/logo2.png"
          alt="logo"
          width={200}
          height={100}
          className="w-4/5 sm:w-1/2 md:w-1/3"
        />
      </div>
      <Background/>
      <div className="w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <DotLottieReact
          src="https://lottie.host/a49b63a7-f781-41be-9551-8dd70b235390/HmR56rEqMx.lottie"
          loop
          autoplay
        />
      </div>
      <p className="text-center">Retrieving Chats from Telegram</p>
      <p className="text-xs italic mt-4 text-center">Note: Only the 10 most recent chats will be shown</p>
    </div>
  );
}
