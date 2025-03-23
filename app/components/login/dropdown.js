"use client"

import { useEffect, useState } from "react";

export default function Dropdown({
  setSelectedCountryCode,
  setDropdownOpen,
}) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('/utils/countryCode.json')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  function handleClick(code, dialCode) {
    setSelectedCountryCode(dialCode);
    setDropdownOpen(false);
  }

  return(
    <div className="absolute bg-white border border-[1.5px] py-1 px-3 rounded-lg flex flex-col gap-y-2 h-30 overflow-y-auto overflow-x-hidden w-full">
      {countries.map((country) => (
        <button key={country.code} className="text-left flex flex-row gap-x-2" onClick={() => handleClick(country.code, country.dial_code)}>
          <p className="w-15">
            {country.dial_code}
          </p>
          <p className="">
            {country.name}
          </p>
        </button>
      ))}
    </div>
  )
}