"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const AttachmentStyle = ({results, path, flipped, onFlip}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (flipped) {
      setIsFlipped(true);
      const timer = setTimeout(() => {
        onFlip?.();
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [flipped, onFlip]);

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      onFlip();
    }
  };

  return (
    <div 
      className="w-full h-full [perspective:1000px] cursor-pointer"
      onClick={handleClick}
    >
      <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
        isFlipped ? "[transform:rotateY(180deg)]" : ""
      }`}>
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          <Image
            src={path}
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
                bg-yellow-custom
                flex flex-col 
                justify-center 
                items-center 
                text-black
                shadow-lg
                border-1
              border-black
              ">
                <span className="font-bold">Attachment Style</span>
                <div className="text-center text-xs lg:text-sm px-6">
                  {results.users?.map((user, index) => (
                    user.attachmentStyle.map((attachment, i) => (
                      <div key={`${index}-${i}`} className={results.users.length <= 2 ? "pt-2" : ""}>
                        <span className={results.users.length <= 2 ? "underline" : ""}>
                          {user.username}: {attachment.style}
                        </span>
                        {results.users.length <= 2 && (
                          <p>{attachment.reasoning}</p>
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

export default AttachmentStyle;
