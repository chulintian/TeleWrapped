import { useEffect, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Prep() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800); 
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen max-h-screen overflow-hidden">
      <div
        className={`relative w-[80%] max-h-[90vh] ${
          isMobile ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <video
          src={
            isMobile
              ? "/loading_videos/mobile_screen.mp4"
              : "/loading_videos/laptop_screen.mp4"
          }
          autoPlay
          playsInline
          loop
          muted
          controls={false}
          className=" w-full h-full object-cover object-center"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <DotLottieReact
            src="https://lottie.host/a49b63a7-f781-41be-9551-8dd70b235390/HmR56rEqMx.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
}
