"use client";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function BackButton ({
    onClick,
    actionType,
}) {
  const router = useRouter();

  const handleClick = () => {
    if (actionType === "router") {
      router.push(onClick);
    } else if (typeof onClick === "function") {
      onClick();
    }
  };

  return (   
    <div 
      className="absolute top-7 left-7 rounded-full aspect-square w-10 h-10 border border-1-black flex items-center justify-center cursor-pointer" 
      onClick={handleClick}
    >
      <IoMdArrowBack />
    </div>  
  )
}