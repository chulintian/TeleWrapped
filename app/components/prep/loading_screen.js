import { useEffect, useState } from "react";
import LoadingBar from "../common/loadingBar";

export default function Prep({ loading, duration }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800); // md breakpoint
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
        {loading && <LoadingBar duration={duration} />}
      </div>
    </div>
  );
}
