"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import Image from "next/image";

export default function Set({ chatName, chatId, chatType, totalMessages, ingredients }) {
  const router = useRouter();

  const handleClick = (chatId, chatType) => {
    sessionStorage.setItem("totalMessages", JSON.stringify(totalMessages));
    sessionStorage.setItem("selectedIngredients", JSON.stringify(ingredients));
    startTransition(() => {
      router.push(`/soupbase?chatId=${chatId}&chatType=${chatType}`);
    });
  };

  return (
    <div className="border rounded-lg flex flex-row py-3 md:py-2 ps-3 pe-5 bg-white justify-between gap-1 h-[18%]">
      <div className="me-2 flex flex-row">
        <Image
          src="/hotpot/pot.png"
          alt="hotpot"
          width={90}
          height={90}
          className="me-3 object-contain h-[70%] md:h-[80%] self-center"
        />
        <div className="self-center">
          <p className="text-xs md:text-sm font-bold">{chatName}</p>
          <p className="text-xs md:text-sm">
            Comes with {ingredients[0]}, {ingredients[1]}, {ingredients[2]},{" "}
            {ingredients[3]}, {ingredients[4]} and {ingredients[5]}
          </p>
        </div>
      </div>
      <div
        className="rounded-full aspect-square bg-[#f8a78d] flex justify-center items-center place-self-center h-[50%] md:h-[60%] p-3 cursor-pointer"
        onClick={() => handleClick(chatId, chatType)}
      >
        <Image
          src="/cart.png"
          alt="cart"
          layout="intrinsic"
          width={30}
          height={30}
          className="h-[70%] w-[70%] md:h-full md:w-full self-center"
        />
      </div>
    </div>
  );
}
