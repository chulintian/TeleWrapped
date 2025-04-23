import { useState, useRef } from "react"

export default function OTPInput({
  otp,
  setOtp,
}){
  const inputRefs = useRef([]);

  function handleChange(index, value) {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  function handleBackspace(index, e) {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  }

  function handleClick() {
    const firstEmptyIndex = otp.findIndex((digit) => digit === "");
    if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
      inputRefs.current[firstEmptyIndex].focus();
    }
  }

  return(
    <div className="flex justify-center" onClick={handleClick}>
      <div className="flex flex-row gap-x-2 relative">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            pattern="\d"
            className="border-[1.5px] rounded-lg w-8 h-10 bg-white p-2 text-center focus:outline-none"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleBackspace(index, e)}
          />
        ))}
      </div>
    </div>
  )
}