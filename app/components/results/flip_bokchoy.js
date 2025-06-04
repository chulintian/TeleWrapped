"use client";
import { useState } from "react";
import Image from "next/image";

const FlipBokchoy = ({results}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  return (
    <div
      className="w-full h-full [perspective:1000px] cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-all flex justify-around items-center duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute h-[90%] aspect-[5/3] [backface-visibility:hidden]">
          <Image
            src="/ingredients/greenFlag/bokchoyOnPlate.png"
            alt="Front"
            fill
            className={`object-contain rounded-lg transition-all duration-500 ${
              isFlipped ? "[transform:scale(0.7)_translateX(20%)]" : ""
            }`}
          />
        </div>
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div
            className={`w-full h-full transition-all duration-500 ${
              !isFlipped ? "[transform:scale(0.7)_translateX(-20%)]" : ""
            }`}
          >
            <div className="relative w-full h-full flex justify-center items-center">
              <div
                className="
                rounded-lg
                h-[90%]
                aspect-[5/3]
                bg-green-custom
                flex flex-col 
                justify-center 
                items-center 
                text-black
                shadow-lg
                border-1
              border-black
                p-4
              "
              >
                <span className="text-lg font-bold">Green Flags</span>
                <div className="text-left text-xs lg:text-sm">
                {results.users?.map((user, index) => (
                  user.greenFlags.map((greenFlag, i) => (
                    <div key={`${index}-${i}`} className={results.users.length <= 2 ? "pt-2" : ""}>
                      <span className={results.users.length <= 2 ? "underline" : ""}>
                        {user.username}: {greenFlag.flag}
                      </span>
                      {results.users.length <= 2 && (
                        <p>{greenFlag.reasoning}</p>
                      )}
                    </div>
                  ))
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlipBokchoy;
