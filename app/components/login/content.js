"use client"

import { useState } from "react"
import Image from "next/image";
import OTPInput from "./otpInput";
import ResendCode from "./resendCode";
import PhoneNumInput from "./phoneNumInput";
import Button from "../common/button";
import { TiWarningOutline } from "react-icons/ti";

export default function Content() {
  const [requestOTP, setRequestOTP] = useState("");
  const [timer, setTimer] = useState(30);

  function handleClick() {
    setRequestOTP(true);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  }

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 h-full flex flex-col pt-10 p-5 justify-center items-center overflow-y-hidden overflow-x-hidden">
      <div className="flex flex-col gap-4 p-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={700}
          height={300}
          className="place-self-center"
        />
        {requestOTP ? (
          <div className="flex flex-col space-y-4 pt-4">
            <p className="text-center">
              Your code was sent to you via Telegram.
            </p>
            <OTPInput />
            <ResendCode timer={timer}/>
            <Button label="Verify" onClick={handleClick} alignmentClass="place-self-center" />
          </div>
        ) : (
          <div className="flex flex-col space-y-4 pt-4">
            <p className="text-center">
              Log in to use your Telegram account with <span className="font-bold">TeleWrapped</span>
            </p>
            <PhoneNumInput />
            <Button label="Request OTP" onClick={handleClick} alignmentClass="place-self-center" />
            <p className="text-xs text-center italic flex flex-row gap-x-1">
              <TiWarningOutline size={17} className="text-end"/> 
              <span>
                Disclaimer: Your data will only be used for chat analysis and will not be retained.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}