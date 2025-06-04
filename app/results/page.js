"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import FlipEnoki from "../components/results/flip_enoki";
import FlipTofu from "../components/results/flip_tofu";
import FlipMeat from "../components/results/flip_meat";
import FlipRadish from "../components/results/flip_radish";
import FlipBokchoy from "../components/results/flip_bokchoy";
import FlipTomato from "../components/results/flip_tomato";
import Button from "../components/common/button";
import { IoShareSocialOutline } from "react-icons/io5";
import html2canvas from "html2canvas";
import BackButton from "../components/common/backButton";

export default function Results() {

  const [results, setResults] = useState({});
  const [totalMessages, setTotalMessages] = useState("");
  const captureRef = useRef(null);

  useEffect(() => {
    try {
      const storedResults = JSON.parse(sessionStorage.getItem("results"));
      if (storedResults?.analysis) {
        setResults(storedResults.analysis);
        console.log("Results from sessionStorage:", storedResults.analysis);
      }
    } catch (error) {
      console.error("Error parsing data from sessionStorage", error);
      setResults([]);
    }
  }, []);

  useEffect(() => {
    const storedTotalMessages = JSON.parse(sessionStorage.getItem("totalMessages"));
    setTotalMessages(storedTotalMessages || "");
  }, []);

  const handleClick = async () => {
    if (!captureRef.current) return;
  
    const canvas = await html2canvas(captureRef.current, {
      useCORS: true,
      backgroundColor: "#efe7dc", 
    });
  
    const dataUrl = canvas.toDataURL("image/png");
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], "screenshot.png", { type: "image/png" });
  
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Telewrapped Results",
          text: "Check out my Telewrapped results!",
        });
        return;
      } catch (error) {
        console.error("Sharing failed", error);
      }
    }
  
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "Telewrapped_Results.png";
    link.click();
  };
  
  return (
    <div>
      <div className="min-h-dvh w-full">
        <div ref={captureRef} className="py-5 px-7 flex overflow-y-auto flex-col items-center">
          <div className="w-full">
            <Image
              src="/logo2.png"
              alt="logo"
              width={200}
              height={100}
              className="justify-self-center w-4/5 sm:w-1/2 md:w-1/3"
            />
          </div>
          <div className="flex justify-center my-6 w-48 lg:w-80">
            <p className="text-wrap text-xs lg:text-sm text-center">
              Click on each ingredient to reveal chat insights.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row w-full">
            <div className="flex flex-col w-full justify-center items-center lg:order-2 ">
              <div className="flex justify-center items-center h-80 w-full lg:h-96 relative">
                <Image
                  src="/hotpot/malaPot.png"
                  alt="Image of hotpot"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <div className="flex justify-center items-center h-32 w-32 lg:w-56 lg:h-30 relative overflow-visible">
                <Image
                  src="/hotpot/utensils.png"
                  alt="Image of utensils"
                  fill
                  className="object-contain rounded-lg transform translate-x-full -translate-y-[70%] lg:translate-none"
                />
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center lg:order-1 transform xl:translate-x-[7%] 2xl:translate-x-[20%] -translate-y-[20%] lg:translate-y-[0%]">
              <div className="flex flex-col lg:flex-row w-full justify-center items-center ">
                <div className="flex justify-around items-center h-56 aspect-[1] lg:h-64 ">
                  <FlipEnoki results={results.vibeCheck || ""} />
                </div>
                <div className="flex justify-around items-center h-40 aspect-[1] lg:h-40 ">
                  <FlipTofu results={results.compatibility || ""} />
                </div>
              </div>
              <div className="flex justify-around items-center h-48 aspect-[1] lg:h-64 ">
                <FlipBokchoy results={results} />
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center transform xl:-translate-x-[10%] 2xl:-translate-x-[23%] -translate-y-[15%] lg:translate-y-[0%] lg:order-3">
              <div className="flex flex-col lg:flex-row w-full justify-center items-center lg:order-2 ">
                <div className="flex justify-around items-center h-56 aspect-[1] lg:h-64">
                  <FlipRadish results={results} />
                </div>
                <div className="flex justify-around items-center h-40 aspect-[1] lg:h-40">
                <FlipTomato totalMessages={totalMessages} />
              </div>
              </div>
                <div className="flex justify-around items-center h-48 aspect-[1] lg:h-64 ">
                  <FlipMeat results={results} />
                </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full pr-8">
          <Button
            label={
              <div className="flex items-center gap-2">
                <IoShareSocialOutline />
                <span>Share My Results</span>
              </div>
            }
            onClick={handleClick}
            alignmentClass=""
          />
        </div>
      </div>
      <BackButton onClick="/menu" actionType="router"/>
    </div>
  );
}
