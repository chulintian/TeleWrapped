"use client"

import { useState, useRef, useEffect } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import Dropdown from "./dropdown";

export default function PhoneNumInput({
  phoneNumInput,
  setPhoneNumInput,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    phoneNumInput ? phoneNumInput.split(" ")[0] : "+65"
  )
  const [phoneInput, setPhoneInput] = useState(
    phoneNumInput ? phoneNumInput.split(" ")[1] : ""
  )

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  function handleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  function handleClickOutside(event) {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target) &&
      buttonRef.current && !buttonRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  }

  const handleInputChange = (e) => {
    setPhoneInput(e.target.value);
    setPhoneNumInput(selectedCountryCode + " " + e.target.value);
  }

  function handleCodeChange(countryCode) {
    setSelectedCountryCode(countryCode);
    setPhoneNumInput(countryCode + "" + phoneInput);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full sm:4/5 md:3/5">
      <div className="relative flex flex-auto flex-row px-3 py-1 border border-[1.5px] rounded-lg bg-white place-self-center">
        <button
          ref={buttonRef}
          className="flex flex-row gap-1 w-25 pe-4 focus:outline-0"
          onClick={handleDropdown}
        >
          <span className="w-12">
            {selectedCountryCode}
          </span>
          <AiOutlineCaretDown size={16} className="mt-[5.5px]" />
        </button>
        <div className="border-e-[1.5px] my-1"></div>
        <input 
          type="number" 
          placeholder="Phone number" 
          value={phoneInput} 
          className="outline-0 remove-arrow w-full ms-4"
          onChange={handleInputChange}
        />
        {dropdownOpen && (
          <div ref={dropdownRef}>
            <Dropdown 
              setSelectedCountryCode={handleCodeChange} 
              setDropdownOpen={setDropdownOpen} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
