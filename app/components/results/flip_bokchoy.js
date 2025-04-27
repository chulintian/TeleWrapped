"use client";
import { useState } from "react";
import Image from "next/image";

const FlipBokchoy = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full h-full [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
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
                bg-[#42a85e]
                flex flex-col 
                justify-center 
                items-center 
                text-black
                shadow-lg
                border-1
              border-black
              "
              >
                <span className="text-lg font-bold">Green Flags</span>
                <span className="text-xs text-center px-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare tempus lacus et fringilla. Nulla eu nulla vitae tortor ultrices bibendum. Suspendisse aliquam neque vitae laoreet vestibulum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur scelerisque fermentum turpis, id commodo nulla.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipBokchoy;
