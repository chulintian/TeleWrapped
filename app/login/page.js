"use client"

import { useState } from "react"
import { Sniglet } from 'next/font/google'
import PhoneNumInput from '../components/login/phoneNumInput';
import OTPInput from '../components/login/otpInput';
import Button from '../components/common/button';

// const sniglet = Sniglet({
//   weight: "800",
//   subsets: ["latin"],
// })

export default function Login() {
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
    <div className="h-dvh flex flex-col pt-18 p-5">
      <div className="flex flex-col gap-5 w-full p-10">
        <img src="/logo.png" alt="Logo" className="w-1/2 place-self-center"/>
        {requestOTP ? (
          <div className="flex flex-col space-y-6 pt-6">
            <p className="text-center">
              Your code was sent to you via Telegram.
            </p>
            <OTPInput />
            <Button label="Confirm" onClick={handleClick} alignmentClass="place-self-center" />
            <ResendCode timer={timer}/>
          </div>
        ) : (
          <div className="flex flex-col space-y-6 pt-12">
            <PhoneNumInput />
            <Button label="Request OTP" onClick={handleClick} alignmentClass="place-self-center" />
          </div>
        )}
      </div>
    </div>
  );
}