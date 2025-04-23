"use client"

import { useState, useRef } from "react"
import Image from "next/image";
import OTPInput from "./otpInput";
import PhoneNumInput from "./phoneNumInput";
import Button from "../common/button";
import { TiWarningOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";

export default function Content() {
  const [requestOTPState, setRequestOTPState] = useState("");
  const [timer, setTimer] = useState(30);
  const [phoneNumInput, setPhoneNumInput] = useState("+65 ");
  const [otp, setOtp] = useState(() => Array(5).fill(""));
  const [resendLimit, setResendLimit] = useState(false);
  const [otpError, setOtpError] = useState("");

  const router = useRouter();
  
  const resendCount = useRef(0);
  const maxResend = 3;

  function handleClick() {
    if (resendCount.current >= maxResend) {
      setResendLimit(true);
      return;
    }
    setResendLimit(false);
    setOtpError(""); 
    resendCount.current++;
    resetTimer();
    sessionStorage.setItem("phoneNum", phoneNumInput);
  }

  function handleRequestClick() {
    resetTimer(); 
    sessionStorage.setItem("phoneNum", phoneNumInput);
    resendCount.current = 0; 
    setResendLimit(false);
    setOtpError(""); 
  }

  async function handleVerifyClick() {
    const result = await verifyCode();
    if (result.success) {
      setOtpError("");
      router.push("/retrieval");
    } else {
      setOtpError(
        result.error === "PHONE_CODE_INVALID"
          ? "Invalid code. Please try again."
          : result.error || "Authentication failed."
      );
    }
  }

  function resetTimer() {
    setRequestOTPState(true);
    requestOTP();
    setTimer(30); 
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

  function requestOTP() {
    fetch('/api/user/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNum: phoneNumInput,
      }),
    })
      .then(response => response.json())
      .then(data => {
        sessionStorage.setItem("phoneCodeHash", data.phoneCodeHash);
        sessionStorage.setItem("session", data.session)
      })
      .catch(error => {
        console.error("Error fetching data:", error)
      });
  }

  async function verifyCode() {
    try {
      const response = await fetch('/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionObj: sessionStorage.getItem("session"),
          phoneNum: sessionStorage.getItem("phoneNum"),
          phoneCodeHash: sessionStorage.getItem("phoneCodeHash"),
          code: otp.join("")
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { success: false, error: data?.error || "Verification failed" };
      }
  
      sessionStorage.setItem("phoneCodeHash", data.phoneCodeHash);
      sessionStorage.setItem("session", data.session);
  
      return { success: true };
    } catch (error) {
      console.error("Error verifying code:", error);
      return { success: false, error: error.message || "Unknown error" };
    }
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
        {requestOTPState ? (
          <div className="flex flex-col space-y-4 pt-4">
            <p className="text-center">
              Your code was sent to you via Telegram.
            </p>
            <OTPInput otp={otp} setOtp={setOtp}/>
            {otpError && (
              <p className="italic text-xs w-full text-center text-red-900">{otpError}</p>
            )}
            {resendLimit ? (
              <p className="italic text-xs w-full text-center text-red-900">
                You have reached the maximum number of resends.
              </p>
            ) : (
              <button className="italic text-xs w-full text-center" onClick={handleClick} disabled={timer !=0}>
                Did not receive?
                <span className={`ms-1 ${timer === 0 ? "underline" : ""}`}>Resend code</span>
                {timer !=0 && <span> in {timer}</span>}
              </button>
            )}
            <Button label="Verify" onClick={handleVerifyClick} alignmentClass="place-self-center" />
          </div>
        ) : (
          <div className="flex flex-col space-y-4 pt-4">
            <p className="text-center">
              Log in to use your Telegram account with <span className="font-bold">TeleWrapped</span>.
            </p>
            <PhoneNumInput phoneNumInput={phoneNumInput} setPhoneNumInput={setPhoneNumInput} />
            <Button label="Request OTP" onClick={handleRequestClick} alignmentClass="place-self-center" />
            <p className="text-xs mx-auto italic flex flex-row gap-x-1">
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