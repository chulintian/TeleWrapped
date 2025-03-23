"use client"

import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import Dropdown from "./dropdown";

export default function PhoneNumInput() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState({
    code: "SG", 
    dialCode: "+65"
  });

  function handleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <div>
      <div className="relative flex flex-auto flex-row gap-5 border border-1 p-3 rounded-lg bg-white w-1/3 place-self-center">
        <button className='flex flex-row gap-1 w-15 border-e-1' onClick={handleDropdown}>
          <span className="w-[25px]">
            {selectedCountryCode.code}
          </span>
          <IoChevronDown className="mt-1.5"/>
        </button>
        <input type="number" placeholder='Phone number' className='outline-0 remove-arrow w-full'/>
      </div>
      
      {dropdownOpen && (
        <Dropdown 
          setSelectedCountryCode={setSelectedCountryCode} 
          setDropdownOpen={setDropdownOpen} 
        />
      )}
    </div>
  );
}