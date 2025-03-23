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
        console.log(typeof data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  function handleClick(code, dialCode) {
    setSelectedCountryCode({
      code: code, 
      dialCode: dialCode
    });
    setDropdownOpen(false);
  }

  return(
    <div className="absolute border border-1 p-3 rounded-lg w-fit flex flex-col gap-y-2 h-56 overflow-y-auto bg-white">
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