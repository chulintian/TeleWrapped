"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Prep from "../components/prep/loading_screen";

export default function PrepVideo() {
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setDuration(100);
  }, []);

  useEffect(() => {
    if (duration === 0) return; 

    const timeoutId = setTimeout(() => {
      setLoading(false);
      router.push("/pg3");
    }, duration * 1000);

    return () => clearTimeout(timeoutId);
  }, [duration, router]);


  return (
    <div className="w-full h-screen pt-5 px-7 flex flex-col items-center">
      <div className="w-full flex flex-col items-center mb-6">
        <Image
          src="/logo2.png"
          alt="logo"
          width={400}
          height={20}
          className="w-4/5 sm:w-1/2 md:w-1/3"
        />
      </div>
      <Prep/>
    </div>
  );
}
