"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Background from "../components/retrieval/background";
import LoadingBar from "../components/common/loadingBar";

export default function Retrieval() {
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setDuration(5);
  }, []);

  useEffect(() => {
    if (duration === 0) return; 

    const timeoutId = setTimeout(() => {
      setLoading(false);
      router.push("/menu");
    }, duration * 1000);

    return () => clearTimeout(timeoutId);
  }, [duration, router]);

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
      <div className="flex flex-col items-center my-18">
        <p>Retrieving Chats from Telegram</p>
        <p className="text-xs italic mt-4">Note: Only the 10 most recent chats will be shown</p>
      </div>
      <div className="relative w-full flex justify-center">
        {loading && <LoadingBar duration={duration} />}
      </div>
    </div>
  );
}
