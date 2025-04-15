"use client"

import Image from "next/image"
import Set from "../components/menu/set"
import { useEffect, useState } from "react";

export default function Menu() {
  const [chats, setChats] = useState(["", "", "","","","","","","",""]); //for telegram chats
  const [ingredients, setIngredients] = useState([]);

  function getIngredients() {
    fetch('/api/generate')
      .then(response => response.json())
      .then(data => {
        console.log(data.sets);
        setIngredients(data.sets);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getIngredients();
  }, [])
  

  return (
    <div className="h-dvh w-full py-5 px-7 overflow-y">
      <div className="w-full mb-4">
        <Image
            src="/logo2.png"
            alt="logo"
            width={200}
            height={100}
            className="justify-self-center w-4/5 sm:w-1/2 md:w-1/3"
        />
        <p className="border-y-[2px] py-1 mt-3 font-bold text-sm">
          Top 10 Hot Pot Set Menu
        </p>
      </div>
      <div className="flex flex-col h-[75%] md:flex-row gap-y-4 md:gap-x-2 border-2 border-black">
        <div className="flex flex-col h-max gap-y-4 md:gap-y-2 md:w-1/2">
          {chats.slice(0,5).map((chat, index) => (
             <Set key={index} ingredients={ingredients[index]} />
          ))}
        </div>
        <div className="flex flex-col h-max gap-y-4 md:gap-y-2 md:w-1/2">
          {chats.slice(4,9).map((chat, index) => (
            <Set key={index} ingredients={ingredients[index+5]}/>
          ))}
        </div>
      </div>
    </div>
  )
}