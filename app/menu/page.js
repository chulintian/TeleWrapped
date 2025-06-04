"use client"

import Image from "next/image"
import Set from "../components/menu/set"
import { useEffect, useState } from "react";

export default function Menu() {
  const [chats, setChats] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  function getChatName(chatInfo, type) {
    if (type=="user") {
      return chatInfo.firstName ?? chatInfo.username;
    } else {
      return chatInfo.title;
    }
  }

  useEffect(() => {
    try {
      const storedChats = JSON.parse(sessionStorage.getItem("chats"));
      const storedIngredients = JSON.parse(sessionStorage.getItem("ingredients"));
      setChats(storedChats);
      setIngredients(storedIngredients);
    } catch (error) {
      console.error("Error parsing data from sessionStorage", error);
      setChats([]);
      setIngredients([]);
    }
  }, []);

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
        <p className="border-y-[2px] py-1 mt-3 font-bold ">
          Top 10 Hot Pot Set Menu
        </p>
      </div>
      <div className="flex flex-col h-[75%] md:flex-row gap-y-4 md:gap-x-2 overflow-y-auto">
        <div className="flex flex-col md:h-max gap-y-4 md:gap-y-2 md:w-1/2">
          {chats.slice(0,5).map((chat, index) => (
             <Set key={index} chatName={getChatName(chat.info, chat.type)} chatId={chat.id} chatType={chat.type} totalMessages={chat.info.topMessageId} ingredients={ingredients[index]} />
          ))}
        </div>
        <div className="flex flex-col md:h-max gap-y-4 md:gap-y-2 md:w-1/2">
          {chats.slice(5,10).map((chat, index) => (
            <Set key={index} chatName={getChatName(chat.info, chat.type)} chatId={chat.id} chatType={chat.type} totalMessages={chat.info.topMessageId} ingredients={ingredients[index+5]}/>
          ))}
        </div>
      </div>
    </div>
  )
}
