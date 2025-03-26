"use client"

import { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import Dropdown from "./dropdown";

export default function PhoneNumInput() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+65");

  function handleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <div className="w-full sm:4/5 md:3/5">
      <div className=" relative flex flex-auto flex-row px-3 py-1 border border-[1.5px] rounded-lg bg-white place-self-center">
        <button className='flex flex-row gap-1 w-25 pe-4 focus:outline-0' onClick={handleDropdown}>
          <span className="w-12">
            {selectedCountryCode}
          </span>
          <AiOutlineCaretDown size={16} className="mt-[5.5px]"/>
        </button>
        <div className="border-e-[1.5px] my-1"></div>
        <input type="number" placeholder='Phone number' className='outline-0 remove-arrow w-full ms-4'/>
        {dropdownOpen && (
        <Dropdown 
          setSelectedCountryCode={setSelectedCountryCode} 
          setDropdownOpen={setDropdownOpen} 
        />
        )}
      </div>
    </div>
  );
}