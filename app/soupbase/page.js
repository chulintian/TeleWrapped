"use client";

import Image from "next/image";
import Soup from "../components/soupbase/soup";

export default function Soupbase() {
  const soupbases = [
    {
      name: "Herbal Mushroom Soup Base",
      time: "~ 30 sec",
      messages: "3000 messages",
      image: "mushroomSoup",
    },
    {
      name: "Tomato Soup Base",
      time: "~ 60 sec",
      messages: "5000 messages",
      image: "tomatoSoup",
    },
    {
      name: "Mala Milk Soup Base",
      time: "~ 90 sec",
      messages: "7000 messages",
      image: "malaSoup",
    },
  ];

  return (
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
          <Soup key={index} soupbases={soupbase} />
        ))}
      </div>
    </div>
  );
}
