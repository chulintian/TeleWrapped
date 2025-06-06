"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import VibeCheck from "../components/results/vibeCheck";
import Compatibility from "../components/results/compatibility";
import RedFlags from "../components/results/redFlags";
import AttachmentStyle from "../components/results/attachmentStyle";
import GreenFlags from "../components/results/greenFlags";
import MsgCount from "../components/results/msgCount";
import Button from "../components/common/button";
import { IoShareSocialOutline } from "react-icons/io5";
import html2canvas from "html2canvas";
import BackButton from "../components/common/backButton";
import { TiWarningOutline } from "react-icons/ti";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Results() {
  const [results, setResults] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [soupbase, setSoupbase] = useState([]);
  const [totalNumOfMsg, setTotalNumOfMsg] = useState();
  const captureRef = useRef(null);
  const [flipAll, setFlipAll] = useState(false);
  const [revealed, setRevealed] = useState({
    vibeCheck: false,
    redFlags: false,
    greenFlags: false,
    compatibility: false,
    noOfMsg: false,
    attachment: false,
  });
  const [loading, setLoading] = useState(true);

  const ingredientOnPlateDict = {
    // greenFlag
    bokchoy: "/ingredients/greenFlag/bokchoyOnPlate.png",
    broccoli: "/ingredients/greenFlag/broccoliOnPlate.png",
    leek: "/ingredients/greenFlag/leekOnPlate.png",

    // numOfMessages
    tomato: "/ingredients/numOfMessages/tomatoOnPlate.png",
    corn: "/ingredients/numOfMessages/cornOnPlate.png",
    carrot: "/ingredients/numOfMessages/carrotOnPlate.png",

    // redFlag
    crab: "/ingredients/redFlag/crabOnPlate.png",
    meat: "/ingredients/redFlag/meatOnPlate.png",
    prawn: "/ingredients/redFlag/prawnOnPlate.png",

    // compatibility
    enoki: "/ingredients/compatibility/enokiOnPlate.png",
    shiitake: "/ingredients/compatibility/shiitakeOnPlate.png",

    // attachmentStyle
    fishcake: "/ingredients/attachmentStyle/fishcakeOnPlate.png",
    tofu: "/ingredients/attachmentStyle/tofuOnPlate.png",

    // vibeCheck
    egg: "/ingredients/vibeCheck/eggOnPlate.png",
    radish: "/ingredients/vibeCheck/radishOnPlate.png",
    noodle: "/ingredients/vibeCheck/noodleOnPlate.png",
  };

  const soupbaseDict = {
    malaSoup: "/soupbases/malaSoup.png",
    mushroomSoup: "/soupbases/mushroomSoup.png",
    tomatoSoup: "/soupbases/tomatoSoup.png",
  };

  const ingredientDict = {
    // greenFlag
    bokchoy: "/ingredients/greenFlag/bokchoy.png",
    broccoli: "/ingredients/greenFlag/broccoli.png",
    leek: "/ingredients/greenFlag/leek.png",

    // numOfMessages
    tomato: "/ingredients/numOfMessages/tomato.png",
    corn: "/ingredients/numOfMessages/corn.png",
    carrot: "/ingredients/numOfMessages/carrot.png",

    // redFlag
    crab: "/ingredients/redFlag/crab.png",
    meat: "/ingredients/redFlag/meat.png",
    prawn: "/ingredients/redFlag/prawn.png",

    // compatibility
    enoki: "/ingredients/compatibility/enoki.png",
    shiitake: "/ingredients/compatibility/shiitake.png",

    // attachmentStyle
    fishcake: "/ingredients/attachmentStyle/fishcake.png",
    tofu: "/ingredients/attachmentStyle/tofu.png",

    // vibeCheck
    egg: "/ingredients/vibeCheck/egg.png",
    radish: "/ingredients/vibeCheck/radish.png",
    noodle: "/ingredients/vibeCheck/noodle.png",
  };

  useEffect(() => {
    try {
      const storedResults = JSON.parse(sessionStorage.getItem("results"));
      if (storedResults?.analysis) {
        setResults(storedResults.analysis);
        setTotalNumOfMsg(storedResults.msgCount);
      }
    } catch (error) {
      console.error("Error parsing data from sessionStorage", error);
      setResults({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedIngredients = JSON.parse(
      sessionStorage.getItem("selectedIngredients")
    );
    setIngredients(storedIngredients || []);
    const storedSoupbase = JSON.parse(sessionStorage.getItem("soupbase"));
    setSoupbase(storedSoupbase || "");
    console.log(soupbase);
  }, []);

  const handleClick = async () => {
    setFlipAll(true);

    await new Promise((resolve) => setTimeout(resolve, 500));
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <DotLottieReact
          src="https://lottie.host/f297955c-5f6c-4255-b284-9f06bb78dd9c/lqR7eT9Kjh.lottie"
          loop
          autoplay
        />
      </div>
    );
  }
  else if (!loading && (!results || Object.keys(results).length === 0)) {
    return (
      <div>
        <div className="h-screen w-full">
          <div
            ref={captureRef}
            className="py-5 pb-0 md:pb-5 px-7 flex overflow-y-auto flex-col items-center"
          >
            <div className="w-full">
              <Image
                src="/logo2.png"
                alt="logo"
                width={300}
                height={200}
                className="justify-self-center w-4/5 sm:w-1/2 md:w-1/3"
              />
            </div>
          </div>
          <div className="h-[70%] flex place-items-center mt-2 px-4">
            <p className="text-sm mx-auto italic flex flex-row gap-x-1 mb-3">
              <TiWarningOutline size={17} className="text-end" />
              <span>Note: Analysis Error. Please try again.</span>
            </p>
          </div>
          <BackButton onClick="/menu" actionType="router" />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="min-h-dvh w-full">
        <div
          ref={captureRef}
          className="py-5 pb-0 md:pb-5 px-7 flex overflow-y-auto flex-col items-center"
        >
          <div className="w-full">
            <Image
              src="/logo2.png"
              alt="logo"
              width={300}
              height={200}
              className="justify-self-center w-4/5 sm:w-1/2 md:w-1/3"
            />
          </div>
          <div className="flex justify-center my-6 w-48 lg:w-80">
            <p className="text-wrap text-xs lg:text-sm text-center">
              Click on each ingredient to reveal chat insights.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row w-full">
            <div className="flex flex-col w-full justify-center items-center lg:order-2">
              <div className="relative flex justify-center items-center h-80 w-full lg:h-96">
                <Image
                  src={soupbaseDict[soupbase] || "/soupbases/malaSoup.png"}
                  alt={`Image of ${soupbase}`}
                  fill
                  className="object-contain rounded-lg"
                />
                <div className="absolute  h-[50%] w-[50%] sm:h-[60%] sm:w-[30%] lg:w-[70%] inset-0 z-30 grid grid-cols-3 grid-rows-4 place-items-center place-self-center pointer-events-none">
                  <div></div>
                  <div>
                    {ingredients[0] && revealed.greenFlags ? (
                      <Image
                        src={ingredientDict[ingredients[0]]}
                        alt="greenFlags"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <div className="w-[50px] h-[50px]" />
                    )}
                  </div>
                  <div></div>
                  <div>
                    {ingredients[1] && revealed.noOfMsg ? (
                      <Image
                        src={ingredientDict[ingredients[1]]}
                        alt="noOfMsg"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <div className="w-[50px] h-[50px]" />
                    )}
                  </div>
                  <div></div>
                  <div>
                    {ingredients[5] && revealed.vibeCheck ? (
                      <Image
                        src={ingredientDict[ingredients[5]]}
                        alt="vibeCheck"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <div className="w-[50px] h-[50px]" />
                    )}
                  </div>
                  <div>
                    {ingredients[3] && revealed.compatibility ? (
                      <Image
                        src={ingredientDict[ingredients[3]]}
                        alt="compatibility"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <div className="w-[50px] h-[50px]" />
                    )}
                  </div>
                  <div></div>
                  <div>
                    {ingredients[4] && revealed.attachment ? (
                      <Image
                        src={ingredientDict[ingredients[4]]}
                        alt="attachment"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <div className="w-[50px] h-[50px]" />
                    )}
                  </div>
                  <div></div>
                  <div>
                    {ingredients[2] && revealed.redFlags ? (
                      <Image
                        src={ingredientDict[ingredients[2]]}
                        alt="redFlags"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <div className="w-[50px] h-[50px]" />
                    )}
                  </div>
                  <div></div>
                </div>
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
                  {ingredientOnPlateDict[ingredients[5]] ? (
                    <VibeCheck
                      results={results.vibeCheck || ""}
                      path={ingredientOnPlateDict[ingredients[5]]}
                      flipped={flipAll}
                      onFlip={() =>
                        setRevealed((prev) => ({ ...prev, vibeCheck: true }))
                      }
                    />
                  ) : null}
                </div>
                <div className="flex justify-around items-center h-40 aspect-[1] lg:h-40 ">
                  {ingredientOnPlateDict[ingredients[3]] ? (
                    <Compatibility
                      results={results.compatibility || ""}
                      path={ingredientOnPlateDict[ingredients[3]]}
                      flipped={flipAll}
                      onFlip={() =>
                        setRevealed((prev) => ({
                          ...prev,
                          compatibility: true,
                        }))
                      }
                    />
                  ) : null}
                </div>
              </div>
              <div className="flex justify-around items-center h-48 aspect-[1] lg:h-64 ">
                {ingredientOnPlateDict[ingredients[0]] ? (
                  <GreenFlags
                    results={results}
                    path={ingredientOnPlateDict[ingredients[0]]}
                    flipped={flipAll}
                    onFlip={() =>
                      setRevealed((prev) => ({ ...prev, greenFlags: true }))
                    }
                  />
                ) : null}
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center transform xl:-translate-x-[10%] 2xl:-translate-x-[23%] -translate-y-[15%] lg:translate-y-[0%] lg:order-3">
              <div className="flex flex-col lg:flex-row w-full justify-center items-center lg:order-2 ">
                <div className="flex justify-around items-center h-56 aspect-[1] lg:h-64">
                  {ingredientOnPlateDict[ingredients[5]] ? (
                    <AttachmentStyle
                      results={results}
                      path={ingredientOnPlateDict[ingredients[4]]}
                      flipped={flipAll}
                      onFlip={() =>
                        setRevealed((prev) => ({ ...prev, attachment: true }))
                      }
                    />
                  ) : null}
                </div>
                <div className="flex justify-around items-center h-40 aspect-[1] lg:h-40">
                  {ingredientOnPlateDict[ingredients[1]] ? (
                    <MsgCount
                      totalMessages={totalNumOfMsg}
                      path={ingredientOnPlateDict[ingredients[1]]}
                      flipped={flipAll}
                      onFlip={() =>
                        setRevealed((prev) => ({ ...prev, noOfMsg: true }))
                      }
                    />
                  ) : null}
                </div>
              </div>
              <div className="flex justify-around items-center h-48 aspect-[1] lg:h-64 ">
                {ingredientOnPlateDict[ingredients[2]] ? (
                  <RedFlags
                    results={results}
                    path={ingredientOnPlateDict[ingredients[2]]}
                    flipped={flipAll}
                    onFlip={() =>
                      setRevealed((prev) => ({ ...prev, redFlags: true }))
                    }
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full pr-8 pb-5">
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
      <BackButton onClick="/menu" actionType="router" />
    </div>
  );
}
