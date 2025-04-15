"use client";
import { useState } from "react";
import Image from "next/image";

const FlipEnoki = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full h-full [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
        isFlipped ? "[transform:rotateY(180deg)]" : ""
      }`}>
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          <Image
            src="/ingredients/compatibility/shitakeOnPlate.png"
            alt="Front"
            fill
            className={`object-contain rounded-lg transition-all duration-500 ${
              isFlipped ? "[transform:scale(0.7)_translateX(20%)]" : ""
            }`}
          />
        </div>
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className={`w-full h-full transition-all duration-500 ${
            !isFlipped ? "[transform:scale(0.7)_translateX(-20%)]" : ""
          }`}>
            <div className="relative w-full h-full flex justify-center items-center">
              <div className="
                aspect-square 
                h-[90%]
                rounded-full 
                bg-[#a7d7e6]
                flex flex-col 
                justify-center 
                items-center 
                text-black
                shadow-lg
                border-1
              border-black
              ">
                <span className="text-lg font-bold">Vibe Check</span>
                <span className="text-xs/5 px-4 font-stretch-extra-condensed tracking-tight text-center">Hold on to your hats, because this duo is a comedy show! Every chat is full of wild randomness and so much laughter its hard to keep up. No serious convos allowed!. With more HAHA’s than words. This friendship’s got you covered for a fun time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipEnoki;
