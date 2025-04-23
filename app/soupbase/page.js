"use client";

import Image from "next/image";
import Soup from "../components/soupbase/soup";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import BackButton from "../components/common/backButton";

export default function Soupbase() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatId');
  const session = sessionStorage.getItem("session");

  const router = useRouter();

  const soupbases = [
    {
      name: "Herbal Mushroom Soup Base",
      time: "~ 30 sec",
      messages: "3000",
      image: "mushroomSoup",
    },
    {
      name: "Tomato Soup Base",
      time: "~ 60 sec",
      messages: "5000",
      image: "tomatoSoup",
    },
    {
      name: "Mala Milk Soup Base",
      time: "~ 90 sec",
      messages: "7000",
      image: "malaSoup",
    },
  ];

  const handleSoupClick = async (soupbase) => {
    router.push("/prep");
  
    try {
      const response = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionObj: session,
          chatId,
          numOfMessages: parseInt(soupbase.messages),
        }),
      });
  
      const result = await response.json();
      console.log("Fetched messages:", result);
  
      sessionStorage.setItem("results", JSON.stringify(result));
  
      router.push("/results");
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div>
      <div className="w-full py-5 px-7 flex flex-col items-center">
        <div className="w-full flex flex-col items-center mb-6">
          <Image
            src="/logo2.png"
            alt="logo"
            width={200}
            height={100}
            className="w-4/5 sm:w-1/2 md:w-1/3"
          />
          <p className="py-1 mt-8 text-center text-sm">
            Select the number of chat messages to be used for analysis
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {soupbases.map((soupbase, index) => (
            <Soup key={index} soupbase={soupbase} handleClick={handleSoupClick}/>
          ))}
        </div>
      </div>
      <BackButton onClick="/menu" actionType="router"/>
    </div>
  );
}
